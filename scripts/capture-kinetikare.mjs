// Refresh KinetiKare's public portfolio captures. Analytics stay blocked and consent declined.
// node scripts/capture-kinetikare.mjs [--stills|--loops] [--filter=name]
// Uses the same local capture dependencies as scripts/shot.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { launch, newContext, goto, addCss, sweep, settle } from 'file:///C:/Work/Portfolio/captures-2026-10/_tools/lib.mjs';
import { run, CURSOR_JS } from 'file:///C:/Work/Portfolio/captures-2026-10/_tools/actions.mjs';

const require = createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const ffmpeg = require('ffmpeg-static');
const ROOT = 'C:/Work/Portfolio/captures-2026-11/kinetikare';
const BASE = 'https://www.kinetikarephysio.com';
const CONDITION = '/conditions/knee-pain-patellofemoral';
const QUIZ = 'section[aria-label="Knee pain pattern check"]';
const filter = process.argv.find((arg) => arg.startsWith('--filter='))?.slice(9);
const selected = (job) => !filter || job.name.includes(filter);
const consent = { cookieConsentStatus: 'declined' };
const jobs = [
  { name: 'home-hero', route: '/', device: 'desktop' },
  { name: 'home-hero', route: '/', device: 'phone' },
  { name: 'home-atlas', route: '/', device: 'desktop', scroll: 'article[aria-labelledby="region-knee"]', offset: 0 },
  { name: 'home-journey', route: '/', device: 'desktop', element: 'section:has(h2:text-is("Your Care Journey"))' },
  { name: 'home-services', route: '/', device: 'desktop', element: '#services' },
  { name: 'knee-hub', route: '/conditions/knee-pain', device: 'desktop' },
  { name: 'knee-hub', route: '/conditions/knee-pain', device: 'phone' },
  { name: 'knee-evidence', route: '/conditions/knee-pain', device: 'desktop', element: 'section:has(h2:text-is("Evidence this page is built on"))' },
  { name: 'condition', route: CONDITION, device: 'desktop' },
  { name: 'condition', route: CONDITION, device: 'phone' },
  { name: 'condition-quiz', route: CONDITION, device: 'desktop', element: QUIZ },
  { name: 'heel', route: '/conditions/plantar-fasciitis', device: 'phone' },
];
const loops = [
  { name: 'condition-scroll', route: CONDITION, device: 'phone', actions: [{ wait: 700 }, { smooth: 1700, ms: 5200 }, { wait: 1100 }] },
  { name: 'home-scroll', route: '/', device: 'phone', actions: [{ wait: 800 }, { smooth: 2200, ms: 5800 }, { wait: 1000 }] },
  { name: 'atlas-scroll', route: '/', device: 'desktop', pre: [{ scroll: '#where-does-it-hurt', offset: 115 }], actions: [{ wait: 1000 }, { smooth: 'article[aria-labelledby="region-hip"]', offset: 190, ms: 5200 }, { wait: 1300 }] },
  { name: 'quiz', route: CONDITION, device: 'desktop', pre: [{ scroll: QUIZ, offset: 120 }], crop: QUIZ, cursor: true, actions: [
    { wait: 800 },
    ...['No', 'Yes', 'Yes', 'No'].flatMap((answer) => [{ click: `${QUIZ} button:has-text("${answer}")` }, { wait: 1200 }]),
    { wait: 800 },
  ] },
];

function writeManifest(file, entries) {
  const old = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  fs.writeFileSync(file, JSON.stringify([...old.filter((entry) => !entries.some((next) => next.file === entry.file)), ...entries], null, 2) + '\n');
}

async function prepare(browser, job, scale = job.device === 'phone' ? 3 : 2) {
  const ctx = await newContext(browser, job.device, { localStorage: consent, reducedMotion: 'no-preference', scale });
  if (job.cursor) await ctx.addInitScript(CURSOR_JS);
  const page = await ctx.newPage();
  const result = await goto(page, BASE + job.route);
  if (!result.ok) throw new Error(`Capture failed: ${job.route} (${result.status}) ${result.error || ''}`);
  await addCss(page, 'html{scroll-behavior:auto!important}');
  await sweep(page, { pause: 100 });
  await run(page, job.pre || (job.scroll ? [{ scroll: job.scroll, offset: job.offset }] : []));
  await page.waitForTimeout(900);
  await settle(page, { maxMs: 3000 });
  return { ctx, page, status: result.status };
}

async function hideChrome(page, selector) {
  await page.locator(selector).first().evaluate((target) => {
    for (const el of document.querySelectorAll('body *')) {
      if (el.id === '__kcur' || target.contains(el) || el.contains(target)) continue;
      if (['fixed', 'sticky'].includes(getComputedStyle(el).position)) el.style.setProperty('opacity', '0', 'important');
    }
  });
}

