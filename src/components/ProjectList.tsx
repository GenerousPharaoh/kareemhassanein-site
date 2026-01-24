'use client';

import { useState, useEffect, useRef } from 'react';
import ProjectListItem from './ProjectListItem';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        title: 'KinetiKare Physio',
        category: 'Web Development',
        href: 'https://www.kinetikarephysio.com',
        image: '/assets/n_synergy.png'
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        href: 'https://www.endorphinshealth.com',
        image: '/assets/n_strategy.png'
    },
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
        image: '/assets/n_logic.png'
    },
    {
        title: 'Movement Solutions',
        category: 'AI Implementation',
        image: '/assets/n_implementation.png'
    }
];

export default function ProjectList() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the image
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="w-full flex flex-col relative group/list">
            {projects.map((project, index) => (
                <ProjectListItem
                    key={index}
                    project={project}
                    index={index}
                    setHovered={(isHovered) => setActiveProject(isHovered ? index : null)}
                />
            ))}

            {/* Shared Floating Image */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    top: 0,
                    left: 0,
                }}
                animate={{
                    opacity: activeProject !== null ? 1 : 0,
                    scale: activeProject !== null ? 1 : 0.5,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed pointer-events-none z-50 hidden md:block w-[400px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden glass-card"
            >
                <div className="relative w-full h-full bg-black/50">
                    {projects.map((project, index) => (
                        <Image
                            key={index}
                            src={project.image}
                            alt={project.title}
                            fill
                            className={`object-cover transition-opacity duration-500 ${activeProject === index ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
