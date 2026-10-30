'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './Process.module.css';

export type ProcessStep = { name: string; text: string; link?: { href: string; label: string } };

/** A working drawing that follows the explanation. The text remains a complete ordered list. */
export function Process({ steps }: { steps: ProcessStep[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const rows = [...el.querySelectorAll<HTMLElement>('[data-process-step]')];
    const drawing = el.querySelector<HTMLElement>('[data-process-drawing]')!;
    let frame = 0;
    let inView = false;
    const read = () => {
      frame = 0;
      const mobile = innerWidth < 900;
      const line = mobile && innerHeight > 600 ? drawing.getBoundingClientRect().bottom + 90 : Math.min(Math.max(innerHeight * .42, 220), 320);
      let next = 0;
      rows.forEach((row, i) => { if (row.getBoundingClientRect().top <= line) next = i; });
      setActive(next);
    };
    const queue = () => { if (inView && !frame) frame = requestAnimationFrame(read); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) queue();
    });
    observer.observe(el);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  return (
    <section ref={root} className={`paper sheet-up ${s.section}`} aria-labelledby="how-title" data-process>
      <div className="container">
        <h2 id="how-title" className={`t-h2 ${s.heading}`}>I work in four steps.</h2>
        <div className={s.layout}>
          <div className={s.drawing} data-process-drawing data-active={active}>
            <div className={s.canvas} aria-hidden="true">
              <svg viewBox="0 0 440 290" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Assess: follow the path from search through the page to the appointment. */}
                <g className={s.scene} data-scene="0">
                  <path className={s.connector} d="M98 96H170Q190 96 190 116V175Q190 195 210 195H332" />
                  <rect className={s.surface} x="32" y="52" width="102" height="88" rx="14" />
                  <circle cx="78" cy="91" r="17" /><path d="m91 104 15 15" />
                  <rect className={s.surface} x="166" y="50" width="128" height="108" rx="8" />
                  <path d="M166 71H294M180 61h2m6 0h2m6 0h2M182 90h57M182 102h80M182 114h40" />
                  <rect className={s.surface} x="302" y="152" width="106" height="94" rx="14" />
                  <path d="M302 177H408M329 144v16m52-16v16m-47 46 14 14 27-30" />
                  <circle className={s.solid} cx="190" cy="151" r="5" />
                </g>
                {/* Plan: a ranked, bounded piece of work. */}
                <g className={s.scene} data-scene="1">
                  <rect className={s.paperBack} x="71" y="24" width="298" height="238" rx="12" />
                  {[0, 1, 2].map((n) => <g key={n} transform={`translate(92 ${46 + n * 66})`}>
                    <rect className={s.surface} width="256" height="54" rx="5" />
                    <text x="18" y="32" stroke="none" fill="currentColor" fontSize="14">0{n + 1}</text>
                    <path d={`M58 23h${120 - n * 22}M58 34h${76 - n * 12}`} />
                    <path d="M223 20v14m-7-7h14" />
                  </g>)}
                </g>
                {/* Build: one design, composed for both screens. */}
                <g className={s.scene} data-scene="2">
                  <rect className={s.surface} x="38" y="36" width="318" height="202" rx="10" />
                  <path d="M38 61H356M54 49h2m6 0h2m6 0h2M67 92h86M67 108h116M67 124h58M164 238v18m-29 0h78" />
                  <rect className={s.paperBack} x="215" y="86" width="113" height="122" rx="2" />
                  <path d="m215 174 34-38 25 25 19-15 35 28M67 182h63M67 194h96" />
                  <rect className={s.surface} x="300" y="112" width="94" height="150" rx="13" />
                  <path d="M332 122h30M314 140h49M314 151h34" />
                  <rect className={s.paperBack} x="314" y="166" width="66" height="55" rx="2" />
                  <path d="M335 247h24" />
                </g>
                {/* Run: the connected path stays in view, including the return to the start. */}
                <g className={s.scene} data-scene="3">
                  <path className={s.connector} d="M112 74H326Q370 74 370 118V184Q370 228 326 228H112Q68 228 68 184V118Q68 74 112 74Z" />
                  <path d="m207 67 10 7-10 7m24 140-10 7 10 7" />
                  <rect className={s.surface} x="32" y="111" width="72" height="72" rx="18" />
                  <circle cx="63" cy="141" r="12" /><path d="m72 150 13 13" />
                  <rect className={s.surface} x="178" y="38" width="84" height="72" rx="10" />
                  <path d="M178 57H262M191 71h42m-42 11h57m-57 10h29" />
                  <rect className={s.surface} x="334" y="111" width="72" height="72" rx="18" />
                  <path d="m351 147 12 12 24-25" />
                  <rect className={s.surface} x="178" y="192" width="84" height="72" rx="10" />
                  <path d="M194 211h50m-50 14h36m-36 14h44" />
                </g>
              </svg>
            </div>
            <nav className={s.index} aria-label="How I work">
              {steps.map((step, i) => <a key={step.name} href={`#process-${i + 1}`} aria-current={i === active ? 'step' : undefined} className={s.indexLink}>{step.name}</a>)}
            </nav>
          </div>
          <ol className={s.steps}>
            {steps.map((step, i) => <li key={step.name} id={`process-${i + 1}`} className={s.step} data-process-step data-current={active === i || undefined}>
              <span className={s.number} aria-hidden="true">0{i + 1}</span>
              <h3 className={s.name}>{step.name}</h3>
              <p className={s.text}>{step.text}</p>
              {step.link ? <Link href={step.link.href} className={s.more}>{step.link.label}<span aria-hidden="true">↗</span></Link> : null}
            </li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
