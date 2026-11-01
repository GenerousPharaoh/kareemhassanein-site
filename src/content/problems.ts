// The problems owners bring, in their words, and where each one starts on the price list. The
// include lines are named by how they start in offers.ts, so the wording there stays the one source.
import type { Offer } from './offers';

export type Problem = {
  id: string;
  /** The problem as an owner says it. */
  say: string;
  offer: Offer['id'];
  /** The line from that offer's includes that answers it, by its opening words. */
  include?: string;
  /** What happened when I found the same thing, from the cases. */
  note: string;
  cases: string[];
};

export const PROBLEMS: Problem[] = [
  {
    id: 'unsure',
    say: 'Something is off and I cannot tell where.',
    offer: 'check',
    note: 'The check found Tax Relief Counsel’s larger problem in its ad account, not on the website it had asked about.',
    cases: ['tax-relief-counsel'],
  },
  {
    id: 'book',
    say: 'The Book button goes nowhere, or only some of us can be booked.',
    offer: 'fixes',
    include: 'Booking or intake that goes straight',
    note: 'At PhysioMax the Book Appointment button linked to nothing. Now all 11 practitioners can be booked directly.',
    cases: ['physiomax', 'endorphins'],
  },
  {
    id: 'ads',
    say: 'Google Ads reports conversions, but the phone is quiet.',
    offer: 'fixes',
    include: 'Google Ads conversions that count',
    note: 'At Tax Relief Counsel, and at my own practice, most of what the ad account called conversions were clicks on a button.',
    cases: ['tax-relief-counsel', 'kinetikare'],
  },
  {
    id: 'source',
    say: 'I cannot tell which bookings came from the site.',
    offer: 'fixes',
    include: 'Online bookings or leads counted',
    note: 'PhysioMax’s bookings had never reached Analytics. The gap was inside the booking system’s own settings, not the website.',
    cases: ['physiomax', 'endorphins'],
  },
  {
    id: 'profile',
    say: 'Our Google profile is out of date.',
    offer: 'fixes',
    include: 'A Google Business Profile overhaul',
    note: 'Endorphins’ profile was rebuilt with categories that do not compete with the clinic’s own physiotherapist listing.',
    cases: ['endorphins'],
  },
  {
    id: 'slow',
    say: 'The site is slow on phones.',
    offer: 'fixes',
    include: 'A phone speed fix',
    note: 'Techniques Combat’s home page went from 15.3 s to 0.64 s on a phone; KinetiKare’s from 2.2 s to 0.7 s. Both measured before and after.',
    cases: ['techniques-combat', 'kinetikare'],
  },
  {
    id: 'wording',
    say: 'Our wording might not pass the college or the law society.',
    offer: 'fixes',
    include: 'A wording pass',
    note: 'Endorphins had wording a college would flag. It was rewritten to the standard, and the colleges are named in text rather than shown as logos.',
    cases: ['endorphins', 'kinetikare'],
  },
  {
    id: 'pages',
    say: 'The service or practice-area pages are out of date.',
    offer: 'sprint',
    include: 'Service or practice area pages rebuilt',
    note: 'KinetiKare’s sixty condition pages were rebuilt in the order a patient needs them, every citation checked against its source.',
    cases: ['kinetikare', 'tax-relief-counsel'],
  },
  {
    id: 'advertise',
    say: 'We are about to start advertising.',
    offer: 'monthly',
    include: 'Grow with ads',
    note: 'Endorphins got ad pages that show the next real openings, and a budget model before a dollar was spent.',
    cases: ['endorphins'],
  },
  {
    id: 'new',
    say: 'We need a new website.',
    offer: 'website',
    note: 'Tax Relief Counsel’s rebuild kept every address the firm had earned in search, and launches with one DNS change that can be undone in one step.',
    cases: ['tax-relief-counsel', 'endorphins'],
  },
  {
    id: 'run',
    say: 'We want someone to look after all of it.',
    offer: 'monthly',
    include: 'Grow:',
    note: 'PhysioMax’s owner gets a report every two weeks without asking for it, in bookings rather than clicks.',
    cases: ['physiomax'],
  },
];
