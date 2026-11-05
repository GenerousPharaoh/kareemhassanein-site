// Tests for the first look's network rules, parser cost and booking line. Local only: a throwaway server on
// 127.0.0.1:80 plays every site and DNS is stubbed, so nothing leaves this machine. Run: npm run check:look
import { createRequire } from 'node:module';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Module = require('node:module');
const dns = require('node:dns');
const ts = require('typescript');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const netFile = path.join(root, 'src/lib/look/net.ts');
const GATE = 'export function isPublicAddress(address: string): boolean {';
const compile = (source) => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;

// The test server is on loopback, so the copy under test also lets 127.0.0.1 through, and nothing else.
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  return resolveFilename.call(this, request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request, ...rest);
};
Module._extensions['.ts'] = (module, filename) => {
  let source = fs.readFileSync(filename, 'utf8');
  if (filename === netFile) {
    if (!source.includes(GATE)) throw new Error('isPublicAddress moved; update this harness');
    source = source.replace(GATE, `${GATE} if (address === '127.0.0.1') return true;`);
  }
  module._compile(compile(source), filename);
};

let failed = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? `  (${detail})` : ''}`);
};
const code = async (run) => {
  try {
    return { value: await run() };
  } catch (error) {
    return { code: error.code ?? error.name, message: error.message };
  }
};

// The real address rules, from a copy without the loopback exception
const real = new Module('net-real');
real._compile(compile(fs.readFileSync(netFile, 'utf8')), path.join(root, 'src/lib/look/net-real.ts'));
for (const ip of ['127.0.0.1', '10.0.0.1', '169.254.169.254', '100.64.0.1', '172.16.0.1', '192.168.1.1', '198.18.0.1', '192.0.2.1', '198.51.100.1', '203.0.113.1', '224.0.0.1', '240.0.0.1', '0.0.0.0',
  '::', '::1', '::ffff:127.0.0.1', '::ffff:7f00:1', '::ffff:10.0.0.1', '::127.0.0.1', 'fe80::1', 'fe80::1%eth0', 'fc00::1', 'fd00::1', 'fec0::1', 'ff02::1', '100::1', '64:ff9b::7f00:1', '2001:db8::1', '2001::1', '2002:7f00:1::1', '3fff::1', 'nonsense']) {
  check(`not public: ${ip}`, !real.exports.isPublicAddress(ip));
}
for (const ip of ['8.8.8.8', '1.1.1.1', '76.76.21.21', '192.0.32.10', '2606:4700:4700::1111', '2a00:1450:4001::1']) check(`public: ${ip}`, real.exports.isPublicAddress(ip));
for (const typed of ['https://127.0.0.1/', 'http://2130706433/', 'http://0x7f.1/', 'http://[::1]/', 'localhost', 'foo.local', 'foo.local.', 'foo.internal', 'https://a:b@example.org/', 'https://example.org:8443/', 'ftp://example.org/']) {
  const result = await code(() => real.exports.normalizeAddress(typed));
  check(`typed address refused: ${typed}`, result.code === 'address', result.code);
}
check('query and fragment dropped', real.exports.normalizeAddress('https://example.org/a?token=1#b').href === 'https://example.org/a');

const net = require(netFile);
const { look } = require(path.join(root, 'src/lib/look/report.ts'));
const { parse } = require(path.join(root, 'src/lib/look/parse.ts'));

// DNS for the test: everything is the test server, apart from the names below
const lookups = {};
dns.lookup = (host, options, callback) => {
  lookups[host] = (lookups[host] ?? 0) + 1;
  const answer = (...ips) => callback(null, ips.map((address) => ({ address, family: address.includes(':') ? 6 : 4 })));
  if (host === 'private.test') return answer('10.0.0.1');
  if (host === 'metadata.test') return answer('169.254.169.254');
  if (host === 'mixed.test') return answer('127.0.0.1', '10.0.0.1');
  if (host === 'v6-private.test') return answer('fd00::1');
  if (host === 'nowhere.test') return callback(Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' }));
  if (host === 'rebind.test') return lookups[host] === 1 ? answer('127.0.0.1') : answer('10.0.0.1');
  return answer('127.0.0.1');
};

const page = (body = 'x') => `<!doctype html><html lang="en"><head><title>Fixture</title><meta name="viewport" content="width=device-width"></head><body>${body}</body></html>`;
const bomb = zlib.gzipSync(Buffer.alloc(64 * 1024 * 1024, 60));
let hits = 0;
let bytesWritten = 0;
const sites = {
  '/ok': (res) => send(res, page()),
  '/chain': (res) => move(res, '/chain2'),
  '/chain2': (res) => move(res, '/ok'),
  '/loop': (res) => move(res, '/loop'),
  '/to-port': (res) => move(res, 'http://fixture.test:8443/ok'),
  '/to-literal': (res) => move(res, 'http://127.0.0.1/ok'),
  '/to-decimal': (res) => move(res, 'http://2130706433/ok'),
  '/to-v6': (res) => move(res, 'http://[::1]/ok'),
  '/to-private': (res) => move(res, 'http://private.test/ok'),
  '/to-metadata': (res) => move(res, 'http://metadata.test/ok'),
  '/to-creds': (res) => move(res, 'http://user:pass@fixture.test/ok'),
  '/to-ftp': (res) => move(res, 'ftp://fixture.test/ok'),
  '/to-local': (res) => move(res, 'http://intranet/ok'),
  '/big': (res) => { res.writeHead(200, { 'content-type': 'text/html' }); res.end(Buffer.alloc(5_000_000, 97)); },
  '/gzip': (res) => { res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' }); res.end(zlib.gzipSync(page('gzip-body'))); },
  '/br': (res) => { res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'br' }); res.end(zlib.brotliCompressSync(page('br-body'))); },
  '/deflate': (res) => { res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'deflate' }); res.end(zlib.deflateSync(page('deflate-body'))); },
  '/bad-gzip': (res) => { res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' }); res.end('not gzip at all'); },
  '/bomb': (res) => { res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' }); res.end(bomb); },
  '/slow': (res) => { res.writeHead(200, { 'content-type': 'text/html' }); res.write('<title>slow'); },
  '/file': (res) => { res.writeHead(200, { 'content-type': 'application/pdf' }); res.end('%PDF'); },
};
const send = (res, body, headers = {}) => { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', ...headers }); res.end(body); };
const move = (res, location) => { res.writeHead(302, { location }); res.end(); };
const fixtures = new Map();

const server = http.createServer((req, res) => {
  hits++;
  const url = new URL(req.url, 'http://x');
  const host = (req.headers.host ?? '').split(':')[0];
  if (url.pathname === '/robots.txt') {
    if (host === 'robots-to-literal.test') return move(res, 'http://127.0.0.1/secret-robots');
    if (host === 'robots-to-private.test') return move(res, 'http://private.test/robots.txt');
    if (host === 'robots-to-port.test') return move(res, 'http://fixture.test:8443/robots.txt');
    if (host === 'robots-bomb.test') { res.writeHead(200, { 'content-type': 'text/plain', 'content-encoding': 'gzip' }); return res.end(bomb); }
    if (host === 'robots-slow.test') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.write('User-agent: *\n'); }
    if (host === 'robots-huge.test') {
      res.writeHead(200, { 'content-type': 'text/plain' });
      const write = () => { while (bytesWritten < 40_000_000 && !res.destroyed) { bytesWritten += 65536; if (!res.write(Buffer.alloc(65536, 35))) return res.once('drain', write); } if (!res.destroyed) res.end(); };
      return write();
    }
    res.writeHead(200, { 'content-type': 'text/plain' });
    return res.end('User-agent: *\nDisallow:\nSitemap: http://fixture.test/sitemap.xml\n');
  }
  if (url.pathname === '/secret-robots') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('User-agent: *\nDisallow: /\n'); }
  if (fixtures.has(url.pathname)) return send(res, fixtures.get(url.pathname));
  const handler = sites[url.pathname];
  if (handler) return handler(res);
  res.writeHead(404);
  res.end('none');
});
const bound = await new Promise((resolve) => { server.once('error', (e) => resolve(e.code)); server.listen(80, '127.0.0.1', () => resolve('ok')); });
if (bound !== 'ok') {
  console.error(`Could not bind 127.0.0.1:80 (${bound}).`);
  process.exit(1);
}

// Connections are made to the address that was checked, with no second resolution
{
  const result = await code(() => net.fetchPage('http://rebind.test/ok'));
  check('one DNS answer per connection: no second lookup to rebind', result.value?.status === 200 && lookups['rebind.test'] === 1, `lookups ${lookups['rebind.test']}`);
}
for (const [host, expected] of [['private.test', 'private'], ['metadata.test', 'private'], ['mixed.test', 'private'], ['v6-private.test', 'private'], ['nowhere.test', 'unreachable']]) {
  const before = hits;
  const result = await code(() => net.fetchPage(`http://${host}/ok`));
  check(`${host} refused before connecting`, result.code === expected && hits === before, result.code);
}

