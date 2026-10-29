'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Picture } from '@/components/media/Picture';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Device, Loop, Still } from '@/lib/media';
import { prefersReducedMotion, useReducedMotion } from '@/lib/useReducedMotion';
import s from './WorkWall.module.css';

export type WallTile = { key: string; ground: string; href: string; device: Device; ratio: number; still?: Still; loop?: Loop };

type Props = { rows: WallTile[][]; name: string; line: string };

/** Copies of each row laid end to end, so a row can travel one copy's length and start again unseen. */
const COPIES = 3;
/** The wall's resting pose, in degrees. */
const TILT = { rx: 24, rz: -7 };
/** Which way each row parts from the wall when it moves (toward the eye or away), in turn. */
const DEPTH = [0.9, -0.75, 1, -0.95, 0.65, -0.85];
/** How far the rows part, in px: as the work list rises over the wall, and with speed. */
const PART = { exit: 260, speed: 120 };
/** How long the title holds before the work shows through it, and how far it pushes toward the eye meanwhile. */
const HOLD = { seconds: 1.1, push: 1.04 };
/** Now and then one row breaks away: its sprint in px a second, how far it comes toward the eye, and the seconds between. */
const BURST = { v: 760, lift: 80, every: [3.6, 6.4] };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrap = (x: number, w: number) => (w ? ((x % w) + w) % w : 0);

/**
 * The opening of the homepage. On a full load it opens on my name; the work streams past inside its
 * letters, then the eye flies through one of them into the wall. The wall is every screen of the work on its
 * client's colour, tilted away, its rows drifting in opposite directions. Scrolling pushes the rows
 * along (and back, scrolling up), a drag or swipe throws them, and a few tiles play their loops.
 * Off screen it rests; paused or with reduced motion it holds still.
 */
