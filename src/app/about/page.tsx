'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;


const currentRoles = [
  {
    role: 'Digital Strategy & Operations Lead',
    organization: 'Endorphins Health and Wellness Centre',
    period: '2024 to present',
    description:
      'Leading digital operations across six specialties, including booking architecture, patient routing, analytics, and local search.',
  },
  {
    role: 'Workflow Automation Consultant',
    organization: 'Tax Relief Counsel',
    period: '2025 to present',
    description:
      'Mapped and rebuilt a recurring document workflow, reducing generation time from about three hours to 30 minutes per matter and documenting the process for independent use.',
  },
  {
    role: 'Clinical Advisor',
    organization: 'Neuro-Mod',
    period: '2025 to present',
    description:
      'Reviewing clinical deployment, interface design, clinician onboarding, patient education, and rollout readiness for an augmented-reality pain-management device.',
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
      <section className="relative px-6 md:px-12 xl:px-20 pt-16 md:pt-24 pb-20 md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-36 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="absolute bottom-[-40%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        </div>
        <div className="relative max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
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
              About <span className="font-serif italic font-normal text-accent/90">Kareem.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease }}
              className="mt-9 max-w-2xl text-lg md:text-[1.35rem] text-foreground/[0.76] font-light leading-relaxed"
            >
              I still treat patients, and I also run the operational side of a multidisciplinary clinic. Working both
              jobs at once means I see where a process breaks while I am standing inside it.
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
                src="/images/navigator-about.webp"
                alt="A figure studying a lit path that winds through a dark landscape of connected rooms"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover"
              />
            </div>
          </motion.figure>
        </div>
      </section>


      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
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

          <ScrollReveal direction="up" delay={0.12} className="mt-14 md:mt-20">
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-[860px] overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-white/[0.02]">
              <Image
                src="/images/systems-conductor.webp"
                alt="A figure drawing scattered documents into an ordered set of connected records"
                fill
                sizes="(min-width: 1024px) 860px, calc(100vw - 3rem)"
                className="object-cover"
              />
            </figure>
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
                Three organizations, three different problems.
              </h2>
            </div>
          </ScrollReveal>

          <div className="border-t border-white/[0.09]">
            {currentRoles.map((item, index) => (
              <ScrollReveal key={item.role} direction="up" delay={index * 0.05}>
                <article className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-white/[0.07]">
                  <div className="md:col-span-5">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/[0.92]">{item.role}</h3>
                    <p className="mt-2 text-sm text-accent/[0.72]">{item.organization}</p>
                  </div>
                  <p className="md:col-span-2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70 md:pt-1">
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
        <div className="max-w-[1160px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">
              How I think about the work
            </p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
              A process is more than the steps written down.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.08} className="lg:col-span-7 lg:pt-10">
            <div className="max-w-2xl border-t border-white/[0.09]">
              <p className="py-6 text-lg md:text-xl font-light leading-relaxed text-foreground/[0.82] border-b border-white/[0.08]">
                Every process also carries judgment, responsibility, time pressure, incomplete information, and habits
                people developed to keep the work moving. Some of those habits waste time. Others are compensating for
                something the formal process never solved.
              </p>
              <p className="py-6 text-base md:text-lg leading-relaxed text-muted-foreground border-b border-white/[0.08]">
                If I change the visible steps without understanding why they exist, I can move the burden to someone
                else or remove something that mattered. I need to understand what decisions are being made, who depends
                on them, where information comes from, and what cannot be lost in the name of efficiency.
              </p>
              <p className="pt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                AI and automation can remove work that no longer needs to be done by hand. They can also add more
                checking, uncertainty, or distance from the work when they are introduced badly. My role is to
                understand the difference and shape the change so it improves the work as a whole, not just one step.
              </p>
            </div>
          </ScrollReveal>
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
                  eight weeks while carrying a full clinical caseload.
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
              See the work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.13] px-7 py-3.5 text-sm font-medium text-foreground/[0.78] transition-colors duration-300 hover:border-accent/[0.35] hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
