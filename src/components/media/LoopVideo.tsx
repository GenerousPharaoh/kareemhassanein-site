'use client';

import { useEffect, useRef } from 'react';
import type { Loop } from '@/lib/media';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import styles from './LoopVideo.module.css';

type Props = { loop: Loop; className?: string };

/**
 * A silent loop: the poster shows first, the video loads and plays only while on screen,
 * pauses when it leaves, and follows the site's shared Motion setting. A site's opening
 * sequence (loop.once) plays once and holds its last frame.
 */
export function LoopVideo({ loop, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let inView = false;
    let disposed = false;
    const canPlay = () => !disposed && inView && !document.hidden && !prefersReducedMotion();
    const syncPlayback = () => {
      if (canPlay()) {
        if (v.preload !== 'auto') v.preload = 'auto';
        // An opening that has played stays on its last frame when it comes back into view.
        if (v.paused && !v.ended) void v.play().then(() => { if (!canPlay()) v.pause(); }).catch(() => {});
      } else if (!v.paused) v.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        syncPlayback();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    const unsubscribe = subscribeMotionPreference(syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      disposed = true;
      io.disconnect();
      unsubscribe();
      document.removeEventListener('visibilitychange', syncPlayback);
      v.pause();
    };
  }, []);

  return (
    <div className={`${styles.wrap} ${className ?? ''}`} data-device={loop.device}>
      <video
        ref={ref}
        className={styles.video}
        src={loop.src}
        poster={loop.poster}
        width={loop.w}
        height={loop.h}
        muted
        loop={!loop.once}
        playsInline
        preload="none"
        aria-label={loop.label}
      />
    </div>
  );
}
