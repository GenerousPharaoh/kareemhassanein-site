'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { SplitReveal } from '@/components/motion/SplitReveal';
import type { Stop } from '@/content/path';
import { getGsap, useGsap } from '@/lib/gsap';
import s from './PathTrack.module.css';

/**
 * The six stops between a search and a booked appointment. Wide screens: the stage holds while
 * the stops travel sideways under a brass line that fills as you go. Phones and reduced motion:
 * a vertical list with the line drawn down its side.
 */
export function PathTrack({ stops }: { stops: Stop[] }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce, mobile }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const rail = el.querySelector<HTMLElement>('[data-rail]')!;
    const fill = el.querySelector<HTMLElement>('[data-fill]')!;
    const items = gsap.utils.toArray<HTMLElement>('[data-stop]', el);

    if (mobile || window.matchMedia('(max-width: 899px)').matches) {
      gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: rail, start: 'top 62%', end: 'bottom 62%', scrub: true } });
      items.forEach((it) =>
        gsap.fromTo(it, { opacity: 0.32 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: it, start: 'top 80%', end: 'top 50%', scrub: true } }),
      );
      return;
    }

    const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);
    const setTravel = () => el.style.setProperty('--travel', `${distance()}px`);
    setTravel();

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onRefreshInit: setTravel,
      },
    });
    tl.to(rail, { x: () => -distance(), duration: 1 }, 0).fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

    // Each stop comes up to full strength as it travels into the middle of the screen
    items.forEach((it) => {
      gsap.fromTo(
        it,
        { opacity: 0.28 },
        { opacity: 1, ease: 'none', scrollTrigger: { trigger: it, containerAnimation: tl, start: 'left 78%', end: 'left 46%', scrub: true } },
      );
    });
  });

  return (
    <section ref={root} className={`sheet-up ${s.track}`} aria-labelledby="path-h">
      <div className={s.stage}>
        <div className={`container ${s.head}`}>
          <SplitReveal id="path-h" className={s.title}>
            Where practices <em>lose people</em>
          </SplitReveal>
          <p className={s.lede}>
            Most practices have the path split between a web designer, an agency, a booking system and Google. Nobody owns the gaps between them. I do.
          </p>
        </div>
        {/* The line travels with the stops; it sits outside the list so the list has only the six stops */}
        <div className={s.rail} data-rail>
          <span className={s.line} aria-hidden="true">
            <span className={s.fill} data-fill />
          </span>
          <ol className={s.stops}>
          {stops.map((stop) => (
            <li key={stop.id} className={s.stop} data-stop>
              <span className={s.dot} aria-hidden="true" />
              <h3 className={s.name}>{stop.name}</h3>
              <p className={s.line2}>{stop.line}</p>
              <p className={s.example}>
                {stop.example}{' '}
                <Link href={`/work/${stop.caseSlug}`} className={s.caseLink}>
                  {stop.caseName}
                </Link>
              </p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
