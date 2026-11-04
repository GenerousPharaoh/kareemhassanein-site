import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseHeader, heroInHeader } from '@/components/work/CaseHeader';
import { Gallery, HeroLoop } from '@/components/work/CaseMedia';
import { CloseCall } from '@/components/work/CloseCall';
import { NextCase } from '@/components/work/NextCase';
import { Pairs } from '@/components/work/Pairs';
import { Credit, Ledger, MeasuredList, StoryBlock } from '@/components/work/Story';
import { paletteVars } from '@/components/work/palette';
import { CASES, caseBySlug } from '@/content/cases';
import { SITE } from '@/content/site';
import styles from './page.module.css';
import { CaseNavigator } from '@/components/work/CaseNavigator';

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return {};
  const img = c.plate.desktop;
  const width = img.widths.includes(1600) ? 1600 : Math.max(...img.widths.filter((w) => w <= 1600));
  const image = { url: `${img.src}-${width}.webp`, width, height: Math.round((width * img.h) / img.w), alt: img.alt };
  const description = `${c.kindLabel}${c.kindLabel.endsWith('.') ? '' : '.'} ${c.summary ?? c.question}`;
  return {
    title: c.name,
    description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      type: 'article',
      siteName: SITE.name,
      locale: 'en_CA',
      url: `/work/${c.slug}`,
      title: `${c.name} · ${SITE.name}`,
      description,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: `${c.name} · ${SITE.name}`, description, images: [image.url] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  const next = CASES[(CASES.indexOf(c) + 1) % CASES.length];
  // The note explains the before shots when there are any; otherwise it belongs with the summary.
  const noteWithSummary = c.note && !c.pairs.length ? c.note : undefined;
  const hasSummary = Boolean(c.summary || c.context || noteWithSummary);

  return (
    <article className={styles.page} style={paletteVars(c.palette)}>
      <CaseHeader c={c} />
      <CaseNavigator name={c.short} sections={[
        ...(hasSummary ? [{ id: 'case-short', label: 'The story' }] : []),
        { id: 'case-screens', label: 'The work' },
        ...(c.pairs.length ? [{ id: 'case-before-after', label: 'Before & after' }] : [{ id: 'case-shipped', label: c.shippedLabel ?? 'What shipped' }]),
      ]} />

      {hasSummary ? (
        <div className={`container ${styles.story} ${styles.first}`}>
          <StoryBlock id="case-short" label="In short">
            {c.summary ? <p className={styles.summary}>{c.summary}</p> : null}
            {c.context ? <p className={styles.aside}>{c.context}</p> : null}
            {noteWithSummary ? <p className={styles.aside}>{noteWithSummary}</p> : null}
          </StoryBlock>
        </div>
      ) : null}

      {heroInHeader(c) ? null : <HeroLoop c={c} />}

      <Gallery c={c} />

      {c.measured?.length || c.credit ? (
        <div className={`container ${styles.story} ${styles.after}`}>
          {c.measured?.length ? (
            <StoryBlock id="case-measured" label="What was measured">
              <MeasuredList items={c.measured} />
              {c.credit ? <Credit>{c.credit}</Credit> : null}
            </StoryBlock>
          ) : c.credit ? (
            <StoryBlock id="case-credit" label="Credit">
              <p className={styles.summary}>{c.credit}</p>
            </StoryBlock>
          ) : null}
        </div>
      ) : null}

      <Ledger
        columns={[
          ...(c.found?.length ? [{ id: 'case-found', label: 'What I found', items: c.found, kind: 'numbered' as const }] : []),
          ...(c.decided?.length ? [{ id: 'case-decided', label: 'What I decided', items: c.decided, kind: 'numbered' as const }] : []),
          { id: 'case-shipped', label: c.shippedLabel ?? 'What shipped', items: c.shipped, kind: 'shipped' },
        ]}
      />

      <Pairs pairs={c.pairs} note={c.note} />

      <NextCase c={next} />

      <CloseCall
        track="case"
        title="What would you like to build or improve?"
        body={
          <>
            Tell me about your business or project on a <span style={{ whiteSpace: 'nowrap' }}>20-minute</span> call.
          </>
        }
      />
    </article>
  );
}