// Every hop obeys the same rules
for (const route of ['/to-port', '/to-literal', '/to-decimal', '/to-v6', '/to-creds', '/to-ftp', '/to-local']) {
  const result = await code(() => net.fetchPage(`http://fixture.test${route}`));
  check(`redirect refused: ${route}`, result.code === 'unreachable', result.code);
}
for (const route of ['/to-private', '/to-metadata']) {
  const result = await code(() => net.fetchPage(`http://fixture.test${route}`));
  check(`redirect refused: ${route}`, result.code === 'private', result.code);
}
{
  const chain = await net.fetchPage('http://fixture.test/chain');
  check('redirects still followed and recorded', chain.final === 'http://fixture.test/ok' && chain.hops.length === 2);
  const loop = await code(() => net.fetchPage('http://fixture.test/loop'));
  check('redirect loop ends', loop.code === 'too-many-hops', loop.code);
}

// Bodies: decoded, and capped after decoding
for (const encoding of ['gzip', 'br', 'deflate']) {
  const result = await net.fetchPage(`http://fixture.test/${encoding}`);
  check(`${encoding} body read`, result.html.includes(`${encoding}-body`));
}
{
  const bad = await code(() => net.fetchPage('http://fixture.test/bad-gzip'));
  check('broken compression reported, not read as an empty page', bad.code === 'unreachable', bad.code);
  const big = await net.fetchPage('http://fixture.test/big');
  check('plain body capped at 1.5 MB', big.bytes === 1_500_000 && big.truncated, String(big.bytes));
  const started = performance.now();
  const blown = await net.fetchPage('http://fixture.test/bomb');
  check('compression bomb capped at 1.5 MB', blown.bytes === 1_500_000 && blown.truncated, `${Math.round(performance.now() - started)} ms`);
  const file = await code(() => net.fetchPage('http://fixture.test/file'));
  check('a file is refused', file.code === 'not-html', file.code);
  const started2 = performance.now();
  const slow = await code(() => net.fetchPage('http://fixture.test/slow'));
  const took = performance.now() - started2;
  check('a body that never ends times out', slow.code === 'timeout' && took < 9000, `${slow.code} ${Math.round(took)} ms`);
}

