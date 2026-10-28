'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Disclosure } from '@/components/ui/Disclosure';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import { getGsap, useGsap } from '@/lib/gsap';
import s from './HomeEnd.module.css';

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The way in: the website check, at its fixed price, on the same light sheet as the introduction. */
export function Offer() {
  const check = OFFERS.find((o) => o.id === 'check')!;
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    tl.fromTo(el.querySelector('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0).fromTo(
      el.querySelectorAll('[data-up]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06 },
      0.08,
    );
  });

  return (
    <section ref={root} className={`paper ${s.offer}`} aria-labelledby="offer-h" data-theme="light">
      <div className={`container ${s.offerInner}`}>
        <span className={s.offerRule} data-rule aria-hidden="true" />
        <div className={s.offerGrid}>
          <h2 id="offer-h" className={s.offerTitle} data-up>
            Start with the website check
          </h2>
          <div className={s.offerBody} data-up>
            <p className={s.offerSummary}>{check.summary}</p>
            <Disclosure title="What you get" compact>
              <ul className={s.includes}>
                {check.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Disclosure>
          </div>
          <div className={s.offerSide} data-up>
            <p className={s.price}>{check.price}</p>
            <p className={s.terms}>{check.terms}</p>
            <div className={s.offerLinks}>
              <Link href={SITE.checkHref} className={s.primary} data-track="home-check">
                <span>Start with the check</span>
                <Arrow />
              </Link>
              <Link href="/pricing" className={s.secondary}>
                All prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The end of the page: one large way to book, a full-width band that fills on hover. */
export function Close() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
    tl.fromTo(el.querySelectorAll('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, 0)
      .fromTo(el.querySelector('[data-big]'), { yPercent: 105 }, { yPercent: 0, duration: 0.85, ease: 'expo.out' }, 0.06)
      .fromTo(el.querySelectorAll('[data-up]'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out', stagger: 0.06 }, 0.18);
  });

  return (
    <section ref={root} className={s.close} aria-labelledby="close-h">
      <div className="container">
        <h2 id="close-h" className={s.closeTitle}>
          <Link href={SITE.bookingHref} className={s.band} data-track="home-close-book">
            <span className={s.rule} data-rule aria-hidden="true" />
            <span className={s.bandMask}>
              <span className={s.bandRow} data-big>
                <span className={s.bandText}>Book a 20-minute call</span>
                <span className={s.bandArrow} aria-hidden="true">
                  <Arrow />
                </span>
              </span>
            </span>
            {/* The fill: the same row in dark type on ivory, revealed from below on hover */}
            <span className={s.fill} aria-hidden="true">
              <span className={s.bandRow}>
                <span className={s.bandText}>Book a 20-minute call</span>
                <span className={s.bandArrow}>
                  <Arrow />
                </span>
              </span>
            </span>
            <span className={`${s.rule} ${s.ruleEnd}`} data-rule aria-hidden="true" />
          </Link>
        </h2>
        <p className={s.alt} data-up>
          Tell me what is not working. There is nothing to prepare except your site address.
        </p>
      </div>
    </section>
  );
}
