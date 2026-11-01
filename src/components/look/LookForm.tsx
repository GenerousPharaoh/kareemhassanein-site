'use client';

import { useRouter } from 'next/navigation';
import { useId, useRef, useState, useTransition, type FormEvent } from 'react';
import styles from './LookForm.module.css';

type Props = {
  /** The address already looked at, so the field keeps it. */
  initial?: string;
  /** Where the look is started from, for the analytics label. */
  track: string;
  /** The page's own field is larger and takes focus on arrival. */
  large?: boolean;
  autoFocus?: boolean;
  /** On the look page itself the result arrives below, so the button reads as reading, not going. */
  onPage?: boolean;
};

/**
 * One field: paste an address, get a first look. Without JavaScript it is a plain GET form to /look;
 * with it, the same navigation happens in place and the field shows that the page is being read.
 */
export function LookForm({ initial = '', track, large = false, autoFocus = false, onPage = false }: Props) {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const field = useRef<HTMLInputElement>(null);

  // The field follows the address in the page once a look has arrived (state adjusted during render)
  const [seen, setSeen] = useState(initial);
  if (seen !== initial) {
    setSeen(initial);
    setValue(initial);
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = value.trim();
    if (!address) {
      field.current?.focus();
      return;
    }
    startTransition(() => {
      router.push(`/look?url=${encodeURIComponent(address)}`);
    });
  };

  // While the page is being read, the fallback marks the document (Looking in Report.tsx); CSS reads both.
  const busy = pending;
  return (
    <form className={styles.form} action="/look" method="get" onSubmit={submit} data-large={large || undefined} data-busy={busy || undefined} data-track={track}>
      <label htmlFor={id} className={styles.label}>
        Your site address
      </label>
      <div className={styles.row}>
        <input
          ref={field}
          id={id}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="yourpractice.com"
          maxLength={300}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          aria-describedby={`${id}-note`}
        />
        <button type="submit" className={styles.button} aria-disabled={busy || undefined}>
          <span className={styles.buttonText} data-state={busy ? 'busy' : 'ready'}>
            <span>{onPage ? 'Look' : 'First look'}</span>
            <span aria-hidden="true">Reading</span>
          </span>
          <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <p id={`${id}-note`} className={styles.note}>
        A few seconds, read from the page itself. Nothing is stored.
      </p>
      <p role="status" aria-live="polite" className="sr-only">{busy ? 'Reading the page.' : ''}</p>
    </form>
  );
}
