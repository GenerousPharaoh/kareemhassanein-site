'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 12,
    delay = 0,
    className = '',
    style = {},
}: ScrollRevealProps) {
    const initialX = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const initialY = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX, y: initialY }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
            style={style}
            className={className}
        >
            {children}
        </motion.div>
    );
}
