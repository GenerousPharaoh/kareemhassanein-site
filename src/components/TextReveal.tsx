'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    // Split text into words
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        }
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.8,
            } as const,
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", columnGap: "0.2em" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
