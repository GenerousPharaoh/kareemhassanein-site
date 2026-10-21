import type { ReactNode } from 'react';
import styles from './Frames.module.css';

/** A quiet browser window: a slim bar with the site's address, nothing else. */
export function BrowserFrame({ domain, children, className }: { domain?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.browser} ${className ?? ''}`}>
      <div className={styles.bar} aria-hidden="true">
        {domain ? <span className={styles.url}>{domain}</span> : null}
      </div>
      <div className={styles.viewport}>{children}</div>
    </div>
  );
}

/**
 * A phone outline whose bezel and corners scale with its width. The outer box is the size
 * container (an element cannot query itself), so size and place the phone with className.
 */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.phoneBox} ${className ?? ''}`}>
      <div className={styles.phone}>
        <div className={styles.screen}>{children}</div>
      </div>
    </div>
  );
}

/** A bare screen with rounded corners, for crops of a page. */
export function ScreenFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.screenFrame} ${className ?? ''}`}>{children}</div>;
}
