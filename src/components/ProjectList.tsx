'use client';

import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'KinetiKare Physio',
        category: 'Web Development',
        description: '60+ page web application including 55 condition pages, 6 treatment pages, booking integration, and Google Reviews.',
        href: 'https://www.kinetikarephysio.com',
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        description: 'Clinic website for 8 practitioners across 6 specialties. Booking architecture and local SEO across 8 municipalities.',
        href: 'https://www.endorphinshealth.com',
    },
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
        description: 'LLM-powered document drafting system. 85% reduction in generation time. Reusable template library.',
    },
    {
        title: 'Private Physio Clinic',
        category: 'AI Implementation',
        description: 'Heidi AI rollout from evaluation to go-live. 100% clinician adoption in 8 weeks.',
    }
];

export default function ProjectList() {
    return (
        <div className="w-full flex flex-col relative group/list">
            {projects.map((project, index) => (
                <ProjectListItem
                    key={index}
                    project={project}
                    index={index}
                />
            ))}
        </div>
    );
}
