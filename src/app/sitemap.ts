import { MetadataRoute } from 'next';
import { projects } from '@/lib/work';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.khassanein.bio';

  const caseStudies: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...caseStudies,
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
