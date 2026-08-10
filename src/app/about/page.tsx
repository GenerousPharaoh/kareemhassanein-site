'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import AnimatedDivider from '@/components/AnimatedDivider';
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const credentials = [
  'Registered Physiotherapist, Ontario',
  'MSc Physiotherapy with Distinction, Robert Gordon University',
  'BSc Kinesiology Honours, McMaster University',
  'Mentor, Lab2Market Validate, McMaster University',
  'Clinical Advisor, Neuro-Mod',
];

export default function About() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableScrollMotion = shouldReduceMotion || isMobile;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const springConfig = { stiffness: 80, damping: 35 };
  const heroBgY = useSpring(useTransform(heroProgress, [0, 1], [0, disableScrollMotion ? 0 : 100]), springConfig);
  const heroTextY = useSpring(useTransform(heroProgress, [0, 1], [0, disableScrollMotion ? 0 : 40]), springConfig);

  return (
    <main className="bg-background text-foreground pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden px-6 lg:px-12 xl:px-20">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 will-change-transform flex items-center justify-center">
          <ParallaxImage src="/images/mapping.webp" alt="" className="max-w-3xl w-full opacity-50" fadedVertical={true} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />

        <motion.div style={{ y: heroTextY }} className="max-w-[1200px] mx-auto relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 will-change-transform">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">
            {/* Identity column */}
            <div className="lg:sticky lg:top-48">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground mb-6"
              >
                About
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-medium tracking-tight mb-8 leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Kareem<br />Hassanein
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] w-12 bg-accent mb-8 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5 max-w-[300px]"
              >
                <p className="text-lg md:text-xl text-foreground/85 font-medium tracking-wide leading-tight">
                  Registered Physiotherapist
                </p>
                <p className="text-sm md:text-base text-muted-foreground/80 italic font-serif font-light leading-snug">
                  working across clinical implementation &amp; digital systems
                </p>
              </motion.div>
            </div>

            {/* Narrative column */}
            <div className="space-y-10 md:space-y-12 relative">
              <div className="absolute -left-6 lg:-left-12 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-[1.15] mb-8 text-balance">
                  A clinical background applied <span className="text-accent/90 italic font-serif">beyond the treatment room.</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-light tracking-tight">
                    I&rsquo;m a practicing physiotherapist with a background in kinesiology, coaching, patient care, and
                    clinic operations. Working close to patients and providers made me increasingly interested in the
                    systems around care: how people find a service, how information moves, how new tools are introduced,
                    and why some workflows become routine while others create friction.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed font-light">
                    My work has expanded into clinical implementation, workflow automation, patient-facing digital
                    platforms, service design, and product advisory. Depending on the project, I may be mapping an
                    existing process, structuring a new service, designing a patient or client journey, or using LLMs
                    and agentic development tools to turn requirements into a working digital system.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed font-light">
                    I remain responsible for the structure, testing, troubleshooting, and quality of the finished work.
                    The tools change from project to project; the objective is consistent: understand the real use case,
                    organize it clearly, and deliver something that works outside the planning stage.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed font-light">
                    I also mentor health-tech founders through McMaster University&rsquo;s Lab2Market program, advising
                    on clinical fit, onboarding burden, workflow integration, and rollout.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12 xl:px-20 py-4">
        <AnimatedDivider direction="left" accent maxWidth="200px" />
      </div>

      {/* Credentials */}
      <section className="py-16 md:py-24 px-6 lg:px-12 xl:px-20">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal direction="up">
            <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent mb-8 block">
              Credentials &amp; roles
            </span>
            <ul className="divide-y divide-white/[0.05]">
              {credentials.map((item) => (
                <li key={item} className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0 translate-y-[-2px]" />
                  <span className="text-base md:text-lg text-foreground/85 font-light tracking-tight">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <div className="h-[1px] w-20 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent" style={{ boxShadow: '0 0 16px rgba(176,141,87,0.12)' }} />
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-balance">
              The work says it better.
            </h2>
            <p className="text-lg text-muted-foreground/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
              The projects show what this looks like in practice: the decisions, the structure, and the finished systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-sm md:text-base font-medium px-8 py-4 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
              >
                View selected work
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="text-sm md:text-base font-medium text-foreground/70 px-8 py-4 rounded-full border border-white/[0.1] hover:text-foreground hover:border-accent/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                Get in touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
