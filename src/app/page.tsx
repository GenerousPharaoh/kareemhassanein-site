import { Close, Offer } from '@/components/home/HomeEnd';
import s from '@/components/home/Home.module.css';
import { Showreel, type ReelItem, type ReelMedia } from '@/components/home/Showreel';
import { Statement } from '@/components/home/Statement';
import { PathExplorer } from '@/components/home/PathExplorer';
import { WorkIndex, type IndexItem } from '@/components/home/WorkIndex';
import { CASES, caseBySlug } from '@/content/cases';
import { SITE } from '@/content/site';
import { PATH } from '@/content/path';
import { PORTRAIT } from '@/content/portrait';
import { loop, still } from '@/lib/media';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: `${SITE.name} · ${SITE.descriptor}`,
  absoluteTitle: true,
  description:
    'I build and run the online side of law firms and of dental and medical practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together.',
  path: '/',
});

/** A loop for the reel: its first frame as the still, the video on top. */
const reelLoop = (key: string): ReelMedia => {
  const l = loop(key, '');
  return { image: { src: l.poster, srcSet: `${l.poster} ${l.w}w`, w: l.w, h: l.h }, video: l.src };
};

/** A still for the reel, at the two large widths. */
const reelStill = (key: string): ReelMedia => {
  const st = still(key, '');
  const widths = st.widths.filter((w) => w >= 1600);
  return { image: { src: `${st.src}-${widths[0]}.webp`, srcSet: widths.map((w) => `${st.src}-${w}.webp ${w}w`).join(', '), w: st.w, h: st.h } };
};

// The reel: what each project looks like on a desktop and on a phone, the stage it sits on (its
// own colours, dark or light), and its time on screen. Each time is about the length of that
// layout's loop (a still gets 4.4 s), so the reel moves on as a loop ends instead of holding its
// last frame. deep is the dark version the work list uses.
const REEL: Array<Omit<ReelItem, 'kind' | 'href'> & { deep: string }> = [
  {
    slug: 'tax-relief-counsel',
    name: 'Tax Relief Counsel',
    label: 'Tax Relief Counsel',
    tone: '#1b2740',
    ink: '#efeae1',
    dark: true,
    deep: '#1b2740',
    focus: { desktop: 0.35, phone: 0.2 },
    desktop: reelLoop('tax-relief-counsel/hero-arrive--desktop'),
    phone: reelLoop('tax-relief-counsel/hero-arrive--phone'),
    seconds: { desktop: 6.1, phone: 6.4 },
  },
  {
    slug: 'endorphins',
    name: 'Endorphins',
    label: 'Endorphins',
    tone: '#dfe7d5',
    ink: '#17230f',
    dark: false,
    deep: '#17231a',
    focus: { desktop: 0.62, phone: 0.1 },
    desktop: reelStill('endorphins/home-hero--desktop'),
    phone: reelLoop('endorphins/home-scroll--phone'),
    seconds: { desktop: 4.4, phone: 5.8 },
  },
  {
    slug: 'physiomax',
    name: 'PhysioMax',
    label: 'PhysioMax',
    tone: '#132b40',
    ink: '#eef1f4',
    dark: true,
    deep: '#11273a',
    focus: { desktop: 0.3, phone: 0.1 },
    desktop: reelLoop('physiomax/treat-chart--desktop'),
    phone: reelLoop('physiomax/home-scroll--phone'),
    seconds: { desktop: 7.1, phone: 6.2 },
  },
  {
    slug: 'kinetikare',
    name: 'KinetiKare',
    label: 'KinetiKare',
    tone: '#efe9dd',
    ink: '#1a2233',
    dark: false,
    deep: '#141b2b',
    focus: { desktop: 0.35, phone: 0.1 },
    desktop: reelStill('kinetikare/home-hero--desktop'),
    phone: reelLoop('kinetikare/home-scroll--phone'),
    seconds: { desktop: 4.4, phone: 6.4 },
  },
  {
    slug: 'techniques-combat',
    name: 'Techniques Combat',
    label: 'Techniques',
    tone: '#e7e6e1',
    ink: '#0c0c0c',
    dark: false,
    deep: '#151515',
    focus: { desktop: 0.5, phone: 0.3 },
    desktop: reelLoop('techniques-combat/hero-film--desktop'),
    phone: reelLoop('techniques-combat/hero-film--phone'),
    seconds: { desktop: 7.2, phone: 7.2 },
  },
  {
    slug: 'travel-journal',
    name: 'A travel journal',
    label: 'Travel journal',
    tone: '#182d3d',
    ink: '#f6f1e7',
    dark: true,
    deep: '#172b3a',
    focus: { desktop: 0.3, phone: 0.1 },
    desktop: reelLoop('travel-journal/opening--desktop'),
    phone: reelLoop('travel-journal/travels-scroll--phone'),
    seconds: { desktop: 4.3, phone: 5.7 },
  },
  {
    slug: 'wedding',
    name: 'A destination wedding',
    label: 'Wedding',
    tone: '#efede6',
    ink: '#1e2630',
    dark: false,
    deep: '#1c2430',
    focus: { desktop: 0.45, phone: 0.3 },
    desktop: reelLoop('wedding/opening--desktop'),
    phone: reelLoop('wedding/opening--phone'),
    seconds: { desktop: 3.5, phone: 3.5 },
  },
];

