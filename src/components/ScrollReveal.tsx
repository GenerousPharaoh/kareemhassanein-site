'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    opacity?: [number, number];
    scale?: [number, number];
    className?: string;
    style?: React.CSSProperties;
    maskReveal?: boolean;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 30,
    duration = 1,
    delay = 0,
    opacity = [0, 1],
    scale = [0.98, 1],
    className = '',
    style = {},
    maskReveal = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: opacity[0],
                x: x,
                y: y,
                scale: scale[0],
            }}
            animate={isInView ? {
                opacity: opacity[1],
                x: 0,
                y: 0,
                scale: scale[1],
            } : {}}
            transition={{
                duration,
                delay,
                ease,
            }}
            className={`${maskReveal ? 'mask-reveal' : ''} ${className}`}
            style={style}
        >
            {children}
        </motion.div>
    );
}
