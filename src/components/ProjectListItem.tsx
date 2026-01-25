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
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.a
            ref={ref}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between py-8 md:py-10 px-6 md:px-8 -mx-6 md:-mx-8 rounded-2xl cursor-pointer hover:bg-white/[0.03] transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {/* Subtle left accent bar on hover */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-12 bg-accent/50 rounded-full transition-all duration-500" />

            <div className="flex flex-col gap-2 z-30">
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight transition-all duration-500 text-foreground group-hover:text-foreground group-hover:translate-x-2">
                    {project.title}
                </h3>
                <span className="text-sm tracking-wide text-muted-foreground group-hover:text-accent transition-all duration-500 group-hover:translate-x-2">
                    {project.category}
                </span>
            </div>

            <div className="flex items-center gap-4 z-30">
                <span className="text-muted-foreground text-sm font-medium hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    View
                </span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-background transition-colors duration-500" />
                </div>
            </div>
        </motion.a>
    );
}
