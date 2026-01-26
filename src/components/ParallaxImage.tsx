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
    fadedVertical?: boolean;
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    priority = false,
    fadedSides = false,
    fadedVertical = false
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Gentle parallax - GPU accelerated transforms only
    const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
    const smoothY = useSpring(y, { stiffness: 80, damping: 25 });

    // Construct mask image based on props
    let maskImage = '';

    if (fadedSides && fadedVertical) {
        // Radial mask for all-around fade
        maskImage = 'radial-gradient(circle at center, black 40%, transparent 100%)';
    } else if (fadedSides) {
        maskImage = 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)';
    } else if (fadedVertical) {
        maskImage = 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)';
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={maskImage ? {
                maskImage: maskImage,
                WebkitMaskImage: maskImage
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
                    className="object-cover object-center saturate-[1.15] contrast-[1.05]"
                />
            </motion.div>
        </div>
    );
}
