import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScreenFrame from '@/components/ScreenFrame';
import WorkCard from '@/components/WorkCard';
import { additionalProjects, advisory, principalProjects } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work | Kareem Hassanein',
  description: 'Case studies covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.',
  openGraph: {
    title: 'Work | Kareem Hassanein',
    description: 'Case studies covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.',
    url: 'https://www.khassanein.bio/work',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Kareem Hassanein',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Selected implementation and operations work by Kareem Hassanein' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Kareem Hassanein',
    description: 'Case studies covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.khassanein.bio/work' },
};

export default function WorkPage() {
  return (
    <main className="bg-background pb-8 pt-32 text-foreground md:pt-40">
      <section className="relative px-6 pb-20 sm:px-8 md:pb-28 lg:px-12 xl:px-20">
        <div className="relative mx-auto max-w-[1320px]">
          <div className="enter-fade">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Work</p>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <h1 className="max-w-5xl text-[clamp(3rem,8.5vw,8.2rem)] font-medium leading-[0.89] tracking-[-0.065em] lg:col-span-8">
                Selected <span className="font-serif font-normal italic text-accent">projects.</span>
              </h1>
              <p className="max-w-lg border-l border-white/[0.12] pl-6 text-lg leading-relaxed text-foreground/72 lg:col-span-4">
                Projects across healthcare platforms, clinic operations, professional services, and digital
                delivery. Each shows the problem, the work, and what changed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ECE6D9] px-6 py-20 text-[#1c1812] sm:px-8 md:py-28 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex items-baseline justify-between border-b border-black/[0.14] pb-5 md:mb-20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1c1812]/74">Principal projects</h2>
            <span className="font-mono text-xs text-[#6b6353]">
              01–{String(principalProjects.length).padStart(2, '0')}
            </span>
          </div>
          <div className="grid gap-16 md:gap-32">
            {principalProjects.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} variant="row" flip={index % 2 === 1} headingLevel={3} tone="light" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Additional work</p>
              <h2 className="text-4xl font-medium tracking-[-0.045em]">Additional projects.</h2>
            </div>
            <div className="lg:col-span-8">
              {additionalProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group grid min-h-28 items-center gap-6 border-y border-white/[0.1] py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[auto_1fr_auto]"
                >
                  {project.card ? (
                    <div className="hidden w-44 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 sm:block">
                      <ScreenFrame shot={project.card} sizes="176px" />
                    </div>
                  ) : (
                    <span className="hidden sm:block" aria-hidden="true" />
                  )}
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.035em] transition-colors group-hover:text-accent">{project.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="text-foreground/55 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Current work</p>
            <h2 className="text-4xl font-medium tracking-[-0.045em]">Advisory &amp; Mentorship.</h2>
          </div>
          <div className="border-t border-white/[0.1] lg:col-span-8">
            {advisory.map((item) => (
              <article key={item.title} className="grid gap-4 border-b border-white/[0.1] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
