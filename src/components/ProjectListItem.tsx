'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface Project {
    title: string;
    category: string;
    image: string;
    href?: string;
}

interface ProjectListItemProps {
    project: Project;
    index: number;
    setHovered: (isHovered: boolean) => void;
}

export default function ProjectListItem({ project, index, setHovered }: ProjectListItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between py-12 border-b border-white/10 last:border-b-0 cursor-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
                setIsHovered(true);
                setHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setHovered(false);
            }}
            style={{ cursor: 'pointer' }}
        >
            <div className="flex flex-col gap-2 z-30 mix-blend-difference">
                <h3 className="text-4xl md:text-6xl font-serif font-medium tracking-tight group-hover:italic transition-all duration-500 text-foreground">
                    {project.title}
                </h3>
                <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity duration-500 text-foreground">
                    {project.category}
                </span>
            </div>

            <div className="flex items-center gap-4 z-30 mix-blend-difference">
                <motion.div
                    animate={{
                        x: isHovered ? 0 : -20,
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-foreground font-medium hidden md:block"
                >
                    View Case
                </motion.div>
                <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </motion.a>
    );
}
