'use client';

import Link from 'next/link';
import { useRef, ViewTransition } from 'react';
import { Picture } from '@/components/media/Picture';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './WorkScenes.module.css';

export type SceneCase = {
  slug: string;
  name: string;
  kindLabel: string;
  summary: string;
  domain: string;
  ground: string;
  ink: string;
  accent: string;
  /** Whether the ground is dark or light, for the header's colours */
  tone: 'dark' | 'light';
  desktop: Still;
  phone: Still;
};

/**
 * The practice cases, one screen each, in the client's own colours. The section's background and
 * ink travel from one palette to the next as you scroll; the captures drift at two depths.
 */
export function WorkScenes({ cases }: { cases: SceneCase[] }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]', el);

    scenes.forEach((scene, i) => {
      if (i > 0) {
        gsap.to(el, {
          backgroundColor: scene.dataset.ground,
          color: scene.dataset.ink,
          '--accent': scene.dataset.accent,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: scene, start: 'top 78%', end: 'top 30%', scrub: true },
        });
      }
      const range = { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.fromTo(scene.querySelector('[data-desk]'), { yPercent: 9 }, { yPercent: -7, ease: 'none', scrollTrigger: range });
      gsap.fromTo(scene.querySelector('[data-phone]'), { yPercent: 34 }, { yPercent: -22, ease: 'none', scrollTrigger: range });
      gsap.from(scene.querySelectorAll('[data-follow]'), {
        y: 26,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: scene, start: 'top 62%', once: true },
      });
    });
  });

  const first = cases[0];

  return (
    <section
      ref={root}
      className={s.scenes}
      aria-labelledby="work-h"
      data-theme={first.tone}
      style={{ backgroundColor: first.ground, color: first.ink, ['--accent' as string]: first.accent }}
    >
      <div className={`container ${s.head}`}>
        <SplitReveal id="work-h" className={s.title}>
          Selected <em>work</em>
        </SplitReveal>
        <Link href="/work" className={s.all} data-track="home-all-work">
          All the work
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {cases.map((c, i) => (
        <article
          key={c.slug}
          className={s.scene}
          data-scene
          data-flip={i % 2 === 1 || undefined}
          data-ground={c.ground}
          data-ink={c.ink}
          data-accent={c.accent}
          data-theme={c.tone}
          aria-labelledby={`scene-${c.slug}`}
        >
          <div className={`container ${s.grid}`}>
            <div className={s.text}>
              <p className={s.kind} data-follow>
                {c.kindLabel}
              </p>
              <h3 id={`scene-${c.slug}`} className={s.name}>
                <Link href={`/work/${c.slug}`} className={s.nameLink}>
                  {c.name}
                </Link>
              </h3>
              <p className={s.summary} data-follow>
                {c.summary}
              </p>
              {/* The name above is the link; the whole text column is its target */}
              <span className={s.read} data-follow aria-hidden="true">
                See the case
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className={s.plate} aria-hidden="true">
              <div className={s.desk} data-desk>
                <ViewTransition name={`case-${c.slug}`} share="case-morph" default="none">
                  <div className={s.window}>
                    <div className={s.bar}>
                      <span className={s.url}>{c.domain}</span>
                    </div>
                    <Picture media={c.desktop} sizes="(min-width: 900px) min(760px, 54vw), 92vw" />
                  </div>
                </ViewTransition>
              </div>
              <div className={s.phone} data-phone>
                <Picture media={c.phone} sizes="(min-width: 900px) 220px, 34vw" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
