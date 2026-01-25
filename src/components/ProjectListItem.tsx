'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

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

    // Spring-based animations for ultra-smooth reveals
    const springConfig = { stiffness: 80, damping: 20 };
    const opacity = useSpring(0, springConfig);
    const y = useSpring(40, springConfig);

    // Trigger spring animation when in view
    useEffect(() => {
        const delay = index * 0.12;
        if (isInView) {
            const timer = setTimeout(() => {
                opacity.set(1);
                y.set(0);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, index, opacity, y]);

    return (
        <motion.a
            ref={ref}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between py-8 md:py-10 px-6 md:px-8 -mx-6 md:-mx-8 rounded-2xl cursor-pointer hover:bg-white/[0.02] transition-colors duration-500 border-b border-white/5 last:border-b-0"
            style={{ opacity, y }}
        >
            {/* Accent line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-12 bg-accent rounded-full transition-all duration-500" />

            <div className="flex flex-col gap-2 z-30">
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground group-hover:translate-x-3 transition-all duration-500">
                    {project.title}
                </h3>
                <span className="text-sm tracking-wide text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-3 transition-all duration-500">
                    {project.category}
                </span>
            </div>

            <div className="flex items-center gap-4 z-30">
                <span className="text-muted-foreground/40 text-sm hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                </span>
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/50 group-hover:text-background transition-colors duration-500" />
                </div>
            </div>
        </motion.a>
    );
}
