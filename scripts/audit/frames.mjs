// Slow-motion frame sheet of one interaction, to judge a transition frame by frame.
// Usage:
//   node scripts/audit/frames.mjs /route "hover:.someClass" [--phone] [--rate=0.2] [--max=24]
//        [--clip=<css>|viewport] [--name=label] [--base=URL]
//   Steps are separated by ";" and run in order; frames are captured during the LAST step.
//     hover:<css>    move the pointer onto the element        unhover       move it away
//     click:<css>    click (desktop)                          tap:<css>     tap (phone)
//     focus:<css>    keyboard focus (shows :focus-visible)    key:<Key>     press a key
//     scroll:<css>   scroll the element to the centre         wait:<ms>     pause
//     drag:<css>:<from>:<to>   drag across a range input, fractions 0 to 1
//     scrollby:<px>  scroll by an amount (for scroll-linked reveals, frames follow the scroll)
//   Animations and transitions are slowed with the DevTools playback rate (default 0.2, five
//   times slower) so a 300 ms transition spreads over 1.5 s of capture. Timers in page scripts
//   run at normal speed. Each frame is labelled with its time in animation milliseconds.
//   Output: output/frames/<name>.jpg (a contact sheet) and prints the path.
//   Selectors may use [class*="Name_part"] since CSS module class names are hashed.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const pos = argv.filter((a) => !a.startsWith('--'));
const fixRoute = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const route = fixRoute(pos[0] || '/');
const steps = (pos[1] || '').split(';').map((s) => s.trim()).filter(Boolean);
const flag = (k, d) => flags.find((f) => f.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const phone = flags.includes('--phone');
const rate = Number(flag('rate', 0.2));
const max = Number(flag('max', 24));
const clipSel = flag('clip', '');
const base = flag('base', process.env.AUDIT_BASE || 'http://localhost:4321');
const name = flag('name', `${route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}-${(steps.at(-1) || 'idle').replace(/[^a-z0-9]+/gi, '-').slice(0, 40)}-${phone ? 'phone' : 'desktop'}`);
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
await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove()));
await page.waitForTimeout(800);
const cdp = await ctx.newCDPSession(page);
await cdp.send('Animation.enable');

const sel = (s) => s.slice(s.indexOf(':') + 1);
async function centre(css) {
  const loc = page.locator(css).first();
  await loc.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(120);
  const b = await loc.boundingBox();
  if (!b) throw new Error(`not found or not visible: ${css}`);
  return { x: b.x + b.width / 2, y: b.y + b.height / 2, b };
}
let target = null;
async function run(step) {
  const kind = step.split(':')[0];
  if (kind === 'hover') {
    const c = await centre(sel(step));
    target = c.b;
    await page.mouse.move(c.x, c.y, { steps: 3 });
  } else if (kind === 'unhover') await page.mouse.move(2, 2, { steps: 3 });
  else if (kind === 'click') {
    const c = await centre(sel(step));
    target = c.b;
    await page.mouse.click(c.x, c.y);
  } else if (kind === 'tap') {
    const c = await centre(sel(step));
    target = c.b;
    await page.touchscreen.tap(c.x, c.y);
  } else if (kind === 'focus') {
    const css = sel(step);
    await centre(css);
    await page.keyboard.press('Shift');
    await page.locator(css).first().focus();
    target = await page.locator(css).first().boundingBox();
  } else if (kind === 'key') await page.keyboard.press(sel(step));
  else if (kind === 'scroll') target = (await centre(sel(step))).b;
  else if (kind === 'wait') await page.waitForTimeout(Number(sel(step)));
  else if (kind === 'scrollby') await page.mouse.wheel(0, Number(sel(step)));
  else if (kind === 'drag') {
    const [css, from, to] = step.slice(5).split(/:(?=[\d.]+(?::|$))/);
    const c = await centre(css);
    target = c.b;
    const y = c.b.y + c.b.height / 2;
    await page.mouse.move(c.b.x + c.b.width * Number(from), y);
    await page.mouse.down();
    const n = 12;
    for (let k = 1; k <= n; k++) await page.mouse.move(c.b.x + c.b.width * (Number(from) + ((Number(to) - Number(from)) * k) / n), y);
    await page.mouse.up();
  } else throw new Error(`unknown step ${step}`);
}

for (const step of steps.slice(0, -1)) await run(step);
await page.waitForTimeout(200);

// Region to capture.
async function region() {
  if (clipSel === 'viewport' || (!clipSel && !target)) return null;
  let b = target;
  if (clipSel) b = await page.locator(clipSel).first().boundingBox();
  if (!b) return null;
  const vp = page.viewportSize();
  const pad = 24;
  const x = Math.max(0, b.x - pad);
  const y = Math.max(0, b.y - pad);
  return { x, y, width: Math.min(vp.width, b.x + b.width + pad) - x, height: Math.min(vp.height, b.y + b.height + pad) - y };
}

await cdp.send('Animation.setPlaybackRate', { playbackRate: rate });
const last = steps.at(-1);
const frames = [];
const t0 = Date.now();
// One frame before the action, then the action, then frames as fast as the browser gives them.
let clip = await region();
if (last && !/^(hover|click|tap|focus|drag|scroll):/.test(last)) frames.push({ t: 0, buf: await page.screenshot({ type: 'jpeg', quality: 80, clip: clip || undefined }) });
const action = last ? run(last) : Promise.resolve();
await action;
clip = await region();
const start = Date.now();
while (frames.length < max) {
  frames.push({ t: Math.round((Date.now() - start) * rate), buf: await page.screenshot({ type: 'jpeg', quality: 80, clip: clip || undefined }) });
  if (Date.now() - t0 > 30000) break;
}
await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 });
await browser.close();

// Contact sheet: up to 6 columns, each frame labelled with animation time.
const meta = await sharp(frames[0].buf).metadata();
const maxW = phone ? 360 : 420;
const scale = Math.min(1, maxW / meta.width);
const fw = Math.round(meta.width * scale);
const fh = Math.round(meta.height * scale);
const cols = Math.min(6, frames.length);
const rows = Math.ceil(frames.length / cols);
const gap = 10;
const label = 22;
const W = cols * fw + (cols + 1) * gap;
const H = rows * (fh + label) + (rows + 1) * gap;
const tiles = await Promise.all(
  frames.map(async (f, i) => {
    const img = await sharp(f.buf).resize(fw, fh).toBuffer();
    const x = gap + (i % cols) * (fw + gap);
    const y = gap + Math.floor(i / cols) * (fh + label + gap);
    const text = Buffer.from(
      `<svg width="${fw}" height="${label}"><text x="2" y="15" font-family="Consolas, monospace" font-size="13" fill="#e8e8e8">#${i + 1}  t=${f.t} ms</text></svg>`,
    );
    return [
      { input: text, left: x, top: y },
      { input: img, left: x, top: y + label },
    ];
  }),
);
const file = path.join(outDir, `${name}.jpg`);
await sharp({ create: { width: W, height: H, channels: 3, background: '#1b1d20' } })
  .composite(tiles.flat())
  .jpeg({ quality: 82 })
  .toFile(file);
console.log(`${file}  ${frames.length} frames over ${frames.at(-1).t} ms of animation time (rate ${rate})`);
