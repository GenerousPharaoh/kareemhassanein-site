import type { Metadata } from 'next';
import { SITE } from '@/content/site';

type PageMeta = {
  title: string;
  description: string;
  /** The page's own path: its canonical address and Open Graph url. */
  path: string;
  type?: 'website' | 'article';
  /** Use the title as written, without the " · Kareem Hassanein" suffix (the home page). */
  absoluteTitle?: boolean;
  /** A share image of the page's own, 1200 by 630; the site image otherwise. */
  image?: { url: string; alt: string };
};

export const SITE_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Kareem Hassanein: from a Google search to a booked appointment, every step working and counted.',
};

/**
 * Title, description, canonical address, Open Graph and Twitter card for one page.
 * Next merges metadata one key deep, so a page that sets openGraph replaces the layout's
 * whole openGraph object; this helper always carries the share image with it.
 */
export function pageMeta({ title, description, path, type = 'website', absoluteTitle = false, image }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE.name}`;
  const images = [image ? { url: image.url, width: 1200, height: 630, alt: image.alt } : SITE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      locale: 'en_CA',
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
