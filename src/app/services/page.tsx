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
    desc: 'If you do something the same way every time, it can probably be automated. I build LLM-powered systems for document generation, intake processing, and client communications.',
    points: ['LLM document generation', 'Intake automation', 'API integrations', 'Template libraries'],
    image: '/images/chaos-to-order.png',
  },
  {
    index: '02',
    title: 'Software Implementation',
    tagline: 'Get your team actually using the tools you paid for.',
    desc: 'I handle the full lifecycle from evaluation through sustained use. Mapping existing workflows, configuring the system to match them, training teams, and staying through post-go-live until things are actually working.',
    points: ['System configuration', 'Training enablement', 'Change management', 'Post-go-live support'],
    image: '/images/time-gears.png',
  },
  {
    index: '03',
    title: 'Operations Improvement',
    tagline: 'Figure out where things are slowing down.',
    desc: 'Before building anything new, I map how your practice actually runs. Where do referrals get lost? Which steps take longer than they should? What workarounds have people created?',
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
    tools: ['Next.js', 'TypeScript', 'GitHub', 'Vercel', 'Google Analytics'],
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
  const imgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), springConfig);

  return (
    <section
      ref={ref}
      className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden"
    >
      {/* Background image - clipped to section with fade */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-y-0 w-full md:w-2/3 right-0 pointer-events-none will-change-transform"
      >
        <ParallaxImage
          src={service.image}
          alt={service.title}
          className="w-full h-full opacity-40"
          fadedSides={true}
          fadedVertical={true}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-[1200px] mx-auto relative z-10 will-change-transform grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <div className="flex items-baseline gap-6 mb-8">
            <span className="text-accent font-mono text-sm">0{index + 1}</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              {service.title}
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-foreground/80 font-light mb-6">
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

function ToolDomain({ domain, index }: { domain: typeof technicalIndex[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-accent text-sm font-medium tracking-wide mb-4">
        {domain.domain}
      </h3>
      <p className="text-2xl md:text-3xl font-light text-foreground/90 leading-relaxed mb-4">
        {domain.tools.join(' · ')}
      </p>
      <p className="text-sm text-muted-foreground">
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
  const toolsY = useSpring(useTransform(toolsProgress, [0, 1], [100, 0]), springConfig);
  const toolsOpacity = useSpring(useTransform(toolsProgress, [0, 0.5, 1], [0, 0.5, 1]), springConfig);

  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-32 md:pt-36 md:pb-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - contained with fade */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 will-change-transform">
          <ParallaxImage
            src="/images/mapping.png"
            alt="Mapping"
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
          <ServiceSection
            key={service.index}
            service={service}
            index={idx}
          />
        ))}
      </div>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Subtle centered background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
          <ParallaxImage
            src="/images/kh_section_divider_signal-to-system_02.png"
            alt="Signal to System"
            className="w-full h-full"
            fadedSides={true}
            fadedVertical={true}
          />
        </div>

        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.div
            style={{ y: toolsY, opacity: toolsOpacity }}
            className="mb-16 text-center will-change-transform"
          >
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Tools</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              What I use.
            </h2>
          </motion.div>

          <div className="space-y-16">
            {technicalIndex.map((row, idx) => (
              <ToolDomain key={row.domain} domain={row} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
