// Runtime audit of every control on a page, at phone and desktop size.
// Usage: node scripts/audit/controls.mjs [/route ...] [--phone|--desktop] [--json=out.json]
//   Checks: touch target size, accessible names, controls covered by other controls, keyboard
//   order (every Tab stop must be visible, on screen, and look different when focused), hidden
//   controls that still take focus, sideways overflow at 360px, broken internal links and
//   #anchors, broken images, console errors and hydration warnings.
//   Runs against the dev server (AUDIT_BASE to change). The inventory runs with motion allowed, so
//   controls that exist only with motion (pause buttons) are counted; the keyboard walk runs with
//   reduced motion in its own page so nothing moves between the focused and unfocused pictures.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const base = process.env.AUDIT_BASE || 'http://localhost:4321';
const fixRoute = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const ALL = [
  '/', '/work', '/work/tax-relief-counsel', '/work/endorphins', '/work/physiomax', '/work/kinetikare', '/work/techniques-combat',
  '/work/travel-journal', '/work/wedding', '/firms', '/clinics', '/pricing', '/about', '/book', '/ai', '/privacy', '/notes', '/missing-page',
];
const routes = argv.filter((a) => !a.startsWith('--')).map(fixRoute);
const list = routes.length ? routes : ALL;
const devices = flags.includes('--phone') ? ['phone'] : flags.includes('--desktop') ? ['desktop'] : ['phone', 'desktop'];
const jsonOut = flags.find((f) => f.startsWith('--json='))?.slice(7);

// Installed in every page: the box a control really occupies, including an absolutely
// positioned ::before or ::after that enlarges it (a stretched card link, a padded touch area).
const helpers = () => {
  window.__box = (el) => {
    const r = el.getBoundingClientRect();
    let box = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    // A label activates its input, so it is part of the input's target.
    for (const lab of el.labels || []) {
      const lr = lab.getBoundingClientRect();
      if (lr.width && lr.height) box = { left: Math.min(box.left, lr.left), top: Math.min(box.top, lr.top), right: Math.max(box.right, lr.right), bottom: Math.max(box.bottom, lr.bottom) };
    }
    for (const pseudo of ['::after', '::before']) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content === 'none' || ps.position !== 'absolute' || ps.pointerEvents === 'none') continue;
      let cb = el;
      if (getComputedStyle(el).position === 'static') {
        cb = el.parentElement;
        while (cb && cb !== document.body && getComputedStyle(cb).position === 'static' && getComputedStyle(cb).transform === 'none') cb = cb.parentElement;
      }
      const cr = (cb || document.body).getBoundingClientRect();
      const px = (v) => (v === 'auto' ? null : parseFloat(v));
      const [t, rt, b, l] = ['top', 'right', 'bottom', 'left'].map((k) => px(ps[k]));
      const w = parseFloat(ps.width) || 0;
      const h = parseFloat(ps.height) || 0;
      const left = l !== null ? cr.left + l : rt !== null ? cr.right - rt - w : cr.left;
      const right = rt !== null && l !== null ? cr.right - rt : left + w;
      const top = t !== null ? cr.top + t : b !== null ? cr.bottom - b - h : cr.top;
      const bottom = b !== null && t !== null ? cr.bottom - b : top + h;
      box = { left: Math.min(box.left, left), top: Math.min(box.top, top), right: Math.max(box.right, right), bottom: Math.max(box.bottom, bottom) };
    }
    return box;
  };
};