// The list below the reel shows a second screen from each project
const PREVIEW: Record<string, string> = {
  'tax-relief-counsel': 'tax-relief-counsel/decoder--desktop',
  endorphins: 'endorphins/lp-physio--desktop',
  physiomax: 'physiomax/home-hero--desktop',
  kinetikare: 'kinetikare/knee-hub--desktop',
  'techniques-combat': 'techniques-combat/home-hero--desktop',
  'travel-journal': 'travel-journal/travels-top--desktop',
  wedding: 'wedding/day--desktop',
};

const KEEP_CASE = ['Business Profile', 'Shopify'];
/** "Diagnosis, Website, Tools" reads as "Diagnosis, website, tools". */
const servicesLine = (list: string[]) =>
  list.map((x, i) => (i === 0 || KEEP_CASE.includes(x) || /^[A-Z]{2,}$/.test(x) ? x : x.charAt(0).toLowerCase() + x.slice(1))).join(', ');

export default function Home() {
  const reel: ReelItem[] = REEL.map(({ deep: _deep, ...r }) => {
    const c = caseBySlug(r.slug)!;
    return { ...r, kind: c.kindLabel, href: `/work/${c.slug}` };
  });

  const index: IndexItem[] = CASES.filter((c) => ['tax-relief-counsel', 'endorphins', 'physiomax'].includes(c.slug)).map((c) => ({
    slug: c.slug,
    name: REEL.find((r) => r.slug === c.slug)?.name ?? c.short,
    kind: c.kindLabel,
    services: servicesLine(c.services),
    href: `/work/${c.slug}`,
    tone: REEL.find((r) => r.slug === c.slug)?.deep ?? '#0c0c0b',
    still: still(PREVIEW[c.slug], c.plate.desktop.alt),
  }));

  return (
    <>
      <div className={s.opening}>
        <Showreel items={reel} title={`${SITE.name} · ${SITE.descriptor}`} />
        <WorkIndex items={index} title="Selected work" />
      </div>
      <Statement
        pieces={[
          'I build and run the online side of law firms and independent practices: the website ',
          { clip: { src: loop('physiomax/treat-chart--desktop', '').src, poster: loop('physiomax/treat-chart--desktop', '').poster }, label: 'PhysioMax body chart' },
          ', the Google profile ',
          { still: still('endorphins/maps-pin', ''), label: 'Endorphins on Google Maps', shape: 'round' },
          ', booking or intake ',
          { still: still('endorphins/lp-book--desktop', ''), label: 'Endorphins booking button', shape: 'pill' },
          ', ads, and the tracking that ties them together.',
        ]}
        body="I’m Kareem Hassanein. I’ve worked in healthcare for 13 years, across different roles."
        link={{ href: '/about', label: 'More about me' }}
        portrait={PORTRAIT}
      />
      <PathExplorer items={PATH.map((stop) => {
        const c = caseBySlug(stop.caseSlug)!;
        const images = {
          found: still('endorphins/maps-listing--desktop', 'The Endorphins Health and Wellness Centre listing on Google Maps, beside its pin on the map.'),
          chosen: c.stills.find((image) => image.src.includes('lp-physio--desktop')),
          booked: still('physiomax/service--desktop', 'The PhysioMax physiotherapy page, with its Book Appointment button.'),
          counted: c.plate.desktop,
          grown: c.stills.find((image) => image.src.includes('consult--desktop')),
          kept: c.stills.find((image) => image.src.includes('team--desktop')),
        };
        return { ...stop, image: images[stop.id] ?? c.plate.desktop, anchor: ['found', 'booked', 'grown'].includes(stop.id) ? '0 0' : undefined, ground: c.palette.ground, ink: c.palette.ink, domain: c.domain };
      })} />
      <Offer />
      <Close />
    </>
  );
}
