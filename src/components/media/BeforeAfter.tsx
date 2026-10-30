'use client';

import { useId, useRef } from 'react';
import type { PointerEvent } from 'react';
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

type Drag = { id: number; x: number; y: number; on: boolean };

/**
 * Drag the line (or tap where it should go, or use the arrow keys) to wipe between the old page
 * and the new one. The stage takes the pointer; the range input underneath carries keyboard and
 * screen-reader access only, so the two never pull the line in different directions.
 */
export function BeforeAfter({ before, after, label, sizes = '(min-width: 1240px) 760px, 92vw' }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const drag = useRef<Drag | null>(null);
  const id = useId();

  // The position lives in a CSS variable set directly, so the line keeps up with a finger
  // without waiting for React to render.
  const show = (value: number) => {
    const st = stage.current;
    const input = range.current;
    if (!st || !input) return;
    const v = Math.max(0, Math.min(100, value));
    st.style.setProperty('--pos', `${v}%`);
    input.value = String(Math.round(v));
    input.setAttribute('aria-valuetext', `${Math.round(v)}% before shown`);
    // Each label steps aside while the line passes over it, so it never sits on the wrong picture.
    const box = st.getBoundingClientRect();
    const x = (v / 100) * box.width;
    const tags = st.querySelectorAll<HTMLElement>('[data-tag]');
    const beforeEnd = tags[0].offsetLeft + tags[0].offsetWidth + 10;
    const afterStart = tags[1].offsetLeft - 10;
    st.dataset.near = x < beforeEnd ? 'before' : x > afterStart ? 'after' : '';
  };

  const fromX = (clientX: number) => {
    const r = stage.current?.getBoundingClientRect();
    if (r) show(((clientX - r.left) / r.width) * 100);
  };

  const end = (el: HTMLDivElement) => {
    drag.current = null;
    delete el.dataset.dragging;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const mouse = e.pointerType === 'mouse';
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, on: mouse };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (mouse) {
      e.currentTarget.dataset.dragging = '';
      fromX(e.clientX);
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.on) {
      // A touch becomes a drag only once it moves sideways more than up or down; otherwise the
      // page scrolls and the line stays where it is.
      const dx = Math.abs(e.clientX - d.x);
      if (dx < 6 || dx < Math.abs(e.clientY - d.y)) return;
      d.on = true;
      e.currentTarget.dataset.dragging = '';
    }
    fromX(e.clientX);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    // A tap that never became a drag moves the line to where it landed
    if (!d.on) fromX(e.clientX);
    end(e.currentTarget);
  };

  return (
    <figure className={styles.figure} data-device={after.device}>
      <div
        ref={stage}
        className={styles.stage}
        style={{ ['--pos' as string]: '50%' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={(e) => end(e.currentTarget)}
        onLostPointerCapture={(e) => end(e.currentTarget)}
      >
        <Picture media={before} sizes={sizes} className={styles.before} />
        <div className={styles.after} aria-hidden="true">
          <Picture media={after} sizes={sizes} />
        </div>
        <span className={styles.divider} aria-hidden="true">
          <span className={styles.line} />
          <span className={styles.handle}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7.5 5 3 10l4.5 5M12.5 5 17 10l-4.5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <span className={`${styles.tag} ${styles.tagBefore}`} data-tag="before" aria-hidden="true">
          Before
        </span>
        <span className={`${styles.tag} ${styles.tagAfter}`} data-tag="after" aria-hidden="true">
          After
        </span>
        <label htmlFor={id} className="sr-only">
          {`Compare before and after: ${label}`}
        </label>
        <input
          ref={range}
          id={id}
          className={styles.range}
          type="range"
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          onChange={(e) => show(Number(e.target.value))}
          aria-valuetext="50% before shown"
        />
      </div>
      <figcaption className={styles.caption}>{label}</figcaption>
    </figure>
  );
}
