import type { ReactNode } from 'react';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { BookActions } from './BookActions';
import { enterAt } from './style';
import styles from './Hero.module.css';

export type Spec = { term: string; detail: ReactNode };

type Props = {
  label: string;
  title: ReactNode;
  lede: ReactNode;
  /** Prefix for the buttons' analytics names. */
  track: string;
  /** Short facts under the pitch, set as a ruled list. */
  specs?: Spec[];
  /** Work shown beside the pitch on wide screens and after it on phones. */
  aside?: ReactNode;
};

/** The first screen of a sales page: what it is, who it is for, and two ways to start. */
export function Hero({ label, title, lede, track, specs, aside }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="page-title" data-aside={aside ? '' : undefined}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`t-label ${styles.label}`} data-enter style={enterAt(0)}>
            {label}
          </p>
          <DisplayTitle id="page-title" className={`t-hero ${styles.title}`}>
            {title}
          </DisplayTitle>
          <p className={`t-lede ${styles.lede}`} data-enter style={enterAt(2)}>
            {lede}
          </p>
          <div data-enter style={enterAt(3)}>
            <BookActions track={track} />
          </div>
        </div>
        {aside ? (
          <div className={styles.aside} data-enter style={enterAt(4)}>
            {aside}
          </div>
        ) : null}
        {specs?.length ? (
          <dl className={styles.specs} data-enter style={enterAt(aside ? 5 : 4)}>
            {specs.map((s) => (
              <div key={s.term} className={styles.spec}>
                <dt>{s.term}</dt>
                <dd>{s.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
