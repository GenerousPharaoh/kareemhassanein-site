'use client';

import type { CSSProperties } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';


const currentRoles = [
  {
    role: 'Physiotherapist & Digital Strategy and Operations Lead',
    organization: 'Endorphins Health and Wellness Centre',
    period: '2024 to present',
    description:
      'Provide physiotherapy care while leading the clinic’s day-to-day digital operations, including its website, online booking, analytics, and service information. Launched physiotherapy as a new service within the established multidisciplinary clinic.',
  },
  {
    role: 'Workflow Improvement Consultant',
    organization: 'Tax Relief Counsel',
    period: '2025 to present',
    description:
      'Worked with the practitioner to restructure a recurring drafting workflow, reducing document-generation time from about three hours to 30 minutes per matter and documenting the process for independent use.',
  },
  {
    role: 'Clinical Advisor',
    organization: 'Neuro-Mod',
    period: '2025 to present',
    description:
      'Advise on clinical deployment for an augmented-reality pain-management device, including clinician workflow, onboarding, patient education, interface considerations, and rollout readiness.',
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
    <main className="overflow-x-clip bg-background text-foreground pt-20">
      <section className="relative px-6 md:px-12 xl:px-20 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="relative max-w-[1280px] mx-auto">
          <div className="max-w-3xl">
            <p
              className="enter-fade flex items-center gap-3 text-xs font-medium tracking-[0.24em] uppercase text-accent/75 mb-8"
              style={{ '--hero-delay': '0.06s' } as CSSProperties}
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent/[0.45]" />
              Kareem Hassanein · About
            </p>

            <h1
              className="enter-fade max-w-4xl text-[clamp(3rem,7.2vw,6.8rem)] font-medium tracking-[-0.055em] leading-[0.91] text-balance"
              style={{ '--hero-delay': '0.20s', '--enter-dur': '1.2s' } as CSSProperties}
            >
              About <span className="font-serif italic font-normal text-accent/90">Kareem.</span>
            </h1>

            <p
              className="enter-fade mt-9 max-w-2xl text-lg md:text-[1.35rem] text-foreground/[0.76] font-light leading-relaxed"
              style={{ '--hero-delay': '0.34s' } as CSSProperties}
            >
              My background spans frontline healthcare, client development, team leadership, service operations, and
              digital delivery.
            </p>

            <div
              className="enter-fade mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
              style={{ '--hero-delay': '0.46s' } as CSSProperties}
            >
              <span>Implementation</span>
              <span>Service operations</span>
              <span>Workflow improvement</span>
              <span>Digital delivery</span>
            </div>
          </div>

        </div>
      </section>


      <section className="px-6 md:px-12 xl:px-20 py-24 md:py-32">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <ScrollReveal direction="up" className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">Where this comes from</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
                Background.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08} className="lg:col-span-7 lg:pt-10">
              <div className="space-y-6 max-w-2xl">
                <p className="text-lg md:text-xl text-foreground/[0.82] font-light leading-relaxed">
                  More than 10,000 hours of patient care and one-to-one coaching taught me to begin with the actual
                  need: what the person or team is trying to achieve, what constraints are real, what information is
                  missing, and how progress will be measured. From there, I work toward a practical approach, support
                  execution, and adjust when the work reveals something the original plan did not.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  I now bring that perspective to implementation, workflow improvement, technology adoption, digital
                  products, and advisory work. I am most useful where success depends not only on the quality of the
                  solution, but on whether people can understand, use, and sustain it.
                </p>
                <article className="mt-10 border-t border-white/[0.09] pt-7">
                  <h3 className="text-xl font-medium tracking-tight text-foreground/[0.92]">Client and team leadership</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    Before physiotherapy, I delivered more than 3,000 hours of that total as one-to-one personal training, generated
                    more than $375K in fitness-service sales across training and management roles, and managed a
                    25-person team. That experience developed the commercial and relationship side of my work:
                    consultative assessment, ongoing coaching, performance management, client retention, and
                    accountability for results.
                  </p>
                </article>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="lg:col-span-12">
              <figure className="mt-2">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-[#090a09]">
                  <Image
                    src="/images/about-clinical-workflow-final.webp"
                    alt="Illustration of Kareem mapping a route from a physiotherapy treatment room through booking and documentation interfaces"
                    fill
                    sizes="(min-width: 1280px) 1160px, calc(100vw - 3rem)"
                    className="object-cover"
                  />
                </div>
              </figure>
            </ScrollReveal>
          </div>

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
                Current roles.
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
              Method
            </p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
              How I work.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.08} className="lg:col-span-7 lg:pt-10">
            <div className="max-w-2xl border-t border-white/[0.09]">
              <p className="py-6 text-lg md:text-xl font-light leading-relaxed text-foreground/[0.82] border-b border-white/[0.08]">
                Every workflow carries more than its visible steps. It also carries judgment, responsibility, time
                pressure, incomplete information, and workarounds people developed to keep things moving. Some create
                waste. Others compensate for something the formal process never solved.
              </p>
              <p className="py-6 text-base md:text-lg leading-relaxed text-muted-foreground border-b border-white/[0.08]">
                Before changing anything, I try to understand what decisions are being made, who relies on them, where
                the information comes from, and what cannot be lost. That reduces the risk of solving one problem by
                moving the burden somewhere else.
              </p>
              <p className="pt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                Technology and automation are useful when they reduce effort without weakening judgment, quality, or
                accountability. I focus on the operating result as a whole, not simply whether one step became faster.
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
                  At a private physiotherapy clinic, I led a clinical documentation rollout to full-team use within
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
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-accent/70 mb-5">Next</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance mb-5">
              Selected work.
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
