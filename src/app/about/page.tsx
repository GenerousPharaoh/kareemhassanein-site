'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const evidence = [
  {
    value: '100%',
    detail: 'Team adoption within eight weeks for a clinic-wide AI documentation rollout.',
  },
  {
    value: '3 hours to 30 minutes',
    detail: 'Document-generation time per matter after a recurring drafting workflow was rebuilt.',
  },
  {
    value: '60+ pages',
    detail: 'Patient education and booking platform structured from clinical requirements.',
  },
];

const currentRoles = [
  {
    number: '01',
    role: 'Digital Strategy & Operations Lead',
    organization: 'Endorphins Health and Wellness Centre',
    period: '2024 to present',
    description:
      'Leading digital operations across six specialties, including booking architecture, patient routing, analytics, and local search.',
  },
  {
    number: '02',
    role: 'Workflow Automation Consultant',
    organization: 'Tax Relief Counsel',
    period: '2025 to present',
    description:
      'Mapped and rebuilt a recurring document workflow, reducing generation time from about three hours to 30 minutes per matter and documenting the process for independent use.',
  },
  {
    number: '03',
    role: 'Clinical Advisor',
    organization: 'Neuro-Mod',
    period: '2025 to present',
    description:
      'Reviewing clinical deployment, interface design, clinician onboarding, patient education, and rollout readiness for an augmented-reality pain-management device.',
  },
];

const principles = [
  {
    title: 'Start with the real workflow',
    description: 'Understand the workarounds, edge cases, and pressures that formal process maps often miss.',
  },
  {
    title: 'Create structure before tooling',
    description: 'Clarify inputs, decisions, ownership, and handoffs before deciding what technology should do.',
  },
  {
    title: 'Design for adoption',
    description: 'Make the new way of working useful, legible, and realistic enough to become routine.',
  },
  {
    title: 'Stay responsible for the finish',
    description: 'Test in use, resolve what still creates friction, and remain accountable for the result.',
  },
];

