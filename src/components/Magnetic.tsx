'use client';

import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

// Subtle magnetic pull toward the cursor for primary CTAs. Desktop only by
// nature (no mouse, no effect) and gentle enough to stay out of the way.
export default function Magnetic({
  children,
  strength = 0.22,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.3 });
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.3 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
