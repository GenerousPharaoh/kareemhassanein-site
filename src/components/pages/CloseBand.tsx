import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import { Keep } from './Keep';
import styles from './CloseBand.module.css';

const CHECK_PRICE = OFFERS.find((o) => o.id === 'check')?.price ?? '$1,500';

type Props = {
  title?: ReactNode;
  line?: ReactNode;
  /** Show the website check beside the call. */
  check?: boolean;
  /** Analytics label prefix for the two buttons. */
  track?: string;
};

/** The way every page ends: a call, or the website check. */
export function CloseBand({
  title = (
    <>
      Start with a <Keep>20-minute</Keep> call.
    </>
  ),
  line = 'Tell me what is not working. There is nothing to prepare except your site address.',
  check = true,
  track = 'close',
}: Props) {
  return (
    <section className={styles.band} aria-labelledby="close-title">
      <div className={`container ${styles.inner}`} data-reveal>
        <div className={styles.copy}>
          <p className="t-label">Next step</p>
          <h2 id="close-title" className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          <p className={styles.line}>{line}</p>
        </div>
        <div className={styles.actions}>
          <ButtonLink href={SITE.bookingHref} arrow track={`${track}-book`} className={styles.button}>
            Book a 20-minute call
          </ButtonLink>
          {check ? (
            <ButtonLink href={SITE.checkHref} variant="ghost" track={`${track}-check`} className={styles.button}>
              {`Start with a website check, ${CHECK_PRICE}`}
            </ButtonLink>
          ) : null}
          <p className={styles.reply}>
            <span className={styles.dot} aria-hidden="true" />
            {SITE.reply}
          </p>
        </div>
      </div>
    </section>
  );
}
