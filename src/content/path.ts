// The six stops between a Google search and a booked appointment, each with a real example.
// A stop whose proof is a setting rather than a page shows it as a record instead of a screenshot.
export type ProofRecord = {
  source: string;
  title: string;
  rows: { label: string; value?: string; off?: boolean }[];
  /** Rows read as steps, one leading to the next. */
  flow?: boolean;
  note?: string;
};

export type Stop = {
  id: 'found' | 'chosen' | 'booked' | 'counted' | 'grown' | 'kept';
  name: string;
  line: string;
  example: string;
  caseSlug: string;
  caseName: string;
  record?: ProofRecord;
};

export const PATH: Stop[] = [
  {
    id: 'found',
    name: 'Found',
    line: 'Showing up when someone searches for what you treat or handle.',
    example: 'Business Profile categories chosen so a clinic would not compete with its own physiotherapist’s listing.',
    caseSlug: 'endorphins',
    caseName: 'Endorphins',
    record: {
      source: 'Google Business Profile',
      title: 'Business categories',
      rows: [
        { label: 'Chiropractor', value: 'Primary' },
        { label: 'Massage therapist', value: 'Additional' },
        { label: 'Acupuncture clinic', value: 'Additional' },
        { label: 'Physiotherapist', value: 'On the physiotherapist’s own listing', off: true },
      ],
    },
  },
  {
    id: 'chosen',
    name: 'Chosen',
    line: 'A site that makes the decision easy: who to see, when they are free, what it costs.',
    example: 'Ad pages that show a clinic’s next real openings, read live from its booking system.',
    caseSlug: 'endorphins',
    caseName: 'Endorphins',
  },
  {
    id: 'booked',
    name: 'Booked',
    line: 'Booking or intake that works on the first tap.',
    example: 'A Book button that led nowhere, fixed, with every practitioner bookable directly.',
    caseSlug: 'physiomax',
    caseName: 'PhysioMax',
  },
  {
    id: 'counted',
    name: 'Counted',
    line: 'Knowing which bookings came from where.',
    example: 'Bookings that had never reached Analytics, now counted to the appointment.',
    caseSlug: 'physiomax',
    caseName: 'PhysioMax',
    record: {
      source: 'Booking to report',
      title: 'Where a booking is counted',
      flow: true,
      rows: [
        { label: 'Booked online in Jane', value: 'The booking itself, not a click' },
        { label: 'Google Analytics', value: 'Recorded with its source' },
        { label: 'Google Ads', value: 'Conversion: Jane online booking' },
      ],
    },
  },
  {
    id: 'grown',
    name: 'Grown',
    line: 'Ads and search measured in bookings and signed clients, not clicks.',
    example: 'A law firm’s ad leads re-counted one by one, and conversions counted only once a lead is delivered.',
    caseSlug: 'tax-relief-counsel',
    caseName: 'Tax Relief Counsel',
  },
  {
    id: 'kept',
    name: 'Kept',
    line: 'Accounts in your name, every change logged, and someone who answers.',
    example: 'An agency given the access it needs and no more, and every change with an undo step.',
    caseSlug: 'endorphins',
    caseName: 'Endorphins',
    record: {
      source: 'Google Analytics',
      title: 'Account access',
      rows: [
        { label: 'The clinic', value: 'Administrator' },
        { label: 'Me', value: 'Administrator' },
        { label: 'The agency', value: 'Editor' },
      ],
      note: 'Every change logged, with the step to undo it.',
    },
  },
];
