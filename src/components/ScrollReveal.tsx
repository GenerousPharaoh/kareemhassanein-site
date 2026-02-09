'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { useRef, ReactNode, useEffect } from 'react';

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
    distance = 30,
    delay = 0,
    className = '',
    style = {},
    viewport = { once: true, margin: "0px 0px -80px 0px", amount: 0.1 }
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-expect-error - Framer motion margin type is strict but string is valid at runtime
    const isInView = useInView(ref, viewport);

    // Spring config for smooth, fluid animations
    const springConfig = { stiffness: 100, damping: 30 };

    // Calculate initial values based on direction
    const initialX = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const initialY = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    // Spring-based motion values
    const opacity = useSpring(0, springConfig);
    const x = useSpring(initialX, springConfig);
    const y = useSpring(initialY, springConfig);

    // Trigger animation when in view
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                opacity.set(1);
                x.set(0);
                y.set(0);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay, opacity, x, y]);

    return (
        <motion.div
            ref={ref}
            style={{
                ...style,
                opacity,
                x,
                y,
                willChange: 'transform, opacity',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
