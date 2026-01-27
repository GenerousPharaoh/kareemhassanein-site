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

// Simple blur placeholder - dark gradient that matches site theme
const shimmerPlaceholder = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0f1318;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#1a1f26;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0f1318;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#g)"/>
    </svg>`
).toString('base64')}`;

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

    // Construct mask image based on props - very gradual fades
    let maskImage = '';

    if (fadedSides && fadedVertical) {
        // Radial mask for all-around fade - very soft elliptical
        maskImage = 'radial-gradient(ellipse 80% 70% at center, black 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 75%, transparent 100%)';
    } else if (fadedSides) {
        maskImage = 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 25%, black 40%, black 60%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)';
    } else if (fadedVertical) {
        maskImage = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 25%, black 40%, black 60%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)';
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
                    placeholder="blur"
                    blurDataURL={shimmerPlaceholder}
                    className="object-cover object-center saturate-[1.15] contrast-[1.05] transition-opacity duration-700"
                />
            </motion.div>
        </div>
    );
}
