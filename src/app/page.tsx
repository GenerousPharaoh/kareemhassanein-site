'use client';

import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ScreenFrame from '@/components/ScreenFrame';
import WorkCard from '@/components/WorkCard';
import { advisory, principalProjects } from '@/lib/work';

// A bridge of real screens between the hero and the featured work: shots
// that are not already leading a card below.
const stripShots = [
  {
    src: '/images/work/kinetikare-conditions.webp',
    alt: 'KinetiKare condition library filtered by body region',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'kinetikarephysio.com/conditions',
  },
  {
    src: '/images/work/endorphins-booking-2026-08.webp',
    alt: 'Endorphins booking page with reception and practitioner scheduling options',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'endorphinshealth.com/book-appointment',
  },
  {
    src: '/images/work/kinetikare-compare.webp',
    alt: 'KinetiKare comparison page showing two commonly confused conditions side by side',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'kinetikarephysio.com/conditions/compare',
  },
  {
    src: '/images/work/endorphins-services-2026-08.webp',
    alt: 'Endorphins services page introducing six clinical disciplines and booking information',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'endorphinshealth.com/services',
  },
];

const heroLines = [
  { text: 'Selected work in', className: '' },
  { text: 'implementation, service operations,', className: '' },
  { text: 'and digital delivery.', className: 'font-serif font-normal italic text-accent' },
];

const HEADLINE_START = 0.22;
const WORD_STEP = 0.055;

// One span per word, each resolving on its own beat.
function HeadlineLine({ text, offset, className = '', duration }: { text: string; offset: number; className?: string; duration: string }) {
  const words = text.split(' ');
  return (
    <span className={`block ${className}`}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className="enter-word inline-block"
            style={{
              '--hero-delay': `${(HEADLINE_START + (offset + index) * WORD_STEP).toFixed(3)}s`,
              '--enter-dur': duration,
            } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  );
}

const stripOffsets = ['md:translate-y-8', 'md:-translate-y-2', 'md:translate-y-12', 'md:translate-y-3'];

const featured = principalProjects;

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:px-12 xl:px-20">
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
                  Kareem Hassanein · Implementation, Service Operations &amp; Digital Delivery
                </span>
              </p>
              <h1 className="max-w-[1100px] text-[clamp(2.5rem,7vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                {heroLines.map((line, index) => (
                  <Fragment key={line.text}>
                    <HeadlineLine
                      text={line.text}
                      offset={heroLines.slice(0, index).reduce((total, prev) => total + prev.text.split(' ').length, 0)}
                      className={line.className}
                      duration={index === heroLines.length - 1 ? '1s' : '0.85s'}
                    />
                    {index < heroLines.length - 1 && ' '}
                  </Fragment>
                ))}
              </h1>
            </div>

            <div className="hero-rule pl-6 lg:col-span-4 lg:mb-4 lg:pl-8" style={{ '--hero-delay': '0.52s' } as CSSProperties}>
              <p
                className="enter-fade max-w-lg text-lg leading-relaxed text-foreground/76 lg:text-xl"
                style={{ '--hero-delay': '0.62s', '--enter-dur': '0.95s' } as CSSProperties}
              >
                I work across healthcare and professional services, drawing on a background in frontline care, team
                leadership, and more than 10,000 hours of direct client work. The case studies below show how I assess
                needs, work within real constraints, carry an idea through delivery, and refine it against what
                happens in practice.
              </p>
              <div
                className="enter-fade mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:gap-2"
                style={{ '--hero-delay': '0.82s', '--enter-dur': '0.9s' } as CSSProperties}
              >
                <Link
                  href="/work"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
                >
                  View selected work
                  <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/[0.14] px-5 text-sm font-semibold text-foreground/78 transition-colors duration-500 hover:border-accent/45 hover:text-foreground"
                >
                  About Kareem
                </Link>
              </div>
              <p
                className="enter-fade mt-6 max-w-lg text-xs leading-relaxed text-muted-foreground"
                style={{ '--hero-delay': '0.94s', '--enter-dur': '0.9s' } as CSSProperties}
              >
                Open to full-time opportunities and selected advisory work · Hamilton and Burlington, Ontario · On-site, hybrid, or remote
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Filmstrip bridge: real screens spanning the dark-to-paper boundary */}
      <section aria-label="Project screens" className="relative z-10 -mb-10 px-6 sm:px-8 md:-mb-20 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {/* Part of the load sequence rather than a scroll reveal: these sit in
              the first screen, so they animate in CSS and paint with the page. */}
          {stripShots.map((shot, index) => (
            <div
              key={shot.src}
              className={`enter-settle ${stripOffsets[index]}`}
              style={{ '--hero-delay': `${1.02 + index * 0.08}s`, '--enter-dur': '0.9s' } as CSSProperties}
            >
              <ScreenFrame shot={shot} sizes="(max-width: 768px) 50vw, 320px" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured work on warm paper */}
      <section className="bg-[#ECE6D9] px-6 pb-24 pt-28 text-[#1c1812] sm:px-8 md:pb-32 md:pt-44 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <ScrollReveal direction="up" className="mb-16 md:mb-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#705829]">Selected work</p>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] text-[#1c1812] sm:text-5xl md:text-6xl lg:col-span-8">
                Outcomes, decisions, and the <span className="font-serif font-normal italic text-[#705829]">work behind them.</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#57503f] lg:col-span-4">
                Case studies across service launches, workflow improvement, technology adoption, and digital products.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-24 md:gap-32">
            {featured.map((project, index) => (
              <WorkCard
                key={project.slug}
                project={project}
                summary={project.cardSummary}
                index={index}
                variant="row"
                flip={index % 2 === 1}
                tone="light"
              />
            ))}
          </div>

          <div className="mt-16 border-t border-black/[0.12] pt-8 text-right md:mt-24">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1c1812]/74 hover:text-[#705829]">
              See all work
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <ScrollReveal direction="up" className="lg:col-span-5">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Current work</p>
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Advisory &amp; Mentorship.</h2>
            </ScrollReveal>
            <div className="border-t border-white/[0.11] lg:col-span-7">
              {advisory.map((item) => (
                <article key={item.title} className="grid gap-4 border-b border-white/[0.11] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
