'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

interface Project {
    title: string;
    category: string;
    href?: string;
}

interface ProjectListItemProps {
    project: Project;
    index: number;
}

export default function ProjectListItem({ project, index }: ProjectListItemProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.a
            ref={ref}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between py-10 md:py-12 px-6 md:px-10 -mx-6 md:-mx-10 rounded-3xl cursor-pointer hover:bg-white/[0.03] transition-all duration-700 border-b border-white/5 last:border-b-0"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {/* Animated accent line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-16 bg-accent rounded-full transition-all duration-700 ease-out" />

            {/* Number indicator */}
            <span className="absolute left-6 md:left-10 top-4 text-[10px] font-mono text-accent/40 group-hover:text-accent transition-colors duration-500">
                0{index + 1}
            </span>

            <div className="flex flex-col gap-3 z-30 pt-4">
                <h3 className="text-4xl md:text-6xl font-medium tracking-tight transition-all duration-700 text-foreground/90 group-hover:text-foreground group-hover:translate-x-4">
                    {project.title}
                </h3>
                <span className="text-sm tracking-widest uppercase text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-4 transition-all duration-700 delay-75">
                    {project.category}
                </span>
            </div>

            <div className="flex items-center gap-6 z-30">
                <span className="text-muted-foreground/50 text-sm font-medium tracking-wide hidden md:block opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    View Project
                </span>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground/50 group-hover:text-background group-hover:rotate-45 transition-all duration-500" />
                </div>
            </div>
        </motion.a>
    );
}
