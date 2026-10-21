import type { ReactNode } from 'react';
import type { Measured } from '@/content/cases';
import styles from './Story.module.css';

/** One part of the story: a label that stays in view on wide screens, and its content. */
export function StoryBlock({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section className={styles.block} aria-labelledby={id}>
      <h2 id={id} className={styles.label}>
        {label}
      </h2>
      <div className={styles.body} data-reveal>
        {children}
      </div>
    </section>
  );
}

/** Findings and decisions, numbered so they can be referred to. */
export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={styles.numbered}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ol>
  );
}

/** What was delivered, read like a specification. */
export function ShippedList({ items }: { items: string[] }) {
  return (
    <ul className={styles.shipped}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** Each measured fact stated plainly, with how it was measured underneath. */
export function MeasuredList({ items }: { items: Measured[] }) {
  return (
    <ul className={styles.measured}>
      {items.map((m) => (
        <li key={m.fact}>
          <p className={styles.fact}>{m.fact}</p>
          {m.how ? <p className={styles.how}>{m.how}</p> : null}
        </li>
      ))}
    </ul>
  );
}

/** Credit where an outcome belongs to someone else. */
export function Credit({ children }: { children: ReactNode }) {
  return (
    <p className={styles.credit}>
      <span className={styles.creditLabel}>Credit</span>
      <span>{children}</span>
    </p>
  );
}
