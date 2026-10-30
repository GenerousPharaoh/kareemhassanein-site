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
      'No. I use AI tools to help me build, and client information, client files and passwords never go into them. The website work does not need client information at all.',
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
      'Yes. The domain, hosting, website, Google accounts and ad account stay in the firm’s name, and you pay those bills directly. If you ever move on, there is nothing to hand back.',
    ],
  },
  {
    q: 'Can you work alongside our agency or IT provider?',
    a: [
      'Yes. They get the access they need and no more, and every change I make is logged with a way to undo it, so nobody is surprised.',
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
      'No, and no one honestly can. I measure what happens and report it plainly: leads and signed clients by source, not clicks.',
    ],
  },
];

export const CLINIC_FAQ: FaqItem[] = [
  {
    q: 'Do I own everything?',
    a: [
      'Yes. The domain, hosting, website, Google profile, Analytics, ad account and booking system stay in the clinic’s name, and you pay those bills directly. If you ever move on, there is nothing to hand back.',
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
      'Yes. The path from a search to a booked appointment is much the same: a Google profile that shows up, a site that makes the choice easy, booking that works on the first tap, and bookings counted by source.',
      'The clinics on this page are a multidisciplinary clinic, a physiotherapy clinic and my own practice. For a dental or medical clinic, I read your college’s standard and learn your systems before I change anything.',
    ],
  },
  {
    q: 'Do you guarantee more patients?',
    a: [
      'No, and no one honestly can. I measure what happens and report real bookings by source, so you can judge the work for yourself.',
    ],
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    q: 'Why fixed prices?',
    a: ['You know the cost before anything starts, and the price is for the result, not the time it takes.'],
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
    q: 'Why are larger practices quoted?',
    a: [
      'The prices here are set for one location and a small team. Group practices, several locations and larger firms have more to set up and more riding on it, so I quote them after the first call.',
    ],
  },
  {
    q: 'Who pays for the ads?',
    a: ['You do, directly to Google. My fee covers the work, and the ad spend does not pass through me.'],
  },
  {
    q: 'What is not included?',
    a: [
      'The bills for your own domain, hosting, booking system and other software. They stay in your name and you pay them directly, so they keep working whoever looks after the site.',
    ],
  },
  {
    q: 'Do you guarantee results?',
    a: [
      'No one honestly can. I measure what happens and report real bookings or signed clients by source, and monthly plans are reviewed every six months against that report.',
    ],
  },
];
