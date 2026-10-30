'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import { Picture } from '@/components/media/Picture';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Device, Still } from '@/lib/media';
import s from './WorkWall.module.css';

export type WallTile = { key: string; ground: string; device: Device; ratio: number; still: Still };

type Props = { rows: WallTile[][]; name: string; line: string; bookingHref: string };

/** Copies of each row laid end to end, so a row can travel one copy's length and start again unseen. */
const COPIES = 3;
/** The wall's resting pose, in degrees. */
const TILT = { rx: 24, rz: -7 };
/** Which way each row parts from the wall when it moves (toward the eye or away), in turn. */
const DEPTH = [0.9, -0.75, 1, -0.95, 0.65, -0.85];
/** How far the rows part, in px: as the work list rises over the wall, and with speed. */
const PART = { exit: 200, speed: 72 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrap = (x: number, w: number) => (w ? ((x % w) + w) % w : 0);

/** The name stays in the hero. The real project screens drift behind it and respond to scrolling and dragging. */
export function WorkWall({ rows, name, line, bookingHref }: Props) {
  const root = useRef<HTMLElement>(null);
  const [opening, setOpening] = useState(true);

  // CSS owns the entrance from first paint. Hydration only retires it, never restarts it.
  useEffect(() => {
    const el = root.current!;
    const finish = () => setOpening(false);
    const skip = () => prefersReducedMotion() || window.scrollY > 40 || document.documentElement.hasAttribute('data-route-arrival');
    if (skip()) { finish(); return; }
    const animations = el.querySelector('[data-hero-name]')!.getAnimations({ subtree: true });
    const remaining = Math.max(0, ...animations.map(a => Number(a.effect?.getComputedTiming().endTime ?? 0) - Number(a.currentTime ?? 0)));
    const timer = window.setTimeout(finish, Math.min(1800, remaining));
    const onScroll = () => { if (window.scrollY > 40) finish(); };
    const unsubscribe = subscribeMotionPreference(() => { if (prefersReducedMotion()) finish(); });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(timer); unsubscribe(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useGsap(root, ({ reduce: r, mobile }) => {
    const { gsap } = getGsap();
    const el = root.current!;
    const plane = el.querySelector<HTMLElement>('[data-plane]')!;
    const box = plane.parentElement!;
    const lanes = [...el.querySelectorAll<HTMLElement>('[data-row]')].map((row, i) => ({
      row,
      dir: row.dataset.dir === 'right' ? -1 : 1,
      speed: (mobile ? 13 : 20) + (i % 3) * 6,
      depth: DEPTH[i % DEPTH.length],
      width: 0,
      x: 0,
      skew: 0,
    }));
    const measure = () =>
      lanes.forEach((l, i) => {
        const width = l.row.offsetWidth / COPIES;
        l.x = l.width ? (l.x / l.width) * width : ((i * 0.37) % 1) * width;
        l.width = width;
      });
    // exit grows as the work list rises over the wall, which parts into its rows and falls away;
    // spread grows with speed, so a throw or a fast scroll opens the rows a little too.
    let exit = 0;
    let spread = 0;
    const place = () => {
      const part = PART.exit * (1 - (1 - exit) ** 2) + PART.speed * spread;
      lanes.forEach((l) => {
        const z = l.depth * part;
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
    if (mobile && !document.documentElement.hasAttribute('data-route-arrival') && window.scrollY < 40) {
      // Prioritise only a few images in this viewport, after the rows take their measured positions.
      [...plane.querySelectorAll<HTMLImageElement>('img')]
        .map((image) => ({ image, rect: image.getBoundingClientRect() }))
        .filter(({ rect }) => rect.right > 0 && rect.left < innerWidth && rect.bottom > 64 && rect.top < innerHeight)
        .sort((a, b) => Math.abs(a.rect.top + a.rect.height / 2 - innerHeight * .38) - Math.abs(b.rect.top + b.rect.height / 2 - innerHeight * .38))
        .slice(0, 6)
        .forEach(({ image }, i) => { image.loading = 'eager'; if (i < 2) image.fetchPriority = 'high'; });
    }
    if (r) {
      return () => el.removeAttribute('data-ready');
    }

    // Motion beyond the steady drift: a throw and the scroll, in px a second.
    const m = { fling: 0, scrollV: 0, dragV: 0, dragging: false };
    let lastY = window.scrollY;
    let clock = 0;
    const step = (_time: number, deltaMs: number) => {
      // Let the name have the first beat, without competing work on a phone's main thread.
      if (el.hasAttribute('data-hero-opening')) { lastY = window.scrollY; return; }
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!dt) return;
      const y = window.scrollY;
      m.scrollV += (clamp((y - lastY) / dt, -4000, 4000) - m.scrollV) * (1 - Math.exp(-dt / 0.16));
      lastY = y;
      m.fling *= Math.exp(-dt / 0.55);
      if (!m.dragging) m.dragV *= Math.exp(-dt / 0.2);
      const surge = Math.abs(m.scrollV) * 0.5 + Math.abs(m.fling) + m.dragV;
      spread += (clamp(surge / 2600, 0, 1) - spread) * (1 - Math.exp(-dt / 0.28));
      clock += dt;
      sway.rz = Math.sin(clock * 0.3) * 0.45;
      sway.rx = Math.sin(clock * 0.24 + 0.6) * 0.7;
      pose();
      for (const l of lanes) {
        const auto = l.dir * ((m.dragging ? 0 : l.speed) + m.scrollV * 0.5);
        const v = auto + m.fling;
        l.x = wrap(l.x + v * dt, l.width);
        const lean = clamp(-(v - l.dir * l.speed) * 0.0035, -7, 7);
        l.skew += (lean - l.skew) * (1 - Math.exp(-dt / 0.12));
      }
      place();
    };

    // A sticky wall can still intersect the viewport after the opaque work list covers it.
    // Stop its ticker at that point as well as when it leaves the viewport or the tab hides.
    let inView = true;
    let ticking = false;
    const sync = () => {
      const on = inView && !document.hidden && exit < 1;
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
    // Vertical swipes stay with the page (touch-action: pan-y).
    let drag: { id: number; x: number; y: number; lastX: number; lastT: number; v: number; on: boolean } | null = null;
    const down = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as Element).closest('button, a, [data-hero-copy]')) return;
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
        setOpening(false);
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
        el.removeAttribute('data-dragging');
      }
      drag = null;
    };
    const noGhost = (e: DragEvent) => e.preventDefault();
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
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
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, { opacity: 0.72, ease: 'none', scrollTrigger: { ...scrub, onUpdate: (self) => { exit = self.progress; pose(); sync(); } } });

    return () => {
      gsap.ticker.remove(step);
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      el.removeEventListener('dragstart', noGhost);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('content-resized', onResize);
      el.removeAttribute('data-ready');
      el.removeAttribute('data-dragging');
    };
  });

  return (
    <section ref={root} className={s.wall} aria-labelledby="wall-title" data-theme="dark" data-hero-opening={opening || undefined}>
      <div className={s.sink} data-sink>
        <div className={s.planeBox}>
          <div className={s.plane} data-plane aria-hidden="true">
            {rows.map((row, r) => (
              <div key={r} className={s.row} data-row data-dir={r % 2 ? 'right' : 'left'}>
                {Array.from({ length: COPIES }, (_, copy) =>
                  row.map((tile) => (
                    <div
                      key={`${copy}-${tile.key}`}
                      className={s.tile}
                      data-device={tile.device}
                      style={{ '--ground': tile.ground, '--ratio': tile.ratio } as CSSProperties}
                    >
                      <span className={s.screen}>
                        <Picture media={tile.still} sizes={tile.device === 'phone' ? '(min-width: 761px) 140px, 90px' : '(min-width: 761px) 420px, 260px'} />
                      </span>
                    </div>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.readingShade} aria-hidden="true" />
      <h1 id="wall-title" className={s.name} aria-label={name} data-hero-name>
        {name.split(' ').map((word, i) => (
          <span key={word} className={s.word} style={{ '--word-index': i } as CSSProperties}>{word}{i === 0 ? ' ' : ''}</span>
        ))}
      </h1>
      <div className={s.copy} data-hero-copy>
        <p className={s.statement}>{line}</p>
        <div className={s.actions}>
          <ButtonLink href={bookingHref} arrow track="hero-book">Book a call</ButtonLink>
          <ButtonLink href="#selected-work" variant="text" track="hero-work">Selected work<span aria-hidden="true">↓</span></ButtonLink>
        </div>
      </div>
      <div className={s.dim} data-dim aria-hidden="true" />
    </section>
  );
}
