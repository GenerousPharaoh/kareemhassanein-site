'use client';

import { motion } from 'framer-motion';

interface MaskedRevealProps {
    children: string;
    className?: string; // Wrapper class
    textClassName?: string; // Text specific class
    delay?: number;
    direction?: 'up' | 'down';
}

export default function MaskedReveal({
    children,
    className = "",
    textClassName = "",
    delay = 0,
    direction = 'up'
}: MaskedRevealProps) {

    const variants = {
        hidden: {
            y: direction === 'up' ? "100%" : "-100%",
            opacity: 0, // Slight opacity fade for smoother edge
            rotateZ: direction === 'up' ? 2 : -2, // Micro-rotation for flair
        },
        visible: {
            y: "0%",
            opacity: 1,
            rotateZ: 0,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as const, // The "Editorial" ease (Expo Out-ish)
                delay: delay
            }
        }
    };

    return (
        <span className={`inline-block overflow-hidden relative leading-[1.1] ${className}`}>
            <motion.span
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className={`inline-block ${textClassName}`}
            >
                {children}
            </motion.span>
        </span>
    );
}
