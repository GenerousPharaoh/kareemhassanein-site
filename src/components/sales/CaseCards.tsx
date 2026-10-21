import Link from 'next/link';
import type { CaseStudy } from '@/content/cases';
import { CasePlate } from './CasePlate';
import { SectionHead } from './SectionHead';
import { paletteVars } from './style';
import styles from './CaseCards.module.css';

export type CaseCard = {
  c: CaseStudy;
  /** One concrete line from the case, with a short label such as "Shipped" or "Measured". */
  point: { label: string; text: string };
};

/** Cases as cards in their clients' own palettes; the first leads, wider, on large screens. */
export function CaseCards({ items }: { items: CaseCard[] }) {
  return (
    <ul className={styles.grid}>
      {items.map(({ c, point }, n) => (
        <li key={c.slug} className={styles.card} data-lead={n === 0 || undefined} style={paletteVars(c.palette)} data-reveal>
          <div className={styles.media}>
            <CasePlate
              desktop={c.plate.desktop}
              phone={c.plate.phone}
              domain={c.domain}
              desktopSizes="(min-width: 1240px) 640px, (min-width: 1000px) 50vw, 84vw"
              phoneSizes="(min-width: 1240px) 150px, (min-width: 1000px) 12vw, 20vw"
            />
          </div>
          <div className={styles.body}>
            <p className={styles.kind}>{c.kindLabel}</p>
            <h3 className={styles.name}>
              <Link href={`/work/${c.slug}`} className={styles.link} data-track={`card-${c.slug}`}>
                {c.name}
                <span className="sr-only">: read the case</span>
              </Link>
            </h3>
            <p className={styles.question}>{c.question}</p>
            <p className={styles.point}>
              <span className={styles.pointLabel}>{point.label}</span>
              <span>{point.text}</span>
            </p>
            <span className={styles.more} aria-hidden="true">
              Read the case
              <svg viewBox="0 0 16 16">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

type SectionProps = { id: string; label?: string; title: string; intro?: string; items: CaseCard[] };

/** The cards with their heading, as a section of a page. */
export function CaseCardsSection({ id, label, title, intro, items }: SectionProps) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} label={label} title={title} intro={intro} split />
        <CaseCards items={items} />
      </div>
    </section>
  );
}
