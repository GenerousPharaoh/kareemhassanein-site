// Records short walkthrough videos of the featured live sites for the
// portfolio case studies. Rerun whenever a featured site changes:
//
//   node scripts/capture-walkthroughs.mjs        # record all three
//   node scripts/capture-walkthroughs.mjs kinetikare
//
// Raw recordings land in scripts/walkthroughs-raw/; encode them with
// scripts/encode-walkthroughs.sh (ffmpeg required).

import { chromium } from 'playwright';
import { mkdirSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW_DIR = join(ROOT, 'scripts', 'walkthroughs-raw');
const VIEWPORT = { width: 1440, height: 900 };

// User-like wheel scrolling. Real wheel events keep Lenis and other
// smooth-scroll libraries in charge of their own easing, which is the
// motion these clips exist to show.
async function wheel(page, totalDelta, steps = 28, stepDelay = 45) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, totalDelta / steps);
    await page.waitForTimeout(stepDelay);
  }
}

async function clickIfVisible(page, locator, timeout = 2500) {
  try {
    await locator.first().click({ timeout });
    return true;
  } catch {
    return false;
  }
}

const captures = {
  async kinetikare(page) {
    await page.goto('https://www.kinetikarephysio.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    await clickIfVisible(page, page.getByRole('button', { name: 'Accept' }));
    await page.waitForTimeout(1000);
    await wheel(page, 1500);
    await page.waitForTimeout(1000);

    await page.goto('https://www.kinetikarephysio.com/conditions', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    await wheel(page, 480, 16);
    await page.waitForTimeout(500);
    await clickIfVisible(page, page.getByRole('button', { name: 'Shoulder' }));
    await page.waitForTimeout(1500);

    await page.goto('https://www.kinetikarephysio.com/conditions/compare/tennis-elbow-vs-golfers-elbow', { waitUntil: 'load' });
    await page.waitForTimeout(1700);
    await wheel(page, 950);
    await page.waitForTimeout(1600);
  },

  async endorphins(page) {
    await page.goto('https://endorphinshealth.com/', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    await wheel(page, 1400);
    await page.waitForTimeout(900);

    await page.goto('https://endorphinshealth.com/services/', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    await wheel(page, 800, 22);
    await page.waitForTimeout(1100);

    await page.goto('https://endorphinshealth.com/services/physiotherapy/', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    await wheel(page, 650, 20);
    await page.waitForTimeout(900);

    await page.goto('https://endorphinshealth.com/book-appointment/', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
  },

  async wedding(page) {
    await page.goto('https://david-daria-wedding-website.vercel.app/', { waitUntil: 'load' });
    // Let the arch morph and name settle play out in full.
    await page.waitForTimeout(5200);
    await wheel(page, 850, 24);
    await page.waitForTimeout(800);

    // Nav clicks ride Lenis for the long smooth transitions.
    await clickIfVisible(page, page.getByRole('link', { name: /the day/i }));
    await page.waitForTimeout(2600);
    await clickIfVisible(page, page.getByRole('link', { name: /travel/i }));
    await page.waitForTimeout(2400);
    await wheel(page, 550, 18);
    await page.waitForTimeout(900);
    await clickIfVisible(page, page.getByRole('link', { name: /machu picchu/i }));
    await page.waitForTimeout(2600);
    await page.waitForTimeout(900);
  },
};

const wanted = process.argv.slice(2);
const targets = wanted.length ? wanted : Object.keys(captures);

mkdirSync(RAW_DIR, { recursive: true });

const browser = await chromium.launch();
for (const name of targets) {
  if (!captures[name]) {
    console.error(`Unknown target: ${name} (known: ${Object.keys(captures).join(', ')})`);
    continue;
  }
  console.log(`Recording ${name}...`);
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: RAW_DIR, size: VIEWPORT },
  });
  const page = await context.newPage();
  try {
    await captures[name](page);
  } catch (err) {
    console.error(`  capture error on ${name}: ${err.message}`);
  }
  const video = page.video();
  await context.close();
  if (video) {
    const path = await video.path();
    const dest = join(RAW_DIR, `${name}.webm`);
    renameSync(path, dest);
    console.log(`  saved ${dest}`);
  }
}
await browser.close();
console.log('Done. Now run: bash scripts/encode-walkthroughs.sh');
