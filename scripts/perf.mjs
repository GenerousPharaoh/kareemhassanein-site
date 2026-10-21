// Phone performance check against the production server (npm run build && npm run start).
// Emulates a mid-range phone: 4x CPU slowdown and a slow 4G connection.
// Usage: node scripts/perf.mjs [/route ...]   (defaults to every main route)
// Prints largest contentful paint, layout shift, long-task blocking time and transfer sizes.
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const base = process.env.PERF_BASE || 'http://localhost:4322';
const fix = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const routes = process.argv.slice(2).length
  ? process.argv.slice(2).map(fix)
  : ['/', '/work', '/work/tax-relief-counsel', '/firms', '/clinics', '/pricing', '/about', '/book', '/notes'];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const rows = [];
for (const route of routes) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const bytes = { script: 0, image: 0, media: 0, font: 0, css: 0, document: 0, other: 0 };
  page.on('response', async (res) => {
    try {
      const type = res.request().resourceType();
      const len = Number(res.headers()['content-length'] || 0) || (await res.body().catch(() => Buffer.alloc(0))).length;
      const key = type === 'stylesheet' ? 'css' : type in bytes ? type : 'other';
      bytes[key] += len;
    } catch {}
  });
  await page.addInitScript(() => {
    window.__perf = { lcp: 0, cls: 0, tbt: 0 };
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__perf.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__perf.tbt += Math.max(0, e.duration - 50);
    }).observe({ type: 'longtask', buffered: true });
  });
  const t0 = Date.now();
  await page.goto(base + route, { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(3000);
  const m = await page.evaluate(() => window.__perf);
  const kb = (n) => Math.round(n / 1024);
  rows.push({
    route,
    lcp_ms: Math.round(m.lcp),
    cls: Number(m.cls.toFixed(3)),
    tbt_ms: Math.round(m.tbt),
    js_kb: kb(bytes.script),
    css_kb: kb(bytes.css),
    img_kb: kb(bytes.image),
    font_kb: kb(bytes.font),
    media_kb: kb(bytes.media),
    load_s: ((Date.now() - t0) / 1000).toFixed(1),
  });
  await ctx.close();
}
await browser.close();
console.table(rows);
