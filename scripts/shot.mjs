// Screenshot a page of the running dev server for review, at desktop and phone width.
// Usage: node scripts/shot.mjs /pricing [--phone|--desktop] [--full] [--y=1200]
// Writes JPEGs to output/shots/ and prints console errors and horizontal overflow.
// Uses the separate headless Chrome from the capture tools; never opens a visible browser.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

// Git Bash rewrites a leading "/" into its install path; undo that, and accept routes without the slash.
const rawRoute = (process.argv[2] || '/').replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
const route = rawRoute.startsWith('/') ? rawRoute : '/' + rawRoute;
const args = process.argv.slice(3);
const only = args.includes('--phone') ? ['phone'] : args.includes('--desktop') ? ['desktop'] : ['desktop', 'phone'];
const full = args.includes('--full');
const motion = args.includes('--motion');
const waitArg = args.find((a) => a.startsWith('--wait='));
const yArg = args.find((a) => a.startsWith('--y='));
const base = process.env.SHOT_BASE || 'http://localhost:4321';
const out = path.resolve('output/shots');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars'] });
for (const device of only) {
  const phone = device === 'phone';
  const ctx = await browser.newContext({
    viewport: phone ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    deviceScaleFactor: phone ? 2 : 1,
    isMobile: phone,
    hasTouch: phone,
    reducedMotion: motion ? 'no-preference' : 'reduce',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  if (full) {
    // Walk the page so lazy media loads, then return to the top
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
  }
  if (yArg) await page.evaluate((y) => scrollTo(0, y), Number(yArg.slice(4)));
  await page.waitForTimeout(waitArg ? Number(waitArg.slice(7)) : 400);
  const name = `${route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}-${device}${yArg ? '-' + yArg.slice(4) : ''}${full ? '-full' : ''}${waitArg ? '-w' + waitArg.slice(7) : ''}.jpg`;
  const file = path.join(out, name);
  await page.screenshot({ path: file, type: 'jpeg', quality: 78, fullPage: full });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(`${file}  overflowX=${overflow}  errors=${errors.length}`);
  errors.slice(0, 5).forEach((e) => console.log('  error:', e.slice(0, 200)));
  await ctx.close();
}
await browser.close();
