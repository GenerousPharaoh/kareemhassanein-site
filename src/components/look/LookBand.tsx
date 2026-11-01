import type { ReactNode } from 'react';
import { LookForm } from './LookForm';
import styles from './LookBand.module.css';

type Props = {
  id: string;
  title: ReactNode;
  text: ReactNode;
  track: string;
  /** On a light sheet, rising over the section above. */
  sheet?: boolean;
};

/** A first look, offered in the middle of a page: a sentence on what it reads, and the field. */
export function LookBand({ id, title, text, track, sheet = true }: Props) {
  return (
    <section className={`${sheet ? 'paper section sheet-up' : 'section'} ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy} data-reveal>
          <p className="t-label">First look</p>
          <h2 id={id} className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          <p className={`t-lede ${styles.text}`}>{text}</p>
        </div>
        <div className={styles.field} data-reveal>
          <LookForm track={track} />
        </div>
      </div>
    </section>
  );
}
