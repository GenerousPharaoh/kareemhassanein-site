'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    intensity?: 'subtle' | 'medium' | 'strong';
    overlay?: 'none' | 'gradient' | 'vignette' | 'both';
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    priority = false,
    intensity = 'medium',
    overlay = 'none'
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const shouldAnimate = !prefersReducedMotion;

    // Desktop parallax settings
    const parallaxRange = {
        subtle: ["-2%", "2%"],
        medium: ["-4%", "4%"],
        strong: ["-6%", "6%"],
    };

    const scaleRange = {
        subtle: [1.02, 1, 1.02],
        medium: [1.03, 1, 1.03],
        strong: [1.05, 1, 1.05],
    };

    // Motion values
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        shouldAnimate && !isMobile ? parallaxRange[intensity] as [string, string] : ["0%", "0%"]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        shouldAnimate && !isMobile ? scaleRange[intensity] : [1, 1, 1]
    );

    // Dynamic grayscale that reveals color as you scroll
    const grayscale = useTransform(scrollYProgress, [0, 0.4, 0.6], [50, 15, 0]);
    const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    const smoothY = useSpring(y, { stiffness: 120, damping: 30, mass: 0.1 });
    const smoothScale = useSpring(scale, { stiffness: 200, damping: 40, mass: 0.1 });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Mobile: Wider container to reduce zoom effect + slow drift animation */}
            <motion.div
                className="md:hidden absolute inset-y-0 left-1/2 w-[180%] h-full -translate-x-1/2"
                animate={shouldAnimate ? {
                    x: ['-50%', '-52%', '-50%'],
                    scale: [1, 1.02, 1],
                } : {}}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="180vw"
                    priority={priority}
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Desktop: Full parallax with scroll effects */}
            <motion.div
                style={{
                    y: smoothY,
                    scale: smoothScale,
                    filter: useTransform(
                        [grayscale, brightness],
                        ([g, b]) => `grayscale(${g}%) brightness(${b})`
                    )
                }}
                className="hidden md:block absolute inset-[-5%] w-[110%] h-[110%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="110vw"
                    priority={priority}
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Overlays */}
            {(overlay === 'gradient' || overlay === 'both') && (
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10" />
            )}
            {(overlay === 'vignette' || overlay === 'both') && (
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, hsl(var(--background) / 0.7) 100%)'
                    }}
                />
            )}
        </div>
    );
}
