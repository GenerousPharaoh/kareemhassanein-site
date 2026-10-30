'use client';

import { useEffect, useRef, useState } from 'react';
import { Picture } from '@/components/media/Picture';
import type { Still } from '@/lib/media';
import { prefersReducedMotion, useReducedMotion } from '@/lib/useReducedMotion';
import s from './WorkPreview.module.css';

const SIZES = '(min-width: 1664px) 720px, (min-width: 900px) 44vw, calc(100vw - 40px)';

async function decode(frame: Still) {
  const image = new Image();
  image.decoding = 'async';
  image.sizes = SIZES;
  const load = (format: 'avif' | 'webp') => {
    image.srcset = frame.widths.map(width => `${frame.src}-${width}.${format} ${width}w`).join(', ');
    image.src = `${frame.src}-${frame.widths[0]}.${format}`;
    return image.decode();
  };
  await load('avif').catch(() => load('webp'));
}

/** A fixed frame, with just its next capture prepared while it is visible. */
export function WorkPreview({ frames, name, interval, className }: { frames: Still[]; name: string; interval: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const [view, setView] = useState({ current: 0, previous: -1 });
  const held = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.previewReady = '';
    let visible = false;
    let timer = 0;
    let timeout = 0;
    let generation = 0;
    let running = false;
    let candidate = (current.current + 1) % frames.length;

    const stop = () => {
      running = false;
      generation++;
      window.clearTimeout(timer);
      window.clearTimeout(timeout);
      delete el.dataset.running;
    };
    const schedule = () => {
      if (!running) return;
      const mine = ++generation;
      const next = candidate;
      // Decode before the dissolve; a slow or failed request leaves the current image intact.
      const ready = Promise.race([
        decode(frames[next]),
        new Promise<never>((_, reject) => { timeout = window.setTimeout(() => reject(new Error('timeout')), 8000); }),
      ]).then(() => true, () => false).finally(() => { if (generation === mine) window.clearTimeout(timeout); });
      timer = window.setTimeout(async () => {
        const loaded = await ready;
        if (!running || generation !== mine || prefersReducedMotion()) return;
        if (loaded && next !== current.current) {
          const previous = current.current;
          current.current = next;
          setView({ current: next, previous });
        }
        candidate = (next + 1) % frames.length;
        schedule();
      }, interval);
    };
    const sync = () => {
      const on = visible && !document.hidden && !held && !prefersReducedMotion() && frames.length > 1;
      if (on === running) return;
      stop();
      if (on) {
        running = true;
        el.dataset.running = '';
        schedule();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      sync();
    }, { threshold: [0, 0.35] });
    observer.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      delete el.dataset.previewReady;
    };
  }, [frames, held, interval]);

  return (
    <div ref={root} className={`${s.preview} ${className ?? ''}`} data-work-preview={name} data-frame={view.current} data-held={held || undefined}>
      <div className={s.frame}>
        {frames.map((frame, i) => (i === view.current || i === view.previous) && (
          <div key={frame.src} className={s.layer} data-current={i === view.current || undefined} data-arrive={i === view.current && view.previous >= 0 || undefined} aria-hidden={i !== view.current || undefined}>
            <Picture media={frame} sizes={SIZES} />
          </div>
        ))}
      </div>
    </div>
  );
}
