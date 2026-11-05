// Fetching a visitor's page for the first look, with the same care a link preview takes. Every request,
// including robots.txt and each redirect, goes through open() below: the address rules are applied to each
// hop, the DNS answer is checked at the moment of connecting, and the decompressed body is capped.
import { lookup as dnsLookup } from 'node:dns';
import http, { type IncomingMessage } from 'node:http';
import https from 'node:https';
import { BlockList, isIP, type LookupFunction } from 'node:net';
import { pipeline, type Readable } from 'node:stream';
import zlib from 'node:zlib';

export type Hop = { url: string; status: number };

export type Fetched = {
  /** The address as typed, cleaned up. */
  requested: string;
  /** Where the page actually came from, after redirects. */
  final: string;
  hops: Hop[];
  status: number;
  /** Milliseconds from the request to the final page's headers. */
  wait: number;
  contentType: string;
  headers: Record<string, string>;
  html: string;
  bytes: number;
  /** The body was longer than the cap and was cut. */
  truncated: boolean;
};

export class LookError extends Error {
  constructor(public code: 'address' | 'private' | 'unreachable' | 'timeout' | 'not-html' | 'too-many-hops', message: string) {
    super(message);
  }
}

const MAX_BYTES = 1_500_000;
const MAX_HOPS = 5;
const TIMEOUT_MS = 8000;
const SMALL_MAX_BYTES = 50_000;
const SMALL_TIMEOUT_MS = 3000;
const USER_AGENT = 'Mozilla/5.0 (compatible; khassanein.bio first look; +https://www.khassanein.bio/look)';

/** What is wrong with an address under the rules for anything fetched, typed or reached by a redirect. */
function addressProblem(url: URL): string | null {
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'Only web addresses (http or https) can be looked at.';
  if (url.username || url.password) return 'Leave any username or password out of the address.';
  if (url.port && url.port !== '80' && url.port !== '443') return 'Only the standard web ports can be looked at.';
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.localhost')) {
    return 'Enter a public site address, like example.com.';
  }
  if (isIP(host.replace(/^\[|\]$/g, ''))) return 'Enter the site’s name rather than its IP address.';
  return null;
}

/** "example.com/path", "https://example.com" or a bare host become one address, without anything after a ? or #. */
export function normalizeAddress(input: string): URL {
  let text = input.trim().replace(/\s+/g, '');
  if (!text) throw new LookError('address', 'Enter a site address.');
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) text = `https://${text}`;
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    throw new LookError('address', 'That does not look like a site address.');
  }
  const problem = addressProblem(url);
  if (problem) throw new LookError('address', problem);
  url.search = '';
  url.hash = '';
  return url;
}

// IANA's special-purpose IPv4 blocks. In IPv6 only global unicast (2000::/3) is public, less its own special blocks.
// Two lists, because a BlockList also tests IPv4 addresses against its IPv6 rules, and ::/3 would catch all of them.
const NOT_PUBLIC_V4 = new BlockList();
for (const [network, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.31.196.0', 24], ['192.52.193.0', 24], ['192.88.99.0', 24], ['192.168.0.0', 16], ['192.175.48.0', 24],
  ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) NOT_PUBLIC_V4.addSubnet(network, prefix, 'ipv4');
const NOT_PUBLIC_V6 = new BlockList();
for (const [network, prefix] of [
  ['::', 3], ['4000::', 2], ['8000::', 1],
  ['2001::', 23], ['2001:db8::', 32], ['2002::', 16], ['3fff::', 20],
] as const) NOT_PUBLIC_V6.addSubnet(network, prefix, 'ipv6');

export function isPublicAddress(address: string): boolean {
  const ip = address.split('%')[0];
  const family = isIP(ip);
  if (family === 4) return !NOT_PUBLIC_V4.check(ip, 'ipv4');
  if (family === 6) return !NOT_PUBLIC_V6.check(ip, 'ipv6');
  return false;
}

/**
 * Replaces the system lookup for each connection, so the address that was checked is the address connected to.
 * Every answer has to be public. Literal IP addresses never reach this, which is why addressProblem refuses them.
 */
const publicLookup: LookupFunction = (hostname, options, callback) => {
  dnsLookup(hostname, { all: true, verbatim: true }, (error, addresses) => {
    if (error || !addresses.length) {
      callback(new LookError('unreachable', `${hostname} does not resolve to anything.`), '', 0);
      return;
    }
    if (addresses.some(({ address }) => !isPublicAddress(address))) {
      callback(new LookError('private', 'That address points inside a private network.'), '', 0);
      return;
    }
    const usable = options.family === 4 || options.family === 6 ? addresses.filter(({ family }) => family === options.family) : addresses;
    if (!usable.length) callback(new LookError('unreachable', `${hostname} could not be reached.`), '', 0);
    else if (options.all) callback(null, usable);
    else callback(null, usable[0].address, usable[0].family);
  });
};

/** One request to one address. Redirects are the caller's to follow. */
function open(url: URL, signal: AbortSignal, accept: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const request = (url.protocol === 'https:' ? https : http).request(
      url,
      {
        method: 'GET',
        agent: false,
        lookup: publicLookup,
        signal,
        headers: { 'user-agent': USER_AGENT, accept, 'accept-language': 'en-CA,en;q=0.9', 'accept-encoding': 'gzip, br' },
      },
      resolve,
    );
    request.on('error', (error) => {
      if (error instanceof LookError) reject(error);
      else if (signal.aborted) reject(new LookError('timeout', 'The site took too long to answer.'));
      else reject(new LookError('unreachable', `${url.hostname} could not be reached.`));
    });
    request.end();
  });
}

