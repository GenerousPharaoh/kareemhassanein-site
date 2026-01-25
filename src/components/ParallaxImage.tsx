'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    fadedSides?: boolean;
}

export default function ParallaxImage({ src, alt, className = "", priority = false, fadedSides = false }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Gentle parallax - GPU accelerated transforms only
    const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
    const smoothY = useSpring(y, { stiffness: 80, damping: 25 });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={fadedSides ? {
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            } : undefined}
        >
            <motion.div
                style={{
                    y: smoothY,
                    willChange: 'transform',
                }}
                className="absolute inset-0 w-full h-[106%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover object-center"
                />
            </motion.div>
        </div>
    );
}
