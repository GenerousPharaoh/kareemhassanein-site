'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import AnimatedGrid from '@/components/AnimatedGrid';
import { useRef } from 'react';

const services = [
  {
    index: '01',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: 'Most software fails because of poor rollout, not poor software. I handle the configuration, training, and workflow adjustments that turn shelfware into something people actually use.',
    points: ['System configuration', 'Team training', 'Workflow documentation'],
    img: '/assets/n_strategy.png'
  },
  {
    index: '02',
    title: 'Process Automation',
    tagline: 'Stop doing manually what a computer should handle.',
    desc: 'I build automations for the repetitive work that eats up your day. Document generation, appointment reminders, intake processing, referral tracking. If you do it the same way every time, it can probably be automated.',
    points: ['Document automation', 'Scheduling workflows', 'Data entry reduction'],
    img: '/assets/n_logic.png'
  },
  {
    index: '03',
    title: 'Operations Consulting',
    tagline: 'Figure out where time and money are leaking.',
    desc: 'Sometimes you need someone to look at how your practice actually runs and find the bottlenecks. I map out your workflows, identify what is slowing you down, and recommend fixes.',
    points: ['Workflow mapping', 'Bottleneck analysis', 'Process documentation'],
    img: '/assets/n_synergy.png'
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

function ServiceSection({ service, isEven }: { service: typeof services[0], isEven: boolean }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center justify-center relative py-24 overflow-hidden px-6 lg:px-20">
      {/* Background Number */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-[25vw] font-bold text-white/[0.02] select-none pointer-events-none ${isEven ? 'right-10' : 'left-10'}`}>
        {service.index}
      </div>

      <div className={`w-full max-w-[1600px] grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-40 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>

        {/* Content Side */}
        <div className={`space-y-12 ${isEven ? 'lg:col-start-2' : ''}`}>
          <ScrollReveal direction="up">
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block mb-4">0{service.index}</span>
            <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none italic font-serif opacity-90">
              {service.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground/80 leading-[1.1] max-w-2xl">
              {service.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
              {service.desc}
            </p>
          </ScrollReveal>

          <div className="pt-10 space-y-6">
            {service.points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-6 text-lg tracking-tight group"
              >
                <div className="w-8 h-[1px] bg-accent/30 group-hover:w-12 transition-all duration-700" />
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <div className="relative aspect-[4/5] w-full max-w-[600px] mx-auto shadow-2xl">
          <ParallaxImage
            src={service.img}
            alt={service.title}
            className="w-full h-full rounded-3xl border border-white/5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 pointer-events-none rounded-3xl" />
        </div>

      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">
      <AnimatedGrid />

      {/* Cinematic Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/flow.png"
            alt="Flow Dynamic"
            className="w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative z-10">
          <ScrollReveal direction="up">
            <span className="block text-[10px] font-bold tracking-[0.8em] uppercase mb-12 opacity-30">Services</span>
          </ScrollReveal>

          <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.8] mb-12">
            What I <CharReveal delay={0.4} className="text-accent italic font-serif">do.</CharReveal>
          </h1>

          <div className="max-w-3xl border-t border-white/5 pt-12 mx-auto">
            <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-snug">
              I help healthcare practices and professional service firms get more out of their software and spend less time on admin work.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Flow */}
      <div className="space-y-40">
        {services.map((service, idx) => (
          <ServiceSection
            key={service.index}
            service={service}
            isEven={idx % 2 !== 0}
          />
        ))}
      </div>

      {/* Technical Index: Tabular Spec Sheet */}
      <section className="py-32 px-6 lg:px-32 relative overflow-hidden bg-white/[0.005] border-t border-white/5">

        {/* Background Texture Asset */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none grayscale">
          <ParallaxImage src="/assets/devops.png" alt="DevOps Texture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-32">
            <span className="text-accent font-mono text-sm tracking-[0.6em] uppercase block mb-8">Tools</span>
            <h2 className="text-7xl md:text-8xl font-medium tracking-tighter">
              What I use.
            </h2>
          </div>

          <div className="w-full border-t border-white/10">
            {technicalIndex.map((row) => (
              <div key={row.domain} className="grid md:grid-cols-[1fr_2fr_1fr] border-b border-white/5 py-16 group hover:bg-white/[0.01] transition-all duration-700 items-start gap-12">

                {/* Domain Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-[1px] h-12 bg-accent opacity-20 group-hover:h-16 transition-all duration-700" />
                    <h3 className="font-mono text-xs tracking-[0.4em] uppercase opacity-40 group-hover:opacity-80 transition-opacity">
                      {row.domain}
                    </h3>
                  </div>
                </div>

                {/* Core Tools */}
                <div className="flex flex-wrap gap-x-12 gap-y-8">
                  {row.tools.map(tool => (
                    <span key={tool} className="text-3xl md:text-5xl font-light tracking-tight text-foreground/70 group-hover:text-foreground transition-all duration-500 whitespace-nowrap italic font-serif">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Technical Specs */}
                <div className="hidden md:block space-y-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-10 mb-6">Capabilities</p>
                  <div className="grid grid-cols-1 gap-2">
                    {row.specs.map(spec => (
                      <div key={spec} className="flex items-center gap-4 group/spec">
                        <div className="w-1 h-1 rounded-full bg-white/5 group-hover/spec:bg-accent/40" />
                        <span className="text-[11px] font-mono tracking-widest opacity-20 group-hover/spec:opacity-60 transition-opacity">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>



    </main>
  );
}
