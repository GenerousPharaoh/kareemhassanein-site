import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

type Props = {
  id: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Title and intro side by side on wide screens. */
  split?: boolean;
  className?: string;
};

/** A section's small label, its heading and an optional line of introduction. */
export function SectionHead({ id, label, title, intro, split = false, className }: Props) {
  return (
    <div className={`${styles.head} ${className ?? ''}`} data-split={split || undefined}>
      <div className={styles.main}>
        {label ? <p className="t-label">{label}</p> : null}
        <h2 id={id} className={`t-h2 ${styles.title}`}>
          {title}
        </h2>
      </div>
      {intro ? <p className={`t-lede ${styles.intro}`}>{intro}</p> : null}
    </div>
  );
}
