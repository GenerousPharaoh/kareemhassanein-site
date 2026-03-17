'use client';

import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
        highlight: '85% faster drafting',
        description: 'Built an LLM-powered drafting automation system for a solo law firm using Claude Code. Mapped intake and communication workflows, surfaced bottlenecks, and created a reusable template library.',
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        highlight: '8 practitioners, 6 specialties',
        description: 'Led digital operations for a multidisciplinary clinic. Redesigned booking architecture for multi-provider scheduling, built service-to-booking conversion flows, and deployed local SEO across 8 municipalities.',
        href: 'https://www.endorphinshealth.com',
    },
    {
        title: 'KinetiKare Physio',
        category: 'Healthcare Platform',
        highlight: '60+ pages, full CI/CD',
        description: 'Designed and launched a healthcare web platform with integrated Jane App booking, condition-specific SEO content for 55 conditions, and a live Google Reviews feed.',
        href: 'https://www.kinetikarephysio.com',
    },
];

const TOTAL = projects.length;

function StaggeredItem({ project, index, progress }: {
    project: typeof projects[0];
    index: number;
    progress: MotionValue<number>;
}) {
    const segment = 1 / (TOTAL + 1);
    const start = index * segment;
    const end = start + segment * 2;
    const opacity = useSpring(
        useTransform(progress, [start, end], [0, 1]),
        { stiffness: 100, damping: 30 }
    );

    return (
        <ProjectListItem
            project={project}
            index={index}
            opacity={opacity}
        />
    );
}

export default function ProjectList() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start 0.3"]
    });

    return (
        <div ref={ref} className="w-full flex flex-col relative group/list">
            {projects.map((project, index) => (
                <StaggeredItem
                    key={index}
                    project={project}
                    index={index}
                    progress={scrollYProgress}
                />
            ))}
        </div>
    );
}
