'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';
import AmbientParticles from '@/components/AmbientParticles';

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

const ease = [0.16, 1, 0.3, 1] as const;

function ServiceSection({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <section className="py-12 md:py-20 lg:py-28 px-6 lg:px-12 border-b border-white/5 last:border-b-0 relative overflow-hidden">
      {/* Subtle gradient accent */}
      <motion.div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle, hsl(38 30% 75% / 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <ScrollReveal direction="up" delay={index * 0.1}>
          <motion.div
            className="group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-baseline gap-3 md:gap-6 mb-4 md:mb-8">
              <span className="text-accent font-mono text-xs md:text-sm">0{index + 1}</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
                {service.title}
              </h2>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-light mb-4 md:mb-6 max-w-2xl">
              {service.tagline}
            </p>

            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-10 max-w-2xl">
              {service.desc}
            </p>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {service.points.map((point, i) => (
                <motion.span
                  key={point}
                  className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 text-muted-foreground hover:border-accent/30 hover:text-accent/80 transition-all duration-500"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.05 }}
                >
                  {point}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-16 md:pt-20">

      {/* Ambient Particles */}
      <AmbientParticles count={10} className="z-[1]" />

      {/* Background gradient orb */}
      <motion.div
        className="fixed top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(38 30% 75% / 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <motion.span
              className="block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              Services
            </motion.span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight mb-6 md:mb-8">
              What I <CharReveal delay={0.4} className="text-accent italic font-serif">do.</CharReveal>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List */}
      <div className="relative z-10">
        {services.map((service, idx) => (
          <ServiceSection
            key={service.index}
            service={service}
            index={idx}
          />
        ))}
      </div>

      {/* Tools Section */}
      <section className="py-12 md:py-20 lg:py-28 px-6 lg:px-12 border-t border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6">Tools</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16">
              What I use.
            </h2>
          </ScrollReveal>

          <div className="space-y-8 md:space-y-12">
            {technicalIndex.map((row, i) => (
              <ScrollReveal key={row.domain} direction="up" delay={i * 0.1}>
                <motion.div
                  className="pb-8 md:pb-12 border-b border-white/5 last:border-b-0 last:pb-0 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xs md:text-sm font-medium text-accent mb-4 md:mb-6">
                    {row.domain}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                    {row.tools.map(tool => (
                      <span key={tool} className="text-base md:text-lg lg:text-xl font-light text-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {row.specs.map(spec => (
                      <span key={spec} className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full bg-white/5 text-muted-foreground">
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
