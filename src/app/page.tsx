'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import HeadlineReveal from '@/components/HeadlineReveal';
import ScrollReveal from '@/components/ScrollReveal';
import ScreenWall from '@/components/ScreenWall';
import WorkCard from '@/components/WorkCard';
import { advisory, principalProjects, wallShots } from '@/lib/work';

const heroLines = [
  { text: 'Selected work in' },
  { text: 'implementation, service operations,' },
  { text: 'and digital delivery.', className: 'font-serif font-normal italic text-accent', duration: '1s' },
];

const featured = principalProjects;

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative px-6 pb-20 pt-28 sm:px-8 sm:pt-32 md:pb-24 md:pt-40 lg:px-12 xl:px-20">
        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
                <span
                  aria-hidden="true"
                  className="enter-rule-x h-px w-10 bg-accent/50"
                  style={{ '--hero-delay': '0.06s' } as CSSProperties}
                />
                <span className="enter-fade" style={{ '--hero-delay': '0.16s', '--enter-dur': '0.85s' } as CSSProperties}>
                  Kareem Hassanein
                </span>
              </p>
              <h1 className="max-w-[1100px] text-[clamp(2.5rem,7vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                <HeadlineReveal lines={heroLines} />
              </h1>
            </div>

            <div className="hero-rule pl-6 lg:col-span-4 lg:mb-4 lg:pl-8" style={{ '--hero-delay': '0.80s' } as CSSProperties}>
              <p
                className="enter-fade max-w-lg text-base leading-relaxed text-foreground/76 sm:text-lg lg:text-xl"
                style={{ '--hero-delay': '0.88s', '--enter-dur': '0.95s' } as CSSProperties}
              >
                I work across healthcare and professional services, drawing on more than 10,000 hours of direct client
                work. The projects below cover a clinical software rollout, two clinic websites, and a legal drafting
                workflow.
              </p>
              <div
                className="enter-fade mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:gap-2"
                style={{ '--hero-delay': '1.08s', '--enter-dur': '0.9s' } as CSSProperties}
              >
                <Link
                  href="#selected-work"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
                >
                  View selected work
                  <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/about"
                  className="hidden min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/[0.14] px-5 text-sm font-semibold text-foreground/78 transition-colors duration-500 hover:border-accent/45 hover:text-foreground sm:inline-flex"
                >
                  About Kareem
                </Link>
              </div>
              <p
                className="enter-fade mt-6 max-w-lg text-xs leading-relaxed text-muted-foreground"
                style={{ '--hero-delay': '1.22s', '--enter-dur': '0.9s' } as CSSProperties}
              >
                Hamilton and Burlington, Ontario · Open to on-site, hybrid, or remote opportunities
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* The live screens on a slowly turning wall, with a second ring of the
          same work turning against it behind. Full bleed: the cylinders are
          meant to run past the edges rather than sit in the page gutter. */}
      <section aria-label="Screens from live projects" className="relative z-10 pb-2 md:pb-6">
        <ScreenWall shots={wallShots} />
      </section>

      {/* Featured work on warm paper */}
      <section id="selected-work" className="scroll-mt-20 bg-[#ECE6D9] px-6 pb-24 pt-20 text-[#1c1812] sm:px-8 md:pb-32 md:pt-28 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          {/* Two beats, not one slab: the signpost and title land, then the
              framing sentence follows them in. */}
          <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:items-end md:mb-24">
            <ScrollReveal variant="heading" className="lg:col-span-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#705829]">Selected work</p>
              <h2 className="text-4xl font-medium tracking-[-0.045em] text-[#1c1812] sm:text-5xl md:text-6xl">
                Projects and <span className="font-serif font-normal italic text-[#705829]">results.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="text" delay={0.12} className="lg:col-span-5 lg:pb-2">
              <p className="max-w-md text-base leading-relaxed text-[#57503f] lg:ml-auto">
                Four projects across clinical software, clinic operations, professional services, and patient-facing digital products.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
            {featured.map((project, index) => (
              <WorkCard
                key={project.slug}
                project={project}
                summary={project.cardSummary}
                index={index}
                variant="stack"
                tone="light"
              />
            ))}
          </div>

          <ScrollReveal variant="item" className="mt-16 border-t border-black/[0.12] pt-8 text-right md:mt-24">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1c1812]/74 hover:text-[#705829]">
              See all work
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <ScrollReveal variant="heading" className="lg:col-span-5">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Current work</p>
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Advisory &amp; Mentorship.</h2>
            </ScrollReveal>
            <div className="border-t border-white/[0.11] lg:col-span-7">
              {advisory.map((item, index) => (
                <ScrollReveal key={item.title} variant="item" delay={0.08 + index * 0.09}>
                  <article className="grid gap-4 border-b border-white/[0.11] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                    <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.desc}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
