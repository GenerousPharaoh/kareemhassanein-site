'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface AmbientParticlesProps {
    count?: number;
    className?: string;
}

export default function AmbientParticles({ count = 20, className = "" }: AmbientParticlesProps) {
    const prefersReducedMotion = useReducedMotion();

    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, [count]);

    if (prefersReducedMotion) return null;

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-accent/30"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, particle.opacity, particle.opacity, 0],
                        scale: [0, 1, 1, 0],
                        y: [0, -100, -200, -300],
                        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Larger floating orbs */}
            <motion.div
                className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, hsl(38 30% 75% / 0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    left: '10%',
                    top: '20%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full"
                style={{
                    background: 'radial-gradient(circle, hsl(38 20% 60% / 0.06) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    right: '15%',
                    bottom: '30%',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}
