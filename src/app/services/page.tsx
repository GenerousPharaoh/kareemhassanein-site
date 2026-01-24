'use client';

import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';

const services = [
  {
    index: '01',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: 'Most software fails because of poor rollout, not poor software. I handle the configuration, training, and workflow adjustments that turn shelfware into something people actually use.',
    points: ['System configuration', 'Team training', 'Workflow documentation'],
  },
  {
    index: '02',
    title: 'Process Automation',
    tagline: 'Stop doing manually what a computer should handle.',
    desc: 'I build automations for the repetitive work that eats up your day. Document generation, appointment reminders, intake processing, referral tracking. If you do it the same way every time, it can probably be automated.',
    points: ['Document automation', 'Scheduling workflows', 'Data entry reduction'],
  },
  {
    index: '03',
    title: 'Operations Consulting',
    tagline: 'Figure out where time and money are leaking.',
    desc: 'Sometimes you need someone to look at how your practice actually runs and find the bottlenecks. I map out your workflows, identify what is slowing you down, and recommend fixes.',
    points: ['Workflow mapping', 'Bottleneck analysis', 'Process documentation'],
  }
];

const technicalIndex = [
  {
    domain: 'AI & Automation',
    tools: ['Claude', 'Heidi AI', 'Zapier', 'Custom Scripts'],
    specs: ['Document generation', 'Clinical notes', 'Workflow triggers', 'Data processing']
  },
  {
    domain: 'Healthcare',
    tools: ['Jane App', 'Cliniko', 'Practice Management', 'EHR Systems'],
    specs: ['Booking setup', 'Intake forms', 'Billing config', 'Referral tracking']
  },
  {
    domain: 'Web & SEO',
    tools: ['Next.js', 'Vercel', 'Google Search Console', 'Analytics'],
    specs: ['Site builds', 'Performance', 'Local SEO', 'Conversion tracking']
  }
];

function ServiceSection({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 border-b border-white/5 last:border-b-0">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal direction="up">
          <div className="flex items-baseline gap-6 mb-8">
            <span className="text-accent font-mono text-sm">0{index + 1}</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              {service.title}
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-foreground/80 font-light mb-6 max-w-2xl">
            {service.tagline}
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {service.points.map((point) => (
              <span
                key={point}
                className="text-sm px-4 py-2 rounded-full border border-white/10 text-muted-foreground"
              >
                {point}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">

      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Services</span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              What I <CharReveal delay={0.4} className="text-accent italic font-serif">do.</CharReveal>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              I help healthcare practices and professional service firms get more out of their software and spend less time on admin work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List */}
      <div>
        {services.map((service, idx) => (
          <ServiceSection
            key={service.index}
            service={service}
            index={idx}
          />
        ))}
      </div>

      {/* Tools Section */}
      <section className="py-20 md:py-28 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Tools</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16">
              What I use.
            </h2>
          </ScrollReveal>

          <div className="space-y-12">
            {technicalIndex.map((row) => (
              <div key={row.domain} className="pb-12 border-b border-white/5 last:border-b-0 last:pb-0">
                <h3 className="text-sm font-medium text-accent mb-6">
                  {row.domain}
                </h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {row.tools.map(tool => (
                    <span key={tool} className="text-lg md:text-xl font-light text-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.specs.map(spec => (
                    <span key={spec} className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
