// Motion audit: plays a page the way a visitor would and measures whether it stays smooth.
// Usage: node scripts/audit/motion.mjs [/route ...] [--phone|--desktop] [--cpu=4] [--base=URL]
//   Scrolls the whole page with the wheel (or touch-like steps on phone), hovers every card and
//   button on desktop, presses every in-page control (never links, never form submits), opens
//   and closes the menu on phone, then reports:
//     - dropped frames (frame gaps over 25 ms) while scrolling and while interacting
//     - long animation frames (over 50 ms) with the script that caused them
//     - layout shift that was not caused by input
//     - every animation Chrome could not run on the compositor, with the reason
//   Use the production server for real numbers (npm run build && npm run start, port 4322):
//   node scripts/audit/motion.mjs --base=http://localhost:4322 --cpu=4
import { createRequire } from 'node:module';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const { chromium } = require('playwright-core');

const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const base = flags.find((f) => f.startsWith('--base='))?.slice(7) || process.env.AUDIT_BASE || 'http://localhost:4321';
const cpu = Number(flags.find((f) => f.startsWith('--cpu='))?.slice(6) || 1);
const fixRoute = (r) => {
  const s = r.replace(/^[A-Za-z]:[\\/].*?Git[\\/]?/, '/');
  return s.startsWith('/') ? s : '/' + s;
};
const ALL = ['/', '/work', '/work/tax-relief-counsel', '/work/endorphins', '/firms', '/clinics', '/pricing', '/about', '/book', '/ai', '/notes'];
const routes = argv.filter((a) => !a.startsWith('--')).map(fixRoute);
const list = routes.length ? routes : ALL;
const devices = flags.includes('--phone') ? ['phone'] : flags.includes('--desktop') ? ['desktop'] : ['phone', 'desktop'];

const recorder = () => {
  const st = (window.__motion = { phase: 'load', frames: {}, loaf: [], shifts: [] });
  let last = performance.now();
  const tick = (t) => {
    const d = t - last;
    last = t;
    const f = (st.frames[st.phase] ||= { n: 0, dropped: 0, worst: 0 });
    f.n++;
    if (d > 25) f.dropped += Math.round(d / 16.7) - 1;
    if (d > f.worst) f.worst = d;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const s = [...(e.scripts || [])].sort((a, b) => b.duration - a.duration)[0];
        st.loaf.push({
          phase: st.phase,
          ms: Math.round(e.duration),
          blocking: Math.round(e.blockingDuration || 0),
          script: s ? `${s.invoker || ''} ${(s.sourceURL || '').split('/').slice(-2).join('/')}:${s.sourceFunctionName || ''} ${Math.round(s.duration)}ms` : 'rendering',
        });
      }
    }).observe({ type: 'long-animation-frame', buffered: true });
  } catch {}
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput || e.value < 0.001) continue;
      const src = (e.sources || []).map((s) => s.node && (s.node.className?.baseVal ?? s.node.className ?? s.node.nodeName)).filter(Boolean).join(', ');
      st.shifts.push({ phase: st.phase, value: Number(e.value.toFixed(4)), src: String(src).slice(0, 120) });
    }
  }).observe({ type: 'layout-shift', buffered: true });
};

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--hide-scrollbars'] });

