'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    opacity?: [number, number];
    scale?: [number, number];
    parallaxVelocity?: number;
    className?: string;
    style?: React.CSSProperties;
    staggerChildren?: number;
    maskReveal?: boolean;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 50,
    duration = 1.2,
    delay = 0,
    opacity = [0, 1],
    scale = [0.95, 1],
    parallaxVelocity = 0,
    className = '',
    style = {},
    maskReveal = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001,
    });

    // Base transforms
    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    // Parallax effect
    const translateY = useTransform(
        springProgress,
        [0, 1],
        [parallaxVelocity * 150, -parallaxVelocity * 150]
    );

    const rotateValue = useTransform(
        springProgress,
        [0, 1],
        [parallaxVelocity * 10, -parallaxVelocity * 10]
    );

    const expoEasing = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={ref}
            style={{
                y: translateY,
                rotateZ: rotateValue,
                ...style,
            }}
            className={`relative ${className}`}
        >
            <motion.div
                initial={{
                    opacity: opacity[0],
                    x: direction === 'left' || direction === 'right' ? x : 0,
                    y: direction === 'up' || direction === 'down' ? y : 0,
                    scale: scale[0],
                    skewX: direction === 'left' ? 5 : direction === 'right' ? -5 : 0,
                }}
                animate={isInView ? {
                    opacity: opacity[1],
                    x: 0,
                    y: 0,
                    scale: scale[1],
                    skewX: 0,
                } : {}}
                transition={{
                    duration,
                    delay,
                    ease: expoEasing,
                }}
                className={maskReveal ? 'text-mask-reveal' : ''}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
