// A quick look at several pages in one browser: each route at the given scroll positions, one contact sheet.
// Usage: node scripts/audit/pages.mjs /work,/firms,/about [--phone] [--at=0,700,1400] [--name=label] [--base=URL]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const pos = argv.filter((a) => !a.startsWith('--'));
const flag = (k, d) => flags.find((f) => f.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const routes = (pos[0] || '/')
  .split(',')
  .map((r) => r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/'))
  .map((r) => (r.startsWith('/') ? r : '/' + r));
const phone = flags.includes('--phone');
const at = flag('at', '0,700,1400').split(',').map(Number);
const base = flag('base', process.env.AUDIT_BASE || 'http://localhost:4321');
const name = flag('name', `pages-${phone ? 'phone' : 'laptop'}`);
const outDir = path.resolve('output/look', name);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({
  viewport: phone ? { width: 390, height: 844 } : { width: 1280, height: 680 },
  deviceScaleFactor: phone ? 2 : 1.5,
  isMobile: phone,
  hasTouch: phone,
});
const page = await ctx.newPage();
const logs = [];
page.on('pageerror', (e) => logs.push(`${page.url()} pageerror ${String(e).slice(0, 200)}`));
page.on('console', (m) => {
  if (m.type() === 'error') logs.push(`${page.url()} ${m.text().slice(0, 200)}`);
});

const rows = [];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1600);
  const files = [];
  for (const y of at) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(900);
    await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())).catch(() => {});
    const file = path.join(outDir, `${route.replace(/[^a-z0-9]+/gi, '-') || 'home'}-y${y}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 80 });
    files.push(file);
  }
  rows.push({ route, files });
}
console.log(JSON.stringify({ routes: routes.length, logs: logs.slice(0, 30) }, null, 1));
await browser.close();

// Sheet: one row per route
const W = phone ? 260 : 520;
const tiles = [];
for (const r of rows) {
  for (const f of r.files) tiles.push({ label: `${r.route} @${path.basename(f).split('-y').pop().replace('.jpg', '')}`, buf: await sharp(f).resize({ width: W }).toBuffer() });
}
const metas = await Promise.all(tiles.map((t) => sharp(t.buf).metadata()));
const cols = at.length;
const tileH = Math.max(...metas.map((m) => m.height)) + 20;
const comps = [];
tiles.forEach((t, i) => {
  const x = (i % cols) * (W + 6);
  const y = Math.floor(i / cols) * (tileH + 6);
  comps.push({ input: Buffer.from(`<svg width="${W}" height="20"><rect width="100%" height="100%" fill="#000"/><text x="5" y="14" font-family="Segoe UI" font-size="12" fill="#fff">${t.label}</text></svg>`), top: y, left: x });
  comps.push({ input: t.buf, top: y + 20, left: x });
});
await sharp({ create: { width: cols * (W + 6), height: Math.ceil(tiles.length / cols) * (tileH + 6), channels: 3, background: '#222' } })
  .composite(comps)
  .jpeg({ quality: 82 })
  .toFile(path.resolve('output/look', `${name}.jpg`));
