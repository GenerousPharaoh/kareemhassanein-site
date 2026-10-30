import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/content/site';
import { OFFERS } from '@/content/offers';
import { CallDial } from './CallDial';
import s from './CallInvitation.module.css';

type Props = { id: string; title: ReactNode; text: ReactNode; track: string; check?: boolean };

/** A consistent, personal invitation at the end of the supporting pages. */
export function CallInvitation({ id, title, text, track, check = true }: Props) {
  const price = OFFERS.find((o) => o.id === 'check')!.price;
  return (
    <section className={s.section} aria-labelledby={id} data-invitation data-theme="dark">
      <div className={`container ${s.layout}`}>
        <div className={s.copy}>
          <h2 id={id} className={s.title}>{title}</h2>
          <p className={s.text}>{text}</p>
        </div>
        <div className={s.actions}>
          <Link href={SITE.bookingHref} className={s.call} data-track={`${track}-book`}>
            <CallDial />
            <span className={s.callText}>Book a{' '}<br />20-minute call</span>
            <span className={s.arrowWindow} aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M7 25 25 7M7 7h18v18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </Link>
          <div className={s.details}>
            {check ? <Link href={SITE.checkHref} className={s.check} data-track={`${track}-check`}>Start with a website check, {price}<span aria-hidden="true">↗</span></Link> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