// robots.txt, through the same door
const report = async (host, route) => {
  fixtures.set(route, page());
  return look(`http://${host}${route}`);
};
const robotsLines = (r) => r.groups.find((g) => g.id === 'search').lines.map((l) => l.text).join(' | ');
{
  const fine = await report('fixture.test', '/plain');
  check('robots.txt read as before', robotsLines(fine).includes('A sitemap is listed'));
  for (const host of ['robots-to-literal.test', 'robots-to-private.test', 'robots-to-port.test']) {
    const r = await report(host, '/plain');
    const text = robotsLines(r);
    check(`robots.txt redirect ignored: ${host}`, !text.includes('blocks every crawler') && !text.includes('sitemap is listed'), r.ms + ' ms');
  }
  const started = performance.now();
  const blown = await report('robots-bomb.test', '/plain');
  check('robots.txt compression bomb stopped', Boolean(blown) && performance.now() - started < 2000, `${Math.round(performance.now() - started)} ms`);
  bytesWritten = 0;
  await report('robots-huge.test', '/plain');
  check('robots.txt read stops early', bytesWritten < 5_000_000, `server wrote ${bytesWritten} bytes`);
  const started2 = performance.now();
  await report('robots-slow.test', '/plain');
  const took = performance.now() - started2;
  check('robots.txt deadline is 3 s', took > 2800 && took < 4000, `${Math.round(took)} ms`);
}

