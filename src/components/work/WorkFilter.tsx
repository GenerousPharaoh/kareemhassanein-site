'use client';

import { useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import styles from './WorkFilter.module.css';

const FILTERS = [
  { id: 'all', label: 'All', status: 'Showing all the work.' },
  { id: 'firms', label: 'Law firms', status: 'Showing law firms.' },
  { id: 'clinics', label: 'Clinics', status: 'Showing clinics.' },
  { id: 'beyond', label: 'Beyond practices', status: 'Showing work beyond practices.' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown };

/**
 * Filter chips over a list rendered on the server. The cards carry data-sectors and their
 * sections data-group; this component only sets data-filter, and CSS does the hiding,
 * so the full list is there without JavaScript.
 */
export function WorkFilter({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [status, setStatus] = useState('');

  const choose = (id: FilterId) => {
    if (id === filter) return;
    const apply = () => {
      setFilter(id);
      setStatus(FILTERS.find((f) => f.id === id)?.status ?? '');
    };
    const doc = document as ViewTransitionDocument;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(() => flushSync(apply));
    else apply();
  };

  return (
    <>
      <div className={`container ${styles.bar}`} data-work-filter>
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
      <div className={styles.results} data-filter={filter}>
        {children}
      </div>
    </>
  );
}
