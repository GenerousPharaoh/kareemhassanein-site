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
    label: 'The way in',
    name: 'Website check',
    price: '$1,500',
    summary: 'I walk your whole path from search to booked: your Google profile, the site, booking or intake, tracking, ads and wording.',
    includes: [
      'A recorded walkthrough of what I found',
      'A ranked list, with a fixed price beside each fix',
      'Delivered within five business days',
      'For firms, intake and the lead’s path into your CRM are included',
    ],
    terms: 'Paid up front, and credited in full toward any work within 60 days.',
  },
  {
    id: 'fixes',
    label: 'A known problem',
    name: 'Fixed-price fixes',
    price: 'from $1,000',
    summary: 'One clear problem, fixed and checked.',
    includes: [
      'Online bookings or leads counted in Google Ads and Analytics, including booking systems that cannot report bookings themselves',
      'Google Ads conversions that count real bookings or signed clients, not clicks',
      'A Google Business Profile overhaul',
      'Booking or intake that goes straight to each practitioner, service or practice area',
      'An ad landing page, with live openings where the booking system allows',
      'A phone speed fix',
      'A wording pass to your college’s or law society’s rules',
    ],
    terms: 'Paid up front. One to two weeks. What can be counted depends on your booking system.',
  },
  {
    id: 'sprint',
    label: 'A bigger problem',
    name: 'Two-week sprint',
    price: 'from $5,000',
    summary: 'Two weeks on one larger piece of work.',
    includes: ['Service or practice area pages rebuilt', 'An ad account restructured', 'A set of landing pages', 'A store redesign', 'An incident, traced and closed'],
    terms: 'Half to start, half on delivery.',
  },
  {
    id: 'website',
    label: 'The whole path',
    name: 'New website',
    price: 'from $10,000',
    priceNote: 'Group practices, several locations and larger firms are quoted.',
    summary: 'Design from real options, build, booking or intake, Google profile, tracking, structured data, wording to your rules, and a launch with a way back.',
    includes: [
      'Two or three rendered design directions to choose from',
      'Booking or intake built in and tested',
      'Tracking that counts bookings or signed clients',
      'Every old address redirected',
      'After launch, Care keeps the site, booking path and tracking working and watched, with small changes as they come up',
    ],
    terms: 'Half to start, a quarter at preview, a quarter at launch.',
  },
  {
    id: 'monthly',
    label: 'Ongoing',
    name: 'Monthly plans',
    price: 'from $1,000 a month',
    summary: 'Your profile, search, site and booking path looked after, reported in real bookings or signed clients by source.',
    includes: [
      'Grow: Google profile, search, the site and booking path, a monthly report of real bookings or signed clients by source, and improvements every month',
      'Grow with ads: everything in Grow, plus Google Ads management',
      'Ads only: once bookings or leads are counted properly',
      'Several locations or a large team: quoted',
    ],
    terms: 'Billed monthly in advance, three-month minimum, reviewed every six months against the bookings report. Ad spend is paid by you, directly to Google.',
  },
];

export const PRICE_NOTE = 'Prices are in Canadian dollars; US firms pay the same figures in US dollars. They are set for one location and a small team, and larger practices are quoted.';

export const PRICE_LINE = [
  { label: 'Website check', price: '$1,500' },
  { label: 'Fixes', price: 'from $1,000' },
  { label: 'Two-week sprint', price: 'from $5,000' },
  { label: 'New website', price: 'from $10,000' },
  { label: 'Monthly plans', price: 'from $1,000' },
];
