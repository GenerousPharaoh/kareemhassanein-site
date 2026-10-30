'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import s from './CaseNavigator.module.css';

type Section = { id: string; label: string };

/** A quiet reading position and shortcuts to the evidence, away from the site's main navigation. */
export function CaseNavigator({ name, sections }: { name: string; sections: Section[] }) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    let frame = 0;
    const targets = sections.map((section) => document.getElementById(section.id));
    const next = document.querySelector('[data-case-next]');
    const read = () => {
      frame = 0;
      const first = targets[0]?.getBoundingClientRect();
      const end = next?.getBoundingClientRect();
      const shown = !!first && first.top < innerHeight * .6 && (!end || end.top > innerHeight * .8);
      setVisible(shown);
      let current = sections[0].id;
      targets.forEach((target, index) => { if (target && target.getBoundingClientRect().top < innerHeight * .45) current = sections[index].id; });
      setActive(current);
      if (first && end && root.current) {
        const distance = end.top - first.top;
        root.current.style.setProperty('--read-progress', String(Math.min(1, Math.max(0, (innerHeight * .45 - first.top) / distance))));
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('content-resized', queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); window.removeEventListener('content-resized', queue); };
  }, [sections]);

  return <nav ref={root} className={s.nav} aria-label="Case contents" data-visible={visible || undefined} style={{ '--read-progress': 0 } as CSSProperties}>
    <span className={s.name}>{name}</span>
    <div className={s.links}>{sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={() => {
      const target = document.getElementById(section.id);
      if (target instanceof HTMLDetailsElement) target.open = true;
    }}>{section.label}</a>)}</div>
    <span className={s.progress} aria-hidden="true" />
  </nav>;
}
