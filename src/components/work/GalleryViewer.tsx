'use client';

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';
import { getLenis } from '@/components/site/SmoothScroll';
import s from './GalleryViewer.module.css';

export type ZoomItem = { key: string; src: string; thumbnail: string; alt: string; width: number; height: number };

/** Full captures and their index load only after opening the viewer. Native dialog owns focus. */
export function GalleryViewer({ items, children }: { items: ZoomItem[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [failed, setFailed] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [loaded, setLoaded] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const requested = useRef(0);
  const shown = useRef<number | null>(null);
  const run = useRef(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const uid = useId();
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  const close = () => {
    run.current += 1;
    shown.current = null;
    setPending(null);
    setFailed(null);
    setError('');
    setIndex(null);
  };
  const choose = async (next: number, retry = false) => {
    if (next === requested.current && !retry && failed !== next) return;
    const arrival = next === shown.current ? 0 : next > requested.current ? 1 : -1;
    requested.current = next;
    const mine = ++run.current;
    setPending(next);
    setFailed(null);
    setError('');
    const image = new Image();
    image.src = items[next].src;
    let timer = 0;
    try {
      // Keep the current capture visible while its replacement decodes, even on a slow phone.
      await Promise.race([image.decode(), new Promise<never>((_, reject) => { timer = window.setTimeout(() => reject(new Error('timeout')), 12000); })]);
      if (run.current !== mine || shown.current === null) return;
      setDirection(arrival);
      setLoaded(items[next].src);
      setExpanded(false);
      shown.current = next;
      setIndex(next);
      setPending(null);
      setFailed(null);
      setError('');
    } catch {
      if (run.current !== mine || shown.current === null) return;
      requested.current = shown.current;
      setPending(null);
      setFailed(next);
      setError('That screen could not load. Please try again.');
    } finally { window.clearTimeout(timer); }
  };
  const move = (step: number) => void choose((requested.current + step + items.length) % items.length);
  const retryImage = () => {
    if (failed === null) return;
    const rail = strip.current;
    const thumb = rail?.querySelectorAll<HTMLButtonElement>('button')[failed];
    // The failed destination may differ from the image still on screen. Its persistent
    // thumbnail keeps focus while the temporary error action is removed for loading.
    if (rail && thumb) {
      rail.scrollTo({ left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.offsetWidth / 2, behavior: 'instant' });
      thumb.focus({ preventScroll: true });
    }
    void choose(failed, true);
  };

  useLayoutEffect(() => {
    if (!open) return;
    const el = dialog.current;
    if (!el) return;
    const root = document.documentElement;
    const before = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.overflow = 'hidden';
    root.style.scrollbarGutter = 'stable';
    const lenis = getLenis();
    const resumeScroll = !!lenis && !lenis.isStopped;
    lenis?.stop();
    el.showModal();
    return () => {
      run.current += 1;
      shown.current = null;
      el.close();
      root.style.overflow = before.overflow;
      root.style.scrollbarGutter = before.gutter;
      if (resumeScroll && getLenis() === lenis) lenis?.start();
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [open]);

  useLayoutEffect(() => {
    viewport.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const rail = strip.current;
    const thumb = rail?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!rail || !thumb) return;
    rail.scrollTo({ left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.offsetWidth / 2, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  }, [index]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-zoom]');
    if (!link) return;
    const next = items.findIndex((candidate) => candidate.key === link.dataset.zoom);
    if (next < 0) return;
    event.preventDefault();
    opener.current = link;
    shown.current = next;
    setDirection(0);
    setLoaded('');
    setExpanded(false);
    setIndex(next);
    void choose(next, true);
  };

  return <div onClick={onClick}>
    {children}
    <dialog ref={dialog} className={s.dialog} data-lenis-prevent aria-labelledby={`${uid}-caption`} onClose={() => { if (!dialog.current?.open) close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); void choose(event.key === 'Home' ? 0 : items.length - 1); }
    }}>
      {item && <div className={s.viewer} data-lenis-prevent>
        <div className={s.toolbar}>
          <p id={`${uid}-caption`} className={s.caption}>{item.alt}</p>
          <span className={s.counter} aria-hidden="true"><span>{String(index! + 1).padStart(2, '0')}</span><span className={s.total}>/ {String(items.length).padStart(2, '0')}</span></span>
          <button type="button" className={s.control} onClick={close} aria-label="Close image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
        </div>
        <div ref={viewport} className={s.viewport} data-expanded={expanded || undefined} aria-busy={pending !== null} onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' && !expanded) gesture.current = { x: event.clientX, y: event.clientY };
          swiped.current = false;
        }} onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start || expanded) return;
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.5) { swiped.current = true; move(dx < 0 ? 1 : -1); }
        }} onPointerCancel={() => { gesture.current = null; }}>
          <button type="button" className={s.imageButton} style={{ '--capture-width': `${item.width}px` } as CSSProperties} aria-label={expanded ? 'Fit image to screen' : 'View image at full size'} aria-pressed={expanded} onClick={() => {
            if (swiped.current) { swiped.current = false; return; }
            setExpanded((value) => !value);
          }}>
            {/* A small version fills the same space while the full capture arrives. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumbnail} alt="" width={item.width} height={item.height} className={s.placeholder} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={item.src} src={loaded === item.src ? item.src : undefined} alt={item.alt} width={item.width} height={item.height} className={s.image} data-ready={loaded === item.src || undefined} onError={() => {
              if (shown.current !== index) return;
              setLoaded('');
              setFailed(index);
              setError('That screen could not load. Please try again.');
            }} style={{ '--image-direction': direction } as CSSProperties} />
          </button>
        </div>
        <div className={s.bottom}>
          {error && <div className={s.error} role="alert"><p>{error}</p>{failed !== null && <button type="button" className={s.retry} onClick={retryImage}>Retry image</button>}</div>}
          <div ref={strip} className={s.strip} role="group" aria-label="Choose a screen">
            {items.map((screen, i) => <button key={screen.key} className={s.thumb} type="button" aria-label={`Screen ${i + 1}: ${screen.alt}`} aria-current={index === i ? 'true' : undefined} data-pending={pending === i || undefined} onClick={() => void choose(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screen.thumbnail} alt="" width={screen.width} height={screen.height} loading="lazy" />
            </button>)}
          </div>
          <div className={s.foot}>
            <button type="button" className={s.textButton} onClick={() => move(-1)}><span aria-hidden="true">←</span> Previous screen</button>
            <button type="button" className={s.textButton} aria-pressed={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? 'Fit to screen' : 'Full size'}</button>
            <button type="button" className={s.textButton} onClick={() => move(1)}>Next screen <span aria-hidden="true">→</span></button>
          </div>
        </div>
        <p className="sr-only" role="status">{pending !== null ? `Loading screen ${pending + 1}.` : `Screen ${index! + 1} of ${items.length}. ${item.alt}`}</p>
      </div>}
    </dialog>
  </div>;
}
