import { Beyond } from '@/components/home/Beyond';
import { Close, Offer } from '@/components/home/HomeEnd';
import { Intro } from '@/components/home/Intro';
import { PathFilm } from '@/components/home/PathFilm';
import { PathTrack } from '@/components/home/PathTrack';
import { STORIES } from '@/components/home/stories';
import { WorkScenes } from '@/components/home/WorkScenes';
import { BEYOND_CASES, PRACTICE_CASES } from '@/content/cases';
import { PATH } from '@/content/path';
import { SITE } from '@/content/site';
import { still, type Still } from '@/lib/media';
import { pageMeta } from '@/lib/meta';
import { accentText, toneOf } from '@/lib/palette';

export const metadata = pageMeta({
  title: `${SITE.name} · ${SITE.descriptor}`,
  absoluteTitle: true,
  description:
    'I build and run the online side of law firms and of dental and medical practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together.',
  path: '/',
});

// The portrait, cut out on a transparent ground (responsive AVIF and WebP in public/work-media/site)
const PORTRAIT: Still = {
  src: '/work-media/site/kareem',
  w: 1054,
  h: 1492,
  widths: [480, 760, 1054],
  alt: 'Kareem Hassanein',
  device: 'desktop',
};

export default function Home() {
  const firm = STORIES[0];

  return (
    <>
      <PathFilm
        bookingHref={SITE.bookingHref}
        story={{
          query: firm.query,
          result: firm.result,
          booked: firm.booked,
          counted: firm.counted,
          desktop: still('tax-relief-counsel/home-hero--desktop', 'Tax Relief Counsel home page'),
          phone: still('tax-relief-counsel/home-hero--phone', 'Tax Relief Counsel home page on a phone'),
        }}
      />
      <Intro portrait={PORTRAIT} />
      <PathTrack stops={PATH} />
      <WorkScenes
        cases={PRACTICE_CASES.map((c) => ({
          slug: c.slug,
          name: c.name,
          kindLabel: c.kindLabel,
          summary: c.summary,
          domain: c.domain,
          ground: c.palette.ground,
          ink: c.palette.ink,
          accent: accentText(c.palette),
          tone: toneOf(c.palette),
          desktop: c.plate.desktop,
          phone: c.plate.phone,
        }))}
      />
      <Beyond cases={BEYOND_CASES.map((c) => ({ slug: c.slug, name: c.name, kindLabel: c.kindLabel, desktop: c.plate.desktop }))} />
      <Offer />
      <Close />
    </>
  );
}
