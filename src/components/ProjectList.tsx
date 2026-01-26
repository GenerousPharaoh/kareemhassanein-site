'use client';

import ProjectListItem from './ProjectListItem';

const projects = [
    {
        title: 'KinetiKare Physio',
        category: 'Web Development',
        description: 'Built a 60+ page physiotherapy web application from scratch. The challenge was creating SEO-optimized content for 55 musculoskeletal conditions while keeping the site fast and the booking flow frictionless. Integrated Jane App scheduling and a live Google Reviews feed.',
        href: 'https://www.kinetikarephysio.com',
    },
    {
        title: 'Endorphins Health',
        category: 'Digital Operations',
        description: 'Redesigned the digital presence for a multi-disciplinary clinic with 8 practitioners across 6 specialties. Rebuilt the booking architecture to reduce intake friction and executed local SEO targeting 8 GTA municipalities.',
        href: 'https://www.endorphinshealth.com',
    },
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
