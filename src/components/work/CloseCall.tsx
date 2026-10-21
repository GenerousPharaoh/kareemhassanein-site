import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import styles from './CloseCall.module.css';

type Props = {
  title: string;
  body: ReactNode;
  /** Prefix for the analytics labels on the two buttons. */
  track: string;
};

/** The end of every work page: a call, or the website check. */
export function CloseCall({ title, body, track }: Props) {
  const check = OFFERS.find((o) => o.id === 'check');
  return (
    <section className={`container ${styles.close}`} aria-labelledby={`${track}-close`}>
      <div className={styles.inner} data-reveal>
        <h2 id={`${track}-close`} className={styles.title}>
          {title}
        </h2>
        <div className={styles.side}>
          <p className={styles.body}>{body}</p>
          <div className={styles.actions}>
            <ButtonLink href={SITE.bookingHref} arrow track={`${track}-book`}>
              Book a 20-minute call
            </ButtonLink>
            <ButtonLink href={SITE.checkHref} variant="ghost" track={`${track}-check`}>
              Start with a website check, {check?.price ?? '$1,500'}
            </ButtonLink>
          </div>
          <p className={styles.reply}>{SITE.reply}</p>
        </div>
      </div>
    </section>
  );
}
