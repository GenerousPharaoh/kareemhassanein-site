import { pageMeta } from '@/lib/meta';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { CheckOffer, OfferRow } from '@/components/sales/Offers';
import { splitPrice } from '@/components/sales/style';
import { Steps, type Step } from '@/components/sales/Steps';
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

const STEPS: Step[] = [
  {
    title: 'A 20-minute call',
    text: 'You tell me what is not working, what you have tried, and what a new patient or client is worth to you. I tell you which step makes sense.',
  },
  {
    title: 'The check, in five business days',
    text: 'A recorded walkthrough of what I found, and a ranked list with a fixed price beside each fix.',
  },
  {
    title: 'A short proposal',
    text: 'One page: your problem in your words, what I found, and three options from a focused fix to the whole path, with a fixed price for each.',
  },
  {
    title: 'Agreement and deposit',
    text: 'You choose an option and sign a short agreement. Work starts when the deposit clears.',
  },
  {
    title: 'A short weekly update',
    text: 'One message a week until handover: what changed, what is next and anything I need from you. Every change is logged and can be undone.',
  },
  {
    title: 'Handover',
    text: 'Accounts confirmed in your name, a short guide to what was built, and the offer of a monthly plan if you want one.',
  },
];

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
            <p className={styles.lede}>Start with the website check, or go straight to a fix if you already know the problem. Every price is fixed, and agreed before any work begins.</p>
            <ButtonLink href={SITE.bookingHref} variant="text" arrow track="pricing-hero-call">Book a 20-minute call</ButtonLink>
          </div>
          <div className={styles.index}>
            <nav aria-label="Compare offers">
              {OFFERS.map((offer) => {
                const price = splitPrice(offer.price);
                return (
                  <Link key={offer.id} href={`#${offer.id}`} className={styles.offerLink}>
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

      <section className={styles.offers} aria-label="Offers">
        <div className={`container ${styles.inner}`}>
          {check ? <CheckOffer offer={check} /> : null}
          <div className={styles.cards}>
            {rest.map((o) => (
              <OfferRow key={o.id} offer={o} />
            ))}
          </div>
        </div>
      </section>

      <Steps
        id="pricing-steps"
        title="How working together goes"
        intro="From the first call to the handover, you know what happens next and what it costs."
        steps={STEPS}
        note="If you already know the problem, the check can be skipped: the call goes straight to a proposal for the fix."
      />

      <Faq id="pricing-faq" title="Questions about price" intro="If yours is not here, ask me on the call." items={PRICING_FAQ} />

      <CloseCall
        id="pricing-close"
        track="pricing-close"
        title={
          <>
            Not sure which one fits? <span>Start with a call.</span>
          </>
        }
        text="Tell me what is not working and I will tell you which step makes sense: usually the check, sometimes a single fix."
      />
    </>
  );
}
