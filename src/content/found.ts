// What I found, by where it was: the ad account, the booking system, the tracking, the site itself,
// or search. Each entry names a finding in cases.ts by how its line starts, so the wording there
// stays the one source. The work page filters by these, and the first look points to them.
import { caseBySlug } from './cases';

export type PlaceId = 'ads' | 'booking' | 'tracking' | 'site' | 'search';

export type Place = { id: PlaceId; label: string; status: string };

export const PLACES: Place[] = [
  { id: 'ads', label: 'In the ad account', status: 'Showing cases where the problem was in the ad account.' },
  { id: 'booking', label: 'In the booking system', status: 'Showing cases where the problem was in the booking system.' },
  { id: 'tracking', label: 'In the tracking', status: 'Showing cases where the problem was in the tracking.' },
  { id: 'site', label: 'On the site itself', status: 'Showing cases where the problem was on the site itself.' },
  { id: 'search', label: 'In search', status: 'Showing cases where the problem was in search.' },
];

const WHERE: Record<PlaceId, Array<[slug: string, startsWith: string]>> = {
  ads: [
    ['tax-relief-counsel', 'Most of the conversions'],
    ['tax-relief-counsel', 'Audit campaigns'],
    ['kinetikare', 'Most of the reported ad conversions'],
    ['kinetikare', 'The booking event'],
    ['physiomax', 'The ads were optimising'],
  ],
  booking: [
    ['physiomax', 'Book Appointment linked'],
    ['endorphins', 'Only some practitioners'],
  ],
  tracking: [
    ['physiomax', 'There was no analytics'],
    ['endorphins', 'There was no way to tell'],
    ['techniques-combat', 'The tag manager'],
    ['techniques-combat', 'Bots were creating'],
    ['kinetikare', 'Over half of all visits'],
  ],
  site: [
    ['tax-relief-counsel', 'A missing template'],
    ['tax-relief-counsel', 'A broken link'],
    ['tax-relief-counsel', 'Several articles'],
    ['physiomax', 'There was no privacy policy'],
    ['physiomax', 'A very heavy homepage'],
    ['endorphins', 'Some wording'],
    ['kinetikare', 'A hero fade'],
    ['kinetikare', 'Condition pages'],
    ['techniques-combat', 'The home page’s largest paint'],
  ],
  search: [
    ['endorphins', 'Search visits came'],
    ['physiomax', 'Demo pages were indexed'],
    ['kinetikare', 'Duplicate identity data'],
  ],
};

export type Finding = { slug: string; short: string; text: string };

/** One finding, as written in its case. Missing lines fail the build rather than ship a gap. */
export function finding(slug: string, startsWith: string): Finding {
  const c = caseBySlug(slug);
  const text = c?.found?.find((line) => line.startsWith(startsWith));
  if (!c || !text) throw new Error(`No finding starting "${startsWith}" in ${slug}`);
  return { slug, short: c.short, text };
}

/** The findings of one case that sit in a place. */
export function foundIn(slug: string, place: PlaceId): string[] {
  return WHERE[place].filter(([s]) => s === slug).map(([s, start]) => finding(s, start).text);
}

/** The places a case has findings in, in the order of PLACES. */
export function placesOf(slug: string): PlaceId[] {
  return PLACES.map((p) => p.id).filter((id) => WHERE[id].some(([s]) => s === slug));
}
