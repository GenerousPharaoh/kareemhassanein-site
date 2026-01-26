'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedDividerProps {
  className?: string;
  direction?: 'left' | 'right' | 'center';
  accent?: boolean;
  maxWidth?: string;
}

export default function AnimatedDivider({
  className = '',
  direction = 'left',
  accent = false,
  maxWidth = '200px',
}: AnimatedDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), springConfig);

  const originClass = direction === 'left'
    ? 'origin-left'
    : direction === 'right'
      ? 'origin-right'
      : 'origin-center';

  const alignClass = direction === 'left'
    ? ''
    : direction === 'right'
      ? 'ml-auto'
      : 'mx-auto';

  return (
    <motion.div
      ref={ref}
      style={{ scaleX, opacity }}
      className={`h-[1px] ${originClass} ${alignClass} ${className}`}
      aria-hidden="true"
    >
      <div
        className={`h-full w-full ${accent
          ? 'bg-gradient-to-r from-accent via-accent/50 to-transparent'
          : 'bg-gradient-to-r from-white/20 via-white/10 to-transparent'
        }`}
        style={{ maxWidth }}
      />
    </motion.div>
  );
}
