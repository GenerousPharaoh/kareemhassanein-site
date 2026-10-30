import type { Metadata, Viewport } from 'next';
import { Mona_Sans } from 'next/font/google';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { PageTransition } from '@/components/site/PageTransition';
import { Reveals } from '@/components/site/Reveals';
import { SITE } from '@/content/site';
import './globals.css';

// One family for everything: Mona Sans, a grotesk with weight and width axes (the width axis sets
// the large project names a touch narrower than the text).
const sans = Mona_Sans({ subsets: ['latin'], axes: ['wdth'], variable: '--font-mona', display: 'swap' });
// Reuse Next's primary family with a fallback matched to case titles at 90% width.
// A second next/font declaration would emit a duplicate copy of the font files.
const narrowFamily = `${sans.style.fontFamily.split(',')[0]}, 'Mona Sans Narrow Fallback', Arial, sans-serif`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.descriptor}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'I build and run the online side of law firms and of dental and medical practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_CA',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Kareem Hassanein: from a Google search to a booked appointment, every step working and counted.' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c0c0b',
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': SITE.personId,
      name: SITE.name,
      url: SITE.url,
      sameAs: [SITE.linkedin, 'https://www.kinetikarephysio.com'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': SITE.orgId,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      description: SITE.descriptor,
      founder: { '@id': SITE.personId },
      areaServed: [
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'United States' },
      ],
      address: { '@type': 'PostalAddress', addressLocality: 'Burlington', addressRegion: 'ON', addressCountry: 'CA' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={sans.variable} style={{ ['--font-mona-narrow' as string]: narrowFamily }}>
      <body id="top">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <PageTransition />
        <Reveals />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
