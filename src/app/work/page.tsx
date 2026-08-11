import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedDivider from '@/components/AnimatedDivider';
import WorkCard from '@/components/WorkCard';
import { projects, advisory } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work | Kareem Hassanein',
  description:
    'Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience.',
  openGraph: {
    title: 'Work | Kareem Hassanein',
    description:
      'Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience.',
    url: 'https://khassanein.bio/work',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Work | Kareem Hassanein',
    description:
      'Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience.',
  },
  alternates: {
    canonical: 'https://khassanein.bio/work',
  },
};

export default function WorkPage() {
  const large = projects.filter((p) => p.size === 'large');
  const small = projects.filter((p) => p.size === 'small');

  return (
    <main className="bg-background text-foreground pt-20">
      {/* Header */}
      <section className="px-6 md:px-12 xl:px-20 pt-24 md:pt-28 pb-14 md:pb-18">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Work
            </span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-7">
              Selected <span className="text-accent italic font-serif">work.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Projects across healthcare, operations, and digital experience: what each one was, what I shaped, and the
              decisions behind the finished work.
            </p>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* Principal projects */}
      <section className="px-6 md:px-12 xl:px-20 pb-8 md:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid gap-20 md:gap-28">
            {large.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} variant="row" flip={i % 2 === 1} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-14 md:gap-12 mt-20 md:mt-28">
            {small.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} className={i === 1 ? 'md:mt-20' : ''} />
            ))}
          </div>
        </div>
      </section>

      {/* Supporting advisory work */}
      <section className="px-6 md:px-12 xl:px-20 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-4">
              Also
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-10 md:mb-12">
              Selected implementation &amp; advisory <span className="text-accent/90 italic font-serif">work.</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {advisory.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.06}>
                <div className="h-full p-7 md:p-8 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)] hover:border-accent/20 transition-colors duration-500">
                  <h3 className="text-lg md:text-xl font-medium tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
