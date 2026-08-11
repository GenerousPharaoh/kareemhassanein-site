import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import { orderedProjects, getProject } from '@/lib/work';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return orderedProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const url = `https://www.khassanein.bio/work/${project.slug}`;
  const image = project.card?.src ?? '/og-image.png';
  return {
    title: `${project.title} | Kareem Hassanein`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Kareem Hassanein`,
      description: project.summary,
      url,
      type: 'website',
      locale: 'en_CA',
      siteName: 'Kareem Hassanein',
      images: [{ url: image, alt: project.card?.alt ?? `${project.title} case study by Kareem Hassanein` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Kareem Hassanein`,
      description: project.summary,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = orderedProjects.findIndex((p) => p.slug === project.slug);
  const next = orderedProjects[(index + 1) % orderedProjects.length];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.khassanein.bio' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.khassanein.bio/work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://www.khassanein.bio/work/${project.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <CaseStudy project={project} next={next} />
    </>
  );
}
