'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WorkCard from '@/components/WorkCard';
import { advisory, principalProjects } from '@/lib/work';

const featuredSlugs = ['kinetikare', 'endorphins', 'tax-relief-counsel'];
const featured = featuredSlugs
  .map((slug) => principalProjects.find((project) => project.slug === slug))
  .filter((project): project is (typeof principalProjects)[number] => Boolean(project));

const proof = [
  { value: '100%', label: 'team adoption within eight weeks for an AI documentation rollout' },
  { value: '~30 min', label: 'to draft a legal matter document, down from about three hours' },
  { value: '6', label: 'clinical services booked through one routed intake instead of six separate paths' },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <p className="hero-fade mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
                Kareem Hassanein · Implementation &amp; Operations
              </p>
              <h1 className="max-w-[1040px] text-[clamp(2.6rem,8.5vw,8rem)] font-medium leading-[0.87] tracking-[-0.07em]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-rise block" style={{ '--hero-delay': '0.08s' } as CSSProperties}>
                    I fix the part
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-rise block" style={{ '--hero-delay': '0.18s' } as CSSProperties}>
                    of the job that
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.09em]">
                  <span
                    className="hero-rise block font-serif font-normal italic text-accent"
                    style={{ '--hero-delay': '0.28s' } as CSSProperties}
                  >
                    nobody owns.
                  </span>
                </span>
              </h1>
            </div>

            <div
              className="hero-fade border-l border-white/[0.12] pl-6 lg:col-span-4 lg:mb-4 lg:pl-8"
              style={{ '--hero-delay': '0.42s' } as CSSProperties}
            >
              <p className="max-w-lg text-lg leading-relaxed text-foreground/76 lg:text-xl">
                I spent years in clinical practice before moving to the operational side of it. Now I rebuild what
                sits underneath a service, from booking and documentation to the handoffs between people, and stay
                with it through rollout until the new way is the normal way.
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

          <p
            className="hero-fade mt-12 border-t border-white/[0.1] pt-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground md:mt-16"
            style={{ '--hero-delay': '0.7s' } as CSSProperties}
          >
            Clinical implementation · Workflow automation · Service design · Digital delivery
          </p>
        </div>
      </section>

      <section aria-label="Selected outcomes" className="border-y border-white/[0.09]">
        <dl className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.value}
              className={`border-white/[0.09] px-6 py-8 sm:px-8 lg:px-10 ${index > 0 ? 'border-t' : ''} ${
                index === 1 ? 'sm:border-l sm:border-t-0' : ''
              } ${index > 0 ? 'lg:border-l lg:border-t-0' : ''}`}
            >
              <dd className="text-3xl font-semibold tracking-[-0.045em] text-accent md:text-4xl">{item.value}</dd>
              <dt className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <ScrollReveal direction="up" className="mb-16 md:mb-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Selected work</p>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl md:text-6xl lg:col-span-8">
                Outcomes, decisions, and the work behind them.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-4">
                Three examples of implementation across healthcare platforms, clinic operations, and professional
                services.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-24 md:gap-32">
            {featured.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} variant="row" flip={index % 2 === 1} />
            ))}
          </div>

          <div className="mt-16 border-t border-white/[0.09] pt-8 text-right md:mt-24">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/74 hover:text-accent">
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
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Current advisory work</p>
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Clinical context, applied early.</h2>
              <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-white/[0.02]">
                <Image
                  src="/images/work/endorphins-services.webp"
                  alt="Six clinical services presented as one coordinated clinic at Endorphins"
                  fill
                  sizes="(min-width: 1024px) 500px, calc(100vw - 3rem)"
                  className="object-cover object-top"
                />
              </figure>
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
