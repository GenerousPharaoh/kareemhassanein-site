'use client';

import { useEffect, useRef, useState } from 'react';
import type { Loop } from '@/lib/media';
import styles from './LoopVideo.module.css';

type Props = { loop: Loop; className?: string };

/**
 * A silent loop: the poster shows first, the video loads and plays only while on screen,
 * pauses when it leaves, and waits for a tap when the viewer prefers reduced motion.
 * A pause control is always reachable, as autoplaying motion needs one.
 */
export function LoopVideo({ loop, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const pausedByUser = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      pausedByUser.current = true;
      setUserPaused(true);
    }
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto';
          if (!pausedByUser.current) v.play().catch(() => {});
        } else if (!v.paused) v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      pausedByUser.current = false;
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      setUserPaused(true);
      v.pause();
    }
  };

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
        loop
        playsInline
        preload="none"
        aria-label={loop.label}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label={playing ? `Pause: ${loop.label}` : `Play: ${loop.label}`}
        data-state={playing ? 'playing' : userPaused ? 'paused' : 'idle'}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <rect x="4" y="3" width="2.6" height="10" rx="0.6" />
            <rect x="9.4" y="3" width="2.6" height="10" rx="0.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 3.2v9.6c0 .5.5.8.9.5l7.2-4.8a.6.6 0 0 0 0-1L5.9 2.7c-.4-.3-.9 0-.9.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
