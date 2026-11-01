// Fetching a visitor's page for the first look: one public address, read once, with the same
// care a link preview takes. Nothing private is reachable, nothing is kept, and the body is capped.
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

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
const USER_AGENT = 'Mozilla/5.0 (compatible; khassanein.bio first look; +https://www.khassanein.bio/look)';

/** "example.com/path", "https://example.com" or a bare host become one https address. */
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
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new LookError('address', 'Only web addresses (http or https) can be looked at.');
  if (url.username || url.password) throw new LookError('address', 'Leave any username or password out of the address.');
  if (url.port && url.port !== '80' && url.port !== '443') throw new LookError('address', 'Only the standard web ports can be looked at.');
  const host = url.hostname.toLowerCase();
  if (!host.includes('.') || host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.localhost')) {
    throw new LookError('address', 'Enter a public site address, like example.com.');
  }
  if (isIP(host.replace(/^\[|\]$/g, ''))) throw new LookError('address', 'Enter the site’s name rather than its IP address.');
  url.hash = '';
  return url;
}

const privateV4 = (ip: string) => {
  const [a, b] = ip.split('.').map(Number);
  return (
    a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0) || (a === 192 && b === 168) || (a === 198 && (b === 18 || b === 19)) || a >= 224
  );
};

const privateV6 = (ip: string) => {
  const v = ip.toLowerCase();
  if (v === '::' || v === '::1') return true;
  if (v.startsWith('::ffff:')) return privateV4(v.slice(7));
  return v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe8') || v.startsWith('fe9') || v.startsWith('fea') || v.startsWith('feb') || v.startsWith('2001:db8') || v.startsWith('64:ff9b');
};

/** The host must resolve, and to a public address, before anything is fetched from it. */
async function assertPublic(hostname: string) {
  let addresses: { address: string; family: number }[];
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new LookError('unreachable', `${hostname} does not resolve to anything.`);
  }
  if (!addresses.length) throw new LookError('unreachable', `${hostname} does not resolve to anything.`);
  for (const { address, family } of addresses) {
    if (family === 4 ? privateV4(address) : privateV6(address)) throw new LookError('private', 'That address points inside a private network.');
  }
}

async function readCapped(response: Response): Promise<{ text: string; bytes: number; truncated: boolean }> {
  const reader = response.body?.getReader();
  if (!reader) return { text: '', bytes: 0, truncated: false };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      bytes += value.byteLength;
      if (bytes >= MAX_BYTES) {
        truncated = true;
        void reader.cancel().catch(() => {});
        break;
      }
    }
  }
  const all = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    all.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const match = /charset=([^;]+)/i.exec(response.headers.get('content-type') ?? '');
  const label = match ? match[1].trim().replace(/["']/g, '').toLowerCase() : 'utf-8';
  let text: string;
  try {
    text = new TextDecoder(label).decode(all);
  } catch {
    text = new TextDecoder('utf-8').decode(all);
  }
  return { text, bytes, truncated };
}

const KEEP_HEADERS = ['server', 'x-powered-by', 'content-security-policy', 'strict-transport-security', 'cf-mitigated', 'x-vercel-mitigated', 'cache-control', 'x-robots-tag'];

/** Read one page, following redirects by hand so every hop is checked and recorded. */
export async function fetchPage(input: string): Promise<Fetched> {
  const requested = normalizeAddress(input);
  const hops: Hop[] = [];
  let current = requested;
  const started = Date.now();
  const deadline = started + TIMEOUT_MS;

  for (let n = 0; n <= MAX_HOPS; n++) {
    await assertPublic(current.hostname);
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new LookError('timeout', 'The site took too long to answer.');
    let response: Response;
    try {
      response = await fetch(current, {
        redirect: 'manual',
        signal: AbortSignal.timeout(remaining),
        headers: {
          'user-agent': USER_AGENT,
          accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
          'accept-language': 'en-CA,en;q=0.9',
        },
      });
    } catch (error) {
      const name = error instanceof Error ? error.name : '';
      if (name === 'TimeoutError' || name === 'AbortError') throw new LookError('timeout', 'The site took too long to answer.');
      throw new LookError('unreachable', `${current.hostname} could not be reached.`);
    }
    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      hops.push({ url: current.href, status: response.status });
      void response.body?.cancel().catch(() => {});
      let next: URL;
      try {
        next = new URL(location, current);
      } catch {
        throw new LookError('unreachable', 'The site redirected to an address that could not be read.');
      }
      if (next.protocol !== 'https:' && next.protocol !== 'http:') throw new LookError('unreachable', 'The site redirected away from the web.');
      next.hash = '';
      if (n === MAX_HOPS) throw new LookError('too-many-hops', 'The site kept redirecting and never settled on a page.');
      current = next;
      continue;
    }
    const wait = Date.now() - started;
    const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
    if (response.ok && contentType && !contentType.includes('html') && !contentType.includes('xml')) {
      void response.body?.cancel().catch(() => {});
      throw new LookError('not-html', 'That address is a file, not a page.');
    }
    const body = await readCapped(response);
    const headers: Record<string, string> = {};
    for (const key of KEEP_HEADERS) {
      const value = response.headers.get(key);
      if (value) headers[key] = value;
    }
    return {
      requested: requested.href,
      final: current.href,
      hops,
      status: response.status,
      wait,
      contentType,
      headers,
      html: body.text,
      bytes: body.bytes,
      truncated: body.truncated,
    };
  }
  throw new LookError('too-many-hops', 'The site kept redirecting and never settled on a page.');
}
