import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Block } from '@/content/notes';
import styles from './NoteBody.module.css';

const MARKS = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Inline text with **strong** and [links](/path). */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(MARKS)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1]) {
      out.push(<strong key={key++}>{m[1]}</strong>);
    } else if (m[3]?.startsWith('/')) {
      out.push(
        <Link key={key++} href={m[3]}>
          {m[2]}
        </Link>
      );
    } else {
      out.push(
        <a key={key++} href={m[3]} rel="noopener">
          {m[2]}
        </a>
      );
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/**
 * A title of two sentences, set as a line and a quieter second line:
 * "Your Google Ads leads might be button clicks." then "How to check in ten minutes."
 */
export function NoteTitle({ text, tailClassName }: { text: string; tailClassName?: string }) {
  const at = text.indexOf('. ');
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at + 1)} <span className={tailClassName}>{text.slice(at + 2)}</span>
    </>
  );
}

/** A note's body, typeset for reading. */
export function NoteBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className={`prose ${styles.body}`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} id={b.id} className={styles.h2}>
                {b.kicker ? <span className={styles.kicker}>{b.kicker}</span> : null}
                <span>{b.text}</span>
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className={styles.h3}>
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className={styles.list}>
                {b.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className={styles.list}>
                {b.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
          case 'callout':
            return (
              <aside key={i} className={styles.callout}>
                <p className={`t-label ${styles.calloutLabel}`}>{b.label}</p>
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          default:
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
