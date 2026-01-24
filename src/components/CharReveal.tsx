'use client';

import { motion } from 'framer-motion';

interface CharRevealProps {
    children: string;
    className?: string;
    stagger?: number;
    delay?: number;
}

export default function CharReveal({
    children,
    className = "",
    stagger = 0.02,
    delay = 0
}: CharRevealProps) {
    const chars = children.split('');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay
            },
        },
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            y: 10,
            scale: 1.1
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as const
            }
        }
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
