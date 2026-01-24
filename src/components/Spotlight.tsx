'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Spotlight() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Use springs for smooth laggy following
    const springX = useSpring(0, { stiffness: 50, damping: 20 });
    const springY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        springX.set(mousePosition.x);
        springY.set(mousePosition.y);
    }, [mousePosition, springX, springY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        >
            <motion.div
                className="absolute w-[1200px] h-[1200px] rounded-full blur-[160px] opacity-[0.25] transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: `radial-gradient(circle, hsl(var(--accent) / 0.9) 0%, hsl(var(--accent-secondary) / 0.5) 40%, transparent 75%)`,
                    x: springX,
                    y: springY,
                }}
            />
        </motion.div>
    );
}
