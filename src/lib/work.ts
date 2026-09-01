// Single source of truth for the portfolio: the four principal projects,
// their project detail content, and the supporting advisory work.

export interface ShotMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: 'browser' | 'phone';
  url?: string;
}

export interface GalleryItem extends ShotMeta {
  title: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  cardSummary?: string;
  cardOutcome?: string;
  role: string;
  intro: string[];
  gallery: GalleryItem[];
  approach: string;
  outcomes: string[];
  environment?: string;
  liveUrl?: string;
  card?: ShotMeta;
  confidentialNote?: string;
  contextLabel?: string;
  tier?: 'principal' | 'additional';
}

const DESKTOP = { width: 1440, height: 900 } as const;
const PHONE = { width: 390, height: 844 } as const;

export const projects: Project[] = [
  {
    slug: 'clinical-documentation',
    title: 'Clinical Documentation Rollout',
    shortTitle: 'Clinical Documentation Rollout',
    contextLabel: 'Private Physiotherapy Clinic',
    category: 'Technology Adoption · Clinical Operations',
    summary:
      'Introduced a clinical documentation platform across a physiotherapy team, from evaluation and configuration through training, rollout, and refinement.',
    cardSummary:
      'Led clinic-side evaluation, configuration, training, go-live support, and refinement for a new clinical documentation platform.',
    role:
      'I led clinic-side evaluation, configuration, team training, go-live support, and post-launch refinement.',
    intro: [
      'A physiotherapy clinic was moving its clinical notes onto an AI documentation platform. The aim was to cut the time practitioners spent on notes without the notes becoming less consistent.',
      'I evaluated the platform for the clinic, configured it, trained the team, supported the first weeks of use, and adjusted the setup as problems came up.',
    ],
    gallery: [],
    confidentialNote:
      'The clinic and its practitioners are not named. The figures below are illustrations of the rollout, not clinic records.',
    approach:
      'The platform was configured around the way the team already wrote notes, rather than asking practitioners to change how they documented to suit the tool. The setup was revised as problems came up in the first weeks of use.',
    outcomes: [
      'Full-team use was reached within eight weeks.',
      'The rollout was estimated to save each practitioner approximately three hours per week.',
    ],
    environment: 'AI documentation platform · Clinical workflows · Team training · Documented SOPs',
    tier: 'principal',
  },
  {
    slug: 'kinetikare',
    title: 'KinetiKare Physiotherapy',
    shortTitle: 'KinetiKare',
    category: 'Patient Education · Online Booking',
    summary:
      'A 60+ page physiotherapy website where patients can explore by body region, symptom, condition, or treatment before booking online.',
    cardSummary:
      'Built a 60+ page physiotherapy website where patients can explore by body region, symptom, condition, or treatment before booking.',
    cardOutcome: 'Google Search clicks more than tripled year over year.',
    role:
      'I led the clinical requirements, information architecture, content structure, navigation, booking pathways, testing, and ongoing iteration.',
    intro: [
      'KinetiKare is my personal physiotherapy brand, with the website serving as its main public presence. It is designed for people who may know where they hurt or what they are experiencing without knowing the name of the condition.',
      'The site combines body-region navigation, symptom-based guidance, condition information, treatment pages, comparisons, patient reviews, and direct online booking.',
    ],
    gallery: [
      {
        src: '/images/work/kinetikare-home.webp',
        alt: 'KinetiKare homepage with booking actions and live Google reviews',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com',
        title: 'The homepage',
        caption: 'The introduction, Google reviews, and the booking button.',
      },
      {
        src: '/images/work/kinetikare-conditions.webp',
        alt: 'KinetiKare condition library filtered by body region',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions',
        title: 'The condition library',
        caption: 'Conditions grouped by body region, with a search box above.',
      },
      {
        src: '/images/work/kinetikare-compare.webp',
        alt: 'Side-by-side comparison table of tennis elbow and golfer’s elbow',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions/compare',
        title: 'Comparison pages',
        caption: 'Two similar conditions side by side, with how they are told apart in an assessment.',
      },
      {
        src: '/images/work/kinetikare-treatment.webp',
        alt: 'Dry needling treatment page with plain-language benefits and booking',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/treatments/dry-needling',
        title: 'A treatment page',
        caption: 'What the technique is, what it is used for, and what the evidence says.',
      },
      {
        src: '/images/work/kinetikare-mobile.webp',
        alt: 'KinetiKare mobile homepage with booking and call actions',
        ...PHONE,
        frame: 'phone',
        title: 'On a phone',
        caption: 'The same pages on a phone, with the call and booking buttons.',
      },
    ],
    approach:
      'Most people arrive knowing where it hurts rather than the name of the condition, so the site can be browsed by body region and by symptom as well as by condition. Comparison pages cover the conditions most often mistaken for each other.',
    outcomes: [
      'Monthly Google Search clicks increased from 27 in July 2025 to 93 in July 2026.',
    ],
    environment: 'Next.js · GitHub · Vercel · Jane App · Google Search Console',
    liveUrl: 'https://www.kinetikarephysio.com',
    card: {
      src: '/images/work/kinetikare-home.webp',
      alt: 'KinetiKare homepage with booking actions and live Google reviews',
      ...DESKTOP,
      frame: 'browser',
      url: 'kinetikarephysio.com',
    },
    tier: 'principal',
  },
  {
    slug: 'endorphins',
    title: 'Endorphins Health and Wellness Centre',
    shortTitle: 'Endorphins',
    category: 'Service Launch · Digital Operations',
    summary:
      'Launching physiotherapy at an established multidisciplinary clinic, then rebuilding the clinic’s website and online booking around all six of its services.',
    cardSummary:
      'Launched physiotherapy and rebuilt the clinic website around its six services and their booking paths.',
    cardOutcome: 'Google Search clicks increased 4.5 times year over year.',
    role:
      'I led the physiotherapy service launch, website strategy, information architecture, content, online-booking pathways, and analytics.',
    intro: [
      'Endorphins is an established multidisciplinary clinic in Burlington. I joined to launch physiotherapy as a new service and subsequently took responsibility for the clinic’s website and broader digital operations.',
      'The work involved both establishing the new service and improving how the clinic presents its different services, practitioners, and booking options to the public.',
    ],
    gallery: [
      {
        src: '/images/work/endorphins-home-2026-08.webp',
        alt: 'Endorphins Health and Wellness Centre homepage',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com',
        title: 'The clinic homepage',
        caption: 'The homepage: the clinic, its six services, and how to book.',
      },
      {
        src: '/images/work/endorphins-services-2026-08.webp',
        alt: 'Endorphins services page introducing six clinical disciplines and booking information',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services',
        title: 'The services index',
        caption: 'The six services, with booking options, referral requirements, and clinic details.',
      },
      {
        src: '/images/work/endorphins-physio-2026-08.webp',
        alt: 'Endorphins physiotherapy service page',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services/physiotherapy',
        title: 'The physiotherapy page',
        caption: 'The page for the physiotherapy service, which I launched at the clinic.',
      },
      {
        src: '/images/work/endorphins-booking-2026-08.webp',
        alt: 'Endorphins booking page with reception and practitioner scheduling options',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/book-appointment',
        title: 'Booking',
        caption: 'Reception contact details and online booking for the practitioners who offer it.',
      },
      {
        src: '/images/work/endorphins-mobile-2026-08.webp',
        alt: 'Endorphins mobile homepage',
        ...PHONE,
        frame: 'phone',
        title: 'On a phone',
        caption: 'The services and booking pages on a phone.',
      },
    ],
    approach:
      'Each service got its own page and its own way to book, all under one clinic site rather than six separate identities.',
    outcomes: [
      'Physiotherapy launched as a functioning service within the clinic.',
      'The redesigned site gives each service a clear public page, with online booking where the discipline supports it and reception contact everywhere else. Monthly Google Search clicks increased from 25 in July 2025 to 112 in July 2026 following the relaunch.',
    ],
    environment: 'Custom site · GitHub Actions · Jane App · Google Analytics · Google Business Profile',
    liveUrl: 'https://endorphinshealth.com',
    card: {
      src: '/images/work/endorphins-home-2026-08.webp',
      alt: 'Endorphins Health and Wellness Centre homepage',
      ...DESKTOP,
      frame: 'browser',
      url: 'endorphinshealth.com',
    },
    tier: 'principal',
  },
  {
    slug: 'tax-relief-counsel',
    title: 'Tax Relief Counsel',
    shortTitle: 'Tax Relief Counsel',
    category: 'Workflow Improvement · Professional Services',
    summary:
      'A template library and drafting workflow for a solo tax-law practice, replacing documents that had been written from scratch for every matter.',
    cardSummary:
      'Mapped a recurring drafting process and rebuilt it around reusable templates, structured inputs, and practitioner review.',
    cardOutcome: 'Drafting time fell from about three hours to 30 minutes per matter.',
    role:
      'I led workflow mapping, template design, prompt design, quality assurance, and implementation with the practitioner.',
    intro: [
      'Tax Relief Counsel is a solo tax-law practice. Its matters produce long documents built from similar inputs, and before this project each one was drafted from scratch, with the same sections rebuilt every time.',
      'I went through the drafting process with the practitioner, mapped where the time went, and built a template library that a language model drafts from using structured inputs.',
    ],
    gallery: [],
    confidentialNote:
      'Client materials are confidential. The figures below show the process, not any matter documents.',
    approach:
      'The templates came before any automation. The recurring sections, inputs, and decisions had to be written down in a standard form first; the drafting model only produced consistent output once it had that structure to fill in.',
    outcomes: [
      'Document-generation time fell from approximately three hours to about 30 minutes per matter.',
      'The process is documented so the practitioner runs it without me, with the review steps written into it.',
    ],
    environment: 'Claude Code · Structured template library · Documented SOPs',
    tier: 'principal',
  },
  {
    slug: 'wedding-website',
    title: 'Wedding Website',
    shortTitle: 'Wedding Website',
    category: 'Event Website · Guest Logistics',
    summary:
      'A guest website for a wedding in Peru: the schedule, how to get there, where to stay, the RSVP, and an optional Machu Picchu trip afterward.',
    role:
      'I led the structure, content, RSVP form, mobile layout, and testing.',
    intro: [
      'The wedding is at a hacienda south of Lima, most guests are flying in from abroad, and there is an optional seven-day Machu Picchu trip afterward. The site puts the practical information in one place.',
      'It covers the schedule for the day, the venue with a map and a calendar file, flights and the hotel, getting around Lima, the trip itinerary and its cost, common questions, and the RSVP form.',
    ],
    gallery: [
      {
        src: '/images/work/wedding-hero.webp',
        alt: 'Wedding website arrival screen with a framed photo, names, and date',
        ...DESKTOP,
        frame: 'browser',
        title: 'The arrival',
        caption: 'A photograph of the couple in a gold frame, with their names and the date.',
      },
      {
        src: '/images/work/wedding-day.webp',
        alt: 'Wedding day schedule with venue details, maps, and calendar actions',
        ...DESKTOP,
        frame: 'browser',
        title: 'The day',
        caption: 'The schedule for the day, with the venue address, a map link, and a calendar file.',
      },
      {
        src: '/images/work/wedding-travel.webp',
        alt: 'Travel section explaining how to get to Lima',
        ...DESKTOP,
        frame: 'browser',
        title: 'Getting there',
        caption: 'Flights into Lima, the hotel in Miraflores, and getting around by Uber.',
      },
      {
        src: '/images/work/wedding-machu.webp',
        alt: 'Machu Picchu day-by-day itinerary with the cost per person',
        ...DESKTOP,
        frame: 'browser',
        title: 'The Machu Picchu trip',
        caption: 'The optional seven-day trip after the wedding, one day at a time, with the cost per person.',
      },
      {
        src: '/images/work/wedding-mobile.webp',
        alt: 'Wedding site schedule on a phone',
        ...PHONE,
        frame: 'phone',
        title: 'On a phone',
        caption: 'The schedule and venue details on a phone.',
      },
    ],
    approach:
      'The sections run in the order a guest needs them, from the day itself through flights and the hotel to the optional trip and the RSVP, and every section was checked on a phone as well as a desktop.',
    outcomes: [
      'Guests get one link that covers the ceremony, travel, the hotel, the RSVP, and the optional trip.',
    ],
    environment: 'Next.js · Vercel · Framer Motion',
    card: {
      src: '/images/work/wedding-hero.webp',
      alt: 'Wedding website arrival screen with a framed photo, names, and date',
      ...DESKTOP,
      frame: 'browser',
    },
    tier: 'additional',
  },
];

