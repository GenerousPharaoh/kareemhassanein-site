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

export interface ProjectProof {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  cardSummary?: string;
  proof?: ProjectProof[];
  contribution: string[];
  intro: string[];
  gallery: GalleryItem[];
  decisionHeading?: string;
  decision: string;
  outcomes: string[];
  environment?: string;
  delivery?: string;
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
      'Led evaluation, configuration, training and rollout to full-team use within eight weeks, with an estimated three hours saved per practitioner each week.',
    proof: [
      { value: '8 weeks', label: 'from evaluation to full-team use' },
      { value: '~3 hours per week', label: 'estimated time saved per practitioner' },
    ],
    contribution: [
      'Workflow evaluation',
      'Configuration',
      'Team training',
      'SOP development',
      'Go-live support',
      'Team rollout',
      'Post-launch refinement',
    ],
    intro: [
      'A physiotherapy team was introducing a new documentation platform into an established clinical routine. The central question was not simply whether the tool worked, but whether it could reduce documentation time without creating new uncertainty, inconsistency, or administrative burden.',
      'I led the clinic-side evaluation, configuration, training, rollout support, and refinement. Full-team use was reached within eight weeks, with an estimated three hours saved per practitioner each week.',
    ],
    gallery: [],
    confidentialNote:
      'The clinic identity and practitioner information are omitted. The figures below reconstruct the rollout without reproducing private records.',
    decisionHeading: 'Treat the rollout as an operating change, not a one-time training event.',
    decision:
      'Configuration, shared expectations, support, and refinement remained connected to how practitioners actually documented care.',
    outcomes: [
      'Full-team use was reached within eight weeks.',
      'The rollout was estimated to save each practitioner approximately three hours per week.',
    ],
    environment: 'AI documentation platform · Clinical workflows · Team training · Documented SOPs',
    delivery:
      'Evaluation, configuration, training, SOP development, go-live support, and post-launch refinement were led by me on the clinic side.',
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
      'Built and iterated a 60+ page patient education and booking platform; monthly Google Search clicks increased from 27 in July 2025 to 93 in July 2026.',
    proof: [
      { value: '27 to 93', label: 'monthly Google Search clicks, July 2025 to July 2026' },
      { value: '60+ pages', label: 'patient education and booking platform launched' },
      { value: '54.2 to 9.8', label: 'average Google Search position, July 2025 to July 2026 (lower is better)' },
    ],
    contribution: [
      'Clinical requirements',
      'Information architecture',
      'Content structure',
      'Navigation',
      'Booking pathways',
      'Analytics',
      'Testing',
      'Iteration',
      'AI-assisted development',
    ],
    intro: [
      'KinetiKare is the patient education and booking platform I founded and operate for my physiotherapy practice in Burlington. It is designed for people who may know where they hurt or what they are experiencing without knowing the name of the condition.',
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
    decision:
      'Patients do not always know the name of their condition. The platform therefore combines body-region navigation, symptom-led guides, and side-by-side comparisons instead of relying exclusively on diagnostic categories. The same clinical content is reachable from three directions because people arrive with three different kinds of questions.',
    outcomes: [
      'Monthly Google Search clicks increased from 27 in July 2025 to 93 in July 2026, while average result position improved from 54.2 to 9.8.',
    ],
    environment: 'Next.js · GitHub · Vercel · Jane App · Google Search Console',
    delivery:
      'Clinical requirements, information architecture, content, and testing led by me; the implementation was built, refined, and maintained through Claude Code and Codex.',
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
      'Launched physiotherapy as a new clinic service and led the clinic-wide website relaunch. Monthly Google Search clicks increased from 25 in July 2025 to 112 in July 2026.',
    proof: [
      { value: '25 to 112', label: 'monthly Google Search clicks, July 2025 to July 2026' },
    ],
    contribution: [
      'Service launch',
      'Website strategy',
      'Information architecture',
      'Online booking',
      'Content',
      'Analytics',
      'Search performance',
    ],
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
    decision:
      'The clinic’s services needed to remain clear on their own terms while still feeling like part of one multidisciplinary practice. The website structure, content, and online booking options were designed around that balance.',
    outcomes: [
      'Physiotherapy launched as a functioning service within the clinic.',
      'The redesigned site gives each service a clear public page, with online booking where the discipline supports it and reception contact everywhere else. Monthly Google Search clicks increased from 25 in July 2025 to 112 in July 2026 following the relaunch.',
    ],
    environment: 'Custom site · GitHub Actions · Jane App · Google Analytics · Google Business Profile',
    delivery:
      'Service launch, website strategy, information architecture, content, and analytics led by me; the site implementation was built and maintained through AI-assisted development tools.',
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
      'Reduced document-generation time from approximately three hours to 30 minutes per matter and documented the workflow for independent use by the practitioner.',
    proof: [
      { value: '~3 hours → 30 minutes', label: 'document-generation time per matter' },
    ],
    contribution: [
      'Workflow mapping',
      'Bottleneck identification',
      'Template library',
      'LLM-supported drafting',
      'Prompt design',
      'Quality assurance',
      'Adoption',
    ],
    intro: [
      'Tax Relief Counsel is a solo tax-law practice whose matters generate long, structured documents from broadly similar inputs. Before this project, each document was drafted largely from scratch: the same sections rebuilt every time, with consistency depending on attention and available hours on a given day.',
      'I learned the practice’s workflow from the inside, mapped where the time actually went, and rebuilt the drafting process around a reusable template library with LLM-supported drafting. The interesting part was not the automation itself. It was finding the repeatable structure inside work that looked bespoke, and shaping it into a process the practitioner can operate independently.',
    ],
    gallery: [],
    confidentialNote:
      'Client materials are confidential. The figures below are reconstructed views of the process rather than screenshots of matter documents.',
    decision:
      'The drafting process could not be meaningfully improved until the recurring inputs, decisions, and document structures were standardized. The template library came first; the automation only became reliable once the structure existed for it to fill.',
    outcomes: [
      'Document-generation time fell from approximately three hours to about 30 minutes per matter.',
      'Documented for ongoing practitioner operation, with quality checkpoints built into the process rather than left to memory.',
    ],
    environment: 'Claude Code · Structured template library · Documented SOPs',
    delivery:
      'Workflow mapping, template design, prompt design, and quality assurance led by me; the drafting tooling was built with Claude Code around the practice’s existing habits.',
    tier: 'principal',
  },
  {
    slug: 'wedding-website',
    title: 'Wedding Website',
    shortTitle: 'Wedding Website',
    category: 'Information Architecture · Digital Experience',
    summary:
      'A single destination that carries every guest from invitation to itinerary: the day itself, getting there, where to stay, and the optional Machu Picchu adventure.',
    contribution: [
      'Information architecture',
      'Content structure',
      'Travel and event journeys',
      'Forms',
      'Responsive experience',
      'AI-assisted development',
    ],
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
    decision:
      'The site needed to become the single source of truth for both event and travel logistics, particularly for guests using it from their phones while travelling. Every section is structured around a question a guest would actually ask, in the order they would ask it.',
    outcomes: [
      'Guests get one authoritative link covering the ceremony, travel, lodging, RSVP, and the optional adventure, replacing scattered group messages and documents.',
    ],
    environment: 'Next.js · Vercel · Framer Motion',
    delivery:
      'Information architecture, content structure, and journey design led by me; the site was built, tested, and refined through AI-assisted development tools.',
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
