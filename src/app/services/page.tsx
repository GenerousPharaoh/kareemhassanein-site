'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';
import ParallaxImage from '@/components/ParallaxImage';
import { useRef, useEffect } from 'react';

const services = [
  {
    index: '01',
    title: 'Workflow Automation',
    tagline: 'Stop doing manually what a computer should handle.',
    desc: 'I build LLM-powered automations and integrations for the repetitive work that eats up your day. Document generation, intake processing, client communications, referral tracking. If you do it the same way every time, it can be automated.',
    points: ['LLM document generation', 'Intake automation', 'API integrations', 'Template libraries'],
    image: '/images/chaos-to-order.png',
  },
  {
    index: '02',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: 'Most software fails at adoption, not installation. I handle everything from evaluation through go-live: configuration, workflow adjustments, training, and the change management that gets teams to actually use what you bought.',
    points: ['System configuration', 'Training enablement', 'Change management', 'Post-go-live support'],
    image: '/images/adoption_bloom.png',
  },
  {
    index: '03',
    title: 'Operations Improvement',
    tagline: 'Figure out where time and money are leaking.',
    desc: 'I map out how your practice actually runs, find the bottlenecks, and fix them. Intake redesign, scheduling optimization, documentation workflows, referral pathways. Process improvement backed by operational experience.',
    points: ['Workflow mapping', 'Process optimization', 'SOPs and playbooks', 'Capacity planning'],
    image: '/images/order.png',
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

function ServiceTag({ tag, index }: { tag: string; index: number }) {
  const springConfig = { stiffness: 120, damping: 20 };
  const opacity = useSpring(0, springConfig);
  const y = useSpring(15, springConfig);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        opacity.set(1);
        y.set(0);
      }, 0.4 * 1000 + index * 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, index, opacity, y]);

  return (
    <motion.span
      ref={ref}
      style={{ opacity, y }}
      className="text-sm px-4 py-2 rounded-full border border-white/10 text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors duration-500"
    >
      {tag}
    </motion.span>
  );
}

function ServiceSection({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [80, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.4, 1]), springConfig);
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), springConfig);
  const imgOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.35, 0.25]), springConfig);
  const imgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), springConfig);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 border-b border-white/5 last:border-b-0 relative overflow-hidden"
    >
      {/* Background image with enhanced parallax */}
      <motion.div
        style={{ y: imgY, opacity: imgOpacity, scale: imgScale }}
        className="absolute inset-y-0 w-1/2 right-0 pointer-events-none will-change-transform"
      >
        <ParallaxImage
          src={service.image}
          alt={service.title}
          className="w-full h-full"
          fadedSides={true}
          fadedVertical={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-[1200px] mx-auto relative z-10 will-change-transform"
      >
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
          {service.points.map((point, i) => (
            <ServiceTag key={point} tag={point} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ToolDomain({ domain }: { domain: typeof technicalIndex[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="pb-12 border-b border-white/5 last:border-b-0 last:pb-0 relative will-change-transform"
    >
      <h3 className="text-sm font-medium text-accent mb-6">
        {domain.domain}
      </h3>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
        {domain.tools.map((tool, i) => (
          <span key={tool} className="text-lg md:text-xl font-light text-foreground">
            {tool}
            {i < domain.tools.length - 1 && <span className="text-white/20 ml-6">·</span>}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {domain.specs.map(spec => (
          <span key={spec} className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-300">
            {spec}
          </span>
        ))}
      </div>
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
  const toolsY = useSpring(useTransform(toolsProgress, [0, 1], [100, 0]), springConfig);
  const toolsOpacity = useSpring(useTransform(toolsProgress, [0, 0.5, 1], [0, 0.5, 1]), springConfig);

  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 will-change-transform">
          <ParallaxImage
            src="/images/systems.png"
            alt="Systems"
            className="w-full h-full opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
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
          <ServiceSection
            key={service.index}
            service={service}
            index={idx}
          />
        ))}
      </div>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 border-t border-white/5 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/glow.png"
            alt="Glow"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            style={{ y: toolsY, opacity: toolsOpacity }}
            className="mb-16 will-change-transform"
          >
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Tools</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              What I use.
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-accent to-transparent mt-6 max-w-xs" />
          </motion.div>

          <div className="space-y-16">
            {technicalIndex.map((row) => (
              <ToolDomain key={row.domain} domain={row} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
