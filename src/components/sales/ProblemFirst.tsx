'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './ProblemFirst.module.css';

export type ProblemChip = { slug: string; short: string; ground: string; accent: string };

export type ProblemItem = {
  id: string;
  say: string;
  offer: { id: string; label: string; name: string; price: string };
  include?: string;
  note: string;
  cases: ProblemChip[];
};

function Answer({ item }: { item: ProblemItem }) {
  const toCheck = item.offer.id === 'check';
  return (
    <div className={styles.answer} key={item.id}>
      <p className={styles.answerLabel}>{item.offer.label}</p>
      <p className={styles.offerLine}>
        <span className={styles.offerName}>{item.offer.name}</span>
        <span className={styles.offerPrice}>{item.offer.price}</span>
      </p>
      {item.include ? <p className={styles.include}>{item.include}</p> : null}
      <p className={styles.note}>{item.note}</p>
      <div className={styles.foot}>
        {item.cases.length ? (
          <ul className={styles.cases} aria-label="From the work">
            {item.cases.map((c) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} className={styles.case} style={{ '--dot': c.ground, '--dot-ring': c.accent } as CSSProperties}>
                  <span className={styles.dot} aria-hidden="true" />
                  {c.short}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link href={toCheck ? '/book/check' : `#${item.offer.id}`} className={styles.go}>
          {toCheck ? 'Start with the check' : 'See the offer'}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {toCheck ? (
              <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M8 2.5v10M4 8.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </Link>
      </div>
    </div>
  );
}

/**
 * The problem in the owner's words on the left, the place to start on the right. On a phone the
 * answer opens under the line that was tapped. A marker slides to the chosen line.
 */
export function ProblemFirst({ items }: { items: ProblemItem[] }) {
  const [current, setCurrent] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const item = items[current];

  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      const button = el.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!button) return;
      el.style.setProperty('--mark-y', `${button.offsetTop}px`);
      el.style.setProperty('--mark-h', `${button.offsetHeight}px`);
      el.dataset.measured = '';
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    void document.fonts.ready.then(measure);
    return () => resize.disconnect();
  }, [current]);

  return (
    <div className={styles.layout}>
      <ol ref={list} className={styles.list}>
        <span className={styles.marker} aria-hidden="true" />
        {items.map((it, i) => (
          <li key={it.id} className={styles.row} data-current={i === current || undefined}>
            <button type="button" className={styles.say} aria-pressed={i === current} aria-controls="problem-answer" onClick={() => setCurrent(i)}>
              {it.say}
            </button>
            {i === current ? (
              <div className={styles.inline}>
                <Answer item={it} />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <div id="problem-answer" className={styles.side} aria-live="polite">
        <Answer item={item} />
      </div>
    </div>
  );
}
