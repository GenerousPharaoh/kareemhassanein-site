'use client';

import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'KinetiKare Physio',
        category: 'Web Development',
        href: 'https://www.kinetikarephysio.com',
        image: '/assets/n_synergy.png'
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        href: 'https://www.endorphinshealth.com',
        image: '/assets/n_strategy.png'
    },
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
        image: '/assets/n_logic.png'
    },
    {
        title: 'Movement Solutions',
        category: 'AI Implementation',
        image: '/assets/n_implementation.png'
    }
];

export default function ProjectList() {
    return (
        <div className="w-full flex flex-col">
            {projects.map((project, index) => (
                <ProjectListItem key={index} project={project} index={index} />
            ))}
        </div>
    );
}
