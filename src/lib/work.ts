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
  contribution: string[];
  intro: string[];
  gallery: GalleryItem[];
  decision: string;
  outcomes: string[];
  environment?: string;
  delivery?: string;
  liveUrl?: string;
  card?: ShotMeta;
  size: 'large' | 'small';
  confidentialNote?: string;
  contextLabel?: string;
  tier?: 'principal' | 'additional';
  proof?: Array<{
    value: string;
    label: string;
  }>;
}

const DESKTOP = { width: 1440, height: 900 } as const;
const PHONE = { width: 390, height: 844 } as const;

export const projects: Project[] = [
  {
    slug: 'clinical-documentation',
    title: 'AI Documentation Rollout',
    shortTitle: 'AI Documentation Rollout',
    contextLabel: 'Private Physiotherapy Clinic',
    category: 'Clinical Implementation · Change Adoption',
    summary:
      'Clinic-side evaluation, configuration, training, SOP development, go-live support, and refinement for an AI documentation platform adopted by the full physiotherapy team within eight weeks.',
    contribution: [
      'Workflow evaluation',
      'Configuration',
      'Team training',
      'SOP development',
      'Go-live support',
      'Adoption',
      'Post-launch refinement',
    ],
    intro: [
      'A physiotherapy team was introducing an AI documentation platform into a busy clinical environment. The technical setup was only one part of the work. The larger challenge was making the system useful enough, clear enough, and reliable enough to become part of every practitioner’s day.',
      'I led clinic-side evaluation, configuration, training, SOP development, go-live support, and post-launch refinement. The rollout reached full team adoption within eight weeks and reduced documentation time by approximately three hours per practitioner each week.',
    ],
    gallery: [],
    confidentialNote:
      'The clinic identity and practitioner information are omitted. The figures below reconstruct the rollout without reproducing private records.',
    decision:
      'Adoption was treated as a workflow problem, not a training event. Configuration, expectations, support, and feedback were adjusted around how clinicians actually documented care.',
    outcomes: [
      'The full physiotherapy team adopted the platform within eight weeks.',
      'Documentation time decreased by approximately three hours per practitioner each week.',
    ],
    environment: 'Heidi AI · Clinical workflows · Team training · Documented SOPs',
    delivery:
      'Evaluation, configuration, training, SOP development, go-live support, and post-launch refinement were led by me on the clinic side.',
    size: 'large',
    tier: 'principal',
    proof: [
      { value: '100%', label: 'team adoption' },
      { value: '8 weeks', label: 'to full adoption' },
      { value: '~3 hrs', label: 'saved weekly per practitioner' },
    ],
  },
  {
    slug: 'kinetikare',
    title: 'KinetiKare Physiotherapy',
    shortTitle: 'KinetiKare',
    category: 'Healthcare Platform · Patient Experience',
    summary:
      'A patient education, acquisition, and booking platform organized around body regions, symptoms, conditions, and commonly confused diagnoses.',
    contribution: [
      'Clinical requirements',
      'Information architecture',
      'User journeys',
      'Condition taxonomy',
      'Content structure',
      'Booking pathways',
      'Agentic development',
      'Testing',
      'Iteration',
    ],
    intro: [
      'KinetiKare is the public platform for my own physiotherapy practice in Burlington. It is built for the moment someone starts looking for help: it meets them at whatever they already know about their problem, teaches them what matters, and carries them through to booking an assessment.',
      'The platform spans condition education, symptom-led guides, side-by-side comparisons of commonly confused diagnoses, treatment information, patient reviews, and direct booking through the clinic scheduling system.',
    ],
    gallery: [
      {
        src: '/images/work/kinetikare-home.webp',
        alt: 'KinetiKare homepage with booking actions and live Google reviews',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com',
        title: 'A booking-first front door',
        caption:
          'The homepage pairs the clinical introduction with live Google reviews and direct booking, so a first-time visitor can act without hunting for a phone number.',
      },
      {
        src: '/images/work/kinetikare-conditions.webp',
        alt: 'KinetiKare condition library filtered by body region',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions',
        title: 'Navigation built on body regions',
        caption:
          'Patients rarely arrive knowing their diagnosis. The condition library is organized by body region first, with search layered on top, so a person can start from where it hurts.',
      },
      {
        src: '/images/work/kinetikare-compare.webp',
        alt: 'Side-by-side comparison table of tennis elbow and golfers elbow',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/conditions/compare',
        title: 'Commonly confused diagnoses, side by side',
        caption:
          'Some conditions are separated by details patients cannot see from the inside. Comparison pages put the two patterns next to each other and explain what is checked in person to tell them apart.',
      },
      {
        src: '/images/work/kinetikare-treatment.webp',
        alt: 'Dry needling treatment page with plain-language benefits and booking',
        ...DESKTOP,
        frame: 'browser',
        url: 'kinetikarephysio.com/treatments/dry-needling',
        title: 'Treatment education in plain language',
        caption:
          'Each treatment page opens with what the technique is, what it can help with, and what the evidence supports, before asking anyone to book. The plain language is a deliberate clinical choice.',
      },
      {
        src: '/images/work/kinetikare-mobile.webp',
        alt: 'KinetiKare mobile homepage with booking and call actions',
        ...PHONE,
        frame: 'phone',
        title: 'Designed for the phone in hand',
        caption:
          'Most visits happen on a phone. The mobile experience keeps booking and calling one tap away without burying the educational content.',
      },
    ],
    decision:
      'Patients do not always know the name of their condition. The platform therefore combines body-region navigation, symptom-led guides, and side-by-side comparisons instead of relying exclusively on diagnostic categories. The same clinical content is reachable from three directions because people arrive with three different kinds of questions.',
    outcomes: [
      'The platform is the primary front door for the practice. Condition, guide, and comparison pages earn steady search visibility across Burlington and the surrounding communities, and new patients regularly arrive already oriented to their likely problem.',
    ],
    environment: 'Next.js · GitHub · Vercel · Jane App · Google Search Console',
    delivery:
      'Clinical requirements, information architecture, content, and testing led by me; the implementation was built, refined, and maintained through Codex and Cursor.',
    liveUrl: 'https://www.kinetikarephysio.com',
    card: {
      src: '/images/work/kinetikare-home.webp',
      alt: 'KinetiKare homepage with booking actions and live Google reviews',
      ...DESKTOP,
      frame: 'browser',
      url: 'kinetikarephysio.com',
    },
    size: 'large',
    tier: 'principal',
    proof: [
      { value: '60+', label: 'pages across the platform' },
      { value: '55', label: 'condition pages' },
      { value: '6', label: 'treatment pages' },
    ],
  },
  {
    slug: 'endorphins',
    title: 'Endorphins Health & Wellness Centre',
    shortTitle: 'Endorphins',
    category: 'Service Design · Clinic Digital Operations',
    summary:
      'The operational and digital integration of physiotherapy within an established six-specialty healthcare clinic.',
    contribution: [
      'Service structure',
      'Intake and booking journey',
      'Referral pathways',
      'Information architecture',
      'Service content',
      'Analytics',
      'Local search',
    ],
    intro: [
      'Endorphins Health and Wellness Centre is an established multidisciplinary clinic in Burlington with six services: chiropractic, physiotherapy, massage therapy, athletic therapy, chiropody, and acupuncture. I joined to launch the physiotherapy service line and took on the clinic’s digital presence and patient routing along the way.',
      'The work ran on two levels at once: introducing a new discipline into an existing clinical environment, and redesigning how the clinic presents six distinct services as one coordinated place to get care.',
    ],
    gallery: [
      {
        src: '/images/work/endorphins-home.webp',
        alt: 'Endorphins Health and Wellness Centre homepage',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com',
        title: 'One clinic, not six brands',
        caption:
          'The site leads with the clinic as a whole rather than a list of departments. Each discipline keeps its identity one level deeper, where the visitor is already oriented.',
      },
      {
        src: '/images/work/endorphins-services.webp',
        alt: 'Endorphins services index showing six disciplines with practitioners',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services',
        title: 'Six services, one structure',
        caption:
          'Every service card answers the same three questions: what it is, who provides it, and whether online booking is available. The symmetry keeps six disciplines comparable at a glance.',
      },
      {
        src: '/images/work/endorphins-physio.webp',
        alt: 'Endorphins physiotherapy service page',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/services/physiotherapy',
        title: 'The physiotherapy service line',
        caption:
          'The service I launched clinically also had to be legible digitally: what physiotherapy at this clinic involves, who provides it, and how to start.',
      },
      {
        src: '/images/work/endorphins-booking.webp',
        alt: 'Endorphins booking page routed by practitioner',
        ...DESKTOP,
        frame: 'browser',
        url: 'endorphinshealth.com/book-appointment',
        title: 'Booking routed by practitioner',
        caption:
          'Patients book a person, not a department. The booking journey routes by practitioner with call and online options, matching how the front desk actually schedules.',
      },
      {
        src: '/images/work/endorphins-mobile.webp',
        alt: 'Endorphins mobile homepage',
        ...PHONE,
        frame: 'phone',
        title: 'Mobile-first for local search',
        caption:
          'Most local-search visits land on a phone. The mobile presentation keeps calling and booking immediate for someone looking for care nearby.',
      },
    ],
    decision:
      'Six clinical disciplines needed to remain distinct while still feeling like one coordinated clinic. The information architecture, service content, and booking pathways had to make each service understandable on its own terms without fragmenting the clinic into six mini-websites.',
    outcomes: [
      'Physiotherapy launched as a functioning service line inside an established clinic, with referral pathways connecting it to the other five disciplines.',
      'The redesigned site and local-search work give each service a findable, bookable presence across the surrounding municipalities.',
    ],
    environment: 'Custom site · GitHub Actions · Jane App · Google Analytics · Google Business Profile',
    delivery:
      'Service structure, patient journeys, content, and analytics led by me; the site implementation was built and maintained through agentic development tools.',
    liveUrl: 'https://endorphinshealth.com',
    card: {
      src: '/images/work/endorphins-home.webp',
      alt: 'Endorphins Health and Wellness Centre homepage',
      ...DESKTOP,
      frame: 'browser',
      url: 'endorphinshealth.com',
    },
    size: 'large',
    tier: 'principal',
    proof: [
      { value: '6', label: 'clinical specialties' },
      { value: '8', label: 'municipalities supported' },
      { value: '1', label: 'coordinated clinic experience' },
    ],
  },
  {
    slug: 'tax-relief-counsel',
    title: 'Tax Relief Counsel',
    shortTitle: 'Tax Relief Counsel',
    category: 'Workflow Automation · Professional Services',
    summary:
      'A reusable drafting workflow that turned repetitive intake and document-generation work into a structured operating process.',
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
      'I learned the practice’s workflow from the inside, mapped where the time actually went, and rebuilt the drafting process around a reusable template library with LLM-supported drafting. The interesting part was not the automation itself. It was finding the repeatable structure inside work that looked bespoke, and shaping it into a process a non-technical practitioner runs independently.',
    ],
    gallery: [],
    confidentialNote:
      'Client materials are confidential. The figures below are reconstructed views of the process rather than screenshots of matter documents.',
    decision:
      'The drafting process could not be meaningfully improved until the recurring inputs, decisions, and document structures were standardized. The template library came first; the automation only became reliable once the structure existed for it to fill.',
    outcomes: [
      'Document-generation time fell from approximately three hours to about 30 minutes per matter.',
      'The workflow runs as a documented, repeatable process the practitioner operates independently, with quality checkpoints built in rather than left to memory.',
    ],
    environment: 'Codex · Structured template library · Documented SOPs',
    delivery:
      'Workflow mapping, template design, prompt design, and quality assurance led by me; the drafting tooling was built with Codex around the practice’s existing habits.',
    size: 'large',
    tier: 'principal',
    proof: [
      { value: '~3 hrs', label: 'before per matter' },
      { value: '~30 min', label: 'after per matter' },
      { value: '85%', label: 'less drafting time' },
    ],
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
      'Agentic delivery',
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
        title: 'An invitation before a website',
        caption:
          'The site opens as a composed arrival: one photograph settling into a fine gold frame with the names and the date. Guests get the feeling first and the logistics a scroll later.',
      },
      {
        src: '/images/work/wedding-day.webp',
        alt: 'Wedding day schedule with venue details, maps, and calendar actions',
        ...DESKTOP,
        frame: 'browser',
        title: 'The day, structured for action',
        caption:
          'The venue section pairs the schedule with the three actions a guest actually needs: open the location in Maps, add it to a calendar, or download the invite file.',
      },
      {
        src: '/images/work/wedding-travel.webp',
        alt: 'Travel section explaining how to get to Lima',
        ...DESKTOP,
        frame: 'browser',
        title: 'Travel guidance before logistics',
        caption:
          'Travel content is written as reassurance first and logistics second: fly into Lima, stay in Miraflores, use Uber. The details follow once the shape of the trip is clear.',
      },
      {
        src: '/images/work/wedding-machu.webp',
        alt: 'Machu Picchu day-by-day itinerary with costs stated plainly',
        ...DESKTOP,
        frame: 'browser',
        title: 'A seven-day itinerary made scannable',
        caption:
          'The optional Machu Picchu trip is presented as a horizontal day-by-day itinerary with the cost stated plainly, so guests can decide with real information rather than guesswork.',
      },
      {
        src: '/images/work/wedding-mobile.webp',
        alt: 'Wedding site schedule on a phone',
        ...PHONE,
        frame: 'phone',
        title: 'Built for a phone in an airport',
        caption:
          'Guests will use this site in transit. The mobile layout keeps the schedule, addresses, and actions readable at a glance.',
      },
    ],
    decision:
      'The site needed to become the single source of truth for both event and travel logistics, particularly for guests using it from their phones while travelling. Every section is structured around a question a guest would actually ask, in the order they would ask it.',
    outcomes: [
      'Guests get one authoritative link covering the ceremony, travel, lodging, RSVP, and the optional adventure, replacing scattered group messages and documents.',
    ],
    environment: 'Next.js · Vercel · Framer Motion',
    delivery:
      'Information architecture, content structure, and journey design led by me; the site was built, tested, and refined through agentic development tools.',
    card: {
      src: '/images/work/wedding-hero.webp',
      alt: 'Wedding website arrival screen with a framed photo, names, and date',
      ...DESKTOP,
      frame: 'browser',
    },
    size: 'small',
    tier: 'additional',
    proof: [
      { value: '1 link', label: 'for event and travel details' },
      { value: '7 days', label: 'of optional travel planning' },
      { value: 'Mobile', label: 'designed for use in transit' },
    ],
  },
];

const projectOrder = [
  'clinical-documentation',
  'tax-relief-counsel',
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
    desc: 'Advising on the clinical deployment of an augmented-reality pain-management device, with a focus on rehabilitation workflows, clinician onboarding, patient education, interface design, and rollout readiness.',
  },
  {
    title: 'Lab2Market · McMaster University',
    desc: 'Mentoring health-tech and health-innovation teams on clinical fit, workflow burden, onboarding, adoption, and the practical realities of introducing new products into care environments.',
  },
];

export const areasOfWork = [
  {
    title: 'Clinical implementation',
    desc: 'Workflow discovery, configuration, onboarding, training, go-live support, and early adoption.',
  },
  {
    title: 'Workflow and operations',
    desc: 'Intake, booking, referral, documentation, and professional-service processes.',
  },
  {
    title: 'Digital experience',
    desc: 'Information architecture, patient and client journeys, content systems, forms, analytics, and search visibility.',
  },
  {
    title: 'AI-enabled delivery',
    desc: 'Requirements, structured specifications, Codex, Cursor, iterative testing, troubleshooting, and quality assurance.',
  },
];
