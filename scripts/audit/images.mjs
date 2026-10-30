// Image weight audit: does each responsive image download about the size it is shown at?
// Usage: node scripts/audit/images.mjs [/route ...] [--base=URL]
//   Loads each page at three screens (phone 390 at 3x, laptop 1440 at 1x, large 1920 at 2x),
//   walks it so lazy images load, and lists every image whose chosen file is far larger than
//   needed (wasted bytes, usually a `sizes` that claims more width than the layout gives) or
//   much smaller (soft on screen; fine when no larger file exists).
//   Prints the `sizes` from the <source> elements so the fix is obvious.
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const argv = process.argv.slice(2);
const base = argv.find((a) => a.startsWith('--base='))?.slice(7) || process.env.AUDIT_BASE || 'http://localhost:4321';
const fixRoute = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const ALL = ['/', '/work', '/work/tax-relief-counsel', '/work/endorphins', '/work/physiomax', '/work/kinetikare', '/work/techniques-combat', '/work/travel-journal', '/work/wedding', '/firms', '/clinics', '/pricing', '/about', '/book', '/ai', '/notes'];
const routes = argv.filter((a) => !a.startsWith('--')).map(fixRoute);
const list = routes.length ? routes : ALL;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const screens = [
  { name: 'phone 390@3x', width: 390, height: 844, dpr: 3, mobile: true },
  { name: 'laptop 1440@1x', width: 1440, height: 900, dpr: 1, mobile: false },
  { name: 'large 1920@2x', width: 1920, height: 1080, dpr: 2, mobile: false },
];
let problems = 0;
for (const route of list) {
  for (const s of screens) {
    const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: s.dpr, isMobile: s.mobile, hasTouch: s.mobile });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
        scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 90));
      }
    });
    await page.waitForTimeout(900);
    const rows = await page.evaluate((dpr) => {
      const out = [];
      for (const img of document.images) {
        const pic = img.parentElement?.tagName === 'PICTURE' ? img.parentElement : null;
        const srcset = pic ? [...pic.querySelectorAll('source')].map((x) => x.srcset).join(', ') : img.srcset;
        if (!srcset || !img.currentSrc) continue;
        const widths = [...new Set([...srcset.matchAll(/\s(\d+)w/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
        const got = Number((img.currentSrc.match(/-(\d+)\.(avif|webp|jpe?g|png)/) || [])[1] || 0);
        const shown = img.getBoundingClientRect().width;
        if (!got || !shown) continue;
        const need = shown * dpr;
        // The file a perfect `sizes` would pick: the smallest at least as wide as needed.
        const ideal = widths.find((w) => w >= need) ?? widths.at(-1);
        const sizes = pic ? pic.querySelector('source')?.sizes : img.sizes;
        if (got > ideal) out.push({ kind: 'too big', file: img.currentSrc.split('/').slice(-2).join('/'), shown: Math.round(shown), need: Math.round(need), got, ideal, sizes });
        else if (got < need * 0.75 && got < widths.at(-1)) out.push({ kind: 'too small', file: img.currentSrc.split('/').slice(-2).join('/'), shown: Math.round(shown), need: Math.round(need), got, ideal, sizes });
      }
      return out;
    }, s.dpr);
    for (const r of rows) {
      problems++;
      console.log(`${route}  [${s.name}]  ${r.kind}: ${r.file}  shown ${r.shown}px, needs ${r.need}, got ${r.got}, best ${r.ideal}  sizes="${r.sizes}"`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(problems ? `\n${problems} images to fix` : 'Every image downloads about the size it is shown at.');
