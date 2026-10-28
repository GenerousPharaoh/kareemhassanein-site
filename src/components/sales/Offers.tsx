import { ButtonLink } from '@/components/ui/ButtonLink';
import type { Offer } from '@/content/offers';
import { SITE } from '@/content/site';
import { enterAt, splitPrice } from './style';
import styles from './Offers.module.css';

function Price({ price, large = false }: { price: string; large?: boolean }) {
  const { from, figure, suffix } = splitPrice(price);
  return (
    <p className={styles.price} data-large={large || undefined}>
      {from ? <span className={styles.small}>from</span> : null}
      <span className={styles.figure}>{figure}</span>
      {suffix ? <span className={styles.small}>{suffix}</span> : null}
    </p>
  );
}

/** "Grow: Google profile, ..." sets its plan name in bold; plain lines stay plain. */
function Includes({ items }: { items: string[] }) {
  return (
    <ul className={styles.includes}>
      {items.map((s) => {
        const m = /^([^:]{2,40}):\s(.+)$/.exec(s);
        return (
          <li key={s}>
            {m ? (
              <>
                <strong>{m[1]}:</strong> {m[2]}
              </>
            ) : (
              s
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The website check, set apart as the way in. On wide screens its top shows in the first screen, so
 * it enters after the hero above it (the hero's label, title, lede, actions and facts are 0 to 4).
 */
export function CheckOffer({ offer }: { offer: Offer }) {
  const id = `offer-${offer.id}`;
  return (
    <article className={`paper ${styles.feature}`} id={offer.id} aria-labelledby={id} data-enter style={enterAt(5)} data-theme="light">
      <div className={styles.featureMain}>
        <h2 id={id} className={styles.featureName}>
          {offer.name}
        </h2>
        <Price price={offer.price} large />
        <p className={styles.featureSummary}>{offer.summary}</p>
        <div className={styles.featureAction}>
          <ButtonLink href={SITE.checkHref} arrow track="pricing-check">
            Start with a website check
          </ButtonLink>
        </div>
      </div>
      <div className={styles.featureSide}>
        <h3 className={styles.sideTitle}>What you get</h3>
        <Includes items={offer.includes} />
        <p className={styles.featureTerms}>{offer.terms}</p>
      </div>
    </article>
  );
}

/** One offer: what it is for, its price, what is included and how payment works. */
export function OfferRow({ offer }: { offer: Offer }) {
  const id = `offer-${offer.id}`;
  return (
    <article className={styles.row} id={offer.id} aria-labelledby={id}>
      <div className={styles.heading}>
        <h2 id={id} className={styles.name}>
          {offer.name}
        </h2>
        <div className={styles.priceBlock}>
          <Price price={offer.price} />
          {offer.priceNote ? <p className={styles.priceNote}>{offer.priceNote}</p> : null}
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.summary}>{offer.summary}</p>
        <p className={styles.terms}>{offer.terms}</p>
        <div className={styles.included}>
          <h3 className={styles.includedTitle}>What’s included</h3>
          <Includes items={offer.includes} />
        </div>
      </div>
    </article>
  );
}