const education = [
  {
    qualification: 'MSc Physiotherapy with Distinction',
    institution: 'Robert Gordon University',
  },
  {
    qualification: 'BSc Kinesiology Honours',
    institution: 'McMaster University',
  },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-background text-foreground pt-20">
      <section className="px-6 md:px-12 xl:px-20 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="flex items-center gap-3 text-xs font-medium tracking-[0.24em] uppercase text-accent/75 mb-8"
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent/[0.45]" />
              Kareem Hassanein · About
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease }}
              className="max-w-4xl text-[clamp(3rem,7.2vw,6.8rem)] font-medium tracking-[-0.055em] leading-[0.91] text-balance"
            >
              Implementation with a{' '}
              <span className="font-serif italic font-normal text-accent/90">clinical point of view.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease }}
              className="mt-9 max-w-2xl text-lg md:text-[1.35rem] text-foreground/[0.76] font-light leading-relaxed"
            >
              I&rsquo;m an implementation and operations specialist who still practices as a physiotherapist. I
              translate real workflows into clearer processes and digital tools, guide adoption, and refine the work
              until it holds up in day-to-day use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span>Clinical implementation</span>
              <span>Workflow automation</span>
              <span>Service design</span>
              <span>Digital delivery</span>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.22, ease }}
            className="lg:col-span-5 lg:justify-self-end w-full max-w-[520px]"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] shadow-[0_35px_90px_-45px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/system-weaver-about-v5.webp"
                alt="A professional guides many signals through a glass and brass system where they resolve into clear pathways"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-background/10" />
              <figcaption className="absolute inset-x-5 bottom-5 rounded-lg border border-white/[0.08] bg-background/[0.85] px-4 py-3 backdrop-blur-md">
                <span className="block text-[10px] font-medium tracking-[0.2em] uppercase text-accent/70 mb-1.5">
                  Working principle
                </span>
                <span className="text-sm text-foreground/[0.82]">Human judgment turns technology into a system that works.</span>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      <section aria-label="Selected evidence" className="border-y border-white/[0.07] px-6 md:px-12 xl:px-20">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3">
          {evidence.map((item, index) => (
            <div
              key={item.value}
              className={`py-8 md:py-10 ${
                index > 0 ? 'border-t md:border-t-0 md:border-l border-white/[0.07] md:pl-8 lg:pl-12' : ''
              } ${index < evidence.length - 1 ? 'md:pr-8 lg:pr-12' : ''}`}
            >
              <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground mb-2">{item.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32">
        <div className="max-w-[1160px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">The perspective</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
              Close enough to the work to see what the plan misses.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.08} className="lg:col-span-7 lg:pt-10">
            <div className="space-y-6 max-w-2xl">
              <p className="text-lg md:text-xl text-foreground/[0.82] font-light leading-relaxed">
                Years in patient care made the surrounding infrastructure impossible to ignore: how people find a
                service, how information moves, where documentation consumes attention, and why some tools become
                routine while others create more work.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                That clinical grounding now informs work across implementation, operations, automation, service design,
                and product advisory. The tools vary. The responsibility does not: understand the real use case,
                organize it clearly, and deliver something that works beyond the planning stage.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32 border-y border-white/[0.07] bg-white/[0.012]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal direction="up" className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14 md:mb-20">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70">Current work</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
                Roles where delivery, operations, and adoption meet.
              </h2>
            </div>
          </ScrollReveal>

          <div className="border-t border-white/[0.09]">
            {currentRoles.map((item, index) => (
              <ScrollReveal key={item.role} direction="up" delay={index * 0.05}>
                <article className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-white/[0.07]">
                  <p className="md:col-span-1 font-serif italic text-lg text-accent/75">{item.number}</p>
                  <div className="md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/[0.92]">{item.role}</h3>
                    <p className="mt-2 text-sm text-accent/[0.72]">{item.organization}</p>
                  </div>
                  <p className="md:col-span-2 text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground/70 md:pt-1">
                    {item.period}
                  </p>
                  <p className="md:col-span-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal direction="up" className="max-w-2xl mb-14 md:mb-20">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">How I work</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
              Practical judgment, applied through the full implementation.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 border-t border-white/[0.08]">
            {principles.map((principle, index) => (
              <ScrollReveal key={principle.title} direction="up" delay={(index % 2) * 0.05}>
                <article
                  className={`min-h-full py-8 md:py-10 border-b border-white/[0.08] ${
                    index % 2 === 0 ? 'md:pr-10' : 'md:border-l md:pl-10'
                  }`}
                >
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-accent/75 mb-4">
                    0{index + 1}
                  </p>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3">{principle.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                    {principle.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32 border-t border-white/[0.07]">
        <div className="max-w-[1160px] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-4">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">Foundation</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance">
              Clinical practice and formal training.
            </h2>
          </ScrollReveal>

          <div className="lg:col-span-8 space-y-12">
            <ScrollReveal direction="up">
              <article className="border-t border-white/[0.09] pt-7">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">Registered Physiotherapist</h3>
                  <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground/80">
                    Ontario · 2021 to present
                  </p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  At a private physiotherapy clinic, I led an AI documentation rollout to full team adoption within
                  eight weeks while maintaining more than $600K in annual clinical revenue for three consecutive years.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal direction="up">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-accent/75 mb-5">Education</p>
                <div className="border-t border-white/[0.09]">
                  {education.map((item) => (
                    <article
                      key={item.qualification}
                      className="grid sm:grid-cols-[1.2fr_0.8fr] gap-2 sm:gap-8 py-6 border-b border-white/[0.07]"
                    >
                      <h3 className="text-lg font-medium tracking-tight">{item.qualification}</h3>
                      <p className="text-sm text-muted-foreground sm:text-right">{item.institution}</p>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up">
              <article className="border-t border-white/[0.09] pt-7">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-accent/75 mb-3">Mentorship</p>
                <h3 className="text-lg font-medium tracking-tight mb-2">Lab2Market Validate · McMaster University</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Mentoring health-tech and health-innovation teams on clinical fit, workflow burden, onboarding,
                  adoption, and the practical realities of introducing new products into care environments.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32 border-t border-white/[0.07]">
        <ScrollReveal direction="up" className="max-w-[1160px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">Selected work</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance mb-5">
              The evidence is in the decisions and what changed after them.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Explore the implementation, workflow, service, and digital-platform work in more detail.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent/90"
            >
              Explore the work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.13] px-7 py-3.5 text-sm font-medium text-foreground/[0.78] transition-colors duration-300 hover:border-accent/[0.35] hover:text-foreground"
            >
              Start a conversation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
