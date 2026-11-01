'use client';

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { getGsap } from '@/lib/gsap';
import styles from './WorkFilter.module.css';
import { PLACES, type PlaceId } from '@/content/found';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';

const SECTORS = [
  { id: 'all', label: 'All cases', status: 'Showing all case studies.' },
  { id: 'firms', label: 'Law firms', status: 'Showing law firms.' },
  { id: 'clinics', label: 'Clinics', status: 'Showing clinics.' },
  { id: 'beyond', label: 'Other projects', status: 'Showing other projects.' },
] as const;
// The second row: the cases by what I found, and where. Each card shows the matching findings.
const FILTERS: ReadonlyArray<{ id: FilterId; label: string; status: string }> = [...SECTORS, ...PLACES];

type FilterId = (typeof SECTORS)[number]['id'] | PlaceId;
const FILTER_KEY = '__khWorkFilter';
const FILTER_EVENT = 'work-filter-change';
const isFilter = (value: unknown): value is FilterId => FILTERS.some((item) => item.id === value);
const initialFilter = (): FilterId => 'all';
/** The choice in this history entry, or the one a link asked for (/work?filter=tracking). */
const savedFilter = (): FilterId => {
  const saved = window.history.state?.[FILTER_KEY];
  if (isFilter(saved)) return saved;
  const asked = new URLSearchParams(window.location.search).get('filter');
  return isFilter(asked) ? asked : 'all';
};
const subscribeFilter = (changed: () => void) => {
  window.addEventListener('popstate', changed);
  window.addEventListener(FILTER_EVENT, changed);
  return () => {
    window.removeEventListener('popstate', changed);
    window.removeEventListener(FILTER_EVENT, changed);
  };
};

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
    !prefersReducedMotion()
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

type FilterTransition = {
  view: ViewTransition | null;
  items: HTMLElement[];
  marker: HTMLElement | null;
  apply: (() => void) | null;
};

function clearNames(transition: FilterTransition) {
  transition.items.forEach((el) => setName(el, ''));
  if (transition.marker) {
    transition.marker.style.removeProperty('view-transition-name');
    delete transition.marker.dataset.transitioning;
  }
}

/**
 * Filter chips over a list rendered on the server. The cards carry data-sectors and their
 * sections data-group; this component only sets data-filter, and CSS does the hiding,
 * so the full list is there without JavaScript.
 *
 * A change of filter overlaps the outgoing and incoming pictures, with a small settle for the
 * arrival. Only items on screen take part (data-work-item marks the candidates); nothing travels
 * up from below the fold, and whatever keeps its place does not move or flicker.
 */
export function WorkFilter({ children }: { children: ReactNode }) {
  // The choice belongs to this history entry, so Back restores the same list and scroll position.
  const filter = useSyncExternalStore(subscribeFilter, savedFilter, initialFilter);
  const [status, setStatus] = useState('');
  const results = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const run = useRef(0);
  const active = useRef<FilterTransition | null>(null);

  const cancelTransition = useCallback((commit = false) => {
    const previous = active.current;
    active.current = null;
    run.current++;
    if (!previous) return;
    previous.view?.skipTransition();
    clearNames(previous);
    // A preference change may interrupt capture before the selected filter commits.
    // Keep that choice; navigation and newer filter choices discard the pending update.
    if (commit) previous.apply?.();
  }, []);

  useLayoutEffect(() => {
    const onRoute = () => cancelTransition();
    const onPreference = () => { if (prefersReducedMotion()) cancelTransition(true); };
    const unsubscribe = subscribeMotionPreference(onPreference);
    window.addEventListener('route-start', onRoute);
    return () => {
      unsubscribe();
      window.removeEventListener('route-start', onRoute);
      cancelTransition();
    };
  }, [cancelTransition]);

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
    cancelTransition();
    const current = savedFilter();
    if (id === current) return;
    const apply = () => {
      window.history.replaceState({ ...window.history.state, [FILTER_KEY]: id }, '');
      window.dispatchEvent(new Event(FILTER_EVENT));
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
    box.dataset.filter = current;
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
    const transition: FilterTransition = { view: null, items, marker: line, apply };
    active.current = transition;
    transition.view = document.startViewTransition({
      types: ['work-filter'],
      update: () => {
        if (run.current !== mine || active.current !== transition) return;
        transition.apply = null;
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
      if (run.current !== mine || active.current !== transition) return;
      active.current = null;
      clearNames(transition);
    };
    void transition.view.ready.catch(() => {});
    void transition.view.finished.then(done, done);
  };

  // The first screen enters in order after the page title and lede: the chips, then the list.
  // The entrances sit on wrappers the filter never hides, so they play once and never replay.
  return (
    <>
      <div className={`container ${styles.bar}`} data-work-filter data-enter style={{ ['--i' as string]: 2 }}>
        <p className={styles.filterLabel} id="work-filter-label">Filter case studies</p>
        <div ref={chips} className={styles.chips} role="group" aria-labelledby="work-filter-label">
          {SECTORS.map((f) => (
            <button key={f.id} type="button" className={styles.chip} aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
              {f.label}
            </button>
          ))}
          <span className={styles.break} aria-hidden="true" />
          <span className={styles.groupLabel} id="work-found-label">What I found</span>
          {PLACES.map((f) => (
            <button key={f.id} type="button" className={styles.chip} aria-pressed={filter === f.id} aria-describedby="work-found-label" onClick={() => choose(f.id)}>
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
