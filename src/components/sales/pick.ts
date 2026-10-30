// Server-side helpers for pages: find a case and its media by name, and fail the build loudly if one goes missing.
import { caseBySlug, type CaseStudy } from '@/content/cases';

export function requireCase(slug: string): CaseStudy {
  const c = caseBySlug(slug);
  if (!c) throw new Error(`No case named ${slug} in src/content/cases.ts`);
  return c;
}

/** A loop by its file name, for example "decoder--desktop". */
export function pickLoop(c: CaseStudy, name: string) {
  const found = [c.hero, ...c.loops].find((l) => l.src.endsWith(`/${name}.mp4`));
  if (!found) throw new Error(`${c.slug} has no loop named ${name}`);
  return found;
}

/** A still by its file name, for example "consult--phone". */
export function pickStill(c: CaseStudy, name: string) {
  const found = [...c.stills, c.plate.desktop, c.plate.phone].find((s) => s.src.endsWith(`/${name}`));
  if (!found) throw new Error(`${c.slug} has no still named ${name}`);
  return found;
}

/** A line from one of the case's lists, by how it starts, so wording edits in cases.ts carry through. */
export function pickLine(lines: string[] | undefined, startsWith: string) {
  const found = lines?.find((l) => l.startsWith(startsWith));
  if (!found) throw new Error(`No line starting "${startsWith}"`);
  return found;
}