// Cost of hostile pages at the full 1.5 MB: unclosed tags were the problem, and these are the worst shapes found
const SIZE = 1_500_000;
const fill = (unit) => unit.repeat(Math.floor(SIZE / unit.length));
const hostile = {
  'unclosed a': fill('<a>'),
  'unclosed a with a space': fill('<a '),
  'unclosed h1': fill('<h1>'),
  'unclosed button': fill('<button>'),
  'unclosed script': fill('<script>'),
  'unclosed style': fill('<style>'),
  'unclosed svg': fill('<svg>'),
  'unclosed noscript': fill('<noscript>'),
  'unclosed title': fill('<title>'),
  'unclosed comment': fill('<!--'),
  'lone angle brackets': fill('<'),
  'unclosed img': fill('<img '),
  'unclosed meta': fill('<meta '),
  'unclosed link': fill('<link '),
  'unclosed html': fill('<html '),
  'near-miss closers': `<a>${fill('</abbr>')}`,
  'closed anchors': fill('<a href="/x">y</a>'),
  'bad character references': fill('&#99999999;'),
  'open character references': fill('&#'),
  'long attribute run': `<a ${fill('href ')}>x</a>`,
  'unclosed quotes': `<a ${fill('href="')}>x</a>`,
  'spaces': `<a${' '.repeat(SIZE)}>x</a>`,
  'facebook path': `<script>${fill('connect.facebook.net/')}</script>`,
  'google in a link': `<a href="${fill('google.')}">x</a>`,
  'pixel calls': `<script>${fill('fbq(')}</script>`,
  'loader calls': `<script>${fill('(window,document,')}</script>`,
  'gtag calls': `<script>${fill('gtag(')}</script>`,
  'phone-like digits': fill('123 456 '),
  'nested structured data': `<script type="application/ld+json">${'['.repeat(200_000)}</script>`,
  'many forms': fill('<form '),
};
const BUDGET_MS = 1500;
for (const [name, html] of Object.entries(hostile)) {
  const started = performance.now();
  parse(html);
  const parsed = Math.round(performance.now() - started);
  check(`parse ${name}`, parsed < BUDGET_MS, `${parsed} ms`);
  const route = `/hostile-${name.replaceAll(' ', '-')}`;
  fixtures.set(route, html);
  const started2 = performance.now();
  const whole = await code(() => look(`http://fixture.test${route}`));
  const took = Math.round(performance.now() - started2);
  check(`whole look ${name}`, took < BUDGET_MS * 2 && (whole.value || whole.code === 'unreachable' || whole.code === 'RangeError'), `${took} ms${whole.code ? ` ${whole.code}` : ''}`);
  fixtures.delete(route);
}

// Parsing normal markup
{
  const p = parse(`<!doctype html><HTML LANG="en"><head><TITLE>A &amp; B</TITLE>
    <meta name=description content="d"><meta property="og:title" content='o'>
    <link rel="canonical" href="https://x.test/"><link rel="stylesheet" href="a.css"><link rel="preload stylesheet" href="b.css">
    </head><body><!-- <a href="/hidden">Book</a> --><h1 class="a"><span>Main</span> title</h1><abbr>no</abbr>
    <A HREF="/one" onclick="go()">One <b>link</b></A><a href='/two'>Two</a><a>no href</a>
    <button data-href="/three">Three</button><form action="/f"></form><form></form><formation></formation>
    <img src="a.png" alt="A" width="1" height="2"><img data-src="b.png" style="aspect-ratio: 1"><imgx>
    <script src="/s.js"></script><script>var a = "<a href='/in-script'>x</a>";</script><style>.a{}</style><svg><text>svgtext</text></svg>
    <script type="application/ld+json">{"@graph":[{"@type":"Dentist","name":"N"}]}</script><script type="application/ld+json">{bad</script>
    <p>Visible &eacute; &#233; &#99999999; words</p></body></HTML>`);
  check('title decoded', p.title === 'A & B', p.title);
  check('language', p.lang === 'en');
  check('metas', p.metas.get('description') === 'd' && p.metas.get('og:title') === 'o');
  check('canonical and stylesheets', p.canonical === 'https://x.test/' && p.stylesheets === 2);
  check('h1 text', p.h1.length === 1 && p.h1[0] === 'Main title', p.h1.join('/'));
  check('anchors, buttons, no abbr', JSON.stringify(p.anchors.map((a) => a.href)) === JSON.stringify(['/hidden', '/one', '/two', '', '/in-script', '/three']), p.anchors.map((a) => a.href).join(' '));
  check('onclick kept', p.anchors.find((a) => a.href === '/one')?.onclick === 'go()');
  check('forms counted exactly', p.forms === 2, String(p.forms));
  check('images', p.images.length === 2 && p.images[0].sized && p.images[1].sized && p.images[1].src === 'b.png' && p.images[1].alt === null);
  check('scripts', p.scriptSrcs.join() === '/s.js' && p.inlineScript.includes('in-script'));
  check('structured data, broken one marked', p.jsonLd.length === 2 && p.jsonLd[1]['@type'] === '__invalid__');
  check('visible text only', p.text.includes('Visible é é') && !p.text.includes('svgtext') && !p.text.includes('var a') && !p.text.includes('.a{}'), p.text.slice(0, 60));
  check('out-of-range reference left as written', p.text.includes('&#99999999;'));
}

