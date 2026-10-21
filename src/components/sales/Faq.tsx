import Link from 'next/link';
import type { FaqItem } from '@/content/faq';
import styles from './Faq.module.css';

type Props = {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
};

/** Questions as native disclosure widgets: no script, keyboard and screen-reader ready. */
export function Faq({ id, title, intro, items }: Props) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className="t-label">Questions</p>
          <h2 id={id} className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </div>
        <div className={styles.list}>
          {items.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.q}>{f.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                {f.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {f.link ? (
                  <p>
                    <Link href={f.link.href} className={styles.link}>
                      {f.link.label}
                    </Link>
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
