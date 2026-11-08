// Offers and prices. On the site: the check at its fixed price, everything else as "from".
// Builds and monthly plans are quoted on scope after the check or the first call.
export type Offer = {
  id: 'check' | 'fixes' | 'sprint' | 'website' | 'monthly';
  label: string;
  name: string;
  price: string;
  priceNote?: string;
  summary: string;
  includes: string[];
  terms: string;
};

export const OFFERS: Offer[] = [
  {
    id: 'check',
    label: 'Review',
    name: 'Website check',
    price: '$1,500',
    summary: 'I review how people find your business and use your website, including the forms, booking, tracking and ads that apply.',
    includes: [
      'A recorded walkthrough of what I found',
      'Recommended fixes in priority order, with a fixed price for each',
      'Delivered within five business days',
      'Your forms and the path an enquiry takes into your inbox or CRM',
    ],
    terms: 'Paid up front, and credited in full toward any work within 60 days.',
  },
  {
    id: 'fixes',
    label: 'A known problem',
    name: 'Fixed-price fixes',
    price: 'from $1,000',
    summary: 'A specific repair or change to an existing website or account.',
    includes: [
      'Online bookings or leads counted in Google Ads and Analytics, including booking systems that cannot report bookings themselves',
      'Google Ads conversions checked against completed enquiries or bookings',
      'Google Business Profile categories, contact details and services updated',
      'Enquiries or booking connected to the right person or service',
      'An ad landing page, with live openings where the booking system allows',
      'Changes to improve loading speed on phones',
      'A wording pass against the requirements that apply to your business',
    ],
    terms: 'Paid up front. One to two weeks. What can be counted depends on your systems.',
  },
  {
    id: 'sprint',
    label: 'A bigger problem',
    name: 'Two-week sprint',
    price: 'from $5,000',
    summary: 'Two weeks on one larger piece of work.',
    includes: ['Service or product pages rebuilt', 'An ad account restructured', 'A set of landing pages', 'A store redesign', 'Investigation of a checkout or tracking problem'],
    terms: 'Half to start, half on delivery.',
  },
  {
    id: 'website',
    label: 'Website build',
    name: 'New website',
    price: 'from $10,000',
    priceNote: 'Several locations, larger teams and more complex builds are quoted.',
    summary: 'Page structure, content, design and development, with the forms, booking, search and tracking agreed in the scope. I prepare redirects and a plan to restore the previous site if needed.',
    includes: [
      'Two or three design previews to choose from',
      'The agreed forms, booking and connections built in and tested',
      'Search metadata, structured data and a Google profile where relevant',
      'Tracking set up around the actions your systems can report',
      'Old page addresses mapped and redirected',
      'After launch, an ongoing plan can cover the site, customer enquiries, booking and tracking, with small changes as they come up',
    ],
    terms: 'Half to start, a quarter at preview, a quarter at launch.',
  },
  {
    id: 'monthly',
    label: 'Ongoing',
    name: 'Monthly plans',
    price: 'from $1,000 a month',
    summary: 'Website maintenance, search, advertising and tracking, with the work agreed in your plan and a report each month.',
    includes: [
      'Website and search: Google profile, search, the site, enquiries and booking, with a monthly report and agreed improvements',
      'Website, search and ads: the website and search plan, plus Google Ads management',
      'Ads only: available once booking or enquiry tracking has been checked',
      'Several locations or a large team: quoted',
    ],
    terms: 'Billed monthly in advance, three-month minimum, reviewed every six months against the report. Ad spend is paid by you, directly to Google.',
  },
];

export const PRICE_NOTE = 'Prices are in Canadian dollars, for one location and a small team. Larger projects are quoted. US firms pay the same figures in US dollars.';

export const PRICE_LINE = [
  { label: 'Website check', price: '$1,500' },
  { label: 'Fixes', price: 'from $1,000' },
  { label: 'Two-week sprint', price: 'from $5,000' },
  { label: 'New website', price: 'from $10,000' },
  { label: 'Monthly plans', price: 'from $1,000' },
];
