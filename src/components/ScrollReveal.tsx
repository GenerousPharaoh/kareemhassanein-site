'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 50,
    duration = 0.8,
    delay = 0,
    opacity = [0, 1],
    scale = [0.95, 1],
    parallaxVelocity = 0,
    className = '',
    style = {},
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Smooth scroll progress
    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Base transforms
    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    // Scroll-linked transforms
    const opacityValue = useTransform(springProgress, [0, 0.2, 0.8, 1], [0, opacity[1], opacity[1], 0]);
    const scaleValue = useTransform(springProgress, [0, 0.2, 0.8, 1], [0.9, scale[1], scale[1], 0.9]);

    // Parallax effect
    const translateY = useTransform(
        springProgress,
        [0, 1],
        [parallaxVelocity * 100, -parallaxVelocity * 100]
    );

    const expoEasing = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={ref}
            style={{
                opacity: opacityValue,
                scale: scaleValue,
                y: translateY,
                ...style,
            }}
            className={className}
        >
            <motion.div
                initial={{
                    opacity: opacity[0],
                    x: direction === 'left' || direction === 'right' ? x : 0,
                    y: direction === 'up' || direction === 'down' ? y : 0,
                    scale: scale[0]
                }}
                whileInView={{
                    opacity: opacity[1],
                    x: 0,
                    y: 0,
                    scale: scale[1]
                }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    duration,
                    delay,
                    ease: expoEasing,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