for (const route of list) {
  for (const device of devices) {
    const phone = device === 'phone';
    const ctx = await browser.newContext({
      viewport: phone ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: phone ? 2 : 1,
      isMobile: phone,
      hasTouch: phone,
      reducedMotion: 'no-preference',
    });
    await ctx.addInitScript(recorder);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
    if (cpu > 1) {
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
    }
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((n) => n.remove()));
    await page.waitForTimeout(1200);

    await browser.startTracing(page, {
      categories: ['devtools.timeline', 'blink.animations', 'disabled-by-default-devtools.timeline'],
    });

    // 1. Scroll the whole page at a brisk reading pace, with pauses.
    await page.evaluate(() => (window.__motion.phase = 'scroll'));
    const height = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    if (phone) {
      for (let y = 0; y < height; y += 24) {
        await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y);
        await page.waitForTimeout(16);
      }
    } else {
      await page.mouse.move(720, 450);
      for (let y = 0; y < height; y += 40) {
        await page.mouse.wheel(0, 40);
        await page.waitForTimeout(16);
      }
    }
    await page.waitForTimeout(600);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(400);

    // 2. Hover every card and button on desktop.
    if (!phone) {
      await page.evaluate(() => (window.__motion.phase = 'hover'));
      const targets = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('a[href], button, [role="tab"], summary, article')) {
          const r = el.getBoundingClientRect();
          if (r.width < 8 || r.height < 8 || getComputedStyle(el).visibility === 'hidden') continue;
          out.push({ x: r.left + r.width / 2, y: r.top + scrollY + r.height / 2 });
        }
        return out.slice(0, 120);
      });
      for (const t of targets) {
        await page.evaluate((y) => scrollTo({ top: Math.max(0, y - innerHeight / 2), behavior: 'instant' }), t.y);
        const sy = await page.evaluate(() => scrollY);
        await page.mouse.move(t.x, t.y - sy, { steps: 4 });
        await page.waitForTimeout(260);
      }
      await page.mouse.move(2, 2);
    }

    // 3. Press every in-page control: buttons that are not form submits, tabs, disclosures.
    await page.evaluate(() => {
      window.__motion.phase = 'interact';
      scrollTo({ top: 0, behavior: 'instant' });
    });
    const presses = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('button, [role="tab"], summary, input[type="range"]').forEach((el, i) => {
        if (el.closest('form') || el.type === 'submit' || el.closest('header') || el.closest('nextjs-portal')) return;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        el.setAttribute('data-motion-i', String(i));
        out.push({ i, range: el.matches('input[type="range"]'), label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40) });
      });
      return out;
    });
    for (const p of presses) {
      const loc = page.locator(`[data-motion-i="${p.i}"]`);
      try {
        await loc.scrollIntoViewIfNeeded({ timeout: 2000 });
        if (p.range) {
          const box = await loc.boundingBox();
          if (box) {
            await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
            await page.mouse.down();
            for (let k = 0; k <= 20; k++) {
              await page.mouse.move(box.x + box.width * (0.5 - 0.4 * Math.sin((k / 20) * Math.PI)), box.y + box.height / 2);
              await page.waitForTimeout(16);
            }
            await page.mouse.up();
          }
        } else if (phone) await loc.tap({ timeout: 2000 });
        else await loc.click({ timeout: 2000 });
        await page.waitForTimeout(450);
      } catch {}
    }

    // 4. Phone menu: open, wait, close.
    if (phone) {
      await page.evaluate(() => {
        window.__motion.phase = 'menu';
        scrollTo({ top: 0, behavior: 'instant' });
      });
      const menu = page.locator('header button[aria-expanded]').first();
      if (await menu.count()) {
        await menu.tap();
        await page.waitForTimeout(700);
        await menu.tap().catch(() => page.keyboard.press('Escape'));
        await page.waitForTimeout(700);
      }
    }

    const trace = JSON.parse((await browser.stopTracing()).toString());
    const m = await page.evaluate(() => window.__motion);

    // Animations Chrome could not hand to the compositor.
    // Trace ids are reused once an animation ends, so pair events in time order.
    const events = (trace.traceEvents || trace).filter((e) => e.name === 'Animation').sort((a, b) => a.ts - b.ts);
    const current = new Map();
    const records = [];
    for (const e of events) {
      const id = e.id2?.local || e.id;
      if (e.ph === 'b') {
        const rec = { name: e.args?.data?.displayName || e.args?.data?.name, node: e.args?.data?.nodeName };
        current.set(id, rec);
        records.push(rec);
      } else if (e.ph === 'n' && e.args?.data?.compositeFailed && current.has(id)) {
        current.get(id).failed = e.args.data.compositeFailed;
        current.get(id).props = e.args.data.unsupportedProperties || [];
      }
    }
    // Chromium failure bits worth knowing: 8192 unsupported property (paint work every frame),
    // 32 target not composited, 2048 transform cannot run on the target, 64 conflicting animations.
    const failures = new Map();
    for (const r of records) {
      if (!r.failed) continue;
      const key = `${r.name || '(unnamed)'} on ${r.node || '?'}${r.props?.length ? ' [' + r.props.join(', ') + ']' : ''} reason=${r.failed}`;
      failures.set(key, (failures.get(key) || 0) + 1);
    }

    console.log(`\n${route} [${device}${cpu > 1 ? `, CPU ${cpu}x` : ''}]`);
    for (const [phase, f] of Object.entries(m.frames)) {
      if (phase === 'load') continue;
      const pct = f.n ? ((f.dropped / (f.n + f.dropped)) * 100).toFixed(1) : '0';
      console.log(`  frames  ${phase.padEnd(9)} ${f.n} drawn, ${f.dropped} dropped (${pct}%), worst gap ${Math.round(f.worst)} ms`);
    }
    const loaf = m.loaf.filter((l) => l.phase !== 'load');
    if (loaf.length) {
      console.log(`  long frames (${loaf.length}):`);
      loaf.sort((a, b) => b.ms - a.ms).slice(0, 6).forEach((l) => console.log(`    ${l.ms} ms (${l.phase}) ${l.script}`));
    }
    const shifts = m.shifts.filter((s) => s.phase !== 'load');
    const cls = shifts.reduce((a, s) => a + s.value, 0);
    if (shifts.length) {
      console.log(`  layout shift after load: ${cls.toFixed(4)}`);
      shifts.slice(0, 5).forEach((s) => console.log(`    ${s.value} (${s.phase}) ${s.src}`));
    }
    const loadShift = m.shifts.filter((s) => s.phase === 'load').reduce((a, s) => a + s.value, 0);
    if (loadShift) console.log(`  layout shift during load: ${loadShift.toFixed(4)}`);
    if (failures.size) {
      console.log(`  not on the compositor (${failures.size}):`);
      for (const [k, n] of failures) console.log(`    ×${n} ${k}`);
    }
    errors.forEach((e) => console.log('  error', e));
    await ctx.close();
  }
}
await browser.close();
