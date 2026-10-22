'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

type Props = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
  /** Delay before the lines start, in seconds. */
  delay?: number;
};

/**
 * A heading whose lines rise out of their own masks as it comes into view. The text is split
 * after the fonts load and again on resize (SplitText autoSplit), so the lines always match the
 * real line breaks. Text is fully visible before scripts run and with reduced motion.
 */
export function SplitReveal({ as: Tag = 'h2', id, className, children, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduce }) => {
    if (reduce) return;
    const { gsap, SplitText } = getGsap();
    const el = ref.current!;
    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'sl',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.15,
          stagger: 0.085,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
    return () => split.revert();
  });

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
