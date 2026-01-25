'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface CurtainRevealProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'center';
    delay?: number;
}

export default function CurtainReveal({
    children,
    className = "",
    direction = 'up',
    delay = 0
}: CurtainRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // Create all transforms at the top level (following Rules of Hooks)
    const clipPathUp = useTransform(
        scrollYProgress,
        [0, 0.8 + delay, 1],
        ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)']
    );

    const clipPathDown = useTransform(
        scrollYProgress,
        [0, 0.8 + delay, 1],
        ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(0 0 0% 0)']
    );

    const clipPathLeft = useTransform(
        scrollYProgress,
        [0, 0.8 + delay, 1],
        ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)']
    );

    const clipPathRight = useTransform(
        scrollYProgress,
        [0, 0.8 + delay, 1],
        ['inset(0 0 0 100%)', 'inset(0 0 0 0%)', 'inset(0 0 0 0%)']
    );

    const clipPathCenter = useTransform(
        scrollYProgress,
        [0, 0.8 + delay, 1],
        ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
    );

    // Select the correct clipPath based on direction
    const clipPathMap = {
        up: clipPathUp,
        down: clipPathDown,
        left: clipPathLeft,
        right: clipPathRight,
        center: clipPathCenter
    };

    const clipPath = clipPathMap[direction];
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                style={{
                    clipPath,
                    opacity,
                    scale
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
