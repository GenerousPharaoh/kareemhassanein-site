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
    viewport?: {
        once?: boolean;
        margin?: string;
        amount?: number | "some" | "all";
    } | undefined;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 25,
    duration = 0.6,
    delay = 0,
    blur = 15,
    className = '',
    style = {},
    staggerChildren = 0,
    viewport = { once: true, margin: "0px 0px -50px 0px", amount: 0.1 }
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-expect-error - Frame motion margin type is strict but string is valid at runtime
    const isInView = useInView(ref, viewport);

    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    const variants = {
        hidden: {
            opacity: 0,
            x: x,
            y: y,
            filter: `blur(${blur}px)`,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                staggerChildren: staggerChildren,
                staggerDirection: 1,
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
            style={{
                ...style,
                willChange: 'transform, opacity, filter',
                backfaceVisibility: 'hidden' /* Prevent flashing/jitter */
            }}
        >
            {children}
        </motion.div>
    );
}
