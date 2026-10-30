// Functional regression audit against a local production preview. No emails are sent.
// Usage: node scripts/audit/usability.mjs [--base=http://127.0.0.1:4322]
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');
const base = process.argv.find((arg) => arg.startsWith('--base='))?.slice(7) || 'http://127.0.0.1:4322';
const out = path.resolve('output/usability');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const checks = [];
const record = (name) => { checks.push(name); console.log(`PASS ${name}`); };
const settle = (page) => page.waitForFunction(() => !document.documentElement.hasAttribute('data-route-changing'));

try {
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 720 }, isMobile: width === 390, hasTouch: width === 390 });
    // Catch accidental submissions anywhere in this audit, before reaching the server.
    let reply = { status: 503, body: { error: 'Local audit response' } };
    const requests = [];
    await context.route('**/api/contact', (route) => {
      requests.push(route.request().postDataJSON());
      return route.fulfill({ status: reply.status, contentType: 'application/json', body: JSON.stringify(reply.body) });
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${base}/notes`, { waitUntil: 'networkidle' });
    const note = page.locator('main a[href^="/notes/"]').first();
    const href = await note.getAttribute('href');
    await note.click();
    await page.waitForURL(`${base}${href}`);
    await settle(page);
    if (width === 390) await page.locator('summary').filter({ hasText: 'In this note' }).click();
    const contents = page.getByRole('navigation', { name: 'In this note' });
    const last = contents.locator('a').last();
    await last.click();
    await page.waitForFunction(() => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      const top = target?.getBoundingClientRect().top;
      return top !== undefined && top >= 64 && top < innerHeight * .4;
    });
    if (width === 1280) await page.waitForFunction(() => document.querySelector('nav[aria-label="In this note"] a[aria-current="location"]')?.getAttribute('href') === location.hash);
    record(`${width}: Notes navigation and section anchors`);
    await page.getByRole('link', { name: 'Notes', exact: true }).first().click();
    await page.waitForURL(`${base}/notes`);
    await settle(page);
    await page.goBack();
    await page.waitForURL((url) => url.pathname === href);
    await settle(page);
    await page.goForward();
    await page.waitForURL(`${base}/notes`);
    await settle(page);
    record(`${width}: browser back and forward`);

    if (width === 390) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      assert.equal(await page.locator('main').evaluate((el) => el.inert), true);
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open menu');
      await page.waitForTimeout(450);
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.locator('#site-menu').getByRole('link', { name: 'Notes', exact: true }).click();
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open menu');
      await page.waitForFunction(() => document.querySelector('#site-menu').hidden);
      assert.equal(await page.locator('main').evaluate((el) => el.inert), false);
      record('390: menu Escape, same-page focus and scroll unlock');
    }

    await page.goto(`${base}/book`, { waitUntil: 'networkidle' });
    const form = page.getByRole('region', { name: 'Send a request' });
    await form.getByRole('button', { name: 'Send request', exact: true }).click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'name');
    assert.equal(requests.length, 0);
    await form.getByRole('textbox', { name: 'Name', exact: true }).fill('Local Audit');
    await form.getByRole('textbox', { name: 'Email', exact: true }).fill('audit@example.invalid');
    await form.getByRole('radio', { name: /Website check/ }).check();
    await form.getByRole('button', { name: 'Request the check', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[aria-label="Send a request"] [role="status"]')?.textContent?.includes('not sent'));
    assert.equal(await form.getByRole('textbox', { name: 'Name', exact: true }).inputValue(), 'Local Audit');
    reply = { status: 200, body: { success: true } };
    await form.getByRole('button', { name: 'Request the check', exact: true }).click();
    await page.waitForFunction(() => document.activeElement?.textContent?.startsWith('Thanks.'));
    assert.ok(requests.at(-1).message.startsWith('Topic: Website check ($1,500)'));
    record(`${width}: form validation, failure recovery and success focus (mocked delivery)`);

    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Law firms', exact: true }).click();
    await page.waitForTimeout(700);
    const visibleSectors = await page.locator('[data-sectors]:visible').evaluateAll((els) => els.map((el) => el.getAttribute('data-sectors')));
    assert.ok(visibleSectors.length && visibleSectors.every((value) => value.split(' ').includes('firms')));
    record(`${width}: work filtering`);

    await page.goto(`${base}/work/tax-relief-counsel`, { waitUntil: 'networkidle' });
    const zoom = page.locator('a[data-zoom]').first();
    await zoom.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible' });
    const firstImage = await dialog.getByRole('img').getAttribute('src');
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction((src) => document.querySelector('dialog img[alt]:not([alt=""])')?.getAttribute('src') !== src, firstImage);
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await zoom.evaluate((el) => el === document.activeElement), true);
    record(`${width}: gallery open, next image, Escape and focus restoration`);

    await page.goto(`${base}/firms`, { waitUntil: 'networkidle' });
    const video = page.locator('video').first();
    await video.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('video').paused);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('video').paused);
    record(`${width}: automatic video pauses when reduced motion is enabled`);

    // Preference changes across navigation must not leave sections permanently hidden.
    await page.locator('body > footer').getByRole('link', { name: 'How I use AI', exact: true }).click();
    await page.waitForURL(`${base}/ai`);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('[aria-labelledby="split-title"]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('[aria-labelledby="split-title"] li')].every(el => getComputedStyle(el).opacity === '1'));
    record(`${width}: reduced-motion changes across page navigation`);

    await page.goto(`${base}/privacy`, { waitUntil: 'networkidle' });
    const title = await page.locator('h1').evaluate((el) => ({ height: el.getBoundingClientRect().height, line: parseFloat(getComputedStyle(el).lineHeight) }));
    assert.ok(title.height < title.line * 1.3, 'Privacy should remain one word on one line');
    assert.deepEqual(errors, []);
    record(`${width}: short heading wrapping and no runtime errors`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${base}/book`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('form').isVisible(), false);
  assert.equal(await page.locator('form button[type="submit"]').evaluate((el) => el.matches(':disabled')), true);
  assert.equal(await page.locator('noscript a[href^="mailto:"]').isVisible(), true);
  await page.screenshot({ path: path.join(out, 'booking-no-javascript.png'), fullPage: true });
  await page.goto(`${base}/notes/google-ads-leads-button-clicks`, { waitUntil: 'networkidle' });
  await page.locator('summary').filter({ hasText: 'In this note' }).click();
  await page.getByRole('navigation', { name: 'In this note' }).locator('a').last().click();
  assert.ok(new URL(page.url()).hash);
  record('390: no-JavaScript booking fallback and native note contents');
  await context.close();

  const fontContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const fontPage = await fontContext.newPage();
  let releaseFont;
  const fontHeld = new Promise((resolve) => { releaseFont = resolve; });
  await fontPage.route('**/*.woff2', async (route) => { await fontHeld; await route.continue(); });
  await fontPage.goto(`${base}/work/tax-relief-counsel`, { waitUntil: 'domcontentloaded' });
  await fontPage.waitForFunction(() => getComputedStyle(document.querySelector('h1')).paddingTop === '12px');
  const titleHeight = () => fontPage.locator('h1').evaluate((el) => el.getBoundingClientRect().height);
  const fallbackHeight = await titleHeight();
  releaseFont();
  await fontPage.evaluate(() => document.fonts.ready);
  assert.ok(Math.abs(await titleHeight() - fallbackHeight) < 1, 'The font swap must not add or remove a title line');
  record('390: case-title layout remains stable while fonts load');
  await fontContext.close();
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ checks }, null, 2));
} finally {
  await browser.close();
}
