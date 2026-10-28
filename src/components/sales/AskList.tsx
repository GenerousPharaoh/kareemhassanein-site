import styles from './AskList.module.css';

type Props = {
  id: string;
  title: string;
  /** What owners say, in their own words. */
  items: string[];
  note?: string;
};

/** The problems owners bring, set as their own words on a dark band. */
export function AskList({ id, title, items, note }: Props) {
  return (
    <section className={`night section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 id={id} className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
        <ol className={styles.list}>
          {items.map((q, n) => (
            <li key={q} className={styles.item} data-reveal>
              <span className={styles.num} aria-hidden="true">
                {String(n + 1).padStart(2, '0')}
              </span>
              <p className={styles.quote}>{q}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
