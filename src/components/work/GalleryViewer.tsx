'use client';

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import s from './GalleryViewer.module.css';

export type ZoomItem = { key: string; src: string; alt: string; width: number; height: number };

/** Full-size captures, kept out of the initial page load. Native dialog owns focus and Escape. */
export function GalleryViewer({ items, children }: { items: ZoomItem[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const open = index !== null;
  const item = index !== null ? items[index] : null;
  const move = (direction: number) => {
    setIndex((current) => current === null ? null : (current + direction + items.length) % items.length);
    setExpanded(false);
  };

  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    if (!el) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = 'hidden';
    el.showModal();
    return () => {
      el.close();
      root.style.overflow = before;
    };
  }, [open]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-zoom]');
    if (!link) return;
    const next = items.findIndex((candidate) => candidate.key === link.dataset.zoom);
    if (next < 0) return;
    event.preventDefault();
    setExpanded(false);
    setIndex(next);
  };

  return (
    <div onClick={onClick}>
      {children}
      <dialog ref={dialog} className={s.dialog} aria-labelledby={`${uid}-caption`} onClose={() => setIndex(null)} onClick={(event) => { if (event.target === event.currentTarget) setIndex(null); }} onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
      }}>
        {item && <div className={s.viewer} data-lenis-prevent>
          <div className={s.toolbar}>
            <p id={`${uid}-caption`} className={s.caption}>{item.alt}</p>
            <button type="button" className={s.control} onClick={() => setIndex(null)} aria-label="Close image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
          </div>
          <div className={s.viewport} data-expanded={expanded || undefined}>
            <button type="button" className={s.imageButton} aria-label={expanded ? 'Fit image to screen' : 'View image at full size'} aria-pressed={expanded} onClick={() => setExpanded((value) => !value)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={item.src} src={item.src} alt={item.alt} width={item.width} height={item.height} className={s.image} />
            </button>
          </div>
          <div className={s.foot}>
            <button type="button" className={s.textButton} onClick={() => move(-1)}><span aria-hidden="true">←</span> Previous screen</button>
            <button type="button" className={s.textButton} onClick={() => setExpanded((value) => !value)}>{expanded ? 'Fit to screen' : 'Full size'}</button>
            <button type="button" className={s.textButton} onClick={() => move(1)}>Next screen <span aria-hidden="true">→</span></button>
          </div>
        </div>}
      </dialog>
    </div>
  );
}
