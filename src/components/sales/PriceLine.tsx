import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { OFFERS, PRICE_LINE, PRICE_NOTE } from '@/content/offers';
import { SectionHead } from './SectionHead';
import { splitPrice } from './style';
import styles from './PriceLine.module.css';

const wayIn = OFFERS.find((o) => o.id === 'check')?.label;

/** Each price opens its own card on /pricing; if the two lists ever fall out of step, it opens the page. */
const hrefFor = (i: number, price: string) => {
  const offer = OFFERS[i];
  return offer && offer.price.startsWith(price) ? `/pricing#${offer.id}` : '/pricing';
};

/** The five prices in one line, with the note on currency and size, and the way to the full list. */
export function PriceLine({ id, track }: { id: string; track: string }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <SectionHead id={id} title="What it costs" intro="Fixed prices, agreed before anything starts." split />
        <ul className={styles.line} data-reveal>
          {PRICE_LINE.map((p, n) => {
            const { from, figure, suffix } = splitPrice(p.price);
            return (
              <li key={p.label} className={styles.cell} data-lead={n === 0 || undefined}>
                <Link href={hrefFor(n, p.price)} className={styles.link} data-track={`${track}-price-${n}`}>
                  <span className={styles.label}>{p.label}</span>
                  <span className={styles.price}>
                    {from ? <span className={styles.from}>from</span> : null}
                    <span className={styles.figure}>{figure}</span>
                    {suffix ? <span className={styles.from}>{suffix}</span> : null}
                  </span>
                  {n === 0 && wayIn ? <span className={styles.tag}>{wayIn}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.foot}>
          <p className={styles.note}>{PRICE_NOTE}</p>
          <ButtonLink href="/pricing" variant="ghost" arrow track={`${track}-pricing`}>
            See what each includes
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
