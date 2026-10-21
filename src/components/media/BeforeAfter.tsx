'use client';

import { useId, useRef, useState } from 'react';
import type { Still } from '@/lib/media';
import { Picture } from './Picture';
import styles from './BeforeAfter.module.css';

type Props = {
  before: Still;
  after: Still;
  label: string;
  /** Rendered width hint for both images. */
  sizes?: string;
};

/**
 * Drag the handle (or use the arrow keys) to wipe between the old page and the new one.
 * The range input underneath carries keyboard and screen-reader access.
 */
export function BeforeAfter({ before, after, label, sizes = '(min-width: 1240px) 760px, 92vw' }: Props) {
  const [pos, setPos] = useState(50);
  const stage = useRef<HTMLDivElement>(null);
  const id = useId();

  const fromPointer = (clientX: number) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <figure className={styles.figure} data-device={after.device}>
      <div
        ref={stage}
        className={styles.stage}
        style={{ ['--pos' as string]: `${pos}%` }}
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === 'touch') fromPointer(e.clientX);
        }}
      >
        <Picture media={before} sizes={sizes} className={styles.before} />
        <div className={styles.after} aria-hidden="true">
          <Picture media={after} sizes={sizes} />
        </div>
        <span className={styles.line} aria-hidden="true">
          <span className={styles.handle}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7.5 5 3 10l4.5 5M12.5 5 17 10l-4.5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <span className={`${styles.tag} ${styles.tagBefore}`} aria-hidden="true">
          Before
        </span>
        <span className={`${styles.tag} ${styles.tagAfter}`} aria-hidden="true">
          After
        </span>
        <label htmlFor={id} className="sr-only">
          {`Compare before and after: ${label}`}
        </label>
        <input
          id={id}
          className={styles.range}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${Math.round(pos)}% before shown`}
        />
      </div>
      <figcaption className={styles.caption}>{label}</figcaption>
    </figure>
  );
}
