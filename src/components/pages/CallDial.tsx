'use client';

import { useRef } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import s from './CallInvitation.module.css';

/** Twenty minutes of a clock face. The reader's scroll draws the arc, never a countdown. */
export function CallDial() {
  const root = useRef<HTMLSpanElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    gsap.fromTo(root.current!.querySelector('[data-minute-arc]'), { strokeDashoffset: 100 }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: root.current!.closest('[data-invitation]'), start: 'top 90%', end: 'center 65%', scrub: true },
    });
  });
  return (
    <span ref={root} className={s.dial} aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        {Array.from({ length: 60 }, (_, i) => <path key={i} d={`M120 ${i % 5 === 0 ? 12 : 16}V${i % 5 === 0 ? 23 : 22}`} transform={`rotate(${i * 6} 120 120)`} stroke="currentColor" strokeOpacity={i < 20 ? .8 : .22} strokeWidth={i % 5 === 0 ? 1.8 : 1} />)}
        <circle cx="120" cy="120" r="87" stroke="currentColor" strokeOpacity=".1" />
        <path data-minute-arc d="M120 33A87 87 0 0 1 195.344 163.5" pathLength="100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" />
      </svg>
      <span className={s.duration}>20<span>min</span></span>
    </span>
  );
}
