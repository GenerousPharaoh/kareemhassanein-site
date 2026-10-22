// Frames of a page change: open a page, click a link, and capture the transition as it runs.
// Usage: node scripts/audit/nav.mjs /from "css selector to click" [--times=0,120,240,400,600,900,1400] [--phone] [--at=scrollY] [--name=label]
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
const route = (pos[0] || '/').replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
const target = pos[1];
const phone = flags.includes('--phone');
const times = flag('times', '0,120,240,400,600,900,1400').split(',').map(Number);
const at = Number(flag('at', 0));
const base = flag('base', process.env.AUDIT_BASE || 'http://localhost:4322');
const name = flag('name', 'nav');
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
page.on('pageerror', (e) => logs.push(String(e).slice(0, 200)));
await page.goto(base + (route.startsWith('/') ? route : '/' + route), { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2600);
if (at) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), at);
  await page.waitForTimeout(1200);
}
const el = page.locator(target).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const box = await el.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
await page.waitForTimeout(500);
const shots = [];
const t0 = Date.now();
await page.mouse.down();
await page.mouse.up();
for (const t of times) {
  const left = t - (Date.now() - t0);
  if (left > 0) await page.waitForTimeout(left);
  const file = path.join(outDir, `t${t}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 80 });
  shots.push({ file, label: `t${t} (${Date.now() - t0}ms)` });
}
console.log(JSON.stringify({ url: page.url(), logs }, null, 1));
await browser.close();

const W = phone ? 260 : 520;
const tiles = await Promise.all(shots.map(async (s) => ({ label: s.label, buf: await sharp(s.file).resize({ width: W }).toBuffer() })));
const h = (await sharp(tiles[0].buf).metadata()).height + 20;
const cols = phone ? 4 : 3;
const comps = [];
tiles.forEach((t, i) => {
  const x = (i % cols) * (W + 6);
  const y = Math.floor(i / cols) * (h + 6);
  comps.push({ input: Buffer.from(`<svg width="${W}" height="20"><rect width="100%" height="100%" fill="#000"/><text x="5" y="14" font-family="Segoe UI" font-size="12" fill="#fff">${t.label}</text></svg>`), top: y, left: x });
  comps.push({ input: t.buf, top: y + 20, left: x });
});
await sharp({ create: { width: cols * (W + 6), height: Math.ceil(tiles.length / cols) * (h + 6), channels: 3, background: '#222' } })
  .composite(comps)
  .jpeg({ quality: 82 })
  .toFile(path.resolve('output/look', `${name}.jpg`));
