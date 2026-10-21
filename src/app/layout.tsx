import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Schibsted_Grotesk } from 'next/font/google';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { SITE } from '@/content/site';
import './globals.css';

const display = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-schibsted', display: 'swap' });
const body = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.descriptor}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'I build and run the online side of law firms and of dental and medical practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_CA',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f2f4f0',
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
    <html lang="en-CA" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
