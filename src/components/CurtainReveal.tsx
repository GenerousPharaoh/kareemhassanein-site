'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface CurtainRevealProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'center';
    color?: string;
    delay?: number;
}

export default function CurtainReveal({
    children,
    className = "",
    direction = 'up',
    color = 'hsl(var(--background))',
    delay = 0
}: CurtainRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // Transform based on direction
    const getTransform = () => {
        switch (direction) {
            case 'up':
                return {
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.8 + delay, 1],
                        ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)']
                    )
                };
            case 'down':
                return {
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.8 + delay, 1],
                        ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(0 0 0% 0)']
                    )
                };
            case 'left':
                return {
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.8 + delay, 1],
                        ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)']
                    )
                };
            case 'right':
                return {
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.8 + delay, 1],
                        ['inset(0 0 0 100%)', 'inset(0 0 0 0%)', 'inset(0 0 0 0%)']
                    )
                };
            case 'center':
                return {
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.8 + delay, 1],
                        ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
                    )
                };
            default:
                return {};
        }
    };

    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                style={{
                    ...getTransform(),
                    opacity,
                    scale
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
