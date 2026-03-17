'use client';

import { motion, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
    title: string;
    category: string;
    highlight?: string;
    description?: string;
    href?: string;
}

interface ProjectListItemProps {
    project: Project;
    index: number;
    opacity: MotionValue<number>;
}

export default function ProjectListItem({ project, opacity }: ProjectListItemProps) {
    const className = `group relative flex items-start justify-between gap-6 py-10 md:py-12 pl-6 md:pl-8 pr-4 md:pr-8 -mx-2 rounded-lg hover:bg-white/[0.015] transition-all duration-500 border-b border-white/[0.04] last:border-b-0 focus-visible:bg-white/[0.02] focus-visible:outline-none ${project.href ? 'cursor-pointer' : ''}`;

    const content = (
        <>
            {/* Persistent accent left border */}
            <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-accent/20 group-hover:bg-accent/60 transition-colors duration-500 rounded-full" />

            <div className="flex-1 z-10">
                {/* Top line: category + highlight */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
                        {project.category}
                    </span>
                    {project.highlight && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-accent/40" />
                            <span className="text-[10px] md:text-xs font-medium tracking-wide text-accent/80 font-serif italic">
                                {project.highlight}
                            </span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-500 mb-3">
                    {project.title}
                </h3>

                {/* Description */}
                {project.description && (
                    <p className="text-sm text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-500 max-w-xl">
                        {project.description}
                    </p>
                )}
            </div>

            {/* Arrow */}
            {project.href && (
                <div className="flex-shrink-0 z-10 mt-1">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-background transition-colors duration-500" />
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
        <motion.div style={{ opacity }}>
            <div className={className}>
                {content}
            </div>
        </motion.div>
    );
}
