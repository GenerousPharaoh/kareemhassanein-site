'use client';

import { useEffect, useRef, useState } from 'react';
import type { Loop } from '@/lib/media';
import { prefersReducedMotion, useReducedMotion } from '@/lib/useReducedMotion';
import styles from './LoopVideo.module.css';

type Props = { loop: Loop; className?: string };

/**
 * A silent loop: the poster shows first, the video loads and plays only while on screen,
 * pauses when it leaves, and waits for a tap when the viewer prefers reduced motion.
 * A pause control is always reachable, as autoplaying motion needs one.
 */
export function LoopVideo({ loop, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // The viewer's own choice wins; until they make one, reduced motion means wait for a tap.
  const [choice, setChoice] = useState<'play' | 'pause' | null>(null);
  const choiceRef = useRef(choice);
  const held = choice === 'pause' || (choice === null && reduce);

  useEffect(() => {
    choiceRef.current = choice;
  }, [choice]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto';
          const wait = choiceRef.current === 'pause' || (choiceRef.current === null && prefersReducedMotion());
          if (!wait) v.play().catch(() => {});
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
      setChoice('play');
      choiceRef.current = 'play';
      v.play().catch(() => {});
    } else {
      setChoice('pause');
      choiceRef.current = 'pause';
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
        data-state={playing ? 'playing' : held ? 'paused' : 'idle'}
      >
        {/* Both icons stay in place and cross-fade (on spans, which the compositor can move), so the button never changes shape */}
        <span className={styles.iconPause} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <rect x="4" y="3" width="2.6" height="10" rx="0.6" />
            <rect x="9.4" y="3" width="2.6" height="10" rx="0.6" />
          </svg>
        </span>
        <span className={styles.iconPlay} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M5 3.2v9.6c0 .5.5.8.9.5l7.2-4.8a.6.6 0 0 0 0-1L5.9 2.7c-.4-.3-.9 0-.9.5Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
