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
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for reduced parallax intensity
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

    // Adjust parallax intensity based on screen size and preference
    const parallaxRange = {
        subtle: isMobile ? ["-2%", "2%"] : ["-3%", "3%"],
        medium: isMobile ? ["-3%", "3%"] : ["-5%", "5%"],
        strong: isMobile ? ["-5%", "5%"] : ["-8%", "8%"],
    };

    const scaleRange = {
        subtle: [1.01, 1, 1.01],
        medium: isMobile ? [1.02, 1, 1.02] : [1.03, 1, 1.03],
        strong: isMobile ? [1.03, 1, 1.03] : [1.05, 1, 1.05],
    };

    // Motion values with reduced motion support
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? ["0%", "0%"] : parallaxRange[intensity] as [string, string]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        prefersReducedMotion ? [1, 1, 1] : scaleRange[intensity]
    );

    // Dynamic grayscale that reveals color as you scroll into view
    const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);

    // Subtle brightness shift
    const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    // Smooth springs for buttery motion
    const smoothY = useSpring(y, {
        stiffness: isMobile ? 150 : 100,
        damping: isMobile ? 40 : 30,
        mass: 0.1
    });
    const smoothScale = useSpring(scale, {
        stiffness: 200,
        damping: 40,
        mass: 0.1
    });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            <motion.div
                style={{
                    y: smoothY,
                    scale: smoothScale,
                    filter: useTransform(
                        [grayscale, brightness],
                        ([g, b]) => `grayscale(${g}%) brightness(${b})`
                    )
                }}
                className="absolute inset-[-10%] w-[120%] h-[120%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority={priority}
                    className="object-cover object-center"
                    style={{ objectFit: 'cover' }}
                />
            </motion.div>

            {/* Optional overlays for depth */}
            {(overlay === 'gradient' || overlay === 'both') && (
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
            )}
            {(overlay === 'vignette' || overlay === 'both') && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(var(--background) / 0.8) 100%)'
                    }}
                />
            )}
        </div>
    );
}
