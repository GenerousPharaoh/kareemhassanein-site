'use client';

import { motion, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
    title: string;
    category: string;
    description?: string;
    href?: string;
}

interface ProjectListItemProps {
    project: Project;
    index: number;
    opacity: MotionValue<number>;
}

export default function ProjectListItem({ project, opacity }: ProjectListItemProps) {
    const className = `group relative flex items-center justify-between py-8 md:py-10 px-6 md:px-8 -mx-6 md:-mx-8 rounded-2xl hover:bg-white/[0.02] transition-all duration-500 border-b border-white/5 last:border-b-0 hover:border-accent/20 ${project.href ? 'cursor-pointer' : ''}`;

    const content = (
        <>
            {/* Accent line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-12 bg-accent rounded-full transition-all duration-500" />

            <div className="flex flex-col gap-2 z-30 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground group-hover:translate-x-3 transition-all duration-500">
                    {project.title}
                </h3>
                <span className="text-sm tracking-wide text-muted-foreground group-hover:text-accent group-hover:translate-x-3 transition-all duration-500">
                    {project.category}
                </span>
                {project.description && (
                    <p className="text-sm text-muted-foreground/70 leading-relaxed group-hover:text-muted-foreground group-hover:translate-x-3 transition-all duration-500 mt-1">
                        {project.description}
                    </p>
                )}
            </div>

            {project.href && (
                <div className="flex items-center gap-4 z-30">
                    <span className="text-muted-foreground/70 text-sm hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                    </span>
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-background transition-colors duration-500" />
                    </div>
                </div>
            )}
        </>
    );

    if (project.href) {
        return (
            <motion.div style={{ opacity }}>
                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} (opens in new tab)`}
                    className={className}
                >
                    {content}
                </a>
            </motion.div>
        );
    }

    return (
        <motion.div style={{ opacity }} className={className}>
            {content}
        </motion.div>
    );
}
