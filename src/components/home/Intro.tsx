'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Picture } from '@/components/media/Picture';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './Intro.module.css';

const FACTS = ['One person owns the whole path.', 'Written to your college’s or law society’s rules.', 'Every account stays in your name.'];

/** Who is behind it: the portrait on ivory, after the dark opening film. */
export function Intro({ portrait }: { portrait: Still }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    gsap.fromTo(
      el.querySelector('[data-portrait]'),
      { yPercent: 12 },
      { yPercent: -3, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    gsap.from(el.querySelectorAll('[data-follow]'), {
      y: 28,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 62%', once: true },
    });
    gsap.from(el.querySelectorAll('[data-rule]'), {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 55%', once: true },
    });
  });

  return (
    <section ref={root} className={`paper sheet-up ${s.intro}`} aria-labelledby="intro-h">
      <div className={`container ${s.grid}`}>
        <div className={s.text}>
          <SplitReveal id="intro-h" className={s.title}>
            I’m Kareem <em>Hassanein.</em>
          </SplitReveal>
          <p className={s.lede} data-follow>
            A Registered Physiotherapist in Ontario. I still treat patients every week at clinics in Burlington, and I build and run the online side of
            independent practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together.
          </p>
          <ul className={s.facts}>
            {FACTS.map((f) => (
              <li key={f} className={s.fact}>
                <span className={s.factRule} data-rule aria-hidden="true" />
                <span data-follow>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className={s.more} data-follow>
            Why a physiotherapist
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className={s.portrait} data-portrait>
          <Picture media={portrait} sizes="(min-width: 900px) min(560px, 40vw), 86vw" />
        </div>
      </div>
    </section>
  );
}
