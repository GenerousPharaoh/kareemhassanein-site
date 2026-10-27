import { SectionHead } from './SectionHead';
import { Disclosure } from '@/components/ui/Disclosure';
import styles from './Steps.module.css';

export type Step = { title: string; text: string };

type Props = {
  id: string;
  title: string;
  intro?: string;
  steps: Step[];
  note?: string;
  collapsible?: boolean;
};

/** What happens, in order, from the first call to the handover. */
export function Steps({ id, title, intro, steps, note, collapsible = false }: Props) {
  const sequence = (
    <ol className={styles.steps}>
      {steps.map((s, n) => (
        <li key={s.title} className={styles.step} data-last={n === steps.length - 1 || undefined}>
          <span className={styles.node} aria-hidden="true">{n + 1}</span>
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.text}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
  return (
    <section className={`night section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} label="Working together" title={title} intro={intro} split />
        {collapsible ? (
          <Disclosure title="From the first call to handover" compact className={styles.disclosure}>
            {sequence}
          </Disclosure>
        ) : sequence}
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
    </section>
  );
}
