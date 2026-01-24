'use client';

import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';

const services = [
  {
    index: '01',
    title: 'Workflow Automation',
    tagline: 'Stop doing manually what a computer should handle.',
    desc: 'I build LLM-powered automations and integrations for the repetitive work that eats up your day. Document generation, intake processing, client communications, referral tracking. If you do it the same way every time, it can be automated.',
    points: ['LLM document generation', 'Intake automation', 'API integrations', 'Template libraries'],
  },
  {
    index: '02',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: 'Most software fails at adoption, not installation. I handle everything from evaluation through go-live: configuration, workflow adjustments, training, and the change management that gets teams to actually use what you bought.',
    points: ['System configuration', 'Training enablement', 'Change management', 'Post-go-live support'],
  },
  {
    index: '03',
    title: 'Operations Improvement',
    tagline: 'Figure out where time and money are leaking.',
    desc: 'I map out how your practice actually runs, find the bottlenecks, and fix them. Intake redesign, scheduling optimization, documentation workflows, referral pathways. Process improvement backed by operational experience.',
    points: ['Workflow mapping', 'Process optimization', 'SOPs and playbooks', 'Capacity planning'],
  }
];

const technicalIndex = [
  {
    domain: 'Automation & AI',
    tools: ['Claude Code', 'Heidi AI', 'REST APIs', 'Webhooks'],
    specs: ['LLM document generation', 'Clinical documentation', 'Workflow triggers', 'System integrations']
  },
  {
    domain: 'Healthcare Operations',
    tools: ['Jane App', 'Practice Management Systems', 'EHR Platforms'],
    specs: ['Multi-provider scheduling', 'Intake optimization', 'Referral tracking', 'Review capture']
  },
  {
    domain: 'Development & Analytics',
    tools: ['Next.js', 'GitHub', 'Vercel', 'Google Analytics'],
    specs: ['Web applications', 'CI/CD pipelines', 'Local SEO', 'Conversion tracking']
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
              Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms.
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
