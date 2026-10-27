import { SectionHead } from './SectionHead';
import { Disclosure } from '@/components/ui/Disclosure';
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
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} label={label} title={title} intro={intro} split />
        <div>
          {items.map((it) => (
            <Disclosure key={it.title} title={it.title}>
              <p className={styles.text}>{it.text}</p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
