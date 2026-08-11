'use client';

import Link from 'next/link';
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

interface SectionHeadingProps {
  id: string;
  number: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}

function SectionHeading({ id, number, eyebrow, children, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="mb-5 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-accent/70">
        <span className="font-mono text-accent/75">{number}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent/30" />
        <span>{eyebrow}</span>
      </div>
      <h2 id={id} className="text-3xl md:text-4xl font-medium tracking-[-0.035em] text-foreground text-balance">
        {children}
      </h2>
    </div>
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
          <ScreenFrame shot={shot} sizes="(max-width: 768px) 72vw, 280px" />
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
      <ScreenFrame shot={shot} sizes="(max-width: 1024px) 100vw, 820px" />
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

  return (
    <main className="bg-background text-foreground pt-20">
      <section className="px-6 md:px-12 xl:px-20 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-[1280px] mx-auto">
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
                <span className="block text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/80 mb-3">
                  {project.contextLabel}
                </span>
              )}
              <span className="block text-[11px] font-medium tracking-[0.19em] uppercase text-accent/80 mb-5 leading-relaxed">
                {project.category}
              </span>
              {/* Sized from the column, not the viewport. See .case-title in
                  globals.css for why the viewport cannot work here. */}
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

          {project.proof && project.proof.length > 0 && (
            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease }}
              className="mt-12 grid border-y border-white/[0.09] sm:grid-cols-3 md:mt-16"
              aria-label="Project evidence"
            >
              {project.proof.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="border-b border-white/[0.08] py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0 md:py-6"
                >
                  <dt className="mb-2 text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground/80">
                    {item.label}
                  </dt>
                  <dd className="text-3xl md:text-4xl font-medium tracking-[-0.045em] text-foreground/95">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </section>

      <section
        aria-labelledby="project-brief-heading"
        className="px-6 md:px-12 xl:px-20 py-20 md:py-28"
      >
        <div className="max-w-[1180px] mx-auto grid gap-14 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-7">
            <SectionHeading id="project-brief-heading" number="01" eyebrow="Context">
              The work behind the result.
            </SectionHeading>
            <div className="mt-8 space-y-5 max-w-3xl">
              {project.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base md:text-lg text-muted-foreground/90 leading-relaxed font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.06} className="lg:col-span-5 lg:pt-1">
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/95 mb-6">
              My contribution
            </h2>
            <ul className="border-t border-white/[0.09]">
              {project.contribution.map((item, index) => (
                <li key={item} className="flex items-center gap-4 border-b border-white/[0.07] py-3.5">
                  <span className="font-mono text-xs text-accent/75">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm md:text-[15px] text-foreground/82">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {hasSelectedWork && (
        <section
          aria-labelledby="selected-work-heading"
          className="border-y border-white/[0.06] bg-white/[0.012] px-6 py-20 md:px-12 md:py-28 xl:px-20"
        >
          <div className="max-w-[1180px] mx-auto">
            <ScrollReveal direction="up">
              <SectionHeading id="selected-work-heading" number="02" eyebrow="Selected work">
                The system, made visible.
              </SectionHeading>
            </ScrollReveal>

            {project.confidentialNote && (
              <ScrollReveal direction="up">
                <p className="mt-7 max-w-2xl border-l border-accent/35 pl-4 text-sm leading-relaxed text-muted-foreground/78">
                  {project.confidentialNote}
                </p>
              </ScrollReveal>
            )}

            {remainingGallery.length > 0 && (
              <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
                {remainingGallery.map((shot, index) => (
                  <ScrollReveal key={shot.src} direction="up">
                    <GalleryFigure shot={shot} index={index + 1} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {project.slug === 'clinical-documentation' && (
              <ScrollReveal direction="up" className="mt-12 md:mt-16">
                <ClinicalWorkflowFigure />
              </ScrollReveal>
            )}

            {project.slug === 'tax-relief-counsel' && (
              <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
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
              <ScrollReveal direction="up" className="mt-12 md:mt-16">
                <EndorphinsPathwaysFigure />
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      <section
        aria-labelledby="key-decision-heading"
        className="px-6 py-20 md:px-12 md:py-28 xl:px-20"
      >
        <div className="max-w-[1180px] mx-auto grid gap-10 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-4">
            <SectionHeading id="key-decision-heading" number="03" eyebrow="Key decision">
              What shaped the work.
            </SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05} className="lg:col-span-8 lg:pt-10">
            <p className="border-l-2 border-accent/45 pl-6 text-xl md:pl-8 md:text-2xl lg:text-[1.75rem] font-light leading-[1.45] tracking-[-0.02em] text-foreground/88">
              {project.decision}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section
        aria-labelledby="project-outcomes-heading"
        className="border-t border-white/[0.07] px-6 py-20 md:px-12 md:py-28 xl:px-20"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <ScrollReveal direction="up" className="lg:col-span-4">
              <SectionHeading id="project-outcomes-heading" number="04" eyebrow="Outcomes">
                What changed.
              </SectionHeading>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.05} className="lg:col-span-8">
              <ul className="border-t border-white/[0.09]">
                {project.outcomes.map((outcome, index) => (
                  <li key={outcome.slice(0, 32)} className="grid gap-4 border-b border-white/[0.08] py-6 sm:grid-cols-[2.5rem_1fr] md:py-7">
                    <span className="font-mono text-[11px] text-accent/75 pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base md:text-lg text-foreground/85 leading-relaxed font-light">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {(project.environment || project.delivery) && (
            <ScrollReveal direction="up">
              <div className="mt-14 grid border-y border-white/[0.08] md:grid-cols-2 md:divide-x md:divide-white/[0.08]">
                {project.environment && (
                  <div className="border-b border-white/[0.08] py-6 md:border-b-0 md:pr-8">
                    <h3 className="mb-3 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground/80">
                      Project environment
                    </h3>
                    <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                      {project.environment}
                    </p>
                  </div>
                )}
                {project.delivery && (
                  <div className="py-6 md:pl-8">
                    <h3 className="mb-3 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground/80">
                      Delivery approach
                    </h3>
                    <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                      {project.delivery}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section aria-labelledby="next-project-heading" className="px-6 pt-4 pb-24 md:px-12 md:pb-32 xl:px-20">
        <div className="max-w-[1180px] mx-auto">
          <ScrollReveal direction="up">
            <div className="border-t border-white/[0.09] pt-9">
              <h2 id="next-project-heading" className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/80">
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
