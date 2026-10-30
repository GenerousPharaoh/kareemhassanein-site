import type { ReactNode } from 'react';
import styles from './Disclosure.module.css';

/** The short version stays in view. Supporting detail remains in the document, with no script needed. */
export function Disclosure({ title, children, id, className = '', compact = false, heading = 3 }: {
  title: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
  compact?: boolean;
  heading?: 2 | 3;
}) {
  const Heading = heading === 2 ? 'h2' : 'h3';
  return (
    <details id={id} className={`${styles.item} ${className}`} data-compact={compact || undefined} data-disclosure>
      <summary className={styles.summary}>
        <Heading className={styles.title}>
          <span>{title}</span>
          <span className={styles.icon} aria-hidden="true" />
        </Heading>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
