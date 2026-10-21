'use client';

import { useRef, useState } from 'react';
import { SITE } from '@/content/site';
import styles from './CopyEmail.module.css';

/** The address as selectable text, with a copy button that falls back to selecting it. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const text = useRef<HTMLAnchorElement>(null);

  const select = () => {
    const el = text.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      select();
    }
  };

  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      <a ref={text} href={`mailto:${SITE.email}`} className={styles.address} data-track="email">
        {SITE.email}
      </a>
      <button type="button" className={styles.copy} onClick={copy} data-track="email-copy">
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </span>
  );
}
