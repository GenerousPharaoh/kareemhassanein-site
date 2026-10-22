// Contact sheet of a scroll-driven section: scrolls through it in even steps and captures each frame.
// Usage: node scripts/audit/scrollsheet.mjs /route [--phone] [--selector=css] [--steps=12] [--from=0] [--to=1]
//        [--settle=900] [--name=label] [--base=URL]
//   --selector: the section to scroll through (default: the first <section>); frames are taken at
//   even fractions of its scroll range (top of section at the top of the viewport, to its bottom at
//   the bottom). --from/--to limit the range (0 to 1). Output: output/frames/<name>.jpg
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
const fixRoute = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const route = fixRoute(pos[0] || '/');
const phone = flags.includes('--phone');
const selector = flag('selector', 'section');
const steps = Number(flag('steps', 12));
const from = Number(flag('from', 0));
const to = Number(flag('to', 1));
const settle = Number(flag('settle', 900));
const base = flag('base', process.env.AUDIT_BASE || 'http://localhost:4321');
const name = flag('name', `${route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}-scroll-${phone ? 'phone' : 'desktop'}`);
const outDir = path.resolve('output/frames');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars'] });
const ctx = await browser.newContext({
  viewport: phone ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: phone ? 2 : 1,
  isMobile: phone,
  hasTouch: phone,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove()));
await page.waitForTimeout(2600);

const range = await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const top = r.top + scrollY;
  return { top, span: Math.max(0, el.offsetHeight - innerHeight) };
}, selector);
if (!range) throw new Error(`no element for ${selector}`);

const frames = [];
for (let i = 0; i < steps; i++) {
  const f = from + ((to - from) * i) / Math.max(1, steps - 1);
  const y = Math.round(range.top + range.span * f);
  await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y);
  await page.waitForTimeout(settle);
  frames.push({ f, buf: await page.screenshot({ type: 'jpeg', quality: 78 }) });
}
await browser.close();

const meta = await sharp(frames[0].buf).metadata();
const maxW = phone ? 300 : 480;
const scale = Math.min(1, maxW / meta.width);
const fw = Math.round(meta.width * scale);
const fh = Math.round(meta.height * scale);
const cols = phone ? Math.min(6, frames.length) : Math.min(4, frames.length);
const rows = Math.ceil(frames.length / cols);
const gap = 10;
const label = 22;
const tiles = [];
for (let i = 0; i < frames.length; i++) {
  const img = await sharp(frames[i].buf).resize(fw, fh).toBuffer();
  const x = gap + (i % cols) * (fw + gap);
  const y = gap + Math.floor(i / cols) * (fh + label + gap);
  tiles.push({ input: Buffer.from(`<svg width="${fw}" height="${label}"><text x="2" y="15" font-family="Consolas" font-size="13" fill="#e8e8e8">${Math.round(frames[i].f * 100)}%</text></svg>`), left: x, top: y });
  tiles.push({ input: img, left: x, top: y + label });
}
const file = path.join(outDir, `${name}.jpg`);
await sharp({ create: { width: cols * fw + (cols + 1) * gap, height: rows * (fh + label + gap) + gap, channels: 3, background: '#1b1d20' } })
  .composite(tiles)
  .jpeg({ quality: 82 })
  .toFile(file);
console.log(file);
errors.forEach((e) => console.log('error', e));
