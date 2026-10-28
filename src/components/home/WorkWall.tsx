'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
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

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrap = (x: number, w: number) => (w ? ((x % w) + w) % w : 0);

/**
 * The opening of the homepage. On a full load it opens on my name; the wall of all the work rushes in
 * behind it while the name flies up into the header. The wall is every screen of the work on its
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
    const lanes = [...el.querySelectorAll<HTMLElement>('[data-row]')].map((row, i) => ({
      row,
      dir: row.dataset.dir === 'right' ? -1 : 1,
      speed: 34 + (i % 3) * 11,
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
    const place = () => lanes.forEach((l) => (l.row.style.transform = `translate3d(${-l.x}px, 0, 0) skewX(${l.skew.toFixed(2)}deg)`));
    // The plane's pose. exit grows as the work list rises over the wall, which then falls away.
    const view = { ...TILT, s: 1, y: 0, o: 1 };
    let exit = 0;
    const pose = () => {
      plane.style.transform = `translate(-50%, -50%) translate3d(0, ${(view.y - exit * 6).toFixed(2)}vh, 0) rotate(${view.rz}deg) rotateX(${view.rx + exit * 14}deg) scale(${view.s})`;
      plane.style.opacity = String(view.o);
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
    const m = { rush: 0, fling: 0, scrollV: 0, dragging: false };
    let lastY = window.scrollY;
    const step = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!dt) return;
      const y = window.scrollY;
      m.scrollV += (clamp((y - lastY) / dt, -4000, 4000) - m.scrollV) * (1 - Math.exp(-dt / 0.1));
      lastY = y;
      m.rush *= Math.exp(-dt / 0.42);
      m.fling *= Math.exp(-dt / 0.55);
      const held = pausedRef.current;
      for (const l of lanes) {
        const auto = held ? 0 : l.dir * ((m.dragging ? 0 : l.speed) + m.rush + m.scrollV * 0.5);
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
    // then the wall rushes in from a steep angle as the name flies up into the header.
    const header = document.querySelector<HTMLElement>('body > header');
    const title = el.querySelector<HTMLElement>('[data-intro-title]');
    const arrived = document.documentElement.hasAttribute('data-route-arrival');
    let tl: gsap.core.Timeline | null = null;
    const hurry = () => tl?.timeScale(4);
    const hurryOn = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const after = el.querySelectorAll('[data-after]');
    if (!arrived && title && header && window.scrollY < 40) {
      Object.assign(view, { rx: 56, rz: -15, s: 0.84, y: 10, o: 0 });
      pose();
      gsap.set(after, { autoAlpha: 0 });
      // Start once the name has nearly finished rising
      const rising = title.getAnimations({ subtree: true }).map((a) => Number(a.effect?.getComputedTiming().endTime ?? 0) - Number(a.currentTime ?? 0));
      const timeline = gsap.timeline({ delay: Math.max(0, Math.max(0, ...rising) / 1000 - 0.15), onComplete: () => setIntro(false) });
      tl = timeline;
      timeline
        .add(() => {
          m.rush = 2600;
        }, 0)
        .to(view, { o: 1, duration: 0.5, ease: 'power2.out', onUpdate: pose }, 0)
        .to(view, { ...TILT, s: 1, y: 0, duration: 1.6, ease: 'expo.out', onUpdate: pose }, 0);

      // Each line of the title lands on its twin in the header (the descriptor fades where the header hides it)
      // Both ends are measured as the flight starts: the header settles a few pixels after hydration.
      const fly = (from: HTMLElement | null, to: Element | null) => {
        if (!from) return;
        const range = document.createRange();
        if (to) range.selectNodeContents(to);
        if (!to || !range.getBoundingClientRect().width) {
          timeline.to(from, { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' }, 0.3);
          return;
        }
        let path: { x: number; y: number; scale: number } | null = null;
        const route = () => {
          if (path) return path;
          const a = from.getBoundingClientRect();
          const b = range.getBoundingClientRect();
          return (path = { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width });
        };
        timeline
          .to(from, { x: () => route().x, y: () => route().y, scale: () => route().scale, duration: 0.85, ease: 'expo.inOut' }, 0.3)
          .to(from, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 1.05);
      };
      timeline.to(title, { '--scrim': 0, duration: 0.7, ease: 'power1.inOut' }, 0.35);
      fly(title.querySelector('[data-fly="name"]'), header.querySelector('[data-mark="name"]'));
      fly(title.querySelector('[data-fly="line"]'), header.querySelector('[data-mark="line"]'));
      timeline.fromTo(header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' }, 0.95).to(after, { autoAlpha: 1, duration: 0.5 }, 1.1);
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
          <span className={s.mask} data-fly="name">
            <span className={s.name}>{name}</span>
          </span>
          <span className={s.mask} data-fly="line">
            <span className={s.line}>{line}</span>
          </span>
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
