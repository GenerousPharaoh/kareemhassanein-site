import type { ReactNode } from 'react';
import { BookActions } from './BookActions';
import styles from './CloseCall.module.css';

type Props = {
  id: string;
  title: ReactNode;
  text: ReactNode;
  track: string;
};

/** Every page ends with a way to book a call, on the dark band that runs into the footer. */
export function CloseCall({ id, title, text, track }: Props) {
  return (
    <section className={`night ${styles.close}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`} data-reveal>
        <p className="t-label">Next step</p>
        <h2 id={id} className={`t-h1 ${styles.title}`}>
          {title}
        </h2>
        <div className={styles.row}>
          <p className={`t-lede ${styles.text}`}>{text}</p>
          <BookActions track={track} />
        </div>
      </div>
    </section>
  );
}
