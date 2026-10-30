'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { getGsap } from '@/lib/gsap';
import styles from './WorkFilter.module.css';

const FILTERS = [
  { id: 'all', label: 'All cases', status: 'Showing all case studies.' },
  { id: 'firms', label: 'Law firms', status: 'Showing law firms.' },
  { id: 'clinics', label: 'Clinics', status: 'Showing clinics.' },
  { id: 'beyond', label: 'Other projects', status: 'Showing other projects.' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

/**
 * The change animates only where the browser has transition types and classes (they keep these
 * styles away from any other view transition), and never with reduced motion.
 */
function canAnimate() {
  return (
    'startViewTransition' in document &&
    typeof ViewTransition !== 'undefined' &&
    'types' in ViewTransition.prototype &&
    CSS.supports('view-transition-class', 'a') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** The items on screen, with where each sits in the viewport. */
function onScreen(items: HTMLElement[]) {
  const seen = new Map<HTMLElement, DOMRect>();
  for (const el of items) {
    const r = el.getBoundingClientRect();
    if (r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) seen.set(el, r);
  }
  return seen;
}

const samePlace = (a: DOMRect, b: DOMRect) => Math.abs(a.top - b.top) < 1 && Math.abs(a.left - b.left) < 1 && Math.abs(a.width - b.width) < 1;

function setName(el: HTMLElement, name: string, kind = '') {
  el.style.setProperty('view-transition-name', name || null);
  el.style.setProperty('view-transition-class', kind || null);
}

/**
 * Filter chips over a list rendered on the server. The cards carry data-sectors and their
 * sections data-group; this component only sets data-filter, and CSS does the hiding,
 * so the full list is there without JavaScript.
 *
 * A change of filter is a fade-through, never a slide: what leaves the screen fades out where it
 * is, then what arrives rises into its place, so two cards never show through each other and
 * nothing travels up from below the fold. Only items on screen take part (data-work-item marks
 * the candidates); whatever keeps its place does not move or flicker.
 */
export function WorkFilter({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [status, setStatus] = useState('');
  const results = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const run = useRef(0);

  useLayoutEffect(() => {
    // Filtering changes where each screen sits, so its scroll composition needs fresh positions.
    getGsap().ScrollTrigger.refresh();
  }, [filter]);

  useLayoutEffect(() => {
    const row = chips.current;
    if (!row) return;
    let alive = true;
    const measure = () => {
      const selected = row.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!alive || !selected) return;
      row.style.setProperty('--selection-x', `${selected.offsetLeft}px`);
      row.style.setProperty('--selection-y', `${selected.offsetTop + selected.offsetHeight - 2}px`);
      row.style.setProperty('--selection-width', `${selected.offsetWidth}px`);
      row.dataset.measured = '';
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(row);
    row.querySelectorAll('button').forEach((button) => resize.observe(button));
    void document.fonts.ready.then(measure);
    return () => { alive = false; resize.disconnect(); };
  }, [filter]);

  const choose = (id: FilterId) => {
    if (id === filter) return;
    const apply = () => {
      setFilter(id);
      setStatus(FILTERS.find((f) => f.id === id)?.status ?? '');
    };
    const box = results.current;
    if (!box || !canAnimate()) {
      apply();
      return;
    }

    const items = [...document.querySelectorAll<HTMLElement>('[data-work-item]')];
    items.forEach((el) => setName(el, ''));
    // Where everything will be: flip the attribute, measure, flip it back, all in one task, so
    // nothing is painted. The scroll position is put back in case the shorter list clamped it.
    const y = window.scrollY;
    const now = onScreen(items);
    box.dataset.filter = id;
    const next = onScreen(items);
    box.dataset.filter = filter;
    if (window.scrollY !== y) window.scrollTo(0, y);

    const stays = (el: HTMLElement) => {
      const a = now.get(el);
      const b = next.get(el);
      return !!a && !!b && samePlace(a, b);
    };
    items.forEach((el, i) => {
      if (now.has(el)) setName(el, `work-${i}`, stays(el) ? 'work-stay' : 'work-item');
    });

    const mine = ++run.current;
    const line = marker.current;
    if (line) {
      line.style.viewTransitionName = 'work-filter-marker';
      line.dataset.transitioning = '';
    }
    const transition = document.startViewTransition({
      types: ['work-filter'],
      update: () => {
        flushSync(apply);
        const after = onScreen(items);
        items.forEach((el, i) => {
          if (stays(el)) return;
          // An arrival, or a move, takes a new name: its old picture leaves and the new one arrives.
          if (after.has(el)) setName(el, `work-${i}-in`, 'work-item');
          else setName(el, '');
        });
      },
    });
    const done = () => {
      if (run.current !== mine) return;
      items.forEach((el) => setName(el, ''));
      if (line) { line.style.removeProperty('view-transition-name'); delete line.dataset.transitioning; }
    };
    void transition.ready.catch(() => {});
    transition.finished.then(done, done);
  };

  // The first screen enters in order after the page title and lede: the chips, then the list.
  // The entrances sit on wrappers the filter never hides, so they play once and never replay.
  return (
    <>
      <div className={`container ${styles.bar}`} data-work-filter data-enter style={{ ['--i' as string]: 2 }}>
        <p className={styles.filterLabel} id="work-filter-label">Filter case studies</p>
        <div ref={chips} className={styles.chips} role="group" aria-labelledby="work-filter-label">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={styles.chip} aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
              {f.label}
            </button>
          ))}
          <span ref={marker} className={styles.marker} aria-hidden="true" />
        </div>
        <p className="sr-only" role="status">
          {status}
        </p>
      </div>
      <div ref={results} className={styles.results} data-filter={filter} data-enter style={{ ['--i' as string]: 3 }}>
        {children}
      </div>
    </>
  );
}
