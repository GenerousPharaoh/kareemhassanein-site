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
  /** Short facts under the work, set as a ruled row. */
  specs?: Spec[];
  /** The work, across the page under the pitch (a HeroStage). */
  stage?: ReactNode;
};

/**
 * The first screen of a sales page: the headline large, what it is and two ways to start beside it,
 * then the work across the page and the facts under it.
 */
export function Hero({ label, title, lede, track, specs, stage }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={`t-label ${styles.label}`} data-enter style={enterAt(0)}>
            {label}
          </p>
          <DisplayTitle id="page-title" className={`t-hero ${styles.title}`}>
            {title}
          </DisplayTitle>
          <div className={styles.side}>
            <p className={`t-lede ${styles.lede}`} data-enter style={enterAt(2)}>
              {lede}
            </p>
            <div data-enter style={enterAt(3)}>
              <BookActions track={track} />
            </div>
          </div>
        </div>
        {stage ? <div className={styles.stage}>{stage}</div> : null}
        {specs?.length ? (
          <dl className={styles.specs} data-enter style={enterAt(4)}>
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
