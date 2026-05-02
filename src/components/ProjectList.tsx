'use client';

import { motion } from 'framer-motion';
import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
        description: 'Built an LLM-powered drafting automation system for a solo law firm using Claude Code. Mapped intake and communication workflows, surfaced bottlenecks, and created a template library that reduced document generation time by 85%.',
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        description: 'Led operational and digital infrastructure buildout for a 6-specialty multidisciplinary clinic. Redesigned and relaunched the clinic website, managed referral pathways across 5 disciplines, and built out local SEO across 8 municipalities.',
        href: 'https://www.endorphinshealth.com',
    },
    {
        title: 'KinetiKare Physio',
        category: 'Healthcare Platform',
        description: 'Designed and launched a 60+ page healthcare web platform with integrated Jane App booking, condition-specific SEO content for 55 conditions, and a live Google Reviews feed. Deployed via CI/CD through GitHub and Vercel.',
        href: 'https://www.kinetikarephysio.com',
    },
];

export default function ProjectList() {
    return (
        <div className="w-full flex flex-col relative group/list">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ProjectListItem project={project} index={index} />
                </motion.div>
            ))}
        </div>
    );
}

