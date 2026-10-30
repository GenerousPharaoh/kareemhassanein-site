import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Picture } from '@/components/media/Picture';
import { CaseCard } from '@/components/pages/CaseCard';
import { ContentsSpy } from '@/components/pages/ContentsSpy';
import { enter } from '@/components/pages/enter';
import { Keep } from '@/components/pages/Keep';
import { pageMeta } from '@/lib/meta';
import { NoteBody, NoteTitle } from '@/components/pages/NoteBody';
import { NoteCover } from '@/components/pages/NoteCover';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Disclosure } from '@/components/ui/Disclosure';
import { caseBySlug } from '@/content/cases';
import { NOTES, noteBySlug, readingMinutes, type Block } from '@/content/notes';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import { still } from '@/lib/media';
import styles from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return {};
  return pageMeta({ title: note.title, description: note.summary, path: `/notes/${note.slug}`, type: 'article' });
}

const check = OFFERS.find((o) => o.id === 'check');
const avatar = still('site/portrait', '');

type Heading = Extract<Block, { type: 'h2' }>;

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) notFound();

  const cases = note.cases.map(caseBySlug).filter((c) => c !== undefined);
  const contents = note.body.filter((b): b is Heading => b.type === 'h2');
  const minutes = readingMinutes(note);
  const contentsLinks = (
    <ol className={styles.contentsList}>
      {contents.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className={styles.contentsLink}>
            {h.kicker ? <span className={styles.step}>{h.kicker.split(' · ')[0]}</span> : null}
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.summary,
    inLanguage: 'en-CA',
    mainEntityOfPage: `${SITE.url}/notes/${note.slug}`,
    author: { '@id': SITE.personId },
    publisher: { '@id': SITE.orgId },
  };

  return (
    <article className={styles.article}>
      <header className={`container ${styles.head}`}>
        <div className={styles.headText}>
          <Link href="/notes" className={styles.back} data-enter style={enter(0)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M13 8H3.5M7.5 4l-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Notes
          </Link>
          <p className="t-label" data-enter style={enter(0)}>
            {note.audience}
          </p>
          <h1 className={styles.title} data-enter style={enter(1)}>
            <NoteTitle text={note.title} tailClassName={styles.titleTail} />
          </h1>
          <p className={`t-lede ${styles.standfirst}`} data-enter style={enter(2)}>
            {note.summary}
          </p>
          <div className={styles.byline} data-enter style={enter(3)}>
            <span className={styles.avatar} aria-hidden="true">
              <Picture media={avatar} sizes="88px" />
            </span>
            <span className={styles.bylineText}>
              <span className={styles.author}>{SITE.name}</span>
              <span className={styles.when}>
                <time dateTime={note.month}>{note.monthLabel}</time>
                <span aria-hidden="true"> · </span>
                {minutes} min read
              </span>
            </span>
          </div>
        </div>
        {/* The same cover as on the notes list, so opening the note carries it here */}
        <NoteCover slug={note.slug} cases={cases} className={styles.cover} sizes="(min-width: 960px) 150px, 30vw" priority />
      </header>

      <div className="container">
        {/* On wide screens the note starts in the first screen, so it enters after the heading and byline */}
        <div className={styles.layout} data-enter style={enter(4)}>
          <ContentsSpy className={styles.contents} label="In this note">
            <p className="t-label">In this note</p>
            {contentsLinks}
          </ContentsSpy>
          <div className={styles.main}>
            <Disclosure title="In this note" className={styles.mobileContents} compact heading={2}>
              <nav aria-label="In this note">{contentsLinks}</nav>
            </Disclosure>
            <NoteBody blocks={note.body} />
            <p className={styles.signoff}>
              <span className={styles.signoffRule} aria-hidden="true" />
              {SITE.name}, {SITE.location}
            </p>
          </div>
        </div>
      </div>

      <footer className={styles.end} aria-labelledby="end-title">
        <div className={`container ${styles.endInner}`}>
          <div className={styles.endHead} data-reveal>
            <p className="t-label">From the work</p>
            <h2 id="end-title" className="t-h2">
              Where this comes from
            </h2>
          </div>
          <div className={styles.cases}>
            {cases.map((c) => (
              <div key={c.slug} data-reveal>
                <CaseCard item={c} />
              </div>
            ))}
          </div>

          <section className={`night ${styles.check}`} aria-labelledby="check-title" data-reveal>
            <div className={styles.checkCopy}>
              <p className="t-label">The website check</p>
              <h3 id="check-title" className={styles.checkTitle}>
                I can check yours.
              </h3>
              <p className={styles.checkLine}>{note.check}</p>
            </div>
            <div className={styles.checkSide}>
              <p className={styles.price}>{check?.price ?? '$1,500'}</p>
              {check?.terms ? <p className={styles.terms}>{check.terms}</p> : null}
              <div className={styles.actions}>
                <ButtonLink href={SITE.checkHref} arrow track={`note-check-${note.slug}`}>
                  Start with a website check
                </ButtonLink>
                <ButtonLink href={SITE.bookingHref} variant="ghost" track={`note-book-${note.slug}`}>
                  <>
                    Book a <Keep>20-minute</Keep> call
                  </>
                </ButtonLink>
              </div>
              <p className={styles.reply}>{SITE.reply}.</p>
            </div>
          </section>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