type Opened = { response: IncomingMessage; final: URL; hops: Hop[]; signal: AbortSignal };

/** Follow redirects by hand, so every hop is checked and recorded. One deadline covers all of it, the body included. */
async function openFollowing(start: URL, timeoutMs: number, accept: string): Promise<Opened> {
  const signal = AbortSignal.timeout(timeoutMs);
  const hops: Hop[] = [];
  let current = start;
  for (let n = 0; n <= MAX_HOPS; n++) {
    const response = await open(current, signal, accept);
    const status = response.statusCode ?? 0;
    const location = response.headers.location;
    if (status < 300 || status >= 400 || !location) return { response, final: current, hops, signal };
    hops.push({ url: current.href, status });
    response.destroy();
    let next: URL;
    try {
      next = new URL(location, current);
    } catch {
      throw new LookError('unreachable', 'The site redirected to an address that could not be read.');
    }
    if (next.protocol !== 'https:' && next.protocol !== 'http:') throw new LookError('unreachable', 'The site redirected away from the web.');
    if (addressProblem(next)) throw new LookError('unreachable', 'The site redirected to an address that could not be read.');
    next.hash = '';
    if (n === MAX_HOPS) throw new LookError('too-many-hops', 'The site kept redirecting and never settled on a page.');
    current = next;
  }
  throw new LookError('too-many-hops', 'The site kept redirecting and never settled on a page.');
}

function decoded(response: IncomingMessage): Readable {
  const encoding = String(response.headers['content-encoding'] ?? '').trim().toLowerCase();
  // Sync flush, as browsers do: a cut-off body still yields what arrived rather than an error
  const flush = { flush: zlib.constants.Z_SYNC_FLUSH, finishFlush: zlib.constants.Z_SYNC_FLUSH };
  let decoder: zlib.Gunzip | zlib.Inflate | zlib.BrotliDecompress;
  if (encoding === 'gzip' || encoding === 'x-gzip') decoder = zlib.createGunzip(flush);
  else if (encoding === 'deflate') decoder = zlib.createInflate(flush);
  else if (encoding === 'br') decoder = zlib.createBrotliDecompress({ flush: zlib.constants.BROTLI_OPERATION_FLUSH, finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH });
  else return response;
  pipeline(response, decoder, () => {});
  return decoder;
}

/** Read at most maxBytes of the decompressed body, then close the connection. */
async function readCapped(response: IncomingMessage, maxBytes: number, signal: AbortSignal): Promise<{ text: string; bytes: number; truncated: boolean }> {
  const source = decoded(response);
  const chunks: Buffer[] = [];
  let bytes = 0;
  let truncated = false;
  try {
    for await (const chunk of source) {
      const piece = chunk as Buffer;
      chunks.push(piece);
      bytes += piece.byteLength;
      if (bytes >= maxBytes) {
        truncated = true;
        break;
      }
    }
  } catch {
    if (signal.aborted) throw new LookError('timeout', 'The site took too long to answer.');
    if (!bytes) throw new LookError('unreachable', 'The page could not be read.');
  } finally {
    source.destroy();
    response.destroy();
  }
  const all = Buffer.concat(chunks).subarray(0, maxBytes);
  const header = response.headers['content-type'] ?? '';
  const match = /charset=([^;]+)/i.exec(header);
  const label = match ? match[1].trim().replace(/["']/g, '').toLowerCase() : 'utf-8';
  let text: string;
  try {
    text = new TextDecoder(label).decode(all);
  } catch {
    text = new TextDecoder('utf-8').decode(all);
  }
  return { text, bytes: all.byteLength, truncated };
}

const KEEP_HEADERS = ['server', 'x-powered-by', 'content-security-policy', 'strict-transport-security', 'cf-mitigated', 'x-vercel-mitigated', 'cache-control', 'x-robots-tag'];

/** Read one page. */
export async function fetchPage(input: string): Promise<Fetched> {
  const requested = normalizeAddress(input);
  const started = Date.now();
  const { response, final, hops, signal } = await openFollowing(requested, TIMEOUT_MS, 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5');
  const wait = Date.now() - started;
  const status = response.statusCode ?? 0;
  const contentType = (response.headers['content-type'] ?? '').toLowerCase();
  if (status >= 200 && status < 300 && contentType && !contentType.includes('html') && !contentType.includes('xml')) {
    response.destroy();
    throw new LookError('not-html', 'That address is a file, not a page.');
  }
  const body = await readCapped(response, MAX_BYTES, signal);
  const headers: Record<string, string> = {};
  for (const key of KEEP_HEADERS) {
    const value = response.headers[key];
    if (value) headers[key] = Array.isArray(value) ? value.join(', ') : value;
  }
  return {
    requested: requested.href,
    final: final.href,
    hops,
    status,
    wait,
    contentType,
    headers,
    html: body.text,
    bytes: body.bytes,
    truncated: body.truncated,
  };
}

/** A small text file from a site, such as robots.txt, under the same rules with a shorter deadline and a smaller cap. */
export async function fetchSmallText(address: string): Promise<{ status: number; contentType: string; text: string }> {
  const start = new URL(address);
  const problem = addressProblem(start);
  if (problem) throw new LookError('address', problem);
  const { response, signal } = await openFollowing(start, SMALL_TIMEOUT_MS, 'text/plain,*/*;q=0.5');
  const body = await readCapped(response, SMALL_MAX_BYTES, signal);
  return { status: response.statusCode ?? 0, contentType: response.headers['content-type'] ?? '', text: body.text };
}
