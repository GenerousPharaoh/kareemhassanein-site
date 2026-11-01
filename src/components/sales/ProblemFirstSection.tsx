import { caseBySlug } from '@/content/cases';
import { OFFERS } from '@/content/offers';
import { PROBLEMS } from '@/content/problems';
import { ProblemFirst, type ProblemItem } from './ProblemFirst';
import { SectionHead } from './SectionHead';
import styles from './ProblemFirstSection.module.css';

/** The problems resolved against the offers and the cases, so the client part gets plain strings. */
function resolve(): ProblemItem[] {
  return PROBLEMS.map((p) => {
    const offer = OFFERS.find((o) => o.id === p.offer);
    if (!offer) throw new Error(`No offer ${p.offer} for problem ${p.id}`);
    const include = p.include ? offer.includes.find((line) => line.startsWith(p.include!)) : undefined;
    if (p.include && !include) throw new Error(`No include starting "${p.include}" in ${offer.id}`);
    // "Grow: Google profile, ..." keeps only the plan's name
    const includeText = include?.includes(': ') && /^[^:]{2,40}: /.test(include) ? include.split(': ')[0] : include;
    return {
      id: p.id,
      say: p.say,
      offer: { id: offer.id, label: offer.label, name: offer.name, price: offer.price },
      include: includeText,
      note: p.note,
      cases: p.cases.map(caseBySlug).filter((c) => c !== undefined).map((c) => ({ slug: c.slug, short: c.short, ground: c.palette.ground, accent: c.palette.accent })),
    };
  });
}

export function ProblemFirstSection() {
  const items = resolve();
  return (
    <section className={`paper section sheet-up ${styles.section}`} aria-labelledby="problem-first" data-theme="light">
      <div className={`container ${styles.inner}`}>
        <SectionHead id="problem-first" label="Start from the problem" title="What is wrong, in your words." intro="Pick the closest line. The place to start comes up beside it, with the case where I found the same thing." split />
        <ProblemFirst items={items} />
      </div>
    </section>
  );
}
