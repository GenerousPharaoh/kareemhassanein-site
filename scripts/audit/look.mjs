// Look at a page the way Kareem sees it: a 1280 by 680 window at 1.5x (his laptop), or a phone.
// Usage: node scripts/audit/look.mjs [/route] [--phone] [--times=600,1400,3000] [--at=0,700,1400 (scroll px)]
//        [--hover=css selector list, separated by |] [--name=label] [--base=URL] [--wait=ms]
// Writes each frame to output/look/<name>/ and a contact sheet to output/look/<name>.jpg
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
const base = flag('base', process.env.AUDIT_BASE || 'http://localhost:4321');
const times = flag('times', '')
  .split(',')
  .filter(Boolean)
  .map(Number);
const at = flag('at', '')
  .split(',')
  .filter(Boolean)
  .map(Number);
const hovers = flag('hover', '')
  .split('|')
  .filter(Boolean);
const wait = Number(flag('wait', 1200));
const name = flag('name', `${route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}-${phone ? 'phone' : 'laptop'}`);
const outDir = path.resolve('output/look', name);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--hide-scrollbars', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'],
});
const ctx = await browser.newContext({
  viewport: phone ? { width: 390, height: 844 } : { width: 1280, height: 680 },
  deviceScaleFactor: phone ? 2 : 1.5,
  isMobile: phone,
  hasTouch: phone,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
const logs = [];
page.on('pageerror', (e) => logs.push('pageerror ' + String(e).slice(0, 300)));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type()} ${m.text().slice(0, 300)}`);
});

const shots = [];
const shoot = async (label) => {
  const file = path.join(outDir, `${String(shots.length).padStart(2, '0')}-${label}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 82 });
  shots.push({ file, label });
};

const t0 = Date.now();
await page.goto(base + route, { waitUntil: 'commit', timeout: 120000 });
await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())).catch(() => {});
for (const t of times) {
  const left = t - (Date.now() - t0);
  if (left > 0) await page.waitForTimeout(left);
  await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())).catch(() => {});
  await shoot(`t${t}`);
}
await page.waitForLoadState('networkidle', { timeout: 120000 }).catch(() => {});

const state = await page.evaluate(() => ({
  gl: !!document.querySelector('[data-gl]'),
  height: document.documentElement.scrollHeight,
  lenis: document.documentElement.classList.contains('lenis'),
}));

for (const y of at) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await page.waitForTimeout(wait);
  await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())).catch(() => {});
  await shoot(`y${y}`);
}

for (const sel of hovers) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(400);
  const box = await el.boundingBox();
  if (!box) continue;
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 8 });
  await page.waitForTimeout(900);
  await shoot(`hover-${sel.replace(/[^a-z0-9]+/gi, '-').slice(0, 40)}`);
}

console.log(JSON.stringify({ ...state, shots: shots.length, logs: logs.slice(0, 20) }, null, 1));
await browser.close();

// Contact sheet: two columns, labelled
const W = phone ? 300 : 640;
const tiles = await Promise.all(
  shots.map(async (s) => {
    const img = sharp(s.file).resize({ width: W });
    const buf = await img.toBuffer();
    const meta = await sharp(buf).metadata();
    const label = Buffer.from(
      `<svg width="${W}" height="22"><rect width="100%" height="100%" fill="#000"/><text x="6" y="16" font-family="Segoe UI" font-size="13" fill="#fff">${s.label}</text></svg>`,
    );
    return sharp({ create: { width: W, height: meta.height + 22, channels: 3, background: '#000' } })
      .composite([
        { input: label, top: 0, left: 0 },
        { input: buf, top: 22, left: 0 },
      ])
      .jpeg()
      .toBuffer();
  }),
);
if (tiles.length) {
  const cols = phone ? 4 : 2;
  const metas = await Promise.all(tiles.map((t) => sharp(t).metadata()));
  const rowH = [];
  metas.forEach((m, i) => {
    const r = Math.floor(i / cols);
    rowH[r] = Math.max(rowH[r] || 0, m.height);
  });
  const total = rowH.reduce((a, b) => a + b + 6, 0);
  const comps = [];
  let y = 0;
  rowH.forEach((h, r) => {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (i < tiles.length) comps.push({ input: tiles[i], top: y, left: c * (W + 6) });
    }
    y += h + 6;
  });
  await sharp({ create: { width: cols * (W + 6), height: total, channels: 3, background: '#222' } })
    .composite(comps)
    .jpeg({ quality: 84 })
    .toFile(path.resolve('output/look', `${name}.jpg`));
}
