import { baStill, loop, still, type Loop, type Still } from '@/lib/media';

export type Palette = {
  /** Band background */ ground: string;
  /** Text on the band */ ink: string;
  muted: string;
  rule: string;
  /** Small highlights on the band */ accent: string;
};

export type Measured = { fact: string; how?: string };
export type Pair = { before: Still; after: Still; label: string };

export type CaseStudy = {
  slug: string;
  name: string;
  short: string;
  group: 'practices' | 'beyond';
  kind: 'law' | 'clinic' | 'own-practice' | 'store' | 'brand' | 'event';
  kindLabel: string;
  /** Sector pages that show this case. */
  sectors: Array<'firms' | 'clinics'>;
  services: string[];
  domain: string;
  status?: string;
  palette: Palette;
  question: string;
  summary: string;
  context?: string;
  found?: string[];
  decided: string[];
  shipped: string[];
  measured?: Measured[];
  credit?: string;
  note?: string;
  plate: { desktop: Still; phone: Still };
  /** The loop for index cards and the case header. */
  hero: Loop;
  loops: Loop[];
  stills: Still[];
  pairs: Pair[];
};

export const CASES: CaseStudy[] = [
  {
    slug: 'tax-relief-counsel',
    name: 'Tax Relief Counsel',
    short: 'Tax Relief Counsel',
    group: 'practices',
    kind: 'law',
    kindLabel: 'Tax law firm · Washington, D.C.',
    sectors: ['firms'],
    services: ['Diagnosis', 'Website', 'Tools', 'Intake', 'Tracking', 'Ads'],
    domain: 'taxreliefcounsel.com',
    status: 'Rebuild finished, launch pending',
    palette: { ground: '#1b2740', ink: '#efeae1', muted: '#b6bdca', rule: 'rgba(239,234,225,0.16)', accent: '#d9b48f' },
    question: 'Why was a tax law firm paying for leads that were really button clicks, and what would a site built for its clients look like?',
    summary: 'From an ad account counting button clicks to a rebuilt site with tools its clients use and intake that routes every request.',
    found: [
      'Most of the conversions the ad account reported were clicks on the consultation button, not leads.',
      'Audit campaigns were reaching people looking for the IRS phone number.',
      'A missing template had stripped the headings and bylines from archived posts for months.',
      'A broken link sat in every footer.',
      'Several articles were due for an update to current IRS guidance.',
    ],
    decided: [
      'Fix the live site first, with a backup and an undo for every change.',
      'Rebuild with every old address mapped, so nothing the firm had earned in search was lost.',
      'Build tools that answer a reader’s own situation, with the IRS source beside each number.',
      'Screen every form: qualified requests go to the scheduler, the rest go to the attorney.',
      'Keep the CRM’s lead format exactly, so the firm’s automations keep working.',
      'Count a conversion only after the lead has been delivered.',
      'Launch by changing one DNS record, reversible in one step.',
      'The “light on stone” design, chosen from rendered options.',
    ],
    shipped: [
      '78 pages and 32 articles',
      'Seven interactive tools, including a notice decoder',
      'Site search',
      'Intake that screens and routes each request',
      'Tracking that counts delivered leads',
      'A launch plan with a one-step way back',
    ],
    measured: [
      { fact: '120 old addresses checked, all loading on the new site', how: 'Redirect map tested address by address' },
      { fact: 'Accessibility scores of 97 to 99', how: 'Lighthouse audits of the rebuilt pages' },
    ],
    note: 'The rebuild is finished and waiting on launch. The old site was captured before launch day replaces it.',
    plate: {
      desktop: still('tax-relief-counsel/home-hero--desktop', 'Tax Relief Counsel home page: the attorney standing against a limestone wall beside the headline “Your Trusted Tax Attorney”.'),
      phone: still('tax-relief-counsel/home-hero--phone', 'Tax Relief Counsel home page on a phone.'),
    },
    hero: loop('tax-relief-counsel/hero-arrive--desktop', 'The home page opening: light moves across the stone and the practice line changes.'),
    loops: [
      loop('tax-relief-counsel/decoder--desktop', 'The notice decoder: choosing a notice shows its deadline and what it means.'),
      loop('tax-relief-counsel/map--desktop', 'Routes drawing out from Washington to clients abroad.'),
      loop('tax-relief-counsel/home-scroll--phone', 'The home page on a phone, from the opening down to the practice areas.'),
    ],
    stills: [
      still('tax-relief-counsel/decoder--desktop', 'The notice decoder with the CP14 balance-due deadline open.'),
      still('tax-relief-counsel/audits-figure--desktop', 'A figure from the audits page showing the letters of an audit and the response window each one opens.'),
      still('tax-relief-counsel/consult--desktop', 'The consultation request form, which screens each request before anyone books.'),
      still('tax-relief-counsel/practice--desktop', 'The practice index on the home page.'),
      still('tax-relief-counsel/decoder--phone', 'The notice decoder on a phone.'),
      still('tax-relief-counsel/consult--phone', 'The consultation request on a phone.'),
    ],
    pairs: [
      {
        before: baStill('tax-relief-counsel/old-home-hero--desktop', 'The old WordPress home page.'),
        after: baStill('tax-relief-counsel/home-hero--desktop', 'The rebuilt home page.'),
        label: 'Home page, the old WordPress site and the rebuild.',
      },
      {
        before: baStill('tax-relief-counsel/old-audits-top--desktop', 'The old IRS audits page.'),
        after: baStill('tax-relief-counsel/audits-top--desktop', 'The rebuilt IRS audits page.'),
        label: 'The IRS audits page, old and new.',
      },
      {
        before: baStill('tax-relief-counsel/old-home-hero--phone', 'The old home page on a phone.'),
        after: baStill('tax-relief-counsel/home-hero--phone', 'The rebuilt home page on a phone.'),
        label: 'Home on a phone, old and new.',
      },
    ],
  },
  {
    slug: 'endorphins',
    name: 'Endorphins Health and Wellness Centre',
    short: 'Endorphins',
    group: 'practices',
    kind: 'clinic',
    kindLabel: 'Multidisciplinary clinic · Burlington',
    sectors: ['clinics'],
    services: ['Website', 'Booking', 'Business Profile', 'Tracking', 'Ads plan'],
    domain: 'endorphinshealth.com',
    palette: { ground: '#e2eadb', ink: '#18230f', muted: '#4f5e45', rule: 'rgba(24,35,15,0.14)', accent: '#4d7c22' },
    question: 'How does an eight-practitioner clinic start advertising without losing control of its accounts, or paying for clicks it cannot count?',
    summary: 'Six disciplines with their practitioners on the first screen, ad pages that show the next real openings, and every account in the clinic’s name.',
    context: 'I first joined Endorphins to launch physiotherapy there as a new service.',
    found: [
      'Search visits came almost entirely from people who already knew the clinic’s name.',
      'There was no way to tell which bookings came from the site.',
      'Only some practitioners could be booked online.',
      'Some wording a college would flag, and a site that read as a template.',
    ],
    decided: [
      'One design system, chosen from rendered options.',
      'Name the colleges in text instead of showing their logos.',
      'Ad pages for physiotherapy, chiropractic and massage that show the next real openings from Jane.',
      'Keep Analytics, and keep it out of the tag manager so nothing counts twice.',
      'A click on Book is not counted as a booking.',
      'Every account in the clinic’s name, with the agency on limited access.',
      'Business Profile categories that do not compete with the clinic’s own physiotherapist.',
      'Model the ad budget before a dollar is spent.',
    ],
    shipped: [
      'A redesigned site',
      'Three ad landing pages with live openings',
      'Tag manager and cross-domain analytics with Jane',
      'A rebuilt Business Profile',
      'Linked structured data',
      'A budget model and a briefing for the owner and the agency',
    ],
    measured: [
      { fact: 'Every page indexed, with no errors across 39 addresses', how: 'Search Console and a crawl at audit' },
      { fact: 'Ad results to follow once the campaigns launch' },
    ],
    plate: {
      desktop: still('endorphins/home-hero--desktop', 'Endorphins home page: a dark green hero listing six disciplines with practitioner photos beside each.'),
      phone: still('endorphins/home-hero--phone', 'Endorphins home page on a phone.'),
    },
    hero: loop('endorphins/index-hover--desktop', 'Moving down the discipline index on the home page.'),
    loops: [
      loop('endorphins/home-scroll--phone', 'The home page on a phone.'),
      loop('endorphins/lp-scroll--phone', 'The physiotherapy ad page, down to the booking bar.'),
    ],
    stills: [
      still('endorphins/lp-physio--desktop', 'The physiotherapy ad page, with the next openings read live from Jane.'),
      still('endorphins/index--desktop', 'The discipline index up close.'),
      still('endorphins/team--desktop', 'The team page, filterable by discipline.'),
      still('endorphins/lp-physio--phone', 'The ad page on a phone, with the openings under the booking button.'),
      still('endorphins/team--phone', 'A practitioner card on a phone.'),
    ],
    pairs: [
      {
        before: baStill('endorphins/old-home-hero--desktop', 'The home page in early September.'),
        after: baStill('endorphins/home-hero-ba--desktop', 'The home page now.'),
        label: 'Home page, early September and now.',
      },
    ],
  },
  {
    slug: 'physiomax',
    name: 'PhysioMax Wellness',
    short: 'PhysioMax',
    group: 'practices',
    kind: 'clinic',
    kindLabel: 'Physiotherapy clinic · Burlington',
    sectors: ['clinics'],
    services: ['Redesign', 'Booking', 'Tracking', 'Ads', 'Privacy pages'],
    domain: 'physiomaxwellness.ca',
    palette: { ground: '#eef1f4', ink: '#132f45', muted: '#4b6275', rule: 'rgba(19,47,69,0.14)', accent: '#c4561f' },
    question: 'How do you fix an agency-built clinic site when the Book button goes nowhere, without breaking what already works?',
    summary: 'An agency-built site repaired in place: every practitioner bookable, bookings counted, and a body chart patients use to find their problem.',
    found: [
      'Book Appointment linked to nothing.',
      'Demo pages were indexed in Google.',
      'There was no privacy policy, despite health forms.',
      'There was no analytics, and bookings had never reached it.',
      'A very heavy homepage and placeholder bios.',
      'The ads were optimising for taps on map directions.',
    ],
    decided: [
      'Ship the redesign as a layer over the existing site, with the old one a single switch away.',
      'Run automated release checks on every version.',
      'Write privacy and terms for health information.',
      'Remove outcome claims.',
      'Remove a service the clinic does not offer, with a redirect.',
      'Rebuild the ads to count bookings.',
    ],
    shipped: [
      '51 pages redesigned and 2 written new',
      'A body-chart “What we treat” guide',
      'Analytics and Jane booking tracking',
      'Search Console',
      'A restructured ad account with an automatic report to the owner every two weeks',
    ],
    measured: [
      { fact: 'Text contrast raised from 2.06:1 to 4.5:1', how: 'The accessible minimum for body text' },
      { fact: 'No script errors across 53 pages', how: 'Release checks on every version' },
      { fact: 'All 11 practitioners bookable directly' },
      { fact: '67 dead links removed' },
    ],
    plate: {
      desktop: still('physiomax/home-hero--desktop', 'PhysioMax home page: a deep navy hero reading “Move better, recover faster, live pain-free”.'),
      phone: still('physiomax/home-hero--phone', 'PhysioMax home page on a phone.'),
    },
    hero: loop('physiomax/treat-chart--desktop', 'The body chart: choosing an area shows its conditions and who treats them.'),
    loops: [loop('physiomax/home-scroll--phone', 'The home page on a phone.')],
    stills: [
      still('physiomax/treat--desktop', 'The body chart with the knee chosen.'),
      still('physiomax/care--desktop', 'Services beside an isometric drawing of the clinic.'),
      still('physiomax/clinic--desktop', 'The care section of the home page.'),
      still('physiomax/treat--phone', 'The body chart on a phone.'),
      still('physiomax/service--phone', 'A service page on a phone.'),
    ],
    pairs: [
      {
        before: baStill('physiomax/old-home-hero--desktop', 'The home page in August.'),
        after: baStill('physiomax/home-hero--desktop', 'The home page now.'),
        label: 'Home page, August and now.',
      },
      {
        before: baStill('physiomax/old-service--desktop', 'The physiotherapy page in August.'),
        after: baStill('physiomax/service--desktop', 'The physiotherapy page now.'),
        label: 'The physiotherapy page, August and now.',
      },
    ],
  },
  {
    slug: 'kinetikare',
    name: 'KinetiKare Physiotherapy',
    short: 'KinetiKare',
    group: 'practices',
    kind: 'own-practice',
    kindLabel: 'My own practice · Burlington',
    sectors: ['clinics'],
    services: ['Content', 'Search', 'Speed', 'Ads', 'Measurement'],
    domain: 'kinetikarephysio.com',
    palette: { ground: '#f1ede4', ink: '#1a2233', muted: '#5d6370', rule: 'rgba(26,34,51,0.14)', accent: '#94733f' },
    question: 'What does a practitioner’s site look like when every claim is checked and every booking is counted?',
    summary: 'Sixty condition pages rebuilt in the order a patient needs them, every citation checked against its source, and a hero that paints in under a second.',
    found: [
      'Most of the reported ad conversions were button clicks.',
      'The booking event the ads optimised on counted page views across the whole clinic.',
      'Over half of all visits came from bots.',
      'A hero fade was costing seconds of load time.',
      'Duplicate identity data was confusing Google.',
      'Condition pages made patients scroll past the science to find answers.',
    ],
    decided: [
      'One identity record shared across three sites.',
      'Opening hours kept in one place.',
      'Condition pages rebuilt in the order a patient needs them.',
      'Every research card linked to its source, and “when to see a doctor first” on every page.',
      'A running log of ad changes that records its own corrections.',
    ],
    shipped: [
      'About 98 pages: 60 conditions, five regional hubs, guides and comparisons',
      'Restructured ads and call tracking',
      'A call-back form',
      'Bot protection',
    ],
    measured: [
      { fact: 'Largest paint from 2.2 s to 0.7 s', how: 'Lab measurement on a throttled phone' },
      { fact: 'Every citation re-checked against PubMed' },
      { fact: 'A six-reviewer review of every page, with all critical and high findings fixed' },
    ],
    plate: {
      desktop: still('kinetikare/home-hero--desktop', 'KinetiKare home page: a navy hero with a treatment room photograph and gold accents.'),
      phone: still('kinetikare/home-hero--phone', 'KinetiKare home page on a phone.'),
    },
    hero: loop('kinetikare/quiz--desktop', 'The pattern check on a condition page: a few questions, never a diagnosis.'),
    loops: [
      loop('kinetikare/condition-scroll--phone', 'A condition page on a phone.'),
      loop('kinetikare/home-scroll--phone', 'The home page on a phone.'),
    ],
    stills: [
      still('kinetikare/journey--desktop', 'The care journey in four illustrated prints.'),
      still('kinetikare/knee-hub--desktop', 'The knee hub, opened by an illustration of a runner.'),
      still('kinetikare/condition--desktop', 'A condition page opened by its anatomical plate.'),
      still('kinetikare/getback--desktop', 'Illustrations of sport on a dark band.'),
      still('kinetikare/knee-hub--phone', 'The knee hub on a phone.'),
      still('kinetikare/heel--phone', 'The plantar fasciitis page on a phone.'),
    ],
    pairs: [
      {
        before: baStill('kinetikare/old-condition--phone', 'The kneecap pain page in September.'),
        after: baStill('kinetikare/condition--phone', 'The kneecap pain page now.'),
        label: 'The kneecap pain page on a phone, September and now.',
      },
      {
        before: baStill('kinetikare/old-condition--desktop', 'The kneecap pain page on desktop in September.'),
        after: baStill('kinetikare/condition--desktop', 'The kneecap pain page on desktop now.'),
        label: 'The same page on desktop.',
      },
    ],
  },
  {
    slug: 'techniques-combat',
    name: 'Techniques Combat',
    short: 'Techniques',
    group: 'beyond',
    kind: 'store',
    kindLabel: 'Combat sports store · Shopify',
    sectors: [],
    services: ['Investigation', 'Redesign', 'Speed'],
    domain: 'techniquescombat.com',
    palette: { ground: '#0c0c0c', ink: '#eeeeee', muted: '#a3a3a3', rule: 'rgba(238,238,238,0.14)', accent: '#d4b04a' },
    question: 'Why were a gear store’s checkouts climbing while its orders fell, and what should the store look like once it was safe?',
    summary: 'Bot checkouts traced to their source, then a redesign built around film, live the same evening.',
    found: [
      'Bots were creating checkouts and flooding Meta with fake checkout signals.',
      'A DNS firewall would not help, because Shopify does not enforce where traffic comes from.',
      'The tag manager was loading twice.',
      'The home page’s largest paint was a slide appearing 15 seconds after load.',
    ],
    decided: [
      'Protection at the checkout, ads optimised for purchases, and no DNS proxy.',
      'A redesign on a copy of the theme, with a one-step rollback.',
      'Later hero slides drawn so they no longer count as the largest paint, the pop-up held until the first touch, and lighter video.',
    ],
    shipped: [
      'A redesign live the same evening',
      'A video hero and shoppable film reels',
      'A product page with a sticky add-to-bag and a phone photo collage',
      'A privacy policy and terms',
    ],
    measured: [{ fact: 'Home page largest paint from 15.3 s to 0.64 s on a phone', how: 'Lab measurement before and after' }],
    credit: 'The drop in fake checkouts came from the checkout protection the owner switched on.',
    plate: {
      desktop: still('techniques-combat/home-hero--desktop', 'Techniques Combat home page: a dark video hero reading “Gold Standard” over a boxer in a ring.'),
      phone: still('techniques-combat/home-hero--phone', 'Techniques Combat home page on a phone.'),
    },
    hero: loop('techniques-combat/hero-film--desktop', 'The hero film on the home page.'),
    loops: [
      loop('techniques-combat/film-strip--desktop', 'The film strip: short reels, each one shoppable.'),
      loop('techniques-combat/hero-film--phone', 'The hero on a phone.'),
      loop('techniques-combat/product-scroll--phone', 'A product page on a phone.'),
    ],
    stills: [
      still('techniques-combat/product--desktop', 'The product page for a pair of MMA gloves.'),
      still('techniques-combat/campaign--desktop', 'The campaign grid on the home page.'),
      still('techniques-combat/collection--desktop', 'A collection page.'),
      still('techniques-combat/product--phone', 'The product page on a phone.'),
    ],
    pairs: [
      {
        before: baStill('techniques-combat/old-home-hero--desktop', 'The home page on the previous theme.'),
        after: baStill('techniques-combat/home-hero--desktop', 'The redesigned home page.'),
        label: 'Home page, the previous theme and the redesign.',
      },
      {
        before: baStill('techniques-combat/old-product--desktop', 'The product page on the previous theme.'),
        after: baStill('techniques-combat/product--desktop', 'The redesigned product page.'),
        label: 'The product page, old and new.',
      },
      {
        before: baStill('techniques-combat/old-home-hero--phone', 'The previous home page on a phone.'),
        after: baStill('techniques-combat/home-hero--phone', 'The redesigned home page on a phone.'),
        label: 'Home on a phone, old and new.',
      },
    ],
  },
  {
    slug: 'travel-journal',
    name: 'A travel journal',
    short: 'Travel journal',
    group: 'beyond',
    kind: 'brand',
    kindLabel: 'Personal travel brand',
    sectors: [],
    services: ['Art direction', 'Motion', 'Website'],
    domain: 'daria-travel.vercel.app',
    status: 'Not public yet',
    palette: { ground: '#182d3d', ink: '#f6f1e7', muted: '#b4c0c8', rule: 'rgba(246,241,231,0.16)', accent: '#e3a07d' },
    question: 'How do you make a travel membership feel like a personal journal rather than a sales funnel?',
    summary: 'A journal that opens on load, a plane that crosses between chapters, and every country on one sheet of stamps.',
    decided: [
      'One readable typeface and native scrolling.',
      'Honest empty spaces where content did not exist yet.',
      'The clients’ own photographs, given careful crops.',
    ],
    shipped: [
      'A journal that opens on load',
      'Chapter transitions: a plane on a drawn route, a woodcut sun chosen from three versions, a landing ticket',
      'A stamp sheet of every country',
      'Six revision rounds, each turned around the same day',
    ],
    plate: {
      desktop: still('travel-journal/home-hero--desktop', 'Travel journal home page: a woman on a swing at sunset beside the headline “A change of scenery.”'),
      phone: still('travel-journal/home-hero--phone', 'Travel journal home page on a phone.'),
    },
    hero: loop('travel-journal/opening--desktop', 'The journal opening on a full load, then giving way to the cover photograph.'),
    loops: [
      loop('travel-journal/chapter--desktop', 'A chapter turn: a plane crosses from the cover into the first chapter as you scroll.'),
      loop('travel-journal/travels-scroll--phone', 'Our Travels on a phone: the postcard, then the sheet of stamps.'),
    ],
    stills: [
      still('travel-journal/travels-top--desktop', 'Our Travels opens on a postcard headed “Wish you were here.”'),
      still('travel-journal/stamps--desktop', 'Every country on one sheet of stamps.'),
      still('travel-journal/hello--desktop', 'An introduction beside a photograph of the couple.'),
      still('travel-journal/footer--desktop', 'The footer, set in large type.'),
      still('travel-journal/travels-top--phone', 'The postcard on a phone.'),
    ],
    pairs: [],
  },
  {
    slug: 'wedding',
    name: 'A destination wedding',
    short: 'Wedding',
    group: 'beyond',
    kind: 'event',
    kindLabel: 'Destination wedding · Peru',
    sectors: [],
    services: ['Design', 'RSVP'],
    domain: 'david-daria.com',
    palette: { ground: '#f2f1ec', ink: '#1e2630', muted: '#5e6b78', rule: 'rgba(30,38,48,0.14)', accent: '#90672b' },
    question: 'How do you give guests flying to Peru everything in one link, and make it feel like the invitation?',
    summary: 'Everything guests need for a wedding in Peru in one link, set like the invitation, with an RSVP that writes to the couple’s own spreadsheet.',
    decided: [
      'Sections in the order a guest needs them.',
      'A framed, card-like layout.',
      'An arch-shaped hero, built and then replaced when the couple preferred their full photograph.',
      'Decoration removed wherever it distracted.',
    ],
    shipped: ['Live at david-daria.com', 'A working RSVP that writes to the couple’s own Google Sheet', 'A pinned Machu Picchu itinerary'],
    plate: {
      desktop: still('wedding/hero--desktop', 'Wedding site opening: the couple photographed in a gold-ruled frame above their names and the date.'),
      phone: still('wedding/hero--phone', 'The wedding site on a phone.'),
    },
    hero: loop('wedding/opening--desktop', 'The opening: the couple’s photograph settles into its frame.'),
    loops: [
      loop('wedding/opening--phone', 'The opening on a phone.'),
      loop('wedding/home-scroll--phone', 'On a phone, from the photograph into the welcome and their story.'),
    ],
    stills: [
      still('wedding/welcome--desktop', 'The welcome, counting down to the day.'),
      still('wedding/day--desktop', 'The day, hour by hour, on a blue band.'),
      still('wedding/story--desktop', 'Their story, beside the couple’s photographs.'),
      still('wedding/day--phone', 'The day on a phone.'),
    ],
    pairs: [],
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
export const PRACTICE_CASES = CASES.filter((c) => c.group === 'practices');
export const BEYOND_CASES = CASES.filter((c) => c.group === 'beyond');