if (!process.argv.includes('--loops')) {
  const dir = path.join(ROOT, 'stills');
  fs.mkdirSync(dir, { recursive: true });
  const browser = await launch();
  const results = [];
  try {
    for (const job of jobs.filter(selected)) {
      const { ctx, page, status } = await prepare(browser, job);
      try {
        const file = `${job.name}--${job.device}.png`;
        if (job.element) {
          const loc = page.locator(job.element).first();
          await loc.scrollIntoViewIfNeeded();
          await hideChrome(page, job.element);
          await page.waitForTimeout(600);
          await loc.screenshot({ path: path.join(dir, file) });
        } else {
          await page.screenshot({ path: path.join(dir, file) });
        }
        const meta = await sharp(path.join(dir, file)).metadata();
        const stats = await sharp(path.join(dir, file)).stats();
        if (Math.max(...stats.channels.slice(0, 3).map((c) => c.stdev)) < 4) throw new Error(`Flat capture: ${file}`);
        results.push({ file, url: BASE + job.route, status, w: meta.width, h: meta.height, at: new Date().toISOString() });
        console.log(status, file, `${meta.width}x${meta.height}`);
      } finally { await ctx.close(); }
    }
    writeManifest(path.join(ROOT, '_stills-manifest.json'), results);
  } finally { await browser.close(); }
}

if (!process.argv.includes('--stills')) {
  const dir = path.join(ROOT, 'loops');
  fs.mkdirSync(dir, { recursive: true });
  const results = [];
  for (const job of loops.filter(selected)) {
    const scale = job.device === 'phone' ? 2 : 1.5;
    const browser = await launch(['--force-device-scale-factor=' + scale]);
    try {
      const { ctx, page, status } = await prepare(browser, job, scale);
      const client = await ctx.newCDPSession(page);
      let crop;
      if (job.crop) {
        await hideChrome(page, job.crop);
        const box = await page.locator(job.crop).boundingBox();
        crop = { left: Math.round(box.x * scale), top: Math.round(box.y * scale), width: Math.floor(box.width * scale / 2) * 2, height: Math.floor(box.height * scale / 2) * 2 };
      }
      const frames = [];
      client.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
        frames.push({ data, t: metadata.timestamp });
        client.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
      });
      const viewport = page.viewportSize();
      await client.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: Math.round(viewport.width * scale), maxHeight: Math.round(viewport.height * scale), everyNthFrame: 1 });
      await run(page, job.actions, { cursor: job.cursor });
      await client.send('Page.stopScreencast');
      if (frames.length < 10) throw new Error(`Too few frames: ${job.name}`);
      const work = path.resolve('output/kinetikare-refresh/frames', `${job.name}-${Date.now()}`);
      fs.mkdirSync(work, { recursive: true });
      const lines = [];
      for (const [i, frame] of frames.entries()) {
        const file = `f${String(i).padStart(5, '0')}.jpg`;
        fs.writeFileSync(path.join(work, file), Buffer.from(frame.data, 'base64'));
        lines.push(`file '${file}'`, `duration ${(frames[i + 1] ? Math.max(0.001, frames[i + 1].t - frame.t) : 1).toFixed(4)}`);
      }
      lines.push(`file 'f${String(frames.length - 1).padStart(5, '0')}.jpg'`);
      fs.writeFileSync(path.join(work, 'list.txt'), lines.join('\n'));
      const file = `${job.name}--${job.device}.mp4`;
      const cropFilter = crop ? `crop=${crop.width}:${crop.height}:${crop.left}:${crop.top},` : '';
      const width = job.device === 'phone' ? 780 : 1600;
      let crf = 23;
      do {
        execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(work, 'list.txt'), '-vf', `fps=30,${cropFilter}scale=${width}:-2:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-profile:v', 'high', '-movflags', '+faststart', '-an', path.join(dir, file)]);
        crf += 2;
      } while (fs.statSync(path.join(dir, file)).size > 1.5 * 1024 * 1024 && crf <= 33);
      // The first frame gives a truthful resting view before playback begins.
      let poster = sharp(Buffer.from(frames[0].data, 'base64'));
      if (crop) poster = poster.extract(crop);
      await poster.jpeg({ quality: 90 }).toFile(path.join(dir, `${job.name}--${job.device}--poster.jpg`));
      const seconds = frames.at(-1).t - frames[0].t + 1;
      results.push({ file, url: BASE + job.route, status, frames: frames.length, seconds: +seconds.toFixed(2), bytes: fs.statSync(path.join(dir, file)).size, at: new Date().toISOString() });
      console.log(status, file, `${seconds.toFixed(2)}s`, `${frames.length} frames`);
      await ctx.close();
    } finally { await browser.close(); }
  }
  writeManifest(path.join(ROOT, 'loops/_manifest.json'), results);
}

// Historical comparison sources are copied intact, never re-captured from the current site.
const before = path.join(ROOT, 'before');
fs.mkdirSync(before, { recursive: true });
for (const device of ['desktop', 'phone']) {
  const file = `old-condition-sept--${device}.jpg`;
  if (!fs.existsSync(path.join(before, file))) fs.copyFileSync(`C:/Work/Portfolio/captures-2026-10/kinetikare/before/${file}`, path.join(before, file));
}
