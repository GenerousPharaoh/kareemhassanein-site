import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Wording.module.css';

export type WordingExample = { slug: string; name: string; text: string };

type Props = {
  id: string;
  title: ReactNode;
  text: ReactNode;
  /** Real changes from the work, each linked to its case. */
  examples: WordingExample[];
  /** Sample lines marked up with <Removed> and <Added>. */
  lines: ReactNode[];
  sheetNote: string;
};

export function Removed({ children }: { children: ReactNode }) {
  return (
    <del className={styles.del}>
      <span className="sr-only">Removed: </span>
      {children}
    </del>
  );
}

export function Added({ children }: { children: ReactNode }) {
  return (
    <ins className={styles.ins}>
      <span className="sr-only">Added: </span>
      {children}
    </ins>
  );
}

/** How the wording is written: to the college's rules, approved by the owner, with a marked-up sample. */
export function Wording({ id, title, text, examples, lines, sheetNote }: Props) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="t-label">Wording</p>
          <h2 id={id} className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          <p className={`t-lede ${styles.text}`}>{text}</p>
          <ul className={styles.examples}>
            {examples.map((e) => (
              <li key={e.slug} className={styles.example}>
                <Link href={`/work/${e.slug}`} className={styles.case}>
                  {e.name}
                  <span className="sr-only">: read the case</span>
                </Link>
                <span>{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className={styles.sheet} data-reveal>
          <figcaption className={styles.sheetHead}>
            <span>A wording pass, marked up</span>
            <span className={styles.legend} aria-hidden="true">
              <span className={styles.legendDel}>removed</span>
              <span className={styles.legendIns}>added</span>
            </span>
          </figcaption>
          <ul className={styles.lines}>
            {lines.map((line, n) => (
              <li key={n} className={styles.line}>
                {line}
              </li>
            ))}
          </ul>
          <p className={styles.sheetNote}>{sheetNote}</p>
        </figure>
      </div>
    </section>
  );
}
