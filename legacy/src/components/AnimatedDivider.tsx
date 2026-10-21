'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

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
  const isMobile = useIsMobile();
  const originClass = getOriginClass(direction);
  const alignClass = getAlignClass(direction);

  if (isMobile) {
    return (
      <DividerLine
        className={className}
        originClass={originClass}
        alignClass={alignClass}
        accent={accent}
        maxWidth={maxWidth}
      />
    );
  }

  return (
    <AnimatedDividerLine
      className={className}
      originClass={originClass}
      alignClass={alignClass}
      accent={accent}
      maxWidth={maxWidth}
    />
  );
}

function AnimatedDividerLine({
  className,
  originClass,
  alignClass,
  accent,
  maxWidth,
}: {
  className: string;
  originClass: string;
  alignClass: string;
  accent: boolean;
  maxWidth: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ scaleX, opacity }}
      className={`h-[1px] ${originClass} ${alignClass} ${className}`}
      aria-hidden="true"
    >
      <DividerInner accent={accent} maxWidth={maxWidth} />
    </motion.div>
  );
}

function DividerLine({
  className,
  originClass,
  alignClass,
  accent,
  maxWidth,
}: {
  className: string;
  originClass: string;
  alignClass: string;
  accent: boolean;
  maxWidth: string;
}) {
  return (
    <div
      className={`h-[1px] ${originClass} ${alignClass} ${className}`}
      aria-hidden="true"
    >
      <DividerInner accent={accent} maxWidth={maxWidth} />
    </div>
  );
}

function DividerInner({ accent, maxWidth }: { accent: boolean; maxWidth: string }) {
  return (
    <div
      className={`h-full w-full ${accent
        ? 'bg-gradient-to-r from-accent via-accent/50 to-transparent'
        : 'bg-gradient-to-r from-white/20 via-white/10 to-transparent'
        }`}
      style={{ maxWidth }}
    />
  );
}

function getOriginClass(direction: AnimatedDividerProps['direction']) {
  const originClass = direction === 'left'
    ? 'origin-left'
    : direction === 'right'
      ? 'origin-right'
      : 'origin-center';

  return originClass;
}

function getAlignClass(direction: AnimatedDividerProps['direction']) {
  const alignClass = direction === 'left'
    ? ''
    : direction === 'right'
      ? 'ml-auto'
      : 'mx-auto';

  return alignClass;
}
