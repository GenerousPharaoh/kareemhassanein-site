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
  title: 'Fixed prices for websites and online marketing',
  description:
    'A $1,500 website check, fixes from $1,000, two-week sprints from $5,000, new websites from $10,000 and monthly plans from $1,000 a month. Fixed prices, agreed before work starts.',
  path: '/pricing',
});

const STEPS: Step[] = [
  {
    title: 'A 20-minute call',
    text: 'I ask about the website or marketing work you need and what you have tried. I recommend a review, a specific fix or a larger project.',
  },
  {
    title: 'The check, in five business days',
    text: 'A recorded walkthrough of what I found, and a ranked list with a fixed price beside each fix.',
  },
  {
    title: 'A short proposal',
    text: 'A one-page proposal with the problem, my findings and three options for the work, each with a scope and fixed price.',
  },
  {
    title: 'Agreement and deposit',
    text: 'You choose an option and sign a short agreement. Work starts when the deposit clears.',
  },
  {
    title: 'A short weekly update',
    text: 'A weekly update until handover: completed work, the next steps and anything I need from you. I record changes and keep rollback instructions.',
  },
  {
    title: 'Handover',
    text: 'I confirm account ownership, provide a short guide to the site and tools, and discuss ongoing support if you need it.',
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
            <DisplayTitle id="pricing-title" className={styles.title}>Projects and monthly plans</DisplayTitle>
            <p className={styles.lede}>I agree the scope and fixed price with you before work starts. Choose a website check if you need a review, or discuss a specific fix or project.</p>
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
        title="From the first call to handover"
        intro="I confirm the scope, price and schedule before work starts, then send weekly updates until handover."
        steps={STEPS}
        note="The website check is optional. If you already know the problem, I can quote the fix after the call."
      />

      <Faq sheet id="pricing-faq" title="Questions about price" items={PRICING_FAQ} />

      <CloseCall
        id="pricing-close"
        track="pricing-close"
        title="Discuss the scope and price"
        text="Describe the work you need on a 20-minute call. I will recommend an option and explain what it includes."
      />
    </>
  );
}
