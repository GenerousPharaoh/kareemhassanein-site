import type { MetadataRoute } from 'next';
import { CASES } from '@/content/cases';
import { SITE } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/firms', '/clinics', '/pricing', '/about', '/notes', '/book', '/ai', '/privacy'];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...CASES.map((c) => ({ url: `${SITE.url}/work/${c.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