export function WorkWall({ rows, name, line }: Props) {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [intro, setIntro] = useState(true);
  const pausedRef = useRef(paused);

  useGsap(root, ({ reduce: r }) => {
    const { gsap } = getGsap();
    const el = root.current!;
    const plane = el.querySelector<HTMLElement>('[data-plane]')!;
    const box = plane.parentElement!;
    const lanes = [...el.querySelectorAll<HTMLElement>('[data-row]')].map((row, i) => ({
      row,
      dir: row.dataset.dir === 'right' ? -1 : 1,
      speed: 34 + (i % 3) * 11,
      depth: DEPTH[i % DEPTH.length],
      width: 0,
      x: 0,
      skew: 0,
      // How far behind the wall the row still is as it arrives, in px
      enter: 0,
      burst: 0,
    }));
    const measure = () =>
      lanes.forEach((l, i) => {
        const width = l.row.offsetWidth / COPIES;
        l.x = l.width ? (l.x / l.width) * width : ((i * 0.37) % 1) * width;
        l.width = width;
      });
    // exit grows as the work list rises over the wall, which parts into its rows and falls away;
    // spread grows with speed, so a rush, a throw or a fast scroll opens the rows a little too.
    let exit = 0;
    let spread = 0;
    const place = () => {
      const part = PART.exit * (1 - (1 - exit) ** 2) + PART.speed * spread;
      lanes.forEach((l) => {
        const z = l.enter + l.depth * part + (l.burst / BURST.v) * BURST.lift;
        l.row.style.transform = `translate3d(${-l.x}px, 0, ${z.toFixed(1)}px) skewX(${l.skew.toFixed(2)}deg)`;
      });
    };
    // The plane's pose, with a slow sway of the eye on top while the wall runs
    const view = { ...TILT, s: 1, y: 0, o: 1 };
    const sway = { rx: 0, rz: 0 };
    const pose = () => {
      plane.style.transform = `translate(-50%, -50%) translate3d(0, ${(view.y - exit * 6).toFixed(2)}vh, 0) rotate(${(view.rz + sway.rz).toFixed(3)}deg) rotateX(${(view.rx + sway.rx + exit * 14).toFixed(3)}deg) scale(${view.s})`;
      box.style.opacity = String(view.o);
    };
    el.setAttribute('data-ready', '');
    measure();
    place();
    pose();
    if (r) {
      setIntro(false);
      return () => el.removeAttribute('data-ready');
    }

    // Motion that is not the steady drift: the arrival's rush, a throw, and the scroll, in px a second
    const m = { rush: 0, fling: 0, scrollV: 0, dragV: 0, dragging: false };
    let lastY = window.scrollY;
    let clock = 0;
    let nextBurst = BURST.every[1];
    let burstRow = 0;
    const step = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!dt) return;
      const y = window.scrollY;
      m.scrollV += (clamp((y - lastY) / dt, -4000, 4000) - m.scrollV) * (1 - Math.exp(-dt / 0.1));
      lastY = y;
      m.rush *= Math.exp(-dt / 0.42);
      m.fling *= Math.exp(-dt / 0.55);
      if (!m.dragging) m.dragV *= Math.exp(-dt / 0.2);
      const held = pausedRef.current;
      const surge = m.rush + Math.abs(m.scrollV) * 0.5 + Math.abs(m.fling) + m.dragV;
      spread += (clamp(surge / 2600, 0, 1) - spread) * (1 - Math.exp(-dt / 0.28));
      if (!held) clock += dt;
      sway.rz = Math.sin(clock * 0.37) * 1.1;
      sway.rx = Math.sin(clock * 0.29 + 0.6) * 1.6;
      pose();
      if (!held && !m.dragging && clock >= nextBurst) {
        // Never the same row twice running
        burstRow = (burstRow + 1 + Math.floor(Math.random() * (lanes.length - 1))) % lanes.length;
        lanes[burstRow].burst = BURST.v;
        nextBurst = clock + BURST.every[0] + Math.random() * (BURST.every[1] - BURST.every[0]);
      }
      for (const l of lanes) {
        l.burst *= Math.exp(-dt / 0.65);
        const auto = held ? 0 : l.dir * ((m.dragging ? 0 : l.speed + l.burst) + m.rush + m.scrollV * 0.5);
        const v = auto + m.fling;
        l.x = wrap(l.x + v * dt, l.width);
        const lean = clamp(-(v - (held ? 0 : l.dir * l.speed)) * 0.0035, -7, 7);
        l.skew += (lean - l.skew) * (1 - Math.exp(-dt / 0.12));
      }
      place();
    };

    // Run only while the wall is on screen and the tab is showing
    let inView = true;
    let ticking = false;
    const sync = () => {
      const on = inView && !document.hidden;
      if (on === ticking) return;
      ticking = on;
      if (on) {
        lastY = window.scrollY;
        gsap.ticker.add(step);
      } else gsap.ticker.remove(step);
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    sync();

    // A drag or swipe moves every row with the pointer, and a throw keeps them going for a moment.
    // Vertical swipes stay with the page (touch-action: pan-y); a drag never opens a tile.
    let drag: { id: number; x: number; y: number; lastX: number; lastT: number; v: number; on: boolean } | null = null;
    let swallowClick = false;
    const down = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as Element).closest('button')) return;
      swallowClick = false;
      // Fetch the case while the pointer is still down, so it is ready when the colour has filled the screen
      const href = (e.target as Element).closest('a[data-device]')?.getAttribute('href');
      if (href) router.prefetch(href);
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lastX: e.clientX, lastT: e.timeStamp, v: 0, on: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.on) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
          drag = null;
          return;
        }
        if (Math.abs(dx) < 8) return;
        drag.on = true;
        m.dragging = true;
        m.fling = 0;
        el.setAttribute('data-dragging', '');
        el.setPointerCapture?.(e.pointerId);
      }
      const dx = e.clientX - drag.lastX;
      const dt = Math.max(1, e.timeStamp - drag.lastT);
      drag.v = drag.v * 0.6 + ((dx / dt) * 1000) * 0.4;
      m.dragV = Math.abs(drag.v);
      drag.lastX = e.clientX;
      drag.lastT = e.timeStamp;
      for (const l of lanes) l.x = wrap(l.x - dx, l.width);
      if (!ticking) place();
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.on) {
        // A pointer that stopped before letting go is not a throw
        m.fling = e.timeStamp - drag.lastT > 90 ? 0 : clamp(-drag.v, -5000, 5000);
        m.dragging = false;
        swallowClick = e.type === 'pointerup';
        el.removeAttribute('data-dragging');
      }
      drag = null;
    };
    // Opening a case: the client's colour floods the screen from the pointer as the wall surges on, and
    // the case page (which opens on that same colour) rises out of it. The tile's own click then goes
    // through to the page transition.
    let flood: HTMLElement | null = null;
    let passing = false;
    const floodInto = (tile: HTMLAnchorElement, x: number, y: number) => {
      if (flood) return;
      const doc = document.documentElement;
      const f = (flood = document.createElement('div'));
      f.className = s.flood;
      f.style.background = getComputedStyle(tile).getPropertyValue('--ground');
      document.body.append(f);
      const reach = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      m.rush = 2600;
      gsap.fromTo(
        f,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        {
          clipPath: `circle(${reach}px at ${x}px ${y}px)`,
          duration: 0.46,
          ease: 'expo.inOut',
          onComplete: () => {
            doc.dataset.flood = '';
            window.addEventListener('route-settled', () => delete doc.dataset.flood, { once: true });
            passing = true;
            tile.click();
            passing = false;
          },
        },
      );
      // If the page never changes, give the wall back
      window.setTimeout(() => {
        if (flood !== f) return;
        f.remove();
        flood = null;
        delete doc.dataset.flood;
      }, 4000);
    };

    // Registered on window so it runs before the page transition's own click handler on document
    const click = (e: MouseEvent) => {
      if (passing || !el.contains(e.target as Node)) return;
      if (swallowClick) {
        swallowClick = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const tile = (e.target as Element).closest<HTMLAnchorElement>('a[data-device]');
      if (!tile || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      e.stopPropagation();
      floodInto(tile, e.clientX, e.clientY);
    };
    const noGhost = (e: DragEvent) => e.preventDefault();
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('click', click, true);
    el.addEventListener('dragstart', noGhost);

    const onResize = () => {
      measure();
      place();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('content-resized', onResize);

    // As the work list rises over it, the wall sinks back, falls away and dims
    const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
    gsap.fromTo(el.querySelector('[data-sink]'), { scale: 1, yPercent: 0 }, { scale: 0.92, yPercent: 5, ease: 'none', scrollTrigger: scrub });
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, { opacity: 0.72, ease: 'none', scrollTrigger: { ...scrub, onUpdate: (self) => ((exit = self.progress), pose()) } });

    // The arrival, on a full load at the top of the page: the name rises (in CSS, before any script),
    // its letters empty to show the work streaming past behind them, and the eye flies through one of
    // them into the wall as the wall settles to its tilt.
    const header = document.querySelector<HTMLElement>('body > header');
    const title = el.querySelector<HTMLElement>('[data-intro-title]');
    const arrived = document.documentElement.hasAttribute('data-route-arrival');
    let tl: gsap.core.Timeline | null = null;
    const hurry = () => tl?.timeScale(4);
    const hurryOn = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const after = el.querySelectorAll('[data-after]');
    // The work list, whose top edge waits below the screen until the wall has arrived
    const sheet = el.nextElementSibling as HTMLElement | null;
    const ink = title?.querySelector<HTMLElement>('[data-ink]');
    const knock = title?.querySelector<HTMLCanvasElement>('[data-knock]');
    const ctx = knock?.getContext('2d');
    if (!arrived && title && ink && knock && ctx && header && window.scrollY < 40) {
      // Hidden until the cut-out is drawn, so the wall only ever shows inside the letters at first.
      // It starts a little back and comes forward as the eye flies in, so the two move the same way.
      Object.assign(view, { rx: 32, rz: -10, s: 0.8, y: 2, o: 0 });
      lanes.forEach((l) => (l.enter = -700));
      const ground = el.querySelector<HTMLElement>('[data-ground]')!;
      pose();
      place();
      gsap.set(after, { autoAlpha: 0 });

      // The cut-out: the stage colour with the name's letters cut out of it, redrawn on every frame of
      // the flight so its edges stay sharp at any size. Each letter is drawn where the page set it.
      const stage = getComputedStyle(el).backgroundColor;
      const box = knock.getBoundingClientRect();
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      knock.width = Math.round(box.width * ratio);
      knock.height = Math.round(box.height * ratio);
      const mid = { x: box.width / 2, y: box.height / 2 };
      const cut = { holes: false, push: 1, k: 1, turn: 0, alpha: 1 };
      let letters: TitleLetters | null = null;
      let eye = { x: mid.x, y: mid.y, scale: 6 };
      const paint = () => {
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, box.width, box.height);
        if (cut.alpha <= 0) return;
        ctx.globalAlpha = cut.alpha;
        ctx.fillStyle = stage;
        ctx.fillRect(0, 0, box.width, box.height);
        if (!cut.holes || !letters) return;
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'destination-out';
        // The flight, about the stem where the push has carried it, then the push, about the middle
        const sx = mid.x + cut.push * (eye.x - mid.x);
        const sy = mid.y + cut.push * (eye.y - mid.y);
        ctx.translate(sx, sy);
        ctx.rotate((cut.turn * Math.PI) / 180);
        ctx.scale(cut.k, cut.k);
        ctx.translate(-sx, -sy);
        ctx.translate(mid.x, mid.y);
        ctx.scale(cut.push, cut.push);
        ctx.translate(-mid.x, -mid.y);
        setFont(ctx, letters.font);
        ctx.fillStyle = '#000';
        for (const g of letters.glyphs) ctx.fillText(g.ch, g.x, g.y);
      };
      paint();

      const rising = title.getAnimations({ subtree: true }).map((a) => Number(a.effect?.getComputedTiming().endTime ?? 0) - Number(a.currentTime ?? 0));
      const timeline = gsap.timeline({ delay: Math.max(0, Math.max(0, ...rising) / 1000 - 0.05), onComplete: () => setIntro(false) });
      tl = timeline;
      const open = HOLD.seconds;
      timeline
        // Where each letter sits, read once the name has risen and before the push moves it
        .add(() => {
          letters = readTitle(ink, box);
          const stem = letters?.stem;
          if (stem) eye = { x: stem.x, y: stem.y, scale: (Math.hypot(Math.max(stem.x, box.width - stem.x), Math.max(stem.y, box.height - stem.y)) / stem.half) * 1.15 };
        }, 0)
        // The hold: the title pushes slowly toward the eye, gathering speed into the opening
        .to(ink, { scale: HOLD.push, duration: open + 0.6, ease: 'power2.in' }, 0)
        .to(cut, { push: HOLD.push, duration: open + 0.6, ease: 'power2.in', onUpdate: paint }, 0)
        // Then the letters open onto the work rushing past behind them, as the white wipes away on a soft, slanted edge
        .add(() => {
          m.rush = 3000;
          view.o = 1;
          cut.holes = true;
          pose();
          paint();
        }, open)
        .set(ground, { opacity: 1 }, open)
        .fromTo(ink, { '--wipe': '-24%' }, { '--wipe': '112%', duration: 0.56, ease: 'power2.inOut' }, open + 0.02)
        // Then through the stem of the i, banking into the wall's angle. The dark goes only once the stem
        // is wider than the screen.
        .to(cut, { k: () => eye.scale, turn: TILT.rz + 1, duration: 0.6, ease: 'expo.in', onUpdate: paint }, open + 0.58)
        .to(cut, { alpha: 0, duration: 0.05, ease: 'none', onUpdate: paint }, open + 1.16)
        // The flight carries on into the wall: it keeps coming forward to its tilt, slowing as it lands,
        // and its rows come in out of the distance, the nearest first
        .to(view, { ...TILT, s: 1, y: 0, duration: 1.35, ease: 'power2.out', onUpdate: pose }, open + 1.0)
        .to(lanes, { enter: 0, duration: 1.5, ease: 'expo.out', stagger: { each: 0.05, from: 'end' } }, open + 0.6)
        .add(() => {
          m.rush = Math.max(m.rush, 2400);
        }, open + 1.0)
        // The light ground behind the screens goes dark as the wall opens out
        .to(ground, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, open + 0.9)
        // The header and the work list come in once the wall has landed, not on top of the flight
        .fromTo(header, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out', clearProps: 'transform' }, open + 1.4)
        .to(after, { autoAlpha: 1, duration: 0.5 }, open + 1.6);
      if (sheet) timeline.to(sheet, { y: 0, duration: 0.9, ease: 'expo.out' }, open + 1.5);
      hurryOn.forEach((t) => window.addEventListener(t, hurry, { once: true, passive: true }));
    } else setIntro(false);

    return () => {
      hurryOn.forEach((t) => window.removeEventListener(t, hurry));
      gsap.ticker.remove(step);
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('click', click, true);
      el.removeEventListener('dragstart', noGhost);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('content-resized', onResize);
      el.removeAttribute('data-ready');
      el.removeAttribute('data-dragging');
      flood?.remove();
    };
  });

  // Once the name has landed, the header's own styles take over again
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('body > header');
    if (intro || !header) return;
    header.style.removeProperty('opacity');
    header.style.removeProperty('visibility');
  }, [intro]);

  // The loops play while on screen, on wider screens, unless paused; phones and reduced motion get the poster
  useEffect(() => {
    pausedRef.current = paused;
    const el = root.current;
    if (!el) return;
    const canPlay = () => !pausedRef.current && !prefersReducedMotion() && window.matchMedia('(min-width: 761px)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (!v.getAttribute('poster')) v.poster = v.dataset.poster!;
            if (canPlay()) {
              if (!v.getAttribute('src')) v.src = v.dataset.src!;
              v.play().catch(() => {});
            }
          } else if (!v.paused) v.pause();
        }
      },
      { rootMargin: '10% 0px' },
    );
    el.querySelectorAll('video').forEach((v) => {
      if (!canPlay()) v.pause();
      io.observe(v);
    });
    return () => io.disconnect();
  }, [paused]);

  return (
    <section ref={root} className={s.wall} aria-labelledby="wall-title" data-theme="dark" data-wall-intro={intro || undefined}>
      <h1 id="wall-title" className="sr-only">
        {name} · {line}
      </h1>
      <div className={s.sink} data-sink>
        {/* Light behind the screens while they show only through the name, so a gap never empties a letter */}
        <div className={s.ground} data-ground />
        <div className={s.planeBox}>
          <div className={s.plane} data-plane aria-hidden="true">
            {rows.map((row, r) => (
              <div key={r} className={s.row} data-row data-dir={r % 2 ? 'right' : 'left'}>
                {Array.from({ length: COPIES }, (_, copy) =>
                  row.map((tile) => (
                    <a
                      key={`${copy}-${tile.key}`}
                      href={tile.href}
                      tabIndex={-1}
                      className={s.tile}
                      data-device={tile.device}
                      style={{ '--ground': tile.ground, '--ratio': tile.ratio } as CSSProperties}
                    >
                      <span className={s.screen}>
                        {tile.loop ? (
                          <video data-src={tile.loop.src} data-poster={tile.loop.poster} width={tile.loop.w} height={tile.loop.h} muted loop playsInline preload="none" />
                        ) : (
                          tile.still && <Picture media={tile.still} sizes={tile.device === 'phone' ? '(min-width: 761px) 140px, 90px' : '(min-width: 761px) 420px, 260px'} />
                        )}
                      </span>
                    </a>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {intro && (
        <div className={s.intro} aria-hidden="true" data-intro-title>
          {/* The stage colour with the name's letters cut out of it (drawn by the script), and the white name over it */}
          <canvas className={s.knock} data-knock />
          <div className={s.ink} data-ink>
            <Title name={name} line={line} />
          </div>
        </div>
      )}
      {!reduce && (
        <button type="button" className={s.pause} onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play the wall of work' : 'Pause the wall of work'} data-after>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {paused ? <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /> : <path d="M8 5h2.6v14H8zM13.4 5H16v14h-2.6z" fill="currentColor" />}
          </svg>
        </button>
      )}
      <div className={s.dim} data-dim aria-hidden="true" />
    </section>
  );
}

type TitleFont = { css: string; stretch: string };
type TitleLetters = { font: TitleFont; glyphs: { ch: string; x: number; y: number }[]; stem: { x: number; y: number; half: number } | null };

const STRETCH: Record<string, string> = { '75%': 'condensed', '87.5%': 'semi-condensed', '100%': 'normal', '112.5%': 'semi-expanded', '125%': 'expanded' };

const setFont = (ctx: CanvasRenderingContext2D, font: TitleFont) => {
  ctx.font = font.css;
  if ('fontStretch' in ctx) ctx.fontStretch = font.stretch as CanvasFontStretch;
};

/**
 * Every letter of the name where the page set it (relative to box), the font to draw it in, and the
 * stem of the last i or l to fly through: its middle and half its width. The stem is found in the
 * pixels of the letter drawn on a canvas, because a letter's box on the page is its advance, which
 * does not say where the ink is.
 */
function readTitle(root: HTMLElement, box: DOMRect): TitleLetters | null {
  const words = [...root.querySelectorAll<HTMLElement>('[data-word]')];
  if (!words.length) return null;
  const cs = getComputedStyle(words[0]);
  const size = parseFloat(cs.fontSize);
  const font = { css: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, stretch: STRETCH[cs.fontStretch] ?? 'normal' };
  const glyphs: TitleLetters['glyphs'] = [];
  let stem: TitleLetters['stem'] = null;
  for (const word of words) {
    const node = word.firstChild;
    if (!(node instanceof Text)) continue;
    const y = word.querySelector('[data-base]')!.getBoundingClientRect().top - box.top;
    const text = node.textContent!;
    const range = document.createRange();
    for (let i = 0; i < text.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      glyphs.push({ ch: text[i], x: range.getBoundingClientRect().left - box.left, y });
    }
    const at = Math.max(text.lastIndexOf('i'), text.lastIndexOf('l'));
    const found = at >= 0 && stemOf(text[at], font, size);
    if (found) stem = { x: glyphs[glyphs.length - text.length + at].x + found.mid, y: y - 0.22 * size, half: found.half };
  }
  return { font, glyphs, stem };
}

/** Where the stem of a letter is, across from its origin, a little above the baseline (under the dot of an i). */
function stemOf(ch: string, font: TitleFont, size: number): { mid: number; half: number } | null {
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(size * 1.5);
  canvas.height = Math.ceil(size * 2);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const pad = Math.round(size * 0.25);
  const baseline = Math.round(size * 1.4);
  setFont(ctx, font);
  ctx.fillStyle = '#fff';
  ctx.fillText(ch, pad, baseline);
  const data = ctx.getImageData(0, Math.round(baseline - 0.22 * size), canvas.width, 1).data;
  let best = { start: 0, len: 0 };
  for (let i = 0, start = -1; i <= canvas.width; i++) {
    const solid = i < canvas.width && data[i * 4 + 3] > 200;
    if (solid && start < 0) start = i;
    if (!solid && start >= 0) {
      if (i - start > best.len) best = { start, len: i - start };
      start = -1;
    }
  }
  return best.len < 0.05 * size ? null : { mid: best.start + best.len / 2 - pad, half: best.len / 2 };
}

/** The name in words (a phone sets them on two lines), each in its own mask with a mark on its baseline, and the descriptor under it. */
function Title({ name, line }: { name: string; line: string }) {
  return (
    <>
      <span className={s.name}>
        {name.split(' ').map((word, i) => (
          <Fragment key={i}>
            {i ? ' ' : null}
            <span className={s.wordMask}>
              <span className={s.word} data-word>
                {word}
                <span className={s.base} data-base />
              </span>
            </span>
          </Fragment>
        ))}
      </span>
      <span className={s.mask}>
        <span className={s.line}>{line}</span>
      </span>
    </>
  );
}
