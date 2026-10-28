import { SectionHead } from './SectionHead';
import styles from './BuildList.module.css';

export type BuildItem = { title: string; text: string };

type Props = {
  id: string;
  label?: string;
  title: string;
  intro?: string;
  items: BuildItem[];
};

/** What I build, each piece with one plain sentence on what it means for the practice. */
export function BuildList({ id, label, title, intro, items }: Props) {
  return (
    <section className={`paper section sheet-up ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} label={label} title={title} intro={intro} split />
        <ul className={styles.list}>
          {items.map((it) => (
            <li key={it.title} className={styles.item}>
              <h3 className={styles.title}>{it.title}</h3>
              <p className={styles.text}>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
