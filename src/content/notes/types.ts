// Notes are stored as typed blocks so the page can typeset them, build the contents
// list and count the reading time from the words themselves.
//
// Inline text supports two marks: **strong** and [a link](/path).

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string; kicker?: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; label: string; text: string };

export type Note = {
  slug: string;
  title: string;
  /** One line for the index, the page standfirst and the meta description. */
  summary: string;
  /** Who it is written for, shown above the title. */
  audience: string;
  /** Valid HTML month string for <time>, and the label shown. */
  month: string;
  monthLabel: string;
  /** Slugs of the cases the note comes from, in order. */
  cases: string[];
  /** The sentence beside the website check at the end of the note. */
  check: string;
  body: Block[];
};

const MARKS = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** The text without its inline marks. */
export const plain = (text: string) => text.replace(MARKS, (_m, strong: string | undefined, label: string | undefined) => strong ?? label ?? '');

const blockText = (b: Block): string[] => {
  switch (b.type) {
    case 'ul':
    case 'ol':
      return b.items;
    case 'callout':
      return [b.label, b.text];
    default:
      return [b.text];
  }
};

export function wordCount(note: Note): number {
  const all = [note.title, note.summary, ...note.body.flatMap(blockText)].map(plain).join(' ');
  return all.split(/\s+/).filter(Boolean).length;
}

/** Minutes at an unhurried reading pace, never less than one. */
export const readingMinutes = (note: Note) => Math.max(1, Math.round(wordCount(note) / 220));

export const MARK_PATTERN = MARKS;
