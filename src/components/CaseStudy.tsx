'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import ScreenFrame from '@/components/ScreenFrame';
import WalkthroughFrame from '@/components/WalkthroughFrame';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedDivider from '@/components/AnimatedDivider';
import {
  TrcTimeFigure,
  TrcPipelineFigure,
  TrcLibraryFigure,
  EndorphinsPathwaysFigure,
} from '@/components/WorkDiagrams';
import type { Project } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-5">
      {children}
    </span>
  );
}

export default function CaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <main className="bg-background text-foreground pt-20">
      {/* Header */}
      <section className="px-6 md:px-12 xl:px-20 pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/75 hover:text-accent transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={15} />
              All work
            </Link>
            <span className="block text-[10px] md:text-[11px] font-medium tracking-[0.22em] uppercase text-accent/75 mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8" style={{ lineHeight: 1.02 }}>
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="space-y-5 max-w-3xl"
          >
            {project.intro.map((para) => (
              <p key={para.slice(0, 32)} className="text-base md:text-lg text-muted-foreground/90 leading-relaxed font-light">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Contribution row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-10"
          >
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground/60 mb-4">
              My contribution
            </span>
            <p className="text-sm md:text-[15px] text-foreground/80 leading-loose max-w-3xl">
              {project.contribution.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < project.contribution.length - 1 && (
                    <span aria-hidden="true" className="text-accent/50 mx-2.5">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 mt-7 text-sm font-medium text-foreground/85 px-5 py-2.5 rounded-full border border-white/[0.12] hover:border-accent/35 hover:text-accent hover:bg-white/[0.03] transition-all duration-300"
              >
                Visit the live site
                <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      <div className="px-6 md:px-12 xl:px-20">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedDivider direction="left" accent maxWidth="220px" />
        </div>
      </div>

      {/* Selected work: gallery or reconstructed figures */}
      <section className="px-6 md:px-12 xl:px-20 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal direction="up">
            <SectionLabel>Selected work</SectionLabel>
          </ScrollReveal>

          {project.confidentialNote && (
            <ScrollReveal direction="up">
              <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-2xl mb-10 italic font-serif">
                {project.confidentialNote}
              </p>
            </ScrollReveal>
          )}

          {project.walkthrough && (
            <ScrollReveal direction="up" className="mb-16 md:mb-24">
              <figure>
                <WalkthroughFrame walkthrough={project.walkthrough} />
                <figcaption className="mt-6 md:mt-7 max-w-2xl mx-auto text-center">
                  <span className="block text-base md:text-lg font-medium tracking-tight text-foreground/90 mb-2">
                    {project.walkthrough.title}
                  </span>
                  <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
                    {project.walkthrough.caption}
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          )}

          {project.gallery.length > 0 && (
            <div className="space-y-16 md:space-y-24">
              {project.gallery.map((shot, i) => (
                <ScrollReveal key={shot.src} direction="up">
                  <figure>
                    {shot.frame === 'phone' ? (
                      <div className="max-w-[300px] md:max-w-[340px] mx-auto">
                        <ScreenFrame shot={shot} />
                      </div>
                    ) : (
                      <ScreenFrame shot={shot} priority={i === 0} />
                    )}
                    <figcaption className="mt-6 md:mt-7 max-w-2xl mx-auto text-center">
                      <span className="block text-base md:text-lg font-medium tracking-tight text-foreground/90 mb-2">
                        {shot.title}
                      </span>
                      <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
                        {shot.caption}
                      </span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
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
            <ScrollReveal direction="up" className="mt-16 md:mt-24">
              <EndorphinsPathwaysFigure />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* One key decision */}
      <section className="px-6 md:px-12 xl:px-20 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[hsl(222,14%,10%)]/35" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <SectionLabel>One key decision</SectionLabel>
            <blockquote className="max-w-3xl border-l-2 border-accent/40 pl-6 md:pl-8">
              <p className="text-xl md:text-2xl text-foreground/85 leading-relaxed font-light tracking-tight">
                {project.decision}
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* What changed */}
      <section className="px-6 md:px-12 xl:px-20 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal direction="up">
            <SectionLabel>What changed</SectionLabel>
            <div className="space-y-5 max-w-3xl">
              {project.outcomes.map((outcome) => (
                <p key={outcome.slice(0, 32)} className="text-base md:text-lg text-muted-foreground/90 leading-relaxed font-light">
                  {outcome}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {(project.environment || project.delivery) && (
            <ScrollReveal direction="up">
              <div className="mt-12 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6 max-w-3xl">
                {project.environment && (
                  <div className="p-6 md:p-7 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)]">
                    <span className="block text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/60 mb-3">
                      Project environment
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.environment}</p>
                  </div>
                )}
                {project.delivery && (
                  <div className="p-6 md:p-7 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)]">
                    <span className="block text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/60 mb-3">
                      Delivery approach
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.delivery}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Next project */}
      <section className="px-6 md:px-12 xl:px-20 pt-6 pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal direction="up">
            <Link href={`/work/${next.slug}`} className="group block border-t border-white/[0.07] pt-10">
              <span className="block text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground/60 mb-3">
                Next project
              </span>
              <span className="flex items-center justify-between gap-6">
                <span className="text-2xl md:text-4xl font-medium tracking-tight text-foreground/90 group-hover:text-accent transition-colors duration-500">
                  {next.title}
                </span>
                <span className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-background transition-colors duration-500" />
                </span>
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
