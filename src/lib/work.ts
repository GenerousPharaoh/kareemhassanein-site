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
      'A physiotherapy team was introducing a new documentation platform into an established clinical routine. The central question was not simply whether the tool worked, but whether it could reduce documentation time without creating new uncertainty, inconsistency, or administrative burden.',
      'I led the clinic-side evaluation, configuration, training, rollout support, and refinement, keeping the implementation connected to how practitioners actually documented care.',
    ],
    gallery: [],
    confidentialNote:
      'The clinic identity and practitioner information are omitted. The figures below reconstruct the rollout without reproducing private records.',
    approach:
      'Configuration, shared expectations, support, and refinement remained connected to how practitioners actually documented care.',
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
    category: 'Digital Product · Patient Experience',
    summary:
      'A 60+ page patient education and booking platform organized around the different ways people look for help: by body region, symptom, condition, or treatment.',
    cardSummary:
      'Built a 60+ page patient education and booking platform organized around how people actually look for help.',
    cardOutcome: 'Google Search clicks more than tripled year over year.',
    role:
      'I led the clinical requirements, information architecture, content structure, navigation, booking pathways, testing, and ongoing iteration.',
    intro: [
      'KinetiKare is the patient education and booking platform I founded and operate for my physiotherapy practice serving Burlington, Waterdown, and Oakville. It is designed for people who may know where they hurt or what they are experiencing without knowing the name of the condition.',
      'The platform combines body-region navigation, symptom-based guidance, condition information, treatment pages, comparisons, patient reviews, and direct online booking.',
    ],
    gallery: [
      {
        src: '/images/work/kinetikare-home.webp',
        alt: 'KinetiKare homepage with booking actions and live Google reviews',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com',
        title: 'The homepage',
        caption: 'Introduction, live Google reviews, and booking in reach without hunting for a phone number.',
      },
      {
        src: '/images/work/kinetikare-conditions.webp',
        alt: 'KinetiKare condition library filtered by body region',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions',
        title: 'The condition library',
        caption: 'Organized by body region first, with search on top, so someone can start from where it hurts.',
      },
      {
        src: '/images/work/kinetikare-compare.webp',
        alt: 'Side-by-side comparison table of tennis elbow and golfer’s elbow',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions/compare',
        title: 'Comparison pages',
        caption: 'Two commonly confused conditions side by side, with what gets checked in person to tell them apart.',
      },
      {
        src: '/images/work/kinetikare-treatment.webp',
        alt: 'Dry needling treatment page with plain-language benefits and booking',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/treatments/dry-needling',
        title: 'A treatment page',
        caption: 'What the technique is, what it helps with, and what the evidence supports, before any booking ask.',
      },
      {
        src: '/images/work/kinetikare-mobile.webp',
        alt: 'KinetiKare mobile homepage with booking and call actions',
        ...PHONE,
        frame: 'phone',
        title: 'On a phone',
        caption: 'Where most visits happen, with booking and calling a tap away.',
      },
    ],
    approach:
      'Patients do not always know the name of their condition. The platform therefore combines body-region navigation, symptom-led guides, and side-by-side comparisons instead of relying exclusively on diagnostic categories. The same clinical content is reachable from three directions because people arrive with three different kinds of questions.',
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
      'Launching physiotherapy within an established multidisciplinary clinic while redesigning the clinic’s website and digital operations around its services as a whole.',
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
        caption: 'Rebuilt around the clinic as a whole, with each discipline one level deeper.',
      },
      {
        src: '/images/work/endorphins-services-2026-08.webp',
        alt: 'Endorphins services page introducing six clinical disciplines and booking information',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services',
        title: 'The services index',
        caption: 'The six disciplines, booking options, referral requirements, and practical clinic details in one place.',
      },
      {
        src: '/images/work/endorphins-physio-2026-08.webp',
        alt: 'Endorphins physiotherapy service page',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services/physiotherapy',
        title: 'The physiotherapy page',
        caption: 'The service line I launched, written up for patients deciding whether to book.',
      },
      {
        src: '/images/work/endorphins-booking-2026-08.webp',
        alt: 'Endorphins booking page with reception and practitioner scheduling options',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/book-appointment',
        title: 'Booking',
        caption: 'Reception contact and practitioner-specific scheduling options presented together.',
      },
      {
        src: '/images/work/endorphins-mobile-2026-08.webp',
        alt: 'Endorphins mobile homepage',
        ...PHONE,
        frame: 'phone',
        title: 'On a phone',
        caption: 'Most local-search visits arrive on mobile, so calling and booking stay in reach.',
      },
    ],
    approach:
      'The clinic’s services needed to remain clear on their own terms while still feeling like part of one multidisciplinary practice. The website structure, content, and online booking options were designed around that balance.',
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
      'A reusable drafting workflow that turned repetitive intake and document-generation work into a structured operating process.',
    cardSummary:
      'Mapped a recurring drafting process and rebuilt it around reusable templates, structured inputs, and practitioner review.',
    cardOutcome: 'Drafting time fell from about three hours to 30 minutes per matter.',
    role:
      'I led workflow mapping, template design, prompt design, quality assurance, and implementation with the practitioner.',
    intro: [
      'Tax Relief Counsel is a solo tax-law practice whose matters generate long, structured documents from broadly similar inputs. Before this project, each document was drafted largely from scratch: the same sections rebuilt every time, with consistency depending on attention and available hours on a given day.',
      'I learned the practice’s workflow from the inside, mapped where the time actually went, and rebuilt the drafting process around a reusable template library with LLM-supported drafting. The substance of the work was finding the repeatable structure inside matters that looked bespoke, then shaping it into a process the practitioner can operate independently.',
    ],
    gallery: [],
    confidentialNote:
      'Client materials are confidential. The figures below are reconstructed views of the process rather than screenshots of matter documents.',
    approach:
      'The drafting process could not be meaningfully improved until the recurring inputs, decisions, and document structures were standardized. The template library came first; the automation only became reliable once the structure existed for it to fill.',
    outcomes: [
      'Document-generation time fell from approximately three hours to about 30 minutes per matter.',
      'Documented for ongoing practitioner operation, with quality checkpoints built into the process rather than left to memory.',
    ],
    environment: 'Claude Code · Structured template library · Documented SOPs',
    tier: 'principal',
  },
  {
    slug: 'wedding-website',
    title: 'Wedding Website',
    shortTitle: 'Wedding Website',
    category: 'Information Architecture · Digital Experience',
    summary:
      'A single destination that carries every guest from invitation to itinerary: the day itself, getting there, where to stay, and the optional Machu Picchu adventure.',
    role:
      'I led the information architecture, content structure, guest journeys, forms, responsive design, and testing.',
    intro: [
      'A wedding in Peru asks a lot of its guests: an international flight, an unfamiliar city, a venue outside Lima, and an optional multi-day Machu Picchu trip afterward. This site gives every guest one place that answers the practical questions.',
      'The site organizes the ceremony and reception schedule, arrival guidance, hotel and neighbourhood information, maps and calendar files, a structured RSVP flow, and a day-by-day itinerary for the optional adventure, all designed to be read on a phone while travelling.',
    ],
    gallery: [
      {
        src: '/images/work/wedding-hero.webp',
        alt: 'Wedding website arrival screen with a framed photo, names, and date',
        ...DESKTOP,
        frame: 'browser',
        title: 'The arrival',
        caption: 'One photograph settling into a gold frame with the names and the date. Logistics come a scroll later.',
      },
      {
        src: '/images/work/wedding-day.webp',
        alt: 'Wedding day schedule with venue details, maps, and calendar actions',
        ...DESKTOP,
        frame: 'browser',
        title: 'The day',
        caption: 'Schedule alongside the three things a guest needs: maps, calendar, and the invite file.',
      },
      {
        src: '/images/work/wedding-travel.webp',
        alt: 'Travel section explaining how to get to Lima',
        ...DESKTOP,
        frame: 'browser',
        title: 'Getting there',
        caption: 'Fly into Lima, stay in Miraflores, use Uber. The details follow once the shape of the trip is clear.',
      },
      {
        src: '/images/work/wedding-machu.webp',
        alt: 'Machu Picchu day-by-day itinerary with costs stated plainly',
        ...DESKTOP,
        frame: 'browser',
        title: 'The Machu Picchu trip',
        caption: 'Seven days laid out one at a time, with the cost stated plainly so guests can decide.',
      },
      {
        src: '/images/work/wedding-mobile.webp',
        alt: 'Wedding site schedule on a phone',
        ...PHONE,
        frame: 'phone',
        title: 'In transit',
        caption: 'Schedule, addresses, and actions readable at a glance on a phone.',
      },
    ],
    approach:
      'The site needed to become the single source of truth for both event and travel logistics, particularly for guests using it from their phones while travelling. Every section is structured around a question a guest would actually ask, in the order they would ask it.',
    outcomes: [
      'Guests get one authoritative link covering the ceremony, travel, lodging, RSVP, and the optional adventure, replacing scattered group messages and documents.',
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
