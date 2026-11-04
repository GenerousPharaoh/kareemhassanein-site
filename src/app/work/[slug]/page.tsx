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
  const description = `${c.kindLabel}${c.kindLabel.endsWith('.') ? '' : '.'} ${c.intro}`;
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
  const contextNote = c.note && !c.pairs.length ? c.note : undefined;
  const hasContext = Boolean(c.context || contextNote);

  return (
    <article className={styles.page} style={paletteVars(c.palette)}>
      <CaseHeader c={c} />
      <CaseNavigator name={c.short} sections={[
        ...(hasContext ? [{ id: 'case-short', label: 'Context' }] : []),
        { id: 'case-screens', label: 'Website' },
        { id: 'case-shipped', label: c.shippedLabel ?? 'Project scope' },
      ]} />

      {hasContext ? (
        <div className={`container ${styles.story} ${styles.first}`}>
          <StoryBlock id="case-short" label="Project context">
            {c.context ? <p className={styles.summary}>{c.context}</p> : null}
            {contextNote ? <p className={styles.aside}>{contextNote}</p> : null}
          </StoryBlock>
        </div>
      ) : null}

      {heroInHeader(c) ? null : <HeroLoop c={c} />}

      <Gallery c={c} />

      {c.measured?.length || c.credit ? (
        <div className={`container ${styles.story} ${styles.after}`}>
          {c.measured?.length ? (
            <StoryBlock id="case-measured" label="Results">
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
          ...(c.found?.length ? [{ id: 'case-found', label: 'Initial review', items: c.found, kind: 'numbered' as const }] : []),
          { id: 'case-shipped', label: c.shippedLabel ?? 'Project scope', items: c.shipped, kind: 'shipped' },
        ]}
      />

      <Pairs pairs={c.pairs} note={c.note} />

      <NextCase c={next} />

      <CloseCall
        track="case"
        title="Discuss your project"
        body={
          <>
            A <span style={{ whiteSpace: 'nowrap' }}>20-minute</span> call about your website, booking or online marketing.
          </>
        }
      />
    </article>
  );
}
