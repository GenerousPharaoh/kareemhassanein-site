import { pageMeta } from '@/lib/meta';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { CheckOffer, OfferRow } from '@/components/sales/Offers';
import { ProblemFirstSection } from '@/components/sales/ProblemFirstSection';
import { splitPrice } from '@/components/sales/style';
import { PRICING_FAQ } from '@/content/faq';
import { OFFERS, PRICE_NOTE } from '@/content/offers';
import { SITE } from '@/content/site';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'Fixed prices for websites, booking and ads',
  description:
    'A $1,500 website check, fixes from $1,000, two-week sprints from $5,000, new websites from $10,000 and monthly plans from $1,000 a month. Fixed prices, agreed before work starts.',
  path: '/pricing',
});

export default function PricingPage() {
  const check = OFFERS.find((o) => o.id === 'check');
  const rest = OFFERS.filter((o) => o.id !== 'check');

  return (
    <>
      <section className={styles.opening} aria-labelledby="pricing-title">
        <div className={`container ${styles.overview}`}>
          <div className={styles.intro}>
            <p className="t-label">Pricing</p>
            <DisplayTitle id="pricing-title" className={styles.title}>Know the cost before anything starts.</DisplayTitle>
            <p className={styles.lede}>Five ways to work with me, each at a fixed price. Start from what is wrong, or read the list.</p>
            <ButtonLink href={SITE.bookingHref} variant="text" arrow track="pricing-hero-call">Book a 20-minute call</ButtonLink>
          </div>
          <div className={styles.index}>
            <nav aria-label="Compare offers">
              {OFFERS.map((offer, i) => {
                const price = splitPrice(offer.price);
                return (
                  <Link key={offer.id} href={`#${offer.id}`} className={styles.offerLink} data-enter style={{ ['--i' as string]: i + 2 }}>
                    <span className={styles.offerName}>{offer.name}</span>
                    <span className={styles.indexPrice}>
                      {price.from ? <span className={styles.priceQualifier}>from </span> : null}
                      <span className={styles.priceFigure}>{price.figure}</span>
                      {price.suffix ? <span className={styles.priceQualifier}> {price.suffix}</span> : null}
                    </span>
                    <svg className={styles.indexArrow} viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 2.5v10M4 8.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                );
              })}
            </nav>
            <p className={styles.note}>{PRICE_NOTE}</p>
          </div>
        </div>
      </section>

      <ProblemFirstSection />

      <section className={styles.offers} aria-label="Offers">
        <div className={`container ${styles.inner}`}>
          {check ? <CheckOffer offer={check} /> : null}
          <div className={styles.cards}>
            {rest.map((o) => (
              <OfferRow key={o.id} offer={o} />
            ))}
          </div>
          <Link href="/about#how-title" className={styles.processLink}>
            How I work
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>

      <Faq id="pricing-faq" title="Questions about price" intro="If yours is not here, ask me on the call." items={PRICING_FAQ} />

      <CloseCall
        id="pricing-close"
        track="pricing-close"
        title={
          <>
            Still not sure? <span>Start with a call.</span>
          </>
        }
        text="Twenty minutes, and you leave knowing which step makes sense for you."
      />
    </>
  );
}
