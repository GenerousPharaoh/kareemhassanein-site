import { ButtonLink } from '@/components/ui/ButtonLink';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import styles from './BookActions.module.css';

const checkPrice = OFFERS.find((o) => o.id === 'check')?.price ?? '$1,500';

/** The two ways to start, and the reply promise. Used in every hero and every close. */
export function BookActions({ track, className }: { track: string; className?: string }) {
  return (
    <div className={`${styles.actions} ${className ?? ''}`}>
      <div className={styles.buttons}>
        <ButtonLink href={SITE.bookingHref} arrow track={`${track}-book`} className={styles.button}>
          Book a 20-minute call
        </ButtonLink>
        <ButtonLink href={SITE.checkHref} variant="ghost" track={`${track}-check`} className={styles.button}>
          {`Start with a website check, ${checkPrice}`}
        </ButtonLink>
      </div>
      <p className={styles.reply}>
        <span className={styles.dot} aria-hidden="true" />
        {SITE.reply}
      </p>
    </div>
  );
}
