'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    blur?: number;
    className?: string;
    style?: React.CSSProperties;
    staggerChildren?: number;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 40,
    duration = 1.2,
    delay = 0,
    blur = 10,
    className = '',
    style = {},
    staggerChildren = 0,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    const variants = {
        hidden: {
            opacity: 0,
            x: x,
            y: y,
            filter: `blur(${blur}px)`,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                staggerChildren: staggerChildren,
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
            style={{ ...style, willChange: 'transform, opacity, filter' }}
        >
            {children}
        </motion.div>
    );
}
