import type { ReactNode } from 'react';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { enter } from './enter';
import styles from './PageHead.module.css';

type Props = {
  label: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** Anything under the lede: actions, a meta line. */
  children?: ReactNode;
  /** Narrower measure for long titles. */
  measure?: 'tight' | 'wide';
  className?: string;
};

/** The first screen of a page: a small label, the one h1, and a lede. */
export function PageHead({ label, title, lede, children, measure = 'tight', className }: Props) {
  return (
    <header className={`${styles.head} ${className ?? ''}`}>
      <p className={`t-label ${styles.label}`} data-enter style={enter(0)}>
        {label}
      </p>
      <DisplayTitle className={`t-h1 ${styles.title}`} data-measure={measure}>
        {title}
      </DisplayTitle>
      {lede ? (
        <p className="t-lede" data-enter style={enter(2)}>
          {lede}
        </p>
      ) : null}
      {children ? (
        <div className={styles.extra} data-enter style={enter(3)}>
          {children}
        </div>
      ) : null}
    </header>
  );
}
