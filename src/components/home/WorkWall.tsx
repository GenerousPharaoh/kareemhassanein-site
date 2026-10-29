'use client';

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
/** The ground behind the wall while it shows only through the name, so a gap between screens never empties a letter */
const GROUND = '207, 204, 194';
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
    // Registered on window so it runs before the page transition's own click handler on document
    const click = (e: MouseEvent) => {
      if (!swallowClick || !el.contains(e.target as Node)) return;
      swallowClick = false;
      e.preventDefault();
      e.stopPropagation();
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
    const knock = title?.querySelector<HTMLElement>('[data-knock]');
    if (!arrived && title && ink && knock && header && window.scrollY < 40) {
      // Hidden until the dark layer is up, so the wall only ever shows inside the letters at first
      Object.assign(view, { rx: 40, rz: -12, s: 1.3, y: 3, o: 0 });
      lanes.forEach((l) => (l.enter = -600));
      const sink = el.querySelector<HTMLElement>('[data-sink]')!;
      pose();
      place();
      gsap.set(after, { autoAlpha: 0 });

      // Where to fly through: the middle of the stem of the last i (or l) in the name, measured as the
      // flight starts. The dark layer scales about that point until the stem is wider than the screen;
      // if no stem is found, the letters only rush closer as the dark fades.
      let aim: { x: number; y: number; scale: number } | null = null;
      const target = () => {
        if (aim) return aim;
        const box = knock.getBoundingClientRect();
        const words = [...knock.querySelectorAll<HTMLElement>('[data-word]')];
        const word = words.reverse().find((w) => /[il]/.test(w.textContent!));
        const hit = word && findStem(word);
        const x = hit ? hit.x : box.left + box.width / 2;
        const y = hit ? hit.y : box.top + box.height / 2;
        const far = Math.hypot(Math.max(x - box.left, box.right - x), Math.max(y - box.top, box.bottom - y));
        return (aim = { x: x - box.left, y: y - box.top, scale: hit ? (far / hit.half) * 1.1 : 6 });
      };

      const rising = title.getAnimations({ subtree: true }).map((a) => Number(a.effect?.getComputedTiming().endTime ?? 0) - Number(a.currentTime ?? 0));
      const timeline = gsap.timeline({ delay: Math.max(0, Math.max(0, ...rising) / 1000 - 0.12), onComplete: () => setIntro(false) });
      tl = timeline;
      timeline
        .add(() => {
          m.rush = 3000;
          view.o = 1;
          pose();
        }, 0)
        .set(knock, { opacity: 1 }, 0)
        .set(sink, { backgroundColor: `rgb(${GROUND})` }, 0)
        // The white of the name wipes away, and its letters show the work rushing past behind them
        .fromTo(ink, { clipPath: 'inset(-10% 0% -10% 0%)' }, { clipPath: 'inset(-10% 0% -10% 100%)', duration: 0.5, ease: 'power3.inOut' }, 0.04)
        // The rows come in out of the distance, the nearest first, and lock into the wall
        .to(lanes, { enter: 0, duration: 1.4, ease: 'expo.out', stagger: { each: 0.05, from: 'end' } }, 0)
        // Then through a letter: the dark around it falls away as the wall settles to its tilt
        .set(knock, { transformOrigin: () => `${target().x}px ${target().y}px` }, 0.62)
        .to(knock, { scale: () => target().scale, duration: 0.62, ease: 'expo.in' }, 0.62)
        .to(knock, { opacity: 0, duration: 0.16, ease: 'none' }, 1.04)
        // The light ground behind the wall goes dark as the wall opens out
        .to(sink, { backgroundColor: `rgba(${GROUND}, 0)`, duration: 0.5, ease: 'power1.inOut', clearProps: 'backgroundColor' }, 0.8)
        .add(() => {
          m.rush = Math.max(m.rush, 2400);
        }, 1.0)
        .to(view, { ...TILT, s: 1, y: 0, duration: 1.5, ease: 'expo.out', onUpdate: pose }, 0.95)
        .fromTo(header, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out', clearProps: 'transform' }, 1.12)
        .to(after, { autoAlpha: 1, duration: 0.5 }, 1.3);
      if (sheet) timeline.to(sheet, { y: 0, duration: 0.9, ease: 'expo.out' }, 1.18);
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
          {/* The title twice: a dark layer with the letters cut out of it, and the white name over it */}
          <div className={s.knock} data-knock>
            <Title name={name} line={line} />
          </div>
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

/**
 * The middle of the stem of a word's last i or l, on screen, and half the stem's width. The word is drawn
 * again on a canvas in the same font, and the stem found in its pixels: a glyph's box on the page is
 * its advance, which does not say where the ink is.
 */
function findStem(word: HTMLElement): { x: number; y: number; half: number } | null {
  const node = word.firstChild;
  if (!(node instanceof Text)) return null;
  const text = node.textContent!;
  const at = Math.max(text.lastIndexOf('i'), text.lastIndexOf('l'));
  if (at < 0) return null;
  const cs = getComputedStyle(word);
  const size = parseFloat(cs.fontSize);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const font = `${cs.fontWeight} ${cs.fontStretch === '112.5%' ? 'semi-expanded' : 'normal'} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.font = font;
  ctx.letterSpacing = cs.letterSpacing;
  const from = ctx.measureText(text.slice(0, at)).width;
  const to = ctx.measureText(text.slice(0, at + 1)).width;
  canvas.width = Math.ceil(to + size);
  canvas.height = Math.ceil(size * 2);
  // Resizing a canvas resets its state
  ctx.font = font;
  ctx.letterSpacing = cs.letterSpacing;
  ctx.fillStyle = '#fff';
  const baseline = Math.round(size * 1.4);
  ctx.fillText(text.slice(0, at + 1), 0, baseline);
  // A row through the stem, a little above the baseline (under the dot of an i)
  const row = Math.round(baseline - 0.22 * size);
  const left = Math.max(0, Math.floor(from - 0.1 * size));
  const data = ctx.getImageData(left, row, canvas.width - left, 1).data;
  let best = { start: 0, len: 0 };
  for (let i = 0, start = -1; i <= data.length / 4; i++) {
    const solid = i < data.length / 4 && data[i * 4 + 3] > 200;
    if (solid && start < 0) start = i;
    if (!solid && start >= 0) {
      if (i - start > best.len) best = { start, len: i - start };
      start = -1;
    }
  }
  if (best.len < 0.05 * size) return null;
  const range = document.createRange();
  range.selectNodeContents(node);
  const origin = range.getBoundingClientRect();
  const baseOnPage = word.querySelector('[data-base]')!.getBoundingClientRect().top;
  return { x: origin.left + left + best.start + best.len / 2, y: baseOnPage - 0.22 * size, half: best.len / 2 };
}

/** The name in words (a phone sets them on two lines), each with a mark on its baseline, and the descriptor under it. */
function Title({ name, line }: { name: string; line: string }) {
  return (
    <>
      <span className={s.mask}>
        <span className={s.name} data-name>
          {name.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i ? ' ' : null}
              <span className={s.word} data-word>
                {word}
                <span className={s.base} data-base />
              </span>
            </Fragment>
          ))}
        </span>
      </span>
      <span className={s.mask}>
        <span className={s.line}>{line}</span>
      </span>
    </>
  );
}
