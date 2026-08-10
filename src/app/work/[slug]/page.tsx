import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import { projects, getProject } from '@/lib/work';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const url = `https://khassanein.bio/work/${project.slug}`;
  return {
    title: `${project.title} | Kareem Hassanein`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Kareem Hassanein`,
      description: project.summary,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${project.title} | Kareem Hassanein`,
      description: project.summary,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return <CaseStudy project={project} next={next} />;
}
