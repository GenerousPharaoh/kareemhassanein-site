'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
    children: ReactNode;
    className?: string;
    type?: 'curtain' | 'wipe' | 'zoom' | 'split';
}

export default function SectionTransition({
    children,
    className = "",
    type = 'curtain'
}: SectionTransitionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Different animation styles
    const curtainY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['100%', '0%', '0%', '-100%']);
    const wipeX = useTransform(scrollYProgress, [0, 0.4], ['100%', '0%']);
    const zoomScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const zoomOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Split curtain transforms
    const splitLeft = useTransform(scrollYProgress, [0, 0.4], ['-50%', '-100%']);
    const splitRight = useTransform(scrollYProgress, [0, 0.4], ['50%', '100%']);

    if (type === 'curtain') {
        return (
            <div ref={ref} className={`relative overflow-hidden ${className}`}>
                {/* Content */}
                <motion.div style={{ y: curtainY }}>
                    {children}
                </motion.div>
            </div>
        );
    }

    if (type === 'wipe') {
        return (
            <div ref={ref} className={`relative overflow-hidden ${className}`}>
                {/* Wipe overlay */}
                <motion.div
                    className="absolute inset-0 bg-accent z-20 pointer-events-none"
                    style={{ x: wipeX }}
                />
                {children}
            </div>
        );
    }

    if (type === 'zoom') {
        return (
            <div ref={ref} className={`relative ${className}`}>
                <motion.div style={{ scale: zoomScale, opacity: zoomOpacity }}>
                    {children}
                </motion.div>
            </div>
        );
    }

    if (type === 'split') {
        return (
            <div ref={ref} className={`relative overflow-hidden ${className}`}>
                {/* Split curtains */}
                <motion.div
                    className="absolute inset-y-0 left-0 w-1/2 bg-background z-20 pointer-events-none"
                    style={{ x: splitLeft }}
                />
                <motion.div
                    className="absolute inset-y-0 right-0 w-1/2 bg-background z-20 pointer-events-none"
                    style={{ x: splitRight }}
                />
                {children}
            </div>
        );
    }

    return <div className={className}>{children}</div>;
}
