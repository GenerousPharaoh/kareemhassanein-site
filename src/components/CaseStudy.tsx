'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import ScreenFrame from '@/components/ScreenFrame';
import ScrollReveal from '@/components/ScrollReveal';
import {
  ClinicalAdoptionFigure,
  ClinicalWorkflowFigure,
  TrcWorkflowHeroFigure,
  TrcTimeFigure,
  TrcPipelineFigure,
  TrcLibraryFigure,
  EndorphinsPathwaysFigure,
} from '@/components/WorkDiagrams';
import type { GalleryItem, Project } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

interface RecordSection {
  id: string;
  number: string;
  label: string;
}

// Section names are the headings. The record does not need a slogan above each
// part, and the labels match the rail exactly so the two never drift.
function SectionHeading({ id, number, label, className = '' }: RecordSection & { className?: string }) {
  return (
    <div className={`mb-9 flex items-baseline gap-4 border-b border-white/[0.14] pb-4 md:mb-11 ${className}`}>
      <span className="font-mono text-xs text-accent">{number}</span>
      <h2 id={id} className="text-2xl font-medium tracking-[-0.03em] text-foreground md:text-3xl">
        {label}
      </h2>
    </div>
  );
}

// The chart rail: a sticky index of the record that tracks reading position.
function RecordRail({ sections }: { sections: RecordSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(`${section.id}-section`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id.replace('-section', ''));
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sections in this project" className="sticky top-32">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/75">Record</p>
      <ul className="border-t border-white/[0.14]">
        {sections.map((section) => {
          const active = activeId === section.id;
          return (
            <li key={section.id} className="border-b border-white/[0.14]">
              <a
                href={`#${section.id}-section`}
                aria-current={active ? 'true' : undefined}
                className={`group flex min-h-11 items-center gap-3 py-1 text-sm transition-colors duration-300 ${
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-4 w-px transition-all duration-500 ${active ? 'bg-accent' : 'bg-transparent'}`}
                />
                <span className={`font-mono text-[11px] ${active ? 'text-accent' : 'text-muted-foreground/70'}`}>
                  {section.number}
                </span>
                <span>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ProjectLeadVisual({ project, shot }: { project: Project; shot?: GalleryItem }) {
  if (project.slug === 'clinical-documentation') {
    return <ClinicalAdoptionFigure />;
  }

  if (project.slug === 'tax-relief-counsel') {
    return <TrcWorkflowHeroFigure />;
  }

  if (!shot) return null;

  return (
    <figure>
      <ScreenFrame
        shot={shot}
        priority
        sizes="(max-width: 1024px) 100vw, 720px"
      />
      <figcaption className="mt-5 grid gap-1.5 border-l border-accent/35 pl-4 sm:grid-cols-[0.72fr_1.28fr] sm:gap-6">
        <span className="text-sm font-medium text-foreground/92">{shot.title}</span>
        <span className="text-sm leading-relaxed text-muted-foreground/78">{shot.caption}</span>
      </figcaption>
    </figure>
  );
}

function GalleryFigure({ shot, index }: { shot: GalleryItem; index: number }) {
  if (shot.frame === 'phone') {
    return (
      <figure className="grid items-center gap-8 border-t border-white/[0.07] pt-10 md:grid-cols-[minmax(230px,300px)_minmax(0,1fr)] md:gap-14 md:pt-14">
        <div className="mx-auto w-full max-w-[280px]">
          <ScreenFrame shot={shot} tone="light" sizes="(max-width: 768px) 72vw, 280px" />
        </div>
        <figcaption className="max-w-lg">
          <span className="mb-4 block font-mono text-xs tracking-[0.18em] text-accent/75">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="block text-xl md:text-2xl font-medium tracking-tight text-foreground/95 mb-3">
            {shot.title}
          </span>
          <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
            {shot.caption}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="grid items-start gap-7 border-t border-white/[0.07] pt-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 lg:pt-14">
      <ScreenFrame shot={shot} tone="light" sizes="(max-width: 1024px) 100vw, 820px" />
      <figcaption className="lg:pt-8">
        <span className="mb-4 block font-mono text-xs tracking-[0.18em] text-accent/75">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="block text-xl md:text-2xl font-medium tracking-tight text-foreground/95 mb-3">
          {shot.title}
        </span>
        <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
          {shot.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const leadShot = project.gallery[0];
  const remainingGallery = leadShot ? project.gallery.slice(1) : project.gallery;
  const hasSelectedWork =
    remainingGallery.length > 0 ||
    project.slug === 'clinical-documentation' ||
    project.slug === 'tax-relief-counsel' ||
    project.slug === 'endorphins';

  const sections: RecordSection[] = [
    { id: 'context', number: '01', label: 'Context' },
    ...(hasSelectedWork ? [{ id: 'selected-work', number: '02', label: 'Selected work' }] : []),
    { id: 'decision', number: hasSelectedWork ? '03' : '02', label: 'Key decision' },
    { id: 'outcomes', number: hasSelectedWork ? '04' : '03', label: 'Outcomes' },
  ];
  const section = (id: string) => sections.find((entry) => entry.id === id)!;

  return (
    <main className="bg-background text-foreground pt-20">
      {/* The screen: the thing itself, on dark. */}
      <section className="relative px-6 md:px-12 xl:px-20 pt-16 md:pt-20 pb-20 md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-[-14%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.055] blur-3xl" />
        </div>
        <div className="relative max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground/75 hover:text-accent transition-colors duration-300 mb-10 md:mb-14"
            >
              <ArrowLeft size={15} />
              All work
            </Link>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="case-title-col lg:col-span-5"
            >
              {project.contextLabel && (
                <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground/80 mb-3">
                  {project.contextLabel}
                </span>
              )}
              <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-accent/85 mb-5 leading-relaxed">
                {project.category}
              </span>
              <h1 className="case-title font-medium tracking-[-0.055em] leading-[0.92] text-balance mb-7">
                {project.title}
              </h1>
              <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-foreground/78">
                {project.summary}
              </p>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-[6px] border border-white/[0.13] px-5 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.025] hover:text-accent"
                >
                  Visit the live site
                  <ArrowUpRight size={15} className="opacity-65 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="lg:col-span-7"
            >
              <ProjectLeadVisual project={project} shot={leadShot} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The record: everything written down, on paper. */}
      <div className="paper">
        <div className="px-6 py-20 md:px-12 md:py-28 xl:px-20">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <RecordRail sections={sections} />
            </aside>

            <div className="space-y-20 md:space-y-28 lg:col-span-9">
              <section id="context-section" aria-labelledby="context">
                <ScrollReveal direction="up">
                  <SectionHeading {...section('context')} />
                </ScrollReveal>
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                  <ScrollReveal direction="up" className="lg:col-span-7">
                    <div className="space-y-5">
                      {project.intro.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.06} className="lg:col-span-5">
                    <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                      My contribution
                    </h3>
                    <ul className="border-t border-white/[0.14]">
                      {project.contribution.map((item) => (
                        <li
                          key={item}
                          className="border-b border-white/[0.14] py-3 text-sm text-foreground/85 md:text-[15px]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>
              </section>

              {hasSelectedWork && (
                <section id="selected-work-section" aria-labelledby="selected-work">
                  <ScrollReveal direction="up">
                    <SectionHeading {...section('selected-work')} />
                  </ScrollReveal>

                  {project.confidentialNote && (
                    <ScrollReveal direction="up">
                      <p className="mb-10 max-w-2xl border-l-2 border-accent/45 pl-4 text-sm leading-relaxed text-muted-foreground">
                        {project.confidentialNote}
                      </p>
                    </ScrollReveal>
                  )}

                  {remainingGallery.length > 0 && (
                    <div className="space-y-14 md:space-y-20">
                      {remainingGallery.map((shot, index) => (
                        <ScrollReveal key={shot.src} direction="up">
                          <GalleryFigure shot={shot} index={index + 1} />
                        </ScrollReveal>
                      ))}
                    </div>
                  )}

                  {project.slug === 'clinical-documentation' && (
                    <ScrollReveal direction="up">
                      <ClinicalWorkflowFigure />
                    </ScrollReveal>
                  )}

                  {project.slug === 'tax-relief-counsel' && (
                    <div className="space-y-8 md:space-y-10">
                      <ScrollReveal direction="up">
                        <TrcPipelineFigure />
                      </ScrollReveal>
                      <ScrollReveal direction="up">
                        <TrcLibraryFigure />
                      </ScrollReveal>
                      <ScrollReveal direction="up">
                        <TrcTimeFigure />
                      </ScrollReveal>
                    </div>
                  )}

                  {project.slug === 'endorphins' && (
                    <ScrollReveal direction="up" className="mt-14 md:mt-20">
                      <EndorphinsPathwaysFigure />
                    </ScrollReveal>
                  )}
                </section>
              )}

              <section id="decision-section" aria-labelledby="decision">
                <ScrollReveal direction="up">
                  <SectionHeading {...section('decision')} />
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.05}>
                  <p className="max-w-3xl text-xl font-light leading-[1.5] tracking-[-0.015em] text-foreground/92 md:text-2xl lg:text-[1.7rem]">
                    {project.decision}
                  </p>
                </ScrollReveal>
              </section>

              <section id="outcomes-section" aria-labelledby="outcomes">
                <ScrollReveal direction="up">
                  <SectionHeading {...section('outcomes')} />
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.05}>
                  <ul className="max-w-3xl border-t border-white/[0.14]">
                    {project.outcomes.map((outcome) => (
                      <li
                        key={outcome.slice(0, 32)}
                        className="border-b border-white/[0.14] py-6 text-base leading-relaxed text-muted-foreground md:py-7 md:text-lg"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                {(project.environment || project.delivery) && (
                  <ScrollReveal direction="up">
                    <div className="mt-12 grid max-w-3xl gap-8 border-t border-white/[0.14] pt-8 md:grid-cols-2 md:gap-12">
                      {project.environment && (
                        <div>
                          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                            Project environment
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground/85 md:text-[15px]">
                            {project.environment}
                          </p>
                        </div>
                      )}
                      {project.delivery && (
                        <div>
                          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                            Delivery approach
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground/85 md:text-[15px]">
                            {project.delivery}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="next-project-heading" className="px-6 pt-20 pb-24 md:px-12 md:pt-24 md:pb-32 xl:px-20">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal direction="up">
            <div className="border-t border-white/[0.09] pt-9">
              <h2 id="next-project-heading" className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                Next project
              </h2>
              <Link href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 py-2">
                <span className="text-2xl md:text-4xl font-medium tracking-tight text-foreground/92 group-hover:text-accent transition-colors duration-500">
                  {next.title}
                </span>
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[6px] border border-white/[0.11] transition-all duration-500 group-hover:border-accent group-hover:bg-accent">
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors duration-500 group-hover:text-background md:h-5 md:w-5" />
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
