'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ParallaxImage({ src, alt, className = "", priority = false }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Softer vertical parallax
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);
    const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.6], [100, 50, 0]);

    // Smooth out the motion
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.1 });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            <motion.div
                style={{
                    y: smoothY,
                    scale,
                    filter: useTransform(grayscale, (v) => `grayscale(${v}%)`)
                }}
                className="absolute inset-0 w-full h-[110%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover object-center transition-opacity duration-700"
                />
            </motion.div>
        </div>
    );
}
