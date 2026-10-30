// Phone performance check against the production server (npm run build && npm run start).
// Emulates a mid-range phone: 4x CPU slowdown and a slow 4G connection (1.6 Mbps, 150 ms).
// Usage: node scripts/perf.mjs [/route ...] [--runs=1] [--causes]
// Prints largest contentful paint, layout shift, total blocking time (long tasks during load),
// and the bytes actually transferred (compressed) by type. --causes lists the long frames
// during load with the script that caused each one.
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const base = process.env.PERF_BASE || 'http://localhost:4322';
const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const runs = Number(flags.find((f) => f.startsWith('--runs='))?.slice(7) || 1);
const causes = flags.includes('--causes');
const fix = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const given = argv.filter((a) => !a.startsWith('--')).map(fix);
const routes = given.length ? given : ['/', '/work', '/work/tax-relief-counsel', '/firms', '/clinics', '/pricing', '/about', '/book', '/notes'];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const rows = [];
const why = [];
for (const route of routes) {
  const samples = [];
  for (let run = 0; run < runs; run++) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const types = new Map();
    const bytes = { document: 0, script: 0, css: 0, image: 0, font: 0, media: 0, other: 0 };
    cdp.on('Network.responseReceived', (e) => types.set(e.requestId, e.type));
    cdp.on('Network.loadingFinished', (e) => {
      const t = (types.get(e.requestId) || 'Other').toLowerCase();
      const key = t === 'stylesheet' ? 'css' : t in bytes ? t : 'other';
      bytes[key] += e.encodedDataLength;
    });
    await page.addInitScript(() => {
      window.__perf = { lcp: 0, lcpEl: '', cls: 0, tbt: 0, loaf: [] };
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          window.__perf.lcp = e.startTime;
          const el = e.element;
          window.__perf.lcpEl = el ? `${el.tagName.toLowerCase()}.${(el.getAttribute('class') || '').split(' ')[0]}` : e.url || '';
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__perf.tbt += Math.max(0, e.duration - 50);
      }).observe({ type: 'longtask', buffered: true });
      try {
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) {
            const s = [...(e.scripts || [])].sort((a, b) => b.duration - a.duration)[0];
            window.__perf.loaf.push({
              at: Math.round(e.startTime),
              ms: Math.round(e.duration),
              script: s ? `${s.invokerType || ''} ${s.invoker || ''} ${(s.sourceURL || '').split('/').pop()}:${s.sourceFunctionName || ''} ${Math.round(s.duration)}ms` : `style/layout ${Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0)}ms`,
            });
          }
        }).observe({ type: 'long-animation-frame', buffered: true });
      } catch {}
    });
    const t0 = Date.now();
    await page.goto(base + route, { waitUntil: 'load', timeout: 120000 });
    await page.waitForTimeout(3500);
    const m = await page.evaluate(() => window.__perf);
    samples.push({ m, bytes, load: (Date.now() - t0) / 1000 });
    if (causes && run === 0) for (const l of m.loaf.sort((a, b) => b.ms - a.ms).slice(0, 5)) why.push(`${route}  ${l.ms} ms at ${l.at} ms  ${l.script}`);
    await ctx.close();
  }
  const med = (f) => samples.map(f).sort((a, b) => a - b)[Math.floor(samples.length / 2)];
  const kb = (n) => Math.round(n / 1024);
  rows.push({
    route,
    lcp_ms: Math.round(med((s) => s.m.lcp)),
    lcp_el: samples[0].m.lcpEl.slice(0, 34),
    cls: Number(med((s) => s.m.cls).toFixed(3)),
    tbt_ms: Math.round(med((s) => s.m.tbt)),
    html_kb: kb(med((s) => s.bytes.document)),
    js_kb: kb(med((s) => s.bytes.script)),
    css_kb: kb(med((s) => s.bytes.css)),
    img_kb: kb(med((s) => s.bytes.image)),
    font_kb: kb(med((s) => s.bytes.font)),
    video_kb: kb(med((s) => s.bytes.media)),
  });
}
await browser.close();
console.log('Phone profile: 390 wide, 4x CPU slowdown, 1.6 Mbps, 150 ms latency. Sizes are compressed transfer.');
console.table(rows);
if (why.length) {
  console.log('\nLongest frames during load:');
  why.forEach((w) => console.log('  ' + w));
}