// The booking line
const bookingOf = async (body) => {
  fixtures.set('/page', page(body));
  const r = await look('http://fixture.test/page');
  return r.groups.find((g) => g.id === 'booking').lines.map((l) => l.text).join(' | ');
};
{
  const brand = '<a href="/">K H Kareem Hassanein Websites, booking, search and ads</a><a href="/clinics">For clinics Websites, booking and ads</a><a href="/book">Book a call</a><a href="/book">Book a 20-minute call</a>';
  check('logo and menu text do not count as booking', (await bookingOf(brand)).includes('own page: /book.'), await bookingOf(brand));
  check('same-site full address found', (await bookingOf('<a href="http://fixture.test/book-online/">Book Appointment</a>')).includes('own page: /book-online/.'));
  check('www variant counts as the same site', (await bookingOf('<a href="http://www.fixture.test/book">Book now</a>')).includes('own page: /book.'));
  check('the most used asking link wins', (await bookingOf('<a href="/contact">Online booking</a><a href="/a">Book now</a><a href="/b">Book a visit</a><a href="/b">Book today</a>')).includes('own page: /b.'));
  check('section on the same page counts', (await bookingOf('<a href="#book">Book now</a>')).includes('own page: /page#book.'));
  check('a section on another page shows that page', (await bookingOf('<a href="/request/#form/#form">Book now</a>')).includes('own page: /request/.'));
  check('a link to this same page does not',!(await bookingOf('<a href="/page">Book now</a>')).includes('own page'));
  check('long text that only mentions booking does not count', !(await bookingOf('<a href="/about">Read about how our team handles booking for you</a>')).includes('own page'));
  check('no route in at all is still flagged', (await bookingOf('<p>hello</p>')).includes('there is no way in'));
  check('dead button still flagged', (await bookingOf('<a href="#">Book now</a>')).includes('links to nothing'));
  check('Jane found', (await bookingOf('<a href="https://clinic.janeapp.com/">Anything</a>')).includes('Booking goes to Jane (clinic.janeapp.com)'));
  check('external booking host found', (await bookingOf('<a href="https://bookings.example.org/x">Book now</a>')).includes('Booking goes to bookings.example.org'));
  check('protocol-relative booking host found', (await bookingOf('<a href="//clinic.janeapp.com/">Book</a>')).includes('Jane'));
  check('social link is not a booking host', !(await bookingOf('<a href="https://www.facebook.com/x">Book now</a>')).includes('Booking goes to'));
  const phone = (await look('http://fixture.test/page')).groups.find((g) => g.id === 'phone').lines[0].text;
  check('phone line says what it checked', phone === 'A phone layout is set. This does not show how the page looks on a phone.', phone);
}

server.closeAllConnections();
server.close();
console.log(failed ? `\n${failed} FAILED` : '\nAll passed');
process.exit(failed ? 1 : 0);
