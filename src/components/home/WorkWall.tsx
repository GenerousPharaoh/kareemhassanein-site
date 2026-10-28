'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Picture } from '@/components/media/Picture';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import { useReducedMotion } from '@/lib/useReducedMotion';
import s from './WorkWall.module.css';

export type WallTile = { key: string; still: Still; ground: string; href: string; lead?: boolean };

type Props = { rows: WallTile[][]; title: string };

/** Copies of each row laid end to end, so a row can travel one copy's length and start again unseen. */
const COPIES = 3;

/**
 * The opening of the homepage. It opens on one client site filling the screen; the view then pulls
 * back and tilts away to show it is one tile in a wall of all the work, each on its client's colour,
 * the rows drifting past in opposite directions. Off screen, paused or with reduced motion it rests.
 */
export function WorkWall({ rows, title }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [resting, setResting] = useState(false);
  const [live, setLive] = useState(false);

  // Rest off screen and in a background tab
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = true;
    const sync = () => setResting(!inView || document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useGsap(root, ({ reduce: r }) => {
    const { gsap } = getGsap();
    const el = root.current!;
    const plane = el.querySelector<HTMLElement>('[data-plane]')!;
    // The plane is centred by percentages, which GSAP keeps as xPercent/yPercent alongside its own transform
    const centred = { xPercent: -50, yPercent: -50 };
    const tilt = { ...centred, rotateX: 24, rotateZ: -7, scale: 1 };
    if (r) {
      gsap.set(plane, tilt);
      return;
    }

    // The arrival: start flat, scaled so the lead tile fills the screen, then pull back into the tilt
    const arrived = document.documentElement.hasAttribute('data-route-arrival');
    const lead = el.querySelector<HTMLElement>('[data-lead]');
    if (!arrived && lead) {
      const box = el.getBoundingClientRect();
      const t = lead.getBoundingClientRect();
      const ox = box.left + box.width / 2;
      const oy = box.top + box.height / 2;
      const dx = t.left + t.width / 2 - ox;
      const dy = t.top + t.height / 2 - oy;
      const S = Math.max(box.width / t.width, box.height / t.height) * 1.02;
      gsap.fromTo(
        plane,
        { ...centred, x: -dx * S, y: -dy * S, scale: S, rotateX: 0, rotateZ: 0 },
        { x: 0, y: 0, ...tilt, duration: 2.1, delay: 0.55, ease: 'expo.inOut', onComplete: () => setLive(true) },
      );
      gsap.fromTo(el.querySelectorAll('[data-after]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 2.3 });
    } else {
      gsap.set(plane, tilt);
      setLive(true);
    }

    // As the work list rises over it, the wall sinks back and dims
    const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
    gsap.fromTo(el.querySelector('[data-sink]'), { scale: 1, yPercent: 0 }, { scale: 0.92, yPercent: 5, ease: 'none', scrollTrigger: scrub });
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, { opacity: 0.72, ease: 'none', scrollTrigger: scrub });
  });

  const moving = live && !reduce && !paused && !resting;

  return (
    <section ref={root} className={s.wall} aria-labelledby="wall-title" data-theme="dark" data-moving={moving || undefined}>
      <h1 id="wall-title" className="sr-only">
        {title}
      </h1>
      <div className={s.sink} data-sink>
        <div className={s.planeBox}>
          <div className={s.plane} data-plane aria-hidden="true">
            {rows.map((row, r) => (
              <div key={r} className={s.row} data-dir={r % 2 ? 'right' : 'left'} style={{ '--speed': `${70 + (r % 3) * 14}s`, '--offset': `${(r * 37) % 100}` } as CSSProperties}>
                {Array.from({ length: COPIES }, (_, copy) =>
                  row.map((tile) => (
                    <a
                      key={`${copy}-${tile.key}`}
                      href={tile.href}
                      tabIndex={-1}
                      className={s.tile}
                      style={{ '--ground': tile.ground } as CSSProperties}
                      data-lead={(copy === 1 && tile.lead) || undefined}
                    >
                      <span className={s.screen}>
                        <Picture media={tile.still} sizes="(min-width: 761px) 420px, 260px" priority={copy === 1 && tile.lead} />
                      </span>
                    </a>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
