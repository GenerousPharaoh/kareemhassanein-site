'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import useIsMobile from '@/hooks/useIsMobile';

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
    result: 'Reusable workflows that remove repeat work without forcing a team into a new operating style.',
    image: '/images/kh-services-workflow-desk.webp',
  },
  {
    index: '02',
    title: 'Software Implementation',
    tagline: 'Get your team using the tools you paid for.',
    desc: <>From evaluation to live use: I map the existing workflow, configure the system to match it, train the team, and <span className="text-foreground/90">stay through the first weeks</span> until people stop thinking about it.</>,
    points: ['System configuration', 'Team training', 'Change management', 'Launch support'],
    result: 'A practical rollout path from evaluation to normal use.',
    image: '/images/kh-about-rollout-planning.webp',
  },
  {
    index: '03',
    title: 'Operations Improvement',
    tagline: 'Figure out where things are slowing down.',
    desc: <>Before building anything new, I map <span className="text-foreground/90">how your practice runs day to day</span>. Where do referrals get lost? Which steps take longer than they should? What workarounds have people built?</>,
    points: ['Workflow mapping', 'Process optimization', 'SOPs and playbooks', 'Capacity planning'],
    result: 'A clearer view of what is slowing intake, referrals, booking, documentation, or follow-up.',
    image: '/images/kh-about-clinic-workflow.webp',
  },
  {
    index: '04',
    title: 'Health-Tech Advisory',
    tagline: 'A tool only counts if clinicians and patients keep using it.',
    desc: <>For founders building <span className="text-foreground/90">rehabilitation, patient engagement, clinical workflow, or AI tools</span>. I look at how a product fits into the routines of clinicians, patients, and teams, where the design or rollout asks too much, and what to change so it stops being another tab nobody opens.</>,
    points: ['Clinical fit review', 'Adoption strategy', 'Workflow integration', 'Rollout planning'],
    result: 'Clinical and operational feedback before rollout friction becomes expensive.',
    image: '/images/kh-home-implementation-workspace.webp',
  }
];

const technicalIndex = [
  {
    domain: 'Automation & AI',
    tools: ['Codex', 'Cursor', 'Webhooks'],
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

function ServiceSection({ service, index }: { service: { index: string; title: string; tagline: string; desc: React.ReactNode; points: string[]; result: string; image: string }, index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025] transition-all duration-500 hover:border-accent/25 hover:bg-white/[0.04]"
    >
      <div className="relative h-52 overflow-hidden border-b border-white/[0.06]">
        <ParallaxImage
          src={service.image}
          alt=""
          className="h-full w-full opacity-[0.54] transition-opacity duration-500 group-hover:opacity-70"
          fadedVertical={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/34 to-transparent" />
        <div className="absolute left-6 top-6 text-xs font-mono text-accent/80">{service.index}</div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-7">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
            {service.title}
          </h2>
          <p className="text-base md:text-lg text-foreground/72 font-light font-serif italic">
            {service.tagline}
          </p>
        </div>

        <p className="text-sm md:text-base text-muted-foreground/88 leading-relaxed mb-7">
          {service.desc}
        </p>

        <div className="mb-7 rounded-md border border-accent/15 bg-accent/[0.045] p-4">
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-accent/75 mb-2">
            Practical Result
          </p>
          <p className="text-sm text-foreground/78 leading-relaxed">
            {service.result}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {service.points.map((point, i) => (
            <ServiceTag key={point} tag={point} index={i} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ServiceSpotlight() {
  return (
    <section className="px-6 lg:px-12 xl:px-20 pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto overflow-hidden rounded-lg border border-white/[0.07] bg-[hsl(216,16%,10%)]"
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[320px]">
            <ParallaxImage
              src="/images/kh-about-clinic-workflow.webp"
              alt=""
              className="absolute inset-0 h-full w-full opacity-[0.68]"
              fadedVertical={true}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/34 to-background/88" />
          </div>
          <div className="p-8 md:p-12 lg:p-14">
            <p className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-5">
              How engagements usually start
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              A short diagnostic before anyone starts building.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed mb-8">
              I look at the actual workflow, the tools already in place, the people who will use them, and the point where adoption is most likely to fail. From there we decide whether the right next move is automation, implementation support, service redesign, or product feedback.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-sm md:text-base font-medium px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
            >
              Start a conversation
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
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
      <p className={`text-muted-foreground/85 ${featured ? 'text-sm md:text-base max-w-xl' : 'text-xs md:text-sm'}`}>
        {domain.specs.join(' · ')}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const toolsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableScrollMotion = shouldReduceMotion || isMobile;

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const heroY = useSpring(useTransform(heroProgress, [0, 1], [0, disableScrollMotion ? 0 : 60]), springConfig);

  // Tools section
  const { scrollYProgress: toolsProgress } = useScroll({
    target: toolsRef,
    offset: ["start end", "start 0.4"]
  });
  const tightSpring = { stiffness: 80, damping: 35 };
  const toolsY = useSpring(useTransform(toolsProgress, [0, 1], [disableScrollMotion ? 0 : 60, 0]), tightSpring);
  const toolsOpacity = useSpring(
    useTransform(toolsProgress, [0, 0.5, 1], disableScrollMotion ? [1, 1, 1] : [0.05, 0.5, 1]),
    tightSpring
  );

  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-32 md:pt-36 md:pb-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - contained with fade */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 will-change-transform">
          <ParallaxImage
            src="/images/kh-services-workflow-desk.webp"
            alt=""
            className="w-full h-full opacity-[0.34]"
            fadedVertical={true}
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/72 to-background pointer-events-none" />

        <motion.div style={{ y: heroY }} className="max-w-[1200px] mx-auto relative z-10 will-change-transform">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Services</span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              What I <span className="text-accent italic font-serif">do.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Clinical implementation, digital adoption, and operational systems for healthcare practices, health-tech founders, and professional-services firms.
            </p>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="px-6 lg:px-12 xl:px-20 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, idx) => (
            <ServiceSection
              key={service.index}
              service={service}
              index={idx}
            />
          ))}
        </div>
      </section>

      <ServiceSpotlight />

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
            <p className="text-sm md:text-base text-muted-foreground/85 leading-relaxed max-w-lg">
              The specific tools matter less than understanding how they fit together.
            </p>
          </motion.div>

          {/* Tool cards */}
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
            <div className="h-[1px] w-20 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent" style={{ boxShadow: '0 0 16px rgba(var(--accent-rgb),0.12)' }} />
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
