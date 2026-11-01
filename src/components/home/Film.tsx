'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import s from './Film.module.css';

/** One cut of the film (an H.264 MP4, which came out smaller than VP9 for this material) and a still of it. */
export type Cut = { src: string; still: string; w: number; h: number };

type Props = { desktop: Cut; phone: Cut; label: string; caption: string };

const PHONE = '(max-width: 700px)';

/**
 * The film: one continuous shot through three of the sites, from the search result to the
 * booking. A still of it shows first; the cut for the screen loads and plays only while the
 * frame is on screen, pauses when it leaves, and stays a still under the site's Motion setting.
 */
export function Film({ desktop, phone, label, caption }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const pick = () => setCut(mq.matches ? phone : desktop);
    pick();
    mq.addEventListener('change', pick);
    return () => mq.removeEventListener('change', pick);
  }, [desktop, phone]);

  useEffect(() => {
    const v = video.current;
    const f = frame.current;
    if (!v || !f || !cut) return;
    let inView = false;
    let disposed = false;
    const canPlay = () => !disposed && inView && !document.hidden && !prefersReducedMotion();
    const sync = () => {
      if (canPlay()) {
        if (v.preload !== 'auto') v.preload = 'auto';
        if (v.paused) void v.play().then(() => { if (!canPlay()) v.pause(); }).catch(() => {});
      } else {
        if (!v.paused) v.pause();
        // Back to the still when motion is turned off
        if (prefersReducedMotion()) delete f.dataset.playing;
      }
    };
    const onPlaying = () => { f.dataset.playing = ''; };
    v.addEventListener('playing', onPlaying);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        sync();
      },
      { threshold: [0, 0.35] },
    );
    io.observe(f);
    const unsubscribe = subscribeMotionPreference(sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      io.disconnect();
      unsubscribe();
      document.removeEventListener('visibilitychange', sync);
      v.removeEventListener('playing', onPlaying);
      v.pause();
    };
  }, [cut]);

  return (
    <section className={s.film} aria-label={label}>
      <div className="container">
        <div ref={frame} className={s.frame} data-reveal>
          <picture className={s.still}>
            <source media={PHONE} srcSet={phone.still} width={phone.w} height={phone.h} />
            <img src={desktop.still} width={desktop.w} height={desktop.h} alt={label} loading="lazy" decoding="async" />
          </picture>
          {cut ? (
            <video
              ref={video}
              key={cut.src}
              className={s.video}
              src={cut.src}
              width={cut.w}
              height={cut.h}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className={s.caption}>{caption}</p>
      </div>
    </section>
  );
}
