import { googleAdsLeads } from './google-ads-leads-button-clicks';
import { newPatientsSource } from './new-patients-from-website-and-ads';
import type { Note } from './types';

export type { Block, Note } from './types';
export { plain, readingMinutes, wordCount } from './types';

/** Newest first. */
export const NOTES: Note[] = [googleAdsLeads, newPatientsSource];

export const noteBySlug = (slug: string) => NOTES.find((n) => n.slug === slug);
