import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ButtonLink.module.css';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'ghost' | 'text';
  arrow?: boolean;
  className?: string;
  /** Data attribute for analytics: which button was used. */
  track?: string;
};

export function ButtonLink({ href, children, variant = 'solid', arrow = false, className, track }: Props) {
  const external = /^https?:/.test(href);
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ''}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? (
        <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} data-track={track} rel="noopener">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track}>
      {inner}
    </Link>
  );
}
