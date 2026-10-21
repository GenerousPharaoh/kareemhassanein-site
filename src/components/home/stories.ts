import { still } from '@/lib/media';
import type { Story } from './HeroStage';

// Two real sites from the work, told as the path a new client takes through them.
export const STORIES: Story[] = [
  {
    id: 'firm',
    label: 'A tax law firm',
    query: 'irs audit lawyer dc',
    result: {
      name: 'Tax Relief Counsel · IRS audit attorney',
      domain: 'taxreliefcounsel.com',
      line: 'Audits, appeals and collections, from a firm in Washington, D.C.',
    },
    site: still('tax-relief-counsel/home-hero--phone', ''),
    booked: {
      title: 'Consultation request sent',
      lines: ['Notice: CP2000, proposed changes', 'Reviewed by the attorney, usually within one business day'],
    },
    counted: {
      event: 'Qualified request delivered',
      source: 'Google Ads · IRS audits campaign',
      note: 'Counted once the request reached the firm, not when someone tapped the button.',
      chartLabel: 'Requests by source',
      bars: [
        { label: 'Ads', share: 82 },
        { label: 'Search', share: 58 },
        { label: 'Referral', share: 34 },
      ],
    },
  },
  {
    id: 'clinic',
    label: 'A clinic',
    query: 'physiotherapy burlington',
    result: {
      name: 'Physiotherapy in Burlington · Endorphins',
      domain: 'endorphinshealth.com',
      line: 'Next openings shown live. No referral needed.',
    },
    site: still('endorphins/lp-physio--phone', ''),
    booked: {
      title: 'Booked: physiotherapy assessment',
      lines: ['Tuesday · 3:55 PM', 'Confirmation sent by the clinic'],
    },
    counted: {
      event: 'Appointment booked',
      source: 'Google Ads · Physiotherapy campaign',
      note: 'Counted from the booking system itself, so every booking counted is a real one.',
      chartLabel: 'Bookings by source',
      bars: [
        { label: 'Ads', share: 64 },
        { label: 'Profile', share: 78 },
        { label: 'Search', share: 46 },
      ],
    },
  },
];
