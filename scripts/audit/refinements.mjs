// Exercise the viewer, selection marker and shared case transition. No emails are sent.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');
const base = process.argv.find((arg) => arg.startsWith('--base='))?.slice(7) || 'http://127.0.0.1:4323';
const out = path.resolve(process.argv.find((arg) => arg.startsWith('--out='))?.slice(6) || 'output/refinement');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const checks = [];
const pass = (text) => { checks.push(text); console.log(`PASS ${text}`); };
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, isMobile: width === 390, hasTouch: width === 390 });
    // The short-lived preview credential stays in memory and only goes to this deployment.
    if (process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) {
      await context.route('**/*', async (route) => {
        if (new URL(route.request().url()).origin !== new URL(base).origin) return route.continue();
        await route.continue({ headers: { ...route.request().headers(), 'x-vercel-trusted-oidc-idp-token': process.env.VERCEL_OIDC_TOKEN } });
      });
    }
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (value) => { window.__copied = value; } } });
      if (document.startViewTransition) {
        const start = document.startViewTransition.bind(document);
        document.startViewTransition = (options) => {
          const transition = start(options);
          transition.ready.then(() => {
            window.__transition = { types: [...transition.types], caseShared: !!document.querySelector('[data-case-hero][data-shared-case]'), names: document.getAnimations().map((a) => a.animationName || '') };
          }).catch((error) => { window.__transitionError = error.message; });
          return transition;
        };
      }
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    const sector = page.getByRole('button', { name: 'Clinics', exact: true });
    await sector.click();
    await page.waitForTimeout(650);
    assert.equal(await sector.getAttribute('aria-pressed'), 'true');
    const markerAligned = await page.locator('[data-work-filter] [aria-hidden="true"]').evaluate((marker) => {
      const selected = marker.parentElement.querySelector('[aria-pressed="true"]');
      const a = marker.getBoundingClientRect(), b = selected.getBoundingClientRect();
      return Math.abs(a.left - b.left) < 1 && Math.abs(a.width - b.width) < 1;
    });
    assert.ok(markerAligned);
    await page.screenshot({ path: path.join(out, `filter-${width}.png`) });
    await page.getByRole('button', { name: 'All cases', exact: true }).click();
    await page.waitForTimeout(650);
    const card = page.locator('[data-case-card]').first();
    await card.locator('[data-case-preview]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    if (width === 1440) {
      const before = await card.boundingBox();
      await card.hover();
      await page.waitForTimeout(400);
      const after = await card.boundingBox();
      assert.ok(Math.abs(before.y - after.y) < 1 && Math.abs(before.width - after.width) < 1);
    }
    // Click the visible media surface through the stretched heading link.
    const media = await card.locator('[data-case-preview]').boundingBox();
    await page.mouse.click(media.x + media.width * .45, Math.min(media.y + media.height * .4, 760));
    await page.waitForURL(`${base}/work/tax-relief-counsel`);
    await page.waitForFunction(() => !document.documentElement.hasAttribute('data-route-changing'));
    const transition = await page.evaluate(() => window.__transition);
    assert.ok(transition?.caseShared, 'Project surface should connect to its case header');
    assert.ok(!await page.evaluate(() => window.__transitionError));
    assert.equal(await page.locator('[data-shared-case]').count(), 0);
    await page.screenshot({ path: path.join(out, `case-arrival-${width}.png`) });
    pass(`${width}: filter selection alignment and shared project arrival`);

    const zoom = page.locator('a[data-zoom]').first();
    await zoom.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible' });
    const mainImage = dialog.getByRole('img');
    await page.waitForFunction(() => document.querySelector('dialog img[data-ready]')?.complete);
    const rail = dialog.getByRole('group', { name: 'Choose a screen' });
    const count = await rail.getByRole('button').count();
    assert.ok(count > 2);
    const initial = await mainImage.getAttribute('src');
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(out, `viewer-${width}.png`) });
    await page.keyboard.press('End');
    await page.waitForFunction((last) => document.querySelector('dialog [aria-current="true"]')?.getAttribute('aria-label')?.startsWith(`Screen ${last}:`), count);
    await page.keyboard.press('Home');
    await page.waitForFunction(() => document.querySelector('dialog [aria-current="true"]')?.getAttribute('aria-label')?.startsWith('Screen 1:'));
    assert.equal(await mainImage.getAttribute('src'), initial);
    if (width === 390) {
      const cdp = await context.newCDPSession(page);
      const box = await mainImage.boundingBox();
      const y = box.y + box.height / 2;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y }] });
      for (let x = 280; x >= 100; x -= 20) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForFunction(() => document.querySelector('dialog [aria-current="true"]')?.getAttribute('aria-label')?.startsWith('Screen 2:'));
      assert.equal(await dialog.locator('[data-expanded]').count(), 0, 'Swiping must not also toggle full size');
      await cdp.detach();
      pass('390: touch swipe changes screens without triggering zoom');
    }
    const third = rail.getByRole('button').nth(2);
    await third.click();
    await page.waitForFunction(() => document.querySelector('dialog [aria-current="true"]')?.getAttribute('aria-label')?.startsWith('Screen 3:'));
    await dialog.getByRole('button', { name: 'Full size', exact: true }).click();
    assert.equal(await dialog.getByRole('button', { name: 'Fit to screen', exact: true }).getAttribute('aria-pressed'), 'true');
    if (width === 390) assert.ok(await dialog.locator('[data-expanded]').evaluate((el) => el.scrollWidth > el.clientWidth), 'Full-size screens should be readable by panning on a phone');
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await zoom.evaluate((el) => document.activeElement === el), true);
    pass(`${width}: gallery index, keyboard navigation, full-size mode and focus return`);

    await zoom.click();
    // Pick a capture not already decoded by the navigation checks above.
    const nextSrc = await page.locator('a[data-zoom]').nth(3).getAttribute('href');
    let release;
    let intercepted = false;
    const hold = new Promise((resolve) => { release = resolve; });
    await context.route(`**${nextSrc}`, async (route) => { intercepted = true; await hold; await route.fallback(); });
    await rail.getByRole('button').nth(3).click();
    await page.waitForTimeout(160);
    assert.ok(intercepted, 'The delayed capture must make an uncached request');
    assert.equal(await mainImage.getAttribute('src'), initial, 'Keep the current screen during a slow image load');
    await page.keyboard.press('Escape');
    release();
    await page.waitForTimeout(350);
    assert.equal(await dialog.isVisible(), false, 'A late image must not reopen the viewer');
    await context.unroute(`**${nextSrc}`);
    pass(`${width}: slow image handoff and cancellation`);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await zoom.click();
    await page.waitForTimeout(350);
    assert.equal(await mainImage.evaluate((el) => el.getAnimations().length), 0);
    await page.keyboard.press('Escape');
    const copy = page.locator('button[data-track="email-copy"]').first();
    await copy.scrollIntoViewIfNeeded();
    const copyWidth = (await copy.boundingBox()).width;
    await copy.click();
    await page.getByRole('button', { name: 'Copied', exact: true }).first().waitFor();
    assert.ok(Math.abs((await copy.boundingBox()).width - copyWidth) < 1);
    assert.equal(await page.evaluate(() => window.__copied), 'kareem.hassanein@gmail.com');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: path.join(out, `copy-${width}.png`) });
    assert.deepEqual(errors, []);
    pass(`${width}: reduced motion, clipboard confirmation and no runtime errors`);
    await context.close();
  }
  fs.writeFileSync(path.join(out, 'checks.json'), JSON.stringify({ checks }, null, 2));
} finally { await browser.close(); }
