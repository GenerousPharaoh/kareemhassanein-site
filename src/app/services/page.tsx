'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';
import ParallaxImage from '@/components/ParallaxImage';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    index: '01',
    title: 'Workflow Automation',
    tagline: 'Stop doing manually what a computer should handle.',
    desc: <>If you do something the same way every time, it can probably be automated. I build <span className="text-foreground/90">LLM-powered systems</span> for document generation, intake processing, and client communications.</>,
    points: ['LLM document generation', 'Intake automation', 'API integrations', 'Template libraries'],
    image: '/images/chaos-to-order.png',
  },
  {
    index: '02',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: <>I handle the <span className="text-foreground/90">full lifecycle</span> from evaluation through sustained use. Mapping existing workflows, configuring the system to match them, training teams, and <span className="text-foreground/90">staying through post-go-live</span> until things are actually working.</>,
    points: ['System configuration', 'Training enablement', 'Change management', 'Post-go-live support'],
    image: '/images/time-gears.png',
  },
  {
    index: '03',
    title: 'Operations Improvement',
    tagline: 'Figure out where things are slowing down.',
    desc: <>Before building anything new, I map <span className="text-foreground/90">how your practice actually runs</span>. Where do referrals get lost? Which steps take longer than they should? What workarounds have people created?</>,
    points: ['Workflow mapping', 'Process optimization', 'SOPs and playbooks', 'Capacity planning'],
    image: '/images/flow.png',
  }
];

const technicalIndex = [
  {
    domain: 'Automation & AI',
    tools: ['Codex', 'Cursor', 'Claude Code', 'Webhooks'],
    specs: ['LLM document generation', 'Workflow automation', 'System integrations', 'Data processing']
  },
  {
    domain: 'Healthcare Operations',
    tools: ['Jane App', 'JotForm', 'Practice Management Workflows'],
    specs: ['Multi-provider scheduling', 'Intake optimization', 'Referral tracking', 'Review capture']
  },
  {
    domain: 'Development & Analytics',
    tools: ['Next.js', 'React', 'Vercel', 'GitHub', 'Google Analytics'],
    specs: ['Web applications', 'CI/CD pipelines', 'SEO optimization', 'Performance tracking']
  }
];

function ServiceTag({ tag, index }: { tag: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10px 0px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/[0.08] text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors duration-500"
    >
      <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
      {tag}
    </motion.span>
  );
}

function ServiceSection({ service, index }: { service: { index: string; title: string; tagline: string; desc: React.ReactNode; points: string[]; image: string }, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const springConfig = { stiffness: 80, damping: 35 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 1], [0.05, 0.5, 1]), springConfig);
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), springConfig);
  const imgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, 1]), springConfig);

  const isReversed = index % 2 !== 0;

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden"
    >
      {/* Background image - alternates sides */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className={`absolute inset-y-0 w-2/3 pointer-events-none will-change-transform ${isReversed ? 'left-0' : 'right-0'}`}
      >
        <ParallaxImage
          src={service.image}
          alt=""
          className="w-full h-full opacity-40"
          fadedSides={true}
          fadedVertical={true}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-[1200px] mx-auto relative z-10 will-change-transform grid md:grid-cols-2 gap-12 items-center"
      >
        <div className={isReversed ? 'md:col-start-2' : ''}>
          <div className="flex items-baseline gap-6 mb-8">
            <span className="text-accent font-mono text-sm">0{index + 1}</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              {service.title}
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-foreground/70 font-light font-serif italic mb-6">
            {service.tagline}
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {service.points.map((point, i) => (
              <ServiceTag key={point} tag={point} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ToolDomain({ domain, featured = false }: { domain: typeof technicalIndex[0]; index?: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-lg border border-white/[0.06] hover:border-accent/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-500 overflow-hidden ${
        featured
          ? 'p-8 md:p-10 bg-gradient-to-br from-[hsl(222,12%,13%)] to-[hsl(222,12%,11%)]'
          : 'p-6 bg-[hsl(222,12%,12%)]'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/25 via-accent/10 to-transparent" />
      <h3 className={`text-accent font-medium tracking-[0.15em] uppercase ${featured ? 'text-sm mb-4' : 'text-xs mb-3'}`}>
        {domain.domain}
      </h3>
      <p className={`font-medium text-foreground/90 leading-relaxed ${featured ? 'text-xl md:text-2xl mb-4' : 'text-lg md:text-xl mb-3'}`}>
        {domain.tools.join(' · ')}
      </p>
      <p className={`text-muted-foreground/70 ${featured ? 'text-sm md:text-base max-w-xl' : 'text-xs md:text-sm'}`}>
        {domain.specs.join(' · ')}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const toolsRef = useRef(null);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const heroY = useSpring(useTransform(heroProgress, [0, 1], [0, 60]), springConfig);

  // Tools section
  const { scrollYProgress: toolsProgress } = useScroll({
    target: toolsRef,
    offset: ["start end", "start 0.4"]
  });
  const tightSpring = { stiffness: 80, damping: 35 };
  const toolsY = useSpring(useTransform(toolsProgress, [0, 1], [60, 0]), tightSpring);
  const toolsOpacity = useSpring(useTransform(toolsProgress, [0, 0.5, 1], [0.05, 0.5, 1]), tightSpring);

  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-32 md:pt-36 md:pb-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - contained with fade */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 will-change-transform">
          <ParallaxImage
            src="/images/mapping.png"
            alt=""
            className="w-full h-full opacity-40"
            fadedVertical={true}
          />
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-[1200px] mx-auto relative z-10 will-change-transform">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Services</span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              What I <CharReveal delay={0.4} className="text-accent italic font-serif">do.</CharReveal>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms.
            </p>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* Services List */}
      <div>
        {services.map((service, idx) => (
          <div key={service.index}>
            {idx > 0 && (
              <div className="max-w-[1200px] mx-auto px-6 lg:px-12 xl:px-20">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(176,141,87,0.2)] to-transparent" style={{ boxShadow: '0 0 12px rgba(176,141,87,0.06)' }} />
              </div>
            )}
            <ServiceSection
              service={service}
              index={idx}
            />
          </div>
        ))}
      </div>

      {/* Divider before tools */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 xl:px-20">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(176,141,87,0.15)] to-transparent" />
      </div>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            style={{ y: toolsY, opacity: toolsOpacity }}
            className="mb-12 md:mb-16"
          >
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-4">Tools</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-4">
              What I <span className="text-accent/90 italic font-serif">use.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg">
              The specific tools matter less than understanding how they fit together.
            </p>
          </motion.div>

          {/* Tool cards - asymmetric grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <ToolDomain domain={technicalIndex[0]} index={0} featured />
            </div>
            <ToolDomain domain={technicalIndex[1]} index={1} />
            <ToolDomain domain={technicalIndex[2]} index={2} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-20 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent" style={{ boxShadow: '0 0 16px rgba(176,141,87,0.12)' }} />
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-balance">
              Let&apos;s map it out.
            </h2>
            <p className="text-lg text-muted-foreground/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
              If you have a workflow problem, a tool rollout, or just need someone to figure out why things aren&apos;t working, let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-sm md:text-base font-medium px-8 py-4 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
            >
              Get in touch
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
