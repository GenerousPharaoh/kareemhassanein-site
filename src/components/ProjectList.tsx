'use client';

import { useState, useRef } from 'react';
import ProjectListItem from './ProjectListItem';
import { motion } from 'framer-motion';
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

            {/* Shared Floating Image - Fixed Center */}
            <motion.div
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // Centered in viewport
                }}
                animate={{
                    opacity: activeProject !== null ? 1 : 0,
                    scale: activeProject !== null ? 1 : 0.95, // Subtle breathe effect instead of movement
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed pointer-events-none z-10 hidden md:block w-[500px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden glass-card"
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