// Bounding box of the pixels that differ between two screenshots, or null if none do.
async function diffBox(a, b) {
  const [ra, rb] = await Promise.all([sharp(a).raw().toBuffer({ resolveWithObject: true }), sharp(b).raw().toBuffer()]);
  const { data, info } = ra;
  const ch = info.channels;
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let i = 0; i < data.length; i += ch) {
    if (data[i] !== rb[i] || data[i + 1] !== rb[i + 1] || data[i + 2] !== rb[i + 2]) {
      const p = i / ch;
      const x = p % info.width;
      const y = (p / info.width) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return maxX < 0 ? null : { left: minX, top: minY, right: maxX, bottom: maxY };
}

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars'] });
const report = [];
const linkStatus = new Map();

async function checkLink(href) {
  if (linkStatus.has(href)) return linkStatus.get(href);
  let status = 0;
  try {
    status = (await fetch(base + href, { redirect: 'follow' })).status;
  } catch {
    status = -1;
  }
  linkStatus.set(href, status);
  return status;
}

for (const route of list) {
  for (const device of devices) {
    const phone = device === 'phone';
    const ctx = await browser.newContext({
      viewport: phone ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      isMobile: phone,
      hasTouch: phone,
      reducedMotion: 'no-preference',
    });
    await ctx.addInitScript(helpers);
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => (m.type() === 'error' || /hydrat/i.test(m.text())) && errors.push(m.text().slice(0, 240)));
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 240)));
    const res = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const found = [];
    const push = (kind, detail) => found.push({ kind, detail });
    if (route !== '/missing-page' && (!res || res.status() >= 400)) push('page', `HTTP ${res?.status()}`);

    // Walk the page so lazy media load, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.9) {
        scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 60));
      }
      scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(300);

    // Inventory of every visible control.
    const controls = await page.evaluate(() => {
      const sel = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="tab"], [role="link"], [role="switch"], [tabindex]:not([tabindex="-1"])';
      const out = [];
      const describe = (el) => {
        const tag = el.tagName.toLowerCase();
        const cls = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean)[0]?.replace(/__.*$/, '') || '';
        const text = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 50);
        return `${tag}${cls ? '.' + cls : ''} "${text}"`;
      };
      const hidden = (el) => {
        for (let p = el; p; p = p.parentElement) {
          if (p.hasAttribute('inert') || p.getAttribute('aria-hidden') === 'true') return true;
          const cs = getComputedStyle(p);
          if (cs.display === 'none' || cs.visibility === 'hidden') return true;
        }
        return false;
      };
      const name = (el) => {
        const by = el.getAttribute('aria-labelledby');
        if (by) return by.split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
        if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
        if (el.id) {
          const lab = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
          if (lab) return lab.textContent.trim();
        }
        const wrap = el.closest('label');
        if (wrap) return wrap.textContent.trim();
        const img = el.querySelector('img[alt]');
        return ((el.textContent || '').trim() || img?.getAttribute('alt') || el.getAttribute('title') || el.getAttribute('placeholder') || '').trim();
      };
      document.querySelectorAll(sel).forEach((el, index) => {
        if (hidden(el)) return;
        const b = window.__box(el);
        if (b.right - b.left === 0 && b.bottom - b.top === 0) return;
        const cs = getComputedStyle(el);
        // Inline links inside running text are exempt from target size (WCAG 2.5.8 exception).
        const inline = el.tagName === 'A' && cs.display === 'inline' && Boolean(el.closest('p, li, dd, figcaption, blockquote'));
        el.setAttribute('data-audit-i', String(index));
        out.push({
          i: index,
          desc: describe(el),
          href: el.getAttribute('href'),
          name: name(el),
          w: Math.round(b.right - b.left),
          h: Math.round(b.bottom - b.top),
          x: Math.round(b.left + scrollX),
          y: Math.round(b.top + scrollY),
          inline,
          cursor: cs.cursor,
          disabled: el.disabled === true || el.getAttribute('aria-disabled') === 'true',
        });
      });
      return out;
    });

    const min = phone ? 44 : 24;
    for (const c of controls) {
      if (!c.name) push('name', `${c.desc} has no accessible name`);
      if (!c.inline && (c.w < min || c.h < min)) push('size', `${c.desc} is ${c.w}×${c.h} (minimum ${min}×${min})`);
      if (!phone && !c.disabled && c.cursor !== 'pointer' && /^(a|button|summary)\b/.test(c.desc)) push('cursor', `${c.desc} cursor is ${c.cursor}`);
    }

    // Covered controls: where two controls overlap, the smaller one must be on top at its centre.
    const covered = await page.evaluate(async (items) => {
      const out = [];
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 4 || oy <= 4 || (a.href && a.href === b.href)) continue;
          const small = a.w * a.h <= b.w * b.h ? a : b;
          const big = small === a ? b : a;
          const el = document.querySelector(`[data-audit-i="${small.i}"]`);
          el.scrollIntoView({ block: 'center', behavior: 'instant' });
          await new Promise((r) => requestAnimationFrame(r));
          const r = el.getBoundingClientRect();
          const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          if (!hit || !(el === hit || el.contains(hit))) out.push(`${small.desc} is covered by ${hit ? hit.tagName.toLowerCase() + '.' + ((hit.getAttribute('class') || '').split(' ')[0] || '') : 'nothing'} (overlaps ${big.desc})`);
        }
      }
      scrollTo({ top: 0, behavior: 'instant' });
      return out;
    }, controls);
    covered.forEach((c) => push('covered', c));

    // Internal links and anchors.
    const hrefs = [...new Set(controls.map((c) => c.href).filter((h) => h && (h.startsWith('/') || h.startsWith('#'))))];
    for (const h of hrefs) {
      const [p, id] = h.split('#');
      if (id !== undefined && (!p || p === route)) {
        const exists = await page.evaluate((x) => Boolean(document.getElementById(decodeURIComponent(x))), id);
        if (id && !exists) push('anchor', `${h} has no target on the page`);
        continue;
      }
      const s = await checkLink((p || '/').split('?')[0]);
      if (s !== 200) push('link', `${h} returns ${s}`);
    }

    // Images: alt text present, nothing broken.
    const imgs = await page.evaluate(async () => {
      for (const i of document.images) {
        if (i.complete) continue;
        i.scrollIntoView({ block: 'center', behavior: 'instant' });
        await Promise.race([new Promise((r) => i.addEventListener('load', r, { once: true }) || i.addEventListener('error', r, { once: true })), new Promise((r) => setTimeout(r, 6000))]);
      }
      scrollTo({ top: 0, behavior: 'instant' });
      return [...document.images].map((i) => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0, alt: i.getAttribute('alt') }));
    });
    for (const i of imgs) {
      if (i.alt === null) push('alt', `image without alt: ${i.src.slice(-60)}`);
      if (!i.ok) push('image', `image not loaded: ${i.src.slice(-60)}`);
    }

    // Keyboard walk on desktop: Tab through the page. Every stop must be visible, on screen, and
    // look different focused than unfocused (pixels of the area around its real box, so an
    // outline, a ring on a card or an underline all count).
    if (!phone) {
      const kctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      await kctx.addInitScript(helpers);
      const kpage = await kctx.newPage();
      await kpage.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
      await kpage.evaluate(() => document.fonts.ready);
      await kpage.evaluate(() => {
        document.querySelectorAll('nextjs-portal').forEach((n) => n.remove());
        scrollTo(0, 0);
        document.activeElement?.blur();
      });
      await kpage.mouse.click(2, 2);
      const seen = new Set();
      for (let i = 0; i < 220; i++) {
        await kpage.keyboard.press('Tab');
        await kpage.waitForTimeout(120);
        const f = await kpage.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          if (el.tagName === 'NEXTJS-PORTAL' || el.closest('nextjs-portal')) return { dev: true };
          const r = el.getBoundingClientRect();
          const b = window.__box(el);
          const cs = getComputedStyle(el);
          const visible = r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.05;
          const onScreen = r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
          const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
          const key = el.tagName + '|' + text + '|' + Math.round(r.top + scrollY) + '|' + Math.round(r.left);
          return { key, desc: `${el.tagName.toLowerCase()} "${text}"`, visible, onScreen, box: { left: b.left, top: b.top, right: b.right, bottom: b.bottom } };
        });
        if (!f) break;
        if (f.dev) continue;
        if (seen.has(f.key)) break;
        seen.add(f.key);
        if (!f.visible) {
          push('focus', `${f.desc} takes focus while invisible`);
          continue;
        }
        if (!f.onScreen) {
          push('focus', `${f.desc} takes focus off screen`);
          continue;
        }
        const focused = await kpage.screenshot();
        await kpage.evaluate(() => {
          window.__fe = document.activeElement;
          document.activeElement.blur();
        });
        await kpage.waitForTimeout(120);
        const plain = await kpage.screenshot();
        await kpage.evaluate(() => window.__fe?.focus());
        await kpage.waitForTimeout(40);
        const changed = await diffBox(focused, plain);
        if (!changed) push('focus', `${f.desc} shows no visible focus indicator`);
        else {
          const m = 48;
          const near = changed.right >= f.box.left - m && changed.left <= f.box.right + m && changed.bottom >= f.box.top - m && changed.top <= f.box.bottom + m;
          if (!near) push('focus', `${f.desc} shows its focus change away from the control (changed area ${changed.left},${changed.top} to ${changed.right},${changed.bottom})`);
        }
      }
      push('info', `${seen.size} Tab stops`);
      await kctx.close();
    }

    // Sideways overflow at 360px, the narrowest common phone.
    if (phone) {
      await page.setViewportSize({ width: 360, height: 780 });
      await page.waitForTimeout(250);
      const over = await page.evaluate(() => {
        const out = [];
        const W = document.documentElement.clientWidth;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.right <= W + 1 || r.width === 0) continue;
          let clipped = false;
          for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            const o = getComputedStyle(p).overflowX;
            if (o !== 'visible') {
              clipped = true;
              break;
            }
          }
          if (!clipped) out.push(`${el.tagName.toLowerCase()}.${(el.getAttribute('class') || '').split(' ')[0]} reaches ${Math.round(r.right)}px`);
        }
        return { scroll: document.documentElement.scrollWidth - W, out: out.slice(0, 6) };
      });
      if (over.scroll > 0) push('overflow', `page scrolls sideways by ${over.scroll}px at 360px`);
      over.out.forEach((o) => push('overflow', `${o} at 360px`));
    }

    errors.forEach((e) => push('console', e));
    report.push({ route, device, controls: controls.length, found });
    await ctx.close();
  }
}
await browser.close();

for (const r of report) {
  const real = r.found.filter((f) => f.kind !== 'info');
  const info = r.found.filter((f) => f.kind === 'info').map((f) => f.detail);
  console.log(`\n${r.route} [${r.device}] ${r.controls} controls${info.length ? ', ' + info.join(', ') : ''}${real.length ? '' : '  OK'}`);
  for (const f of real) console.log(`  ${f.kind.padEnd(8)} ${f.detail}`);
}
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
