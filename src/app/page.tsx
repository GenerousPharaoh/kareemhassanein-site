'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectList from '@/components/ProjectList';
import AnimatedDivider from '@/components/AnimatedDivider';
import HeroCarousel from '@/components/HeroCarousel';
import Link from 'next/link';

const approach = [
  { title: 'Map the real workflow', desc: 'Watch how the work actually moves before changing the system.', em: 'actually moves' },
  { title: 'Shape the operating layer', desc: 'Configure, automate, or rebuild only around the behavior people can sustain.', em: 'people can sustain' },
  { title: 'Hold through adoption', desc: 'Stay close after launch so the new way becomes routine instead of another abandoned tool.', em: 'becomes routine' },
];

const proofPoints = [
  {
    value: '100%',
    label: 'Heidi AI adoption across the clinic within 8 weeks.',
  },
  {
    value: '85%',
    label: 'Reduction in document generation time for Tax Relief Counsel.',
  },
  {
    value: '60+',
    label: 'Page healthcare platform launched for KinetiKare Physio.',
  },
];

const heroSlides = [
  { src: '/images/kh-home-implementation-workspace.webp', alt: 'Clinical operations workspace with laptop, tablet, intake forms, and physiotherapy equipment' },
  { src: '/images/kh-about-clinic-workflow.webp', alt: 'Clinical workspace with laptop, tablet, notebook, and rehabilitation tools' },
  { src: '/images/kh-services-workflow-desk.webp', alt: 'Workflow planning desk with tablets, laptop, process maps, and notes' },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {

  return (
    <main className="min-h-svh bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-svh flex items-center pt-24 pb-16 md:pt-28 md:pb-24 px-5 sm:px-6 md:px-12 xl:px-20 bg-background overflow-hidden">

        {/* Soft atmospheric ambient */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(var(--accent-rgb),0.08),transparent_34%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-12 gap-x-10 lg:gap-x-16 items-center">

            {/* LEFT: editorial main content */}
            <div className="lg:col-span-7 text-left order-2 lg:order-1 space-y-6 md:space-y-7">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <span className="inline-flex items-center gap-2 text-[9.5px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-foreground/65 px-3.5 py-2 rounded-full border border-white/[0.07] bg-[hsl(222,12%,13%)]/80 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.45)]" />
                  Healthcare · Health-Tech · Service Innovation
                </span>
              </motion.div>

              {/* Name as display headline */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-medium leading-[0.86]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Kareem
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-accent/90 italic font-serif"
                >
                  Hassanein.
                </motion.span>
              </h1>

              {/* Accent divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
                className="h-[1px] w-16 bg-accent/40 origin-left"
              />

              {/* Lead positioning statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[34rem] text-[1.15rem] sm:text-xl md:text-2xl lg:text-[1.65rem] text-foreground/90 font-light leading-[1.3] tracking-tight"
              >
                I&rsquo;m a practicing physiotherapist with experience across patient care, clinic operations, digital health, and automation.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[34rem] text-[15px] sm:text-base md:text-lg text-foreground/70 font-light leading-relaxed"
              >
                My work is focused on the parts of healthcare and service delivery where clinical judgment, patient engagement, technology, and operations meet. I help health-tech founders understand how their products affect the people using them, from patients and clinicians to admin staff and operators. I also help clinics and service businesses improve the digital systems around their work, including websites, intake and booking flows, referral pathways, documentation, automation, and tools for tracking engagement and outcomes.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[34rem] text-[15px] sm:text-base md:text-lg text-foreground/70 font-light leading-relaxed"
              >
                The perspective comes from working directly with patients, running services, introducing new tools into care settings, and building the infrastructure behind them. I can assess a product or service through its clinical value, its operational demands, and the experience it creates for the people expected to use it.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1"
              >
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2.5 text-sm md:text-base font-medium w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
                >
                  Get in touch
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/about"
                  className="text-sm md:text-base font-medium text-foreground/80 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.14] hover:text-foreground hover:border-accent/35 hover:bg-white/[0.03] transition-all duration-300"
                >
                  Learn more
                </Link>
              </motion.div>

              {/* Status strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-5 text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-muted-foreground/85"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.45)]" />
                  Available for projects
                </span>
                <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-white/15" />
                <span>Burlington, ON</span>
                <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-white/15" />
                <span>Remote</span>
              </motion.div>
            </div>

            {/* RIGHT: hero image carousel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 order-1 lg:order-2 w-full"
            >
              <div className="relative w-full max-w-[640px] mx-auto space-y-4">
                <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[5/4]">
                  <HeroCarousel slides={heroSlides} priority />
                </div>
                <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.035] backdrop-blur-sm">
                  {proofPoints.map((point) => (
                    <div key={point.value} className="p-4 border-r border-white/[0.06] last:border-r-0">
                      <p className="text-xl md:text-2xl font-medium text-accent leading-none mb-2">{point.value}</p>
                      <p className="text-[11px] md:text-[12px] text-muted-foreground/85 leading-relaxed">{point.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient for seamless transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
      </section>

      {/* Approach Section - Combined statement + steps */}
      <section className="py-20 md:py-28 px-6 md:px-12 xl:px-20 relative">
        {/* Atmospheric background */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-0" />
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Two-column layout: Statement left, Steps right */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-start">

            {/* Left: Statement */}
            <motion.div
              variants={reveal}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-6 block">
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-6 text-balance">
                Good plans fail without good <span className="text-accent/90 italic font-serif">execution.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                Implementation is where most efforts stall. Not from lack of strategy, but from <span className="text-foreground/90">friction in the systems, workflows, and habits</span> that need to change.
              </p>
            </motion.div>

            {/* Right: Steps */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-8"
              >
                The Approach
              </motion.p>

              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[27px] md:left-[31px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/25 via-white/[0.08] to-transparent pointer-events-none" />

                <div className="space-y-3 md:space-y-4">
                  {approach.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative flex gap-5 md:gap-6 items-start p-4 md:p-5 -mx-4 md:-mx-5 rounded-2xl hover:bg-white/[0.025] border border-transparent hover:border-white/[0.05] transition-all duration-500"
                    >
                      {/* Number badge */}
                      <div className="flex-shrink-0 w-[54px] h-[54px] md:w-[62px] md:h-[62px] rounded-full border border-accent/25 flex items-center justify-center bg-[hsl(216,16%,10%)] relative z-10 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(var(--accent-rgb),0.12)] transition-all duration-500">
                        <span className="text-xl md:text-2xl font-serif italic text-accent/85 group-hover:text-accent transition-colors duration-500">
                          {i + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2 md:pt-2.5 min-w-0">
                        <h4 className="text-xl md:text-2xl font-medium tracking-tight mb-2 group-hover:text-accent transition-colors duration-500">
                          {item.title}
                        </h4>
                        <p className="text-[15px] md:text-base text-muted-foreground/85 leading-relaxed">
                          {item.em ? (
                            <>
                              {item.desc.split(item.em)[0]}
                              <span className="text-foreground/90">{item.em}</span>
                              {item.desc.split(item.em)[1]}
                            </>
                          ) : item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 xl:px-20 py-4">
        <AnimatedDivider direction="left" accent maxWidth="300px" />
      </div>

      {/* Selected Projects */}
      <section className="py-24 md:py-36 relative z-10 w-full px-6 md:px-12 xl:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[hsl(222,14%,10%)]/35" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            variants={reveal}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-accent/70 mb-4">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.05]">
              Recent <span className="text-accent/90 italic font-serif">work.</span>
            </h2>
            <p className="mt-5 text-[11px] md:text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground/70">
              2024 to 2026
            </p>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mt-6" />
          </motion.div>

          <ProjectList />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative px-6 md:px-12 xl:px-20 py-24 md:py-32 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <motion.div
          variants={reveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-accent/70 mb-6">
            Let&rsquo;s build something that sticks
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-balance">
            Have a project that needs to <span className="text-accent/90 italic font-serif">land</span>?
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground/85 leading-relaxed">
            Clinical workflow rollouts, software adoption, service redesign. If it has to hold up after the launch deck closes, let&rsquo;s talk.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2.5 text-sm md:text-base font-medium w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
            >
              Get in touch
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/services"
              className="text-sm md:text-base font-medium text-foreground/80 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.14] hover:text-foreground hover:border-accent/35 hover:bg-white/[0.03] transition-all duration-300"
            >
              See what I do
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
