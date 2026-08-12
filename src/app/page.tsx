'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
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
    src: '/images/work/endorphins-booking.webp',
    alt: 'Endorphins booking page routed by practitioner',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'endorphinshealth.com/book-appointment',
  },
  {
    src: '/images/work/wedding-travel.webp',
    alt: 'Travel section of the wedding website with an aerial photo of Lima',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'wedding · travel',
  },
  {
    src: '/images/work/kinetikare-treatment.webp',
    alt: 'Dry needling treatment page with plain-language benefits',
    width: 1440,
    height: 900,
    frame: 'browser' as const,
    url: 'kinetikarephysio.com/treatments',
  },
];

const stripOffsets = ['md:translate-y-8', 'md:-translate-y-2', 'md:translate-y-12', 'md:translate-y-3'];

const featuredSlugs = ['kinetikare', 'endorphins', 'tax-relief-counsel'];
const featured = featuredSlugs
  .map((slug) => principalProjects.find((project) => project.slug === slug))
  .filter((project): project is (typeof principalProjects)[number] => Boolean(project));

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:px-12 xl:px-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-36 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="absolute bottom-[-40%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <p className="hero-fade mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
                Kareem Hassanein · Implementation &amp; Operations
              </p>
              <h1 className="max-w-[1100px] text-[clamp(2.5rem,7vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-rise block" style={{ '--hero-delay': '0.08s' } as CSSProperties}>
                    Selected work in
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-rise block" style={{ '--hero-delay': '0.18s' } as CSSProperties}>
                    healthcare, operations,
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.24em] -mb-[0.12em]">
                  <span
                    className="hero-rise block font-serif font-normal italic text-accent"
                    style={{ '--hero-delay': '0.28s' } as CSSProperties}
                  >
                    and digital delivery.
                  </span>
                </span>
              </h1>
            </div>

            <div
              className="hero-fade border-l border-white/[0.12] pl-6 lg:col-span-4 lg:mb-4 lg:pl-8"
              style={{ '--hero-delay': '0.42s' } as CSSProperties}
            >
              <p className="max-w-lg text-lg leading-relaxed text-foreground/76 lg:text-xl">
                I&rsquo;m a practicing physiotherapist who also builds and runs the systems around care: websites,
                booking and intake, documentation, and the workflows that connect them. This portfolio shows the
                finished work and the decisions behind it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:gap-2">
                <Link
                  href="/work"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
                >
                  Explore the work
                  <ArrowDown aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:translate-y-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/[0.14] px-5 text-sm font-semibold text-foreground/78 transition-colors duration-500 hover:border-accent/45 hover:text-foreground"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Filmstrip bridge: real screens spanning the dark-to-paper boundary */}
      <section aria-label="Project screens" className="relative z-10 -mb-10 px-6 sm:px-8 md:-mb-20 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stripShots.map((shot, index) => (
            <ScrollReveal key={shot.src} direction="up" delay={index * 0.06} className={stripOffsets[index]}>
              <ScreenFrame shot={shot} sizes="(max-width: 768px) 50vw, 320px" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured work on warm paper */}
      <section className="bg-[#ECE6D9] px-6 pb-24 pt-28 text-[#1c1812] sm:px-8 md:pb-32 md:pt-44 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <ScrollReveal direction="up" className="mb-16 md:mb-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6d33]">Selected work</p>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] text-[#1c1812] sm:text-5xl md:text-6xl lg:col-span-8">
                Outcomes, decisions, and the <span className="font-serif font-normal italic text-[#8a6d33]">work behind them.</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#57503f] lg:col-span-4">
                Three examples of implementation across healthcare platforms, clinic operations, and professional
                services.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-24 md:gap-32">
            {featured.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} variant="row" flip={index % 2 === 1} tone="light" />
            ))}
          </div>

          <div className="mt-16 border-t border-black/[0.12] pt-8 text-right md:mt-24">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1c1812]/74 hover:text-[#8a6d33]">
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
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Advisory</p>
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Current advisory work.</h2>
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
