'use client';

import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'KinetiKare Physio',
        category: 'Web Development',
        href: 'https://www.kinetikarephysio.com',
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        href: 'https://www.endorphinshealth.com',
    },
    {
        title: 'Tax Relief Counsel',
        category: 'Workflow Automation',
    },
    {
        title: 'Movement Solutions',
        category: 'AI Implementation',
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
