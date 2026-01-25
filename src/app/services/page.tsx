'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';
import AmbientParticles from '@/components/AmbientParticles';
import SplitTextReveal from '@/components/SplitTextReveal';
import { useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 lg:py-28 px-6 lg:px-12 border-b border-white/5 last:border-b-0 relative overflow-hidden"
    >
      {/* Animated vertical accent line */}
      <motion.div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Subtle gradient accent - enhanced */}
      <motion.div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(38 30% 75% / 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent"
        style={{ top: '50%' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          className="group"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          whileHover={{ x: 4 }}
        >
          <div className="flex items-baseline gap-3 md:gap-6 mb-4 md:mb-8">
            <motion.span
              className="text-accent font-mono text-xs md:text-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              0{index + 1}
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
              {service.title}
            </h2>
          </div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-light mb-4 md:mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {service.tagline}
          </motion.p>

          <motion.p
            className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {service.desc}
          </motion.p>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {service.points.map((point, i) => (
              <motion.span
                key={point}
                className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 text-muted-foreground hover:border-accent/30 hover:text-accent/80 transition-all duration-500 hover:bg-white/[0.02]"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {point}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Services() {
  const heroRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  const toolsInView = useInView(toolsRef, { once: true, margin: "-15%" });

  const { scrollYProgress: curtainProgress } = useScroll({
    target: curtainRef,
    offset: ["start end", "end start"]
  });

  const curtainY = useTransform(curtainProgress, [0, 0.5, 1], ['100%', '0%', '-100%']);
  const curtainOpacity = useTransform(curtainProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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
      <section ref={heroRef} className="pt-20 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-12 relative z-10">
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

      {/* Curtain Transition to Tools */}
      <div ref={curtainRef} className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        {/* Animated curtain */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ y: curtainY, opacity: curtainOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-accent/15 via-accent/8 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </motion.div>

        {/* Scan lines */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          style={{ opacity: curtainOpacity }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              style={{ top: `${30 + i * 20}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-12 md:py-20 lg:py-28 px-6 lg:px-12 border-t border-white/5 relative z-10">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
              style={{ left: `${15 + i * 18}%` }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={toolsInView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6">Tools</span>
            <SplitTextReveal
              text="What I use."
              className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16"
              type="words"
              staggerDelay={0.1}
            />
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            {technicalIndex.map((row, i) => (
              <motion.div
                key={row.domain}
                className="pb-8 md:pb-12 border-b border-white/5 last:border-b-0 last:pb-0 group relative"
                initial={{ opacity: 0, x: -20 }}
                animate={toolsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ x: 4 }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute -left-10 top-1/2 -translate-y-1/2 w-[200px] h-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, hsl(38 30% 75% / 0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />

                <motion.h3
                  className="text-xs md:text-sm font-medium text-accent mb-4 md:mb-6"
                  initial={{ opacity: 0 }}
                  animate={toolsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                >
                  {row.domain}
                </motion.h3>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                  {row.tools.map((tool, j) => (
                    <motion.span
                      key={tool}
                      className="text-base md:text-lg lg:text-xl font-light text-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.15 + j * 0.05 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {row.specs.map((spec, k) => (
                    <motion.span
                      key={spec}
                      className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-accent/80 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={toolsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.15 + k * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {spec}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
