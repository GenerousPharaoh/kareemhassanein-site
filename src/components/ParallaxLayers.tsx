'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxLayersProps {
    children: ReactNode;
    className?: string;
    intensity?: number; // 0-1, how much parallax effect
}

export default function ParallaxLayers({
    children,
    className = "",
    intensity = 0.5
}: ParallaxLayersProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create multiple layer speeds
    const layer1Y = useTransform(scrollYProgress, [0, 1], [`${30 * intensity}%`, `${-30 * intensity}%`]);
    const layer2Y = useTransform(scrollYProgress, [0, 1], [`${20 * intensity}%`, `${-20 * intensity}%`]);
    const layer3Y = useTransform(scrollYProgress, [0, 1], [`${10 * intensity}%`, `${-10 * intensity}%`]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Background layer - moves fastest */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: layer1Y }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
            </motion.div>

            {/* Middle layer */}
            <motion.div
                className="absolute inset-0 z-[1]"
                style={{ y: layer2Y }}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[80px]" />
            </motion.div>

            {/* Content layer - moves slowest */}
            <motion.div
                className="relative z-10"
                style={{ y: layer3Y }}
            >
                {children}
            </motion.div>
        </div>
    );
}