const projectOrder = [
  'tax-relief-counsel',
  'clinical-documentation',
  'endorphins',
  'kinetikare',
  'wedding-website',
];

export const orderedProjects = projectOrder
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

export const principalProjects = orderedProjects.filter((project) => project.tier === 'principal');
export const additionalProjects = orderedProjects.filter((project) => project.tier === 'additional');

// The homepage screen wall.
//
// Captured for this section rather than reused from the project galleries: the
// gallery shots are page tops, which at this size are mostly navigation and
// headline. These are the sections that carry the design, and they lean on the
// condition pages because the anatomical plates are the best-looking thing
// either site has. Order alternates KinetiKare and Endorphins, and keeps the
// plates apart so the wall does not read as a row of cream circles.
export interface WallShot {
  src: string;
  alt: string;
  /** Which project the screen belongs to. */
  project: string;
  /** What the screen is. */
  label: string;
  /** The real address, shown in the frame's own chrome. */
  url: string;
  /** Which project it belongs to. */
  slug: string;
}

const KK = 'KinetiKare Physiotherapy';
const EN = 'Endorphins Health and Wellness Centre';

export const wallShots: WallShot[] = [
  { src: '/images/work/reel-kk-hero.webp', project: KK, url: 'kinetikarephysio.com', slug: 'kinetikare', label: 'The homepage',
    alt: 'KinetiKare homepage split diagonally between the introduction and the treatment room' },
  { src: '/images/work/reel-endo-disciplines.webp', project: EN, url: 'endorphinshealth.com', slug: 'endorphins', label: 'Six disciplines',
    alt: 'Endorphins healthcare disciplines laid out as six cards' },
  { src: '/images/work/reel-kk-spine.webp', project: KK, url: 'kinetikarephysio.com/conditions/low-back-pain', slug: 'kinetikare', label: 'Low back pain',
    alt: 'KinetiKare low back pain page with an anatomical plate of the lumbar spine' },
  { src: '/images/work/reel-endo-physio.webp', project: EN, url: 'endorphinshealth.com/services/physiotherapy', slug: 'endorphins', label: 'Physiotherapy',
    alt: 'Endorphins physiotherapy service page with booking and referral details' },
  { src: '/images/work/reel-kk-regions.webp', project: KK, url: 'kinetikarephysio.com/conditions', slug: 'kinetikare', label: 'Start where it hurts',
    alt: 'KinetiKare condition index filtered by body region' },
  { src: '/images/work/reel-endo-reviews.webp', project: EN, url: 'endorphinshealth.com', slug: 'endorphins', label: 'Patient reviews',
    alt: 'Endorphins patient reviews with a verified Google rating' },
  { src: '/images/work/reel-kk-shoulder.webp', project: KK, url: 'kinetikarephysio.com/conditions/frozen-shoulder', slug: 'kinetikare', label: 'Frozen shoulder',
    alt: 'KinetiKare frozen shoulder page with an anatomical plate of the glenohumeral capsule' },
  { src: '/images/work/reel-endo-booking.webp', project: EN, url: 'endorphinshealth.com/book-appointment', slug: 'endorphins', label: 'Booking',
    alt: 'Endorphins booking page with reception and practitioner scheduling side by side' },
  { src: '/images/work/reel-kk-compare.webp', project: KK, url: 'kinetikarephysio.com/conditions/compare', slug: 'kinetikare', label: 'Two conditions, compared',
    alt: 'KinetiKare comparison table setting tennis elbow against golfer’s elbow' },
  { src: '/images/work/reel-endo-massage.webp', project: EN, url: 'endorphinshealth.com/services/massage-therapy', slug: 'endorphins', label: 'Massage techniques',
    alt: 'Endorphins massage therapy page listing four techniques' },
  { src: '/images/work/reel-kk-knee.webp', project: KK, url: 'kinetikarephysio.com/conditions/knee-pain-patellofemoral', slug: 'kinetikare', label: 'Patellofemoral knee pain',
    alt: 'KinetiKare knee pain page with an anatomical plate of the patellofemoral joint' },
  { src: '/images/work/reel-endo-home.webp', project: EN, url: 'endorphinshealth.com', slug: 'endorphins', label: 'The clinic homepage',
    alt: 'Endorphins clinic homepage led by a photograph of the building' },
  { src: '/images/work/reel-kk-needling.webp', project: KK, url: 'kinetikarephysio.com/treatments/dry-needling', slug: 'kinetikare', label: 'Dry needling',
    alt: 'KinetiKare dry needling treatment page' },
  { src: '/images/work/reel-kk-sciatica.webp', project: KK, url: 'kinetikarephysio.com/conditions/sciatica', slug: 'kinetikare', label: 'Sciatica',
    alt: 'KinetiKare sciatica page with an anatomical plate of the sciatic nerve' },
  { src: '/images/work/reel-kk-process.webp', project: KK, url: 'kinetikarephysio.com/services', slug: 'kinetikare', label: 'What to expect',
    alt: 'KinetiKare treatment process laid out in four stages' },
  { src: '/images/work/reel-kk-elbow.webp', project: KK, url: 'kinetikarephysio.com/conditions/tennis-elbow', slug: 'kinetikare', label: 'Tennis elbow',
    alt: 'KinetiKare tennis elbow page with an anatomical plate of the common extensor origin' },
  { src: '/images/work/reel-kk-manual.webp', project: KK, url: 'kinetikarephysio.com', slug: 'kinetikare', label: 'Hands-on therapy',
    alt: 'KinetiKare manual therapy section with a treatment photograph' },
  { src: '/images/work/reel-kk-achilles.webp', project: KK, url: 'kinetikarephysio.com/conditions/achilles-tendinopathy', slug: 'kinetikare', label: 'Achilles tendinopathy',
    alt: 'KinetiKare Achilles tendinopathy page with an anatomical plate of the tendon' },
  { src: '/images/work/reel-kk-anatomy.webp', project: KK, url: 'kinetikarephysio.com/conditions/rotator-cuff-injuries', slug: 'kinetikare', label: 'Rotator cuff injuries',
    alt: 'KinetiKare rotator cuff page with an anatomical plate of the shoulder' },
  { src: '/images/work/reel-kk-foot.webp', project: KK, url: 'kinetikarephysio.com/conditions/plantar-fasciitis', slug: 'kinetikare', label: 'Plantar fasciitis',
    alt: 'KinetiKare plantar fasciitis page with an anatomical plate of the plantar fascia' },
  { src: '/images/work/reel-kk-disc.webp', project: KK, url: 'kinetikarephysio.com/conditions/disc-herniation', slug: 'kinetikare', label: 'Disc herniation',
    alt: 'KinetiKare disc herniation page with an anatomical plate of an intervertebral disc' },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const advisory = [
  {
    title: 'Neuro-Mod',
    desc: 'Advising on the clinical deployment of ARISE, an augmented-reality therapy for chronic neck pain, with a focus on rehabilitation workflows, clinician onboarding, remote monitoring, patient education, interface design, and rollout readiness.',
  },
  {
    title: 'Lab2Market Validate · McMaster University',
    desc: 'Mentoring health-tech and health-innovation teams on clinical fit, workflow burden, onboarding, adoption, and the practical realities of introducing new products into care environments.',
  },
];
