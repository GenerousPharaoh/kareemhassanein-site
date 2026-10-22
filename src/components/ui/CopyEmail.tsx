'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/content/site';
import styles from './CopyEmail.module.css';

/**
 * The address as selectable text, with a copy button. Without the Clipboard API it selects the
 * address and tries the older copy command; it only says Copied when the copy happened.
 */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const text = useRef<HTMLAnchorElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

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
    let ok = false;
    try {
      await navigator.clipboard.writeText(SITE.email);
      ok = true;
    } catch {
      select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
    }
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      <a ref={text} href={`mailto:${SITE.email}`} className={styles.address} data-track="email">
        {SITE.email}
      </a>
      {/* Both words share one cell, so the button keeps its width and nothing beside it moves */}
      <button type="button" className={styles.copy} onClick={copy} data-track="email-copy" data-copied={copied || undefined}>
        <span className={styles.label} aria-hidden={copied || undefined}>
          Copy
        </span>
        <span className={styles.label} aria-hidden={!copied || undefined}>
          Copied
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </span>
  );
}
