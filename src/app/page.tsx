import { Close, Offer } from '@/components/home/HomeEnd';
import s from '@/components/home/Home.module.css';
import type { ReelItem, ReelMedia } from '@/components/home/Showreel';
import { WorkWall, type WallTile } from '@/components/home/WorkWall';
import { Statement } from '@/components/home/Statement';
import { WorkIndex, type IndexItem } from '@/components/home/WorkIndex';
import { CASES } from '@/content/cases';
import { SITE } from '@/content/site';
import { PORTRAIT } from '@/content/portrait';
import wallWidths from '@/content/wall-media.json';
import { loop, still, type Still } from '@/lib/media';
import { pageMeta } from '@/lib/meta';


export const metadata = pageMeta({
  title: `${SITE.name} · ${SITE.descriptor}`,
  absoluteTitle: true,
  description: SITE.description,
  path: '/',
});

/** A loop for the reel: its first frame as the still, the video on top. */
const reelLoop = (key: string): ReelMedia => {
  const l = loop(key, '');
  return { image: { src: l.poster, srcSet: `${l.poster} ${l.w}w`, w: l.w, h: l.h }, video: l.src };
};

/** A still for the reel, at its large widths (1600 and up for desktop, 780 and up for a phone). */
const reelStill = (key: string, min = 1600): ReelMedia => {
  const st = still(key, '');
  const widths = st.widths.filter((w) => w >= min);
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
    phone: reelLoop('tax-relief-counsel/home-scroll--phone'),
    seconds: { desktop: 6.1, phone: 7.3 },
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
    // The knee pain page: the illustrated runner, with the navigation kept in frame
    focus: { desktop: 0.1, phone: 0 },
    desktop: reelStill('kinetikare/knee-hub--desktop'),
    phone: reelStill('kinetikare/knee-hub--phone', 780),
    seconds: { desktop: 4.4, phone: 4.4 },
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

// Each selected project has a short visual sequence, beginning with a strong standalone image.
const PREVIEWS: Record<string, [string, string][]> = {
  'tax-relief-counsel': [
    ['home-hero--desktop', 'The Tax Relief Counsel homepage, with its attorney portrait and ivory and navy palette.'],
    ['practice--desktop', 'The practice-area layout on the Tax Relief Counsel website.'],
    ['attorney--desktop', 'The attorney profile on the Tax Relief Counsel website.'],
    ['map--desktop', 'The map showing the reach of Tax Relief Counsel.'],
  ],
  physiomax: [
    ['home-hero--desktop', 'The PhysioMax homepage, with its orange and navy typography.'],
    ['treat--desktop', 'The body-area explorer on the PhysioMax website.'],
    ['service--desktop', 'The physiotherapy page and treatment illustration on the PhysioMax website.'],
  ],
  'techniques-combat': [
    ['home-hero--desktop', 'The Techniques Combat homepage, with its boxing film and gold typography.'],
    ['campaign--desktop', 'The campaign collection on the Techniques Combat website.'],
    ['product--desktop', 'The Techniques Combat product page for a pair of MMA gloves.'],
  ],
};

const KEEP_CASE = ['Business Profile', 'Shopify'];
/** "Diagnosis, Website, Tools" reads as "Diagnosis, website, tools". */
const servicesLine = (list: string[]) =>
  list.map((x, i) => (i === 0 || KEEP_CASE.includes(x) || /^[A-Z]{2,}$/.test(x) ? x : x.charAt(0).toLowerCase() + x.slice(1))).join(', ');

export default function Home() {
  // The wall: every screen of the work, desktop and phone, on its client's colour. Stills only: video
  // among the moving rows cost the wall its smoothness. Each client's screens are spaced out with its
  // phone screens, then the clients are dealt across the rows in turn, so neighbours always come from
  // different clients.
  const pools = CASES.map((c, ci) => {
    const tile = (still: Still, ratio: number): WallTile => ({
      key: still.src, ground: c.palette.ground, device: still.device, ratio,
      still: { ...still, src: still.src.replace('/work-media/', '/work-media/wall/'), widths: wallWidths[still.device] },
    });
    const screens = [c.plate.desktop, c.plate.phone, ...c.stills].filter((st, i, all) => all.findIndex((o) => o.src === st.src) === i);
    const wide = screens.filter((st) => st.device === 'desktop' && st.w / st.h >= 1.35 && st.w / st.h <= 2).map((st) => tile(st, st.w / st.h));
    const tall = screens.filter((st) => st.device === 'phone').map((st) => tile(st, 0.56));
    const pool: WallTile[] = [];
    for (let k = 0; wide.length || tall.length; k++) pool.push(((tall.length && (k + ci) % 3 === 2) || !wide.length ? tall : wide).shift()!);
    return pool;
  });
  const dealt: WallTile[] = [];
  for (let i = 0; pools.some((p) => p[i]); i++) pools.forEach((p) => p[i] && dealt.push(p[i]));
  const ROWS = 6;
  const wall: WallTile[][] = Array.from({ length: ROWS }, (_, r) => dealt.filter((_, i) => i % ROWS === r));

  const index: IndexItem[] = CASES.filter((c) => ['tax-relief-counsel', 'physiomax', 'techniques-combat'].includes(c.slug)).map((c) => ({
    slug: c.slug,
    name: REEL.find((r) => r.slug === c.slug)?.name ?? c.short,
    kind: c.kindLabel,
    services: servicesLine(c.services),
    href: `/work/${c.slug}`,
    tone: REEL.find((r) => r.slug === c.slug)?.deep ?? '#0c0c0b',
    frames: PREVIEWS[c.slug].map(([key, alt]) => still(`${c.slug}/${key}`, alt)),
  }));

  return (
    <>
      <div className={s.opening}>
        <WorkWall rows={wall} name={SITE.name} line={SITE.descriptor} bookingHref={SITE.bookingHref} />
        <WorkIndex items={index} title="Selected work" />
      </div>
      <Statement
        pieces={[
          'I build and run websites ',
          { still: still('tax-relief-counsel/chip-headline', ''), label: 'The Tax Relief Counsel headline' },
          ', Google profiles ',
          { still: still('endorphins/chip-map', ''), label: 'Endorphins on Google Maps' },
          ', booking or intake ',
          { still: still('endorphins/chip-book', ''), label: 'The Endorphins Book Appointment button' },
          ', ads and tracking for businesses and personal projects.',
        ]}
        body="I’m Kareem Hassanein. I’ve worked in healthcare for 13 years, across different roles."
        link={{ href: '/about', label: 'More about me' }}
        portrait={PORTRAIT}
      />
      <Offer />
      <Close />
    </>
  );
}
