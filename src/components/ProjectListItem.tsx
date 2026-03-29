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

export default function ProjectListItem({ project, index, opacity }: ProjectListItemProps) {
    const className = `group relative flex items-start md:items-center justify-between py-8 md:py-10 pl-8 md:pl-10 pr-6 md:pr-8 -mx-2 rounded-lg hover:bg-white/[0.03] transition-all duration-500 border-b border-white/[0.04] last:border-b-0 focus-visible:bg-white/[0.02] focus-visible:outline-none ${project.href ? 'cursor-pointer' : ''}`;

    const content = (
        <>
            {/* Persistent accent left border */}
            <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-accent/15 group-hover:bg-accent/50 transition-colors duration-500 rounded-full" />

            <div className="flex gap-5 md:gap-8 z-30 max-w-2xl">
                {/* Index number */}
                <span className="text-4xl md:text-5xl font-light text-accent/15 group-hover:text-accent/30 transition-colors duration-500 leading-none pt-1 select-none hidden sm:block">
                    0{index + 1}
                </span>

                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-all duration-500">
                        {project.title}
                    </h3>
                    <span className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground group-hover:text-accent transition-all duration-500">
                        <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-500 flex-shrink-0" />
                        {project.category}
                    </span>
                    {project.description && (
                        <p className="text-sm text-muted-foreground/70 leading-relaxed group-hover:text-muted-foreground/90 transition-all duration-500 mt-1">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>

            {project.href && (
                <div className="flex items-center gap-4 z-30 flex-shrink-0">
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
        <motion.div style={{ opacity }}>
            <div className={className}>
                {content}
            </div>
        </motion.div>
    );
}
