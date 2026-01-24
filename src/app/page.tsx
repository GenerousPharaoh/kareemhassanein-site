'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const work = [
  {
    metric: '100%',
    label: 'Adoption rate',
    description: 'Led Heidi AI rollout achieving full clinician adoption in 8 weeks',
  },
  {
    metric: '85%',
    label: 'Time reduction',
    description: 'Built automation systems reducing document generation time',
  },
  {
    metric: '$600K+',
    label: 'Revenue generated',
    description: 'Highest performing clinician for three consecutive years',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Hero Section - Bold & Expansive */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-40 pb-20">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-6xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent font-medium tracking-[0.4em] uppercase text-[10px] mb-10 opacity-80">
              Implementation & Workflow Optimization
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[120px] font-medium leading-[0.85] tracking-tighter mb-16 text-balance"
          >
            Design. <br className="hidden md:block" />
            <span className="text-accent">Adopt.</span> <br className="hidden md:block" />
            Optimize.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-20 max-w-3xl mx-auto text-balance font-light"
          >
            I bridge the gap between technical possibility and human productivity through high-stakes operations optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-10 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-500 hover:scale-110 active:scale-95 text-xl"
            >
              Start a project
              <ArrowRight size={24} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-4 px-12 py-6 text-foreground rounded-full font-medium border border-border hover:bg-white/5 transition-all duration-500 hover:scale-110 active:scale-95 text-xl"
            >
              The Background
            </Link>
          </motion.div>
        </motion.div>

        {/* Aggressive Angular Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-card/20 -skew-y-6 translate-y-1/2 -z-10 pointer-events-none border-t border-accent/20" />
      </section>

      {/* Results Section - Extreme Angular Layout */}
      <section className="py-64 px-6 relative overflow-hidden bg-card/5 mask-skew-up">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal direction="left" distance={100}>
            <p className="text-muted-foreground mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">Performance</p>
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9]">
              Measurable <br /> Difference.
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-xl font-light">
              I deliver results that translate directly into operational throughput and revenue growth.
            </p>
          </ScrollReveal>

          <div className="grid gap-12 relative">
            {work.map((item, i) => (
              <ScrollReveal
                key={item.metric}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="p-12 rounded-[3rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4 shadow-2xl flex items-center justify-between"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
                >
                  <div>
                    <p className="text-xs text-foreground font-bold uppercase tracking-[0.2em] mb-4 opacity-60">
                      {item.label}
                    </p>
                    <p className="text-xl text-muted-foreground leading-snug">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-6xl md:text-8xl font-medium text-accent leading-none ml-8">
                    {item.metric}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            {/* Geometric Slash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[30%] bg-accent/5 mask-slash -z-10 -rotate-45 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Expertise Section - Bold Slash Layout */}
      <section className="py-64 px-6 bg-foreground text-background relative overflow-hidden mask-diagonal-right">
        <div className="max-w-7xl mx-auto py-24">
          <ScrollReveal direction="up" className="mb-32">
            <p className="text-background/40 mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">Expertise</p>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-12 leading-[0.8]">
              Strategy <br /> & Scale.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              'AI Integration',
              'Workflow Automation',
              'Process Architecture',
              'Training Enablement',
              'Clinical Strategy',
              'Ops Optimization',
            ].map((service, i) => (
              <ScrollReveal
                key={service}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="h-full p-16 rounded-[4rem] border border-background/10 bg-background/5 hover:bg-background/10 transition-all duration-700 relative overflow-hidden group-hover:-translate-y-4"
                  style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
                >
                  <h3 className="text-4xl font-medium mb-8">
                    {service}
                  </h3>
                  <div className="h-[2px] w-12 bg-background/20 mb-8" />
                  <p className="text-background/60 text-xl font-light leading-relaxed">
                    Scaling operations through precise {service.toLowerCase()}.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.6} className="mt-40">
            <Link
              href="/services"
              className="inline-flex items-center gap-6 text-background hover:translate-x-4 transition-all duration-500 text-3xl font-medium group"
            >
              <span className="border-b-2 border-background pb-1">All services</span>
              <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA - Aggressive Minimalism */}
      <section className="py-80 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center z-10">
          <ScrollReveal direction="up">
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Let&apos;s talk <br />
              <span className="text-accent underline decoration-4 underline-offset-8">systems.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-6 px-20 py-10 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-700 hover:scale-110 active:scale-95 text-3xl"
            >
              Partner with me
              <ArrowRight size={40} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Background Angular Slashing */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-accent/5 -skew-x-[30deg] translate-x-1/2 -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full border-r-2 border-accent/20 -skew-x-[30deg] -translate-x-1/2 -z-10 pointer-events-none" />
      </section>
    </div>
  );
}
