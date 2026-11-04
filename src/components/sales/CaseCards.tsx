import Link from 'next/link';
import type { CaseStudy } from '@/content/cases';
import { CasePlate } from './CasePlate';
import { SectionHead } from './SectionHead';
import { keepDots, paletteVars } from './style';
import styles from './CaseCards.module.css';

export type CaseCard = {
  c: CaseStudy;
  /** One concrete line from the case, with a short label such as "Shipped" or "Measured". */
  point: { label: string; text: string };
};

/*
  Image sizes follow the layout: the 20px page gutters, the card's padding (22px, then 3.2vw, up to
  44px), the plate's 9% inset for the phone, and on wide screens the lead's 7fr media column or a
  half-width card. The phone is 23% of the plate, never under 92px, less its 2.4% bezel.
*/
const SIZES = {
  lead: {
    desktop: '(min-width: 1280px) 585px, (min-width: 860px) calc(47.6vw - 21px), calc(91vw - 76px)',
    phone: '(min-width: 1280px) 140px, (min-width: 860px) calc(11.4vw - 5px), max(88px, calc(21.9vw - 18px))',
  },
  half: {
    desktop: '(min-width: 1280px) 478px, (min-width: 860px) calc(38.8vw - 18px), calc(91vw - 76px)',
    phone: '(min-width: 1280px) 115px, (min-width: 860px) max(88px, calc(9.3vw - 4px)), max(88px, calc(21.9vw - 18px))',
  },
};

/** Cases as cards in their clients' own palettes; the first leads, wider, on large screens. */
export function CaseCards({ items, concise = false }: { items: CaseCard[]; concise?: boolean }) {
  return (
    <ul className={styles.grid}>
      {items.map(({ c, point }, n) => {
        const sizes = n === 0 ? SIZES.lead : SIZES.half;
        return (
          // The item carries the entrance while the card stays still during interaction.
          <li key={c.slug} className={styles.item} data-lead={n === 0 || undefined} data-reveal>
            <div className={styles.card} data-lead={n === 0 || undefined} style={paletteVars(c.palette)}>
              <div className={styles.media}>
                <CasePlate
                  desktop={c.plate.desktop}
                  phone={c.plate.phone}
                  domain={c.domain}
                  desktopSizes={sizes.desktop}
                  phoneSizes={sizes.phone}
                />
              </div>
              <div className={styles.body}>
                <p className={styles.kind}>{keepDots(c.kindLabel)}</p>
                <h3 className={styles.name}>
                  <Link href={`/work/${c.slug}`} className={styles.link} data-track={`card-${c.slug}`}>
                    {c.name}
                    <span className="sr-only">: read the case</span>
                  </Link>
                </h3>
                {!concise ? <p className={styles.question}>{c.intro}</p> : null}
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
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type SectionProps = { id: string; label?: string; title: string; intro?: string; items: CaseCard[]; concise?: boolean };

/** The cards with their heading, as a section of a page. */
export function CaseCardsSection({ id, label, title, intro, items, concise }: SectionProps) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} label={label} title={title} intro={intro} split />
        <CaseCards items={items} concise={concise} />
      </div>
    </section>
  );
}
