import Link from 'next/link';
import { RollText } from '@/components/motion/RollText';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import s from './HomeEnd.module.css';

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The way in: the website check, at its fixed price. */
export function Offer() {
  const check = OFFERS.find((o) => o.id === 'check')!;
  return (
    <section className={`paper sheet-up ${s.offer}`} aria-labelledby="offer-h">
      <div className={`container ${s.offerGrid}`}>
        <div className={s.offerMain}>
          <SplitReveal id="offer-h" className={s.offerTitle}>
            Start with the <em>website check</em>
          </SplitReveal>
          <p className={s.offerSummary}>{check.summary}</p>
        </div>
        <div className={s.offerSide}>
          <p className={s.price}>{check.price}</p>
          <ul className={s.includes}>
            {check.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className={s.terms}>{check.terms}</p>
          <div className={s.offerLinks}>
            <Link href={SITE.checkHref} className={s.primary} data-track="home-check">
              Start with the check
              <Arrow />
            </Link>
            <Link href="/pricing" className={s.secondary}>
              All prices
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The end of the page: one large way to book. */
export function Close() {
  return (
    <section className={`sheet-up ${s.close}`} aria-labelledby="close-h">
      <div className="container">
        <p className={s.kicker}>{SITE.reply}</p>
        <h2 id="close-h" className={s.closeTitle}>
          <Link href={SITE.bookingHref} className={s.big} data-track="home-close-book">
            <RollText text="Book a 20-minute call" />
            <span className={s.bigArrow} aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </h2>
        <p className={s.alt}>Tell me what is not working. There is nothing to prepare except your site address.</p>
      </div>
    </section>
  );
}
