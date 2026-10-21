'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
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
} from '@/components/WorkDiagrams';
import type { GalleryItem, Project } from '@/lib/work';

// Section signposts, not statements. Small, quiet, one hairline.
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-8 border-b border-white/[0.14] pb-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/80 md:mb-10"
    >
      {children}
    </h2>
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

function GalleryFigure({ shot }: { shot: GalleryItem }) {
  if (shot.frame === 'phone') {
    return (
      <figure className="grid items-center gap-8 md:grid-cols-[minmax(230px,300px)_minmax(0,1fr)] md:gap-14">
        <div className="mx-auto w-full max-w-[280px]">
          <ScreenFrame shot={shot} tone="light" sizes="(max-width: 768px) 72vw, 280px" />
        </div>
        <figcaption className="max-w-lg">
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
    <figure className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
      <ScreenFrame shot={shot} tone="light" sizes="(max-width: 1024px) 100vw, 820px" />
      <figcaption className="lg:pt-8">
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
  const hasWorkExamples =
    remainingGallery.length > 0 ||
    project.slug === 'clinical-documentation' ||
    project.slug === 'tax-relief-counsel' ||
    project.slug === 'endorphins';

  return (
    <main className="bg-background text-foreground pt-20">
      {/* The screen. */}
      <section className="relative px-6 pb-16 pt-12 md:px-12 md:pb-28 md:pt-20 xl:px-20">
        <div className="relative max-w-[1280px] mx-auto">
          <div className="enter-fade" style={{ '--hero-delay': '0.06s' } as CSSProperties}>
            <Link
              href="/work"
              className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground/75 transition-colors duration-300 hover:text-accent md:mb-14"
            >
              <ArrowLeft size={15} />
              All work
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
            <div
              className="case-title-col enter-fade lg:col-span-5"
              style={{ '--hero-delay': '0.28s', '--enter-dur': '1.05s' } as CSSProperties}
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
            </div>

            <div
              className="enter-fade lg:col-span-7"
              style={{ '--hero-delay': '0.54s', '--enter-dur': '1.15s' } as CSSProperties}
            >
              <ProjectLeadVisual project={project} shot={leadShot} />
            </div>
          </div>
        </div>
      </section>

      {/* What was written down. */}
      <div className="paper">
        <div className="px-6 py-20 md:px-12 md:py-28 xl:px-20">
          <div className="mx-auto max-w-[1080px] space-y-16 md:space-y-24">
            <section aria-labelledby="project-context">
              <ScrollReveal variant="heading">
                <SectionHeading id="project-context">Context</SectionHeading>
              </ScrollReveal>
              <ScrollReveal variant="text" delay={0.1}>
                <div className="max-w-3xl space-y-5">
                  {project.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10 max-w-3xl">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                    My role
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/72">{project.role}</p>
                </div>
              </ScrollReveal>
            </section>

            {hasWorkExamples && (
              <section aria-labelledby="work-examples">
                <ScrollReveal variant="heading">
                  <SectionHeading id="work-examples">The work</SectionHeading>
                </ScrollReveal>

                {project.confidentialNote && (
                  <ScrollReveal variant="text" delay={0.1}>
                    <p className="mb-10 max-w-2xl border-l-2 border-accent/45 pl-4 text-sm leading-relaxed text-muted-foreground">
                      {project.confidentialNote}
                    </p>
                  </ScrollReveal>
                )}

                {remainingGallery.length > 0 && (
                  <div className="space-y-14 md:space-y-20">
                    {remainingGallery.map((shot) => (
                      <ScrollReveal key={shot.src} variant="figure">
                        <GalleryFigure shot={shot} />
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {project.slug === 'clinical-documentation' && (
                  <ScrollReveal variant="figure">
                    <ClinicalWorkflowFigure />
                  </ScrollReveal>
                )}

                {project.slug === 'tax-relief-counsel' && (
                  <div className="space-y-8 md:space-y-10">
                    <ScrollReveal variant="figure">
                      <TrcTimeFigure />
                    </ScrollReveal>
                    <ScrollReveal variant="figure">
                      <TrcPipelineFigure />
                    </ScrollReveal>
                    <ScrollReveal variant="figure">
                      <TrcLibraryFigure />
                    </ScrollReveal>
                  </div>
                )}

              </section>
            )}

            <section aria-labelledby="approach">
              <ScrollReveal variant="heading">
                <SectionHeading id="approach">Approach</SectionHeading>
              </ScrollReveal>
              <ScrollReveal variant="text" delay={0.1}>
                <div className="max-w-3xl">
                  <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{project.approach}</p>
                </div>
              </ScrollReveal>
            </section>

            <section aria-labelledby="outcomes">
              <ScrollReveal variant="heading">
                <SectionHeading id="outcomes">What changed</SectionHeading>
              </ScrollReveal>
              <ScrollReveal variant="text" delay={0.1}>
                <div className="max-w-3xl space-y-5">
                  {project.outcomes.map((outcome) => (
                    <p key={outcome.slice(0, 32)} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {outcome}
                    </p>
                  ))}
                </div>

                {project.environment && (
                  <div className="mt-12 max-w-3xl border-t border-white/[0.14] pt-7">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                      Tools and environment
                    </p>
                    <p className="text-sm leading-loose text-foreground/72">{project.environment}</p>
                  </div>
                )}
              </ScrollReveal>
            </section>
          </div>
        </div>
      </div>

      <section aria-labelledby="next-project-heading" className="px-6 pb-20 pt-16 md:px-12 md:pb-32 md:pt-24 xl:px-20">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal variant="item">
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
