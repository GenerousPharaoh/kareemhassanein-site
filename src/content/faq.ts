// Questions owners ask, answered plainly. Used by /firms, /clinics and /pricing.
// Keep answers short: a sentence or two, in the first person, with no promises of results and no numbers about me.
export type FaqItem = {
  q: string;
  a: string[];
  link?: { href: string; label: string };
};

export const FIRM_FAQ: FaqItem[] = [
  {
    q: 'Do you know our law society’s or bar’s advertising rules?',
    a: [
      'I read them before I write anything, and I write every page to them: what the firm can call itself, what it can say about results, and how it describes its fees.',
      'Nothing goes live until you have approved the wording. The firm stays responsible for its own advertising, so the final word is yours.',
    ],
  },
  {
    q: 'Will our client information go into AI tools?',
    a: [
      'No. Client information, files and passwords do not go into AI tools. I do not need client records to build or review the website.',
    ],
    link: { href: '/ai', label: 'How I use AI' },
  },
  {
    q: 'Can you work with our CRM?',
    a: [
      'Yes. I work with the CRM you already use, for example Clio, and I learn how your firm has set it up before I change anything.',
      'New leads arrive in the format your automations expect, with the source of each one attached.',
    ],
  },
  {
    q: 'Do we own everything?',
    a: [
      'Yes. The domain, hosting, website, Google accounts and ad account stay in the firm’s name, and you pay those bills directly. You keep control of the accounts if you change providers.',
    ],
  },
  {
    q: 'Can you work alongside our agency or IT provider?',
    a: [
      'Yes. I agree access and responsibilities with you, record my changes and provide instructions for reversing them.',
    ],
  },
  {
    q: 'Do you work with firms in the US?',
    a: [
      'Yes. US firms pay the same figures in US dollars, and I write to your bar’s advertising rules. Tax Relief Counsel is a firm in Washington, D.C.',
    ],
  },
  {
    q: 'Do you guarantee rankings or signed clients?',
    a: [
      'No. I report the enquiries and client outcomes your systems can measure, with their sources where available.',
    ],
  },
];

export const CLINIC_FAQ: FaqItem[] = [
  {
    q: 'Do I own everything?',
    a: [
      'Yes. The domain, hosting, website, Google profile, Analytics, ad account and booking system stay in the clinic’s name, and you pay those bills directly. You keep control of the accounts if you change providers.',
    ],
  },
  {
    q: 'Can you work alongside my agency?',
    a: [
      'Yes. Your agency gets the access it needs and no more. At Endorphins, I wrote a briefing for the owner and the agency, and every account stayed in the clinic’s name.',
    ],
  },
  {
    q: 'Do you need patient information?',
    a: [
      'No. The website work does not need it, and patient information never goes into AI tools. Bookings are counted by source, without names or health details.',
    ],
    link: { href: '/ai', label: 'How I use AI' },
  },
  {
    q: 'Which booking systems do you work with?',
    a: [
      'Jane, and others. I learn your booking system before I change anything.',
      'A booking system that cannot report bookings itself can usually still be counted, with a confirmation page and call tracking.',
    ],
  },
  {
    q: 'Do you work with dental and medical clinics?',
    a: [
      'Yes. The work can include service information, booking, your Google profile and advertising measurement.',
      'The clinics on this page are a multidisciplinary clinic, a physiotherapy clinic and my own practice. For a dental or medical clinic, I read your college’s standard and learn your systems before I change anything.',
    ],
  },
  {
    q: 'Do you guarantee more patients?',
    a: [
      'No. I report the bookings your system can measure, with their sources where available.',
    ],
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    q: 'Why fixed prices?',
    a: ['I agree the scope and total price with you before work starts. You can choose which work to go ahead with.'],
  },
  {
    q: 'Is the check credited?',
    a: ['Yes, in full, toward any work within 60 days.'],
  },
  {
    q: 'Do I need the check first?',
    a: [
      'No. If you already know the problem, start with the fix for it. The check is for when you can tell something is wrong but not where.',
    ],
  },
  {
    q: 'Why are larger projects quoted?',
    a: [
      'The prices here are set for one location and a small team. Several locations, larger teams and more complex builds need a separate scope, so I quote them after the first call.',
    ],
  },
  {
    q: 'Who pays for the ads?',
    a: ['You do, directly to Google. My fee covers the work, and the ad spend does not pass through me.'],
  },
  {
    q: 'What is not included?',
    a: [
      'Domain, hosting, booking system and other software subscriptions are separate. You pay those providers directly, and the accounts stay in your name.',
    ],
  },
  {
    q: 'Do you guarantee results?',
    a: [
      'No. I agree what can be measured before work starts, then report what happened and what I changed. Monthly plans are reviewed every six months against that report.',
    ],
  },
];
