// Measure and photograph the homepage introduction (the light sheet after the work list) at several
// window sizes: its left edge against the sections around it, text width, portrait size, section height.
// Usage: node scripts/audit/intro.mjs [--name=label] [--base=URL]   Writes output/look/intro-<label>/<WxH>.jpg
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const flags = process.argv.slice(2);
const flag = (k, d) => flags.find((f) => f.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const base = flag('base', process.env.AUDIT_BASE ?? 'http://127.0.0.1:4322');
const name = flag('name', 'now');
const outDir = path.resolve('output/look', `intro-${name}`);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  [1280, 680],
  [1440, 900],
  [1920, 1080],
  [1024, 700],
];
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars', '--enable-unsafe-swiftshader'] });
const report = [];
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => {
    const sec = document.getElementById('who-h').closest('section');
    const r = (el) => el && el.getBoundingClientRect();
    const text = r(document.getElementById('who-h'));
    const fig = r(sec.querySelector('figure'));
    const s = r(sec);
    const left = (sel) => Math.round(r(document.querySelector(sel))?.left ?? -1);
    // Range of the text's rendered lines
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('who-h'));
    const lines = new Set([...range.getClientRects()].map((x) => Math.round(x.top))).size;
    return {
      sectionH: Math.round(s.height),
      textLeft: Math.round(text.left),
      textW: Math.round(text.width),
      textRight: Math.round(Math.max(...[...range.getClientRects()].map((x) => x.right))),
      lines,
      fontPx: parseFloat(getComputedStyle(document.getElementById('who-h')).fontSize),
      portrait: { left: Math.round(fig.left), right: Math.round(fig.right), w: Math.round(fig.width), h: Math.round(fig.height), top: Math.round(fig.top - s.top) },
      textTop: Math.round(text.top - s.top),
      edges: { header: left('body > header a'), workTitle: left('main h2'), pathHeading: left('[class*="_heading"]') },
      sectionTop: Math.round(s.top + window.scrollY),
    };
  });
  await page.evaluate((y) => window.scrollTo(0, y), m.sectionTop - 40);
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `${w}x${h}.jpg`), type: 'jpeg', quality: 80 });
  report.push({ size: `${w}x${h}`, ...m });
  await ctx.close();
}
console.log(JSON.stringify(report, null, 1));
await browser.close();
