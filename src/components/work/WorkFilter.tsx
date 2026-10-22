'use client';

import { useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import styles from './WorkFilter.module.css';

const FILTERS = [
  { id: 'all', label: 'All', status: 'Showing all the work.' },
  { id: 'firms', label: 'Law firms', status: 'Showing law firms.' },
  { id: 'clinics', label: 'Clinics', status: 'Showing clinics.' },
  { id: 'beyond', label: 'Beyond practices', status: 'Showing work beyond practices.' },
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
  const run = useRef(0);

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
      if (run.current === mine) items.forEach((el) => setName(el, ''));
    };
    transition.finished.then(done, done);
  };

  // The first screen enters in order after the page title and lede: the chips, then the list.
  // The entrances sit on wrappers the filter never hides, so they play once and never replay.
  return (
    <>
      <div className={`container ${styles.bar}`} data-work-filter data-enter style={{ ['--i' as string]: 2 }}>
        <div className={styles.chips} role="group" aria-label="Show work for">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={styles.chip} aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
              {f.label}
            </button>
          ))}
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
