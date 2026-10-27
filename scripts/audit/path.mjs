// Walk the homepage's "From search to booked" section: each stop at rest, one mid-wipe, a station click,
// and on a phone each swiped card. Usage: node scripts/audit/path.mjs [--phone] [--reduce] [--base=URL]
//        [--size=1440x900] for another desktop window. Writes frames to output/look/path-<laptop|phone|WxH>/.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const flags = process.argv.slice(2);
const phone = flags.includes('--phone');
const base = flags.find((f) => f.startsWith('--base='))?.slice(7) ?? process.env.AUDIT_BASE ?? 'http://127.0.0.1:4322';
const size = flags.find((f) => f.startsWith('--size='))?.slice(7);
const [sw, sh] = size ? size.split('x').map(Number) : [1280, 680];
const reduce = flags.includes('--reduce');
const outDir = path.resolve('output/look', `path-${phone ? 'phone' : size ?? 'laptop'}${reduce ? '-reduce' : ''}`);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({
  viewport: phone ? { width: 390, height: 844 } : { width: sw, height: sh },
  deviceScaleFactor: phone ? 2 : 1.5,
  isMobile: phone,
  hasTouch: phone,
  reducedMotion: reduce ? 'reduce' : 'no-preference',
});
const page = await ctx.newPage();
const logs = [];
page.on('pageerror', (e) => logs.push('pageerror ' + String(e).slice(0, 300)));
page.on('console', (m) => m.type() === 'error' && logs.push(m.text().slice(0, 300)));
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const box = () =>
  page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((x) => x.textContent?.startsWith('From search'));
    const sec = h.closest('section');
    const r = sec.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height, pinned: sec.hasAttribute('data-pin'), vh: window.innerHeight };
  });
const shot = (name) => page.screenshot({ path: path.join(outDir, name + '.jpg'), type: 'jpeg', quality: 82 });
const report = { phone, steps: [] };

if (!phone) {
  const b = await box();
  report.box = b;
  const range = b.height - b.vh;
  // Approach: the section arriving
  await page.evaluate((y) => window.scrollTo(0, y), b.top - b.vh * 0.5);
  await page.waitForTimeout(1600);
  await shot('00-arriving');
  for (let i = 0; i < 6; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), b.top + ((i + 0.5) / 6) * range);
    await page.waitForTimeout(1800);
    const state = await page.evaluate(() => {
      const cur = document.querySelector('[data-step][aria-current="step"] h3')?.textContent;
      const shown = [...document.querySelectorAll('[data-stage]')].filter((x) => getComputedStyle(x).visibility === 'visible').length;
      const header = document.querySelector('body > header')?.getBoundingClientRect().bottom;
      return { cur, shown, header };
    });
    report.steps.push(state);
    await shot(`0${i + 1}-step`);
  }
  // Mid-wipe: from Booked into Counted
  await page.evaluate((y) => window.scrollTo(0, y), b.top + (2.5 / 6) * range);
  await page.waitForTimeout(1600);
  await page.evaluate((y) => window.scrollTo(0, y), b.top + (3.2 / 6) * range);
  await page.waitForTimeout(380);
  await shot('07-mid-wipe');
  // Station click: back to Found
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Found' }).click();
  await page.waitForTimeout(2600);
  report.afterClick = await page.evaluate(() => document.querySelector('[data-step][aria-current="step"] h3')?.textContent);
  await shot('08-after-click-found');
  // Leaving: the section ends and the page moves on
  await page.evaluate((y) => window.scrollTo(0, y), b.top + b.height - b.vh * 0.4);
  await page.waitForTimeout(1500);
  await shot('09-leaving');
} else {
  const b = await box();
  report.box = b;
  await page.evaluate((y) => window.scrollTo(0, y), b.top - 20);
  await page.waitForTimeout(1200);
  await shot('00-top');
  await page.evaluate((y) => window.scrollTo(0, y), b.top + 380);
  await page.waitForTimeout(800);
  await shot('01-cards');
  for (let i = 1; i < 6; i++) {
    await page.evaluate((i) => {
      const list = document.querySelector('[data-step]').parentElement;
      const cards = [...list.children];
      list.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'auto' });
    }, i);
    await page.waitForTimeout(700);
    report.steps.push(await page.evaluate(() => document.querySelector('[data-step][aria-current="step"] h3')?.textContent));
    await shot(`0${i + 1}-card`);
  }
  report.overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}
report.logs = logs;
console.log(JSON.stringify(report, null, 1));
await browser.close();
