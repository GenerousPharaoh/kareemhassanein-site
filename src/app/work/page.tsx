import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WorkCard from '@/components/WorkCard';
import { additionalProjects, advisory, principalProjects } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work | Kareem Hassanein',
  description: 'Selected projects in clinical implementation, workflow automation, service design, and digital delivery.',
  openGraph: {
    title: 'Work | Kareem Hassanein',
    description: 'Selected projects in clinical implementation, workflow automation, service design, and digital delivery.',
    url: 'https://www.khassanein.bio/work',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Kareem Hassanein',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Selected implementation and operations work by Kareem Hassanein' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Kareem Hassanein',
    description: 'Selected projects in clinical implementation, workflow automation, service design, and digital delivery.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.khassanein.bio/work' },
};

export default function WorkPage() {
  return (
    <main className="bg-background pb-8 pt-32 text-foreground md:pt-40">
      <section className="px-6 pb-20 sm:px-8 md:pb-28 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <ScrollReveal direction="up">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Work</p>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <h1 className="max-w-5xl text-[clamp(3rem,8.5vw,8.2rem)] font-medium leading-[0.89] tracking-[-0.065em] lg:col-span-8">
                Work that holds up in use.
              </h1>
              <p className="max-w-lg border-l border-white/[0.12] pl-6 text-lg leading-relaxed text-foreground/72 lg:col-span-4">
                Implementation, operations, and digital work examined through the problem, the pivotal decision, and
                the result.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-16 flex items-baseline justify-between border-b border-white/[0.09] pb-5 md:mb-24">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/74">Selected projects</h2>
            <span className="font-mono text-xs text-muted-foreground">
              01–{String(principalProjects.length).padStart(2, '0')}
            </span>
          </div>
          <div className="grid gap-24 md:gap-32">
            {principalProjects.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} variant="row" flip={index % 2 === 1} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.09] px-6 py-24 sm:px-8 md:py-28 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Additional work</p>
              <h2 className="text-4xl font-medium tracking-[-0.045em]">Focused digital delivery.</h2>
            </div>
            <div className="lg:col-span-8">
              {additionalProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group grid min-h-28 items-center gap-5 border-y border-white/[0.1] py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[1fr_auto]"
                >
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

      <section className="border-t border-white/[0.09] px-6 py-24 sm:px-8 md:py-28 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Advisory</p>
            <h2 className="text-4xl font-medium tracking-[-0.045em]">Implementation context beyond the build.</h2>
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
