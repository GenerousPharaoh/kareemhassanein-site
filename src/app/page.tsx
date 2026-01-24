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
    offset: '0'
  },
  {
    metric: '85%',
    label: 'Time reduction',
    description: 'Built automation systems reducing document generation time',
    offset: '80px'
  },
  {
    metric: '$600K+',
    label: 'Revenue generated',
    description: 'Highest performing clinician for three consecutive years',
    offset: '40px'
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
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent font-medium tracking-wide uppercase text-sm mb-6">
              Implementation & Workflow Optimization
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight mb-8 text-balance"
          >
            I help organizations adopt technology and optimize the way they work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto text-balance"
          >
            From AI implementation to workflow automation, I bridge the gap between
            possibility and productivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in touch
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-foreground rounded-full font-medium border border-border hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Learn more
            </Link>
          </motion.div>
        </motion.div>

        {/* Subtle background element - not an orb or gradient, just a structural hint */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </section>

      {/* Results Section - Asymmetric Grid */}
      <section className="py-48 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Results</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-24 max-w-3xl leading-tight">
              Driving adoption and delivering measurable operational gains
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24 items-start">
            {work.map((item, i) => (
              <ScrollReveal
                key={item.metric}
                direction="up"
                distance={50}
                delay={i * 0.15}
                className="group"
                style={{ marginTop: item.offset }}
              >
                <div className="relative p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm hover:border-accent/30 transition-all duration-500 group-hover:-translate-y-2">
                  <p className="text-5xl md:text-6xl font-medium text-accent mb-4">
                    {item.metric}
                  </p>
                  <p className="text-sm text-foreground font-semibold uppercase tracking-widest mb-4">
                    {item.label}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Split Screen & Overlap */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal direction="left" distance={100} parallaxVelocity={0.2}>
            <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Background</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
              Frontline clinical roots meet digital operations
            </h2>
            <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                I understand both the pressure of clinical practice and the power of automation. I bridge that gap to ensure technology actually gets adopted.
              </p>
              <p>
                From leading AI implementations for multi-specialty clinics to building automation for law firms, my focus is always on adoption and impact.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-12 text-foreground hover:text-accent transition-colors duration-300 link-underline pb-1 text-lg"
            >
              Read more
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>

          <div className="relative">
            <ScrollReveal direction="right" distance={50} delay={0.2} className="relative z-10 translate-x-4 lg:translate-x-12">
              <div className="p-8 rounded-3xl border border-border bg-card shadow-2xl">
                <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6">Current Focus</p>
                <div className="space-y-8">
                  {[
                    { role: 'Digital Strategy & Operations Lead', company: 'Endorphins Health' },
                    { role: 'Workflow Automation Consultant', company: 'Tax Relief Counsel' },
                    { role: 'Clinical Advisor', company: 'Neuro-Mod' },
                  ].map((item, idx) => (
                    <div key={item.role} className="group">
                      <p className="text-xl font-medium mb-1 group-hover:text-accent transition-colors duration-300">{item.role}</p>
                      <p className="text-muted-foreground">{item.company}</p>
                      {idx < 2 && <div className="h-[1px] w-12 bg-border mt-6" />}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-border/50 rounded-[50px] -z-10 rotate-3 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Services Section - Dynamic Asymmetric Grid */}
      <section className="py-48 px-6 bg-card/20 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-32">
            <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Expertise</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8">
              Optimization through adoption
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Building systems is easy. Getting people to use them is where the value is realized.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'AI Tool Implementation',
              'Workflow Automation',
              'Process Design & SOPs',
              'Training & Enablement',
              'Clinical Advisory',
              'Operations Optimization',
            ].map((service, i) => (
              <ScrollReveal
                key={service}
                direction="up"
                distance={30}
                delay={i * 0.1}
                className="group h-full"
              >
                <div className="h-full p-10 rounded-2xl border border-border bg-card/50 hover:border-accent/50 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} className="text-accent -rotate-45" />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors duration-300">
                    {service}
                  </h3>
                  <div className="h-[2px] w-8 bg-accent/30 group-hover:w-full transition-all duration-700 mb-6" />
                  <p className="text-muted-foreground text-lg">
                    Comprehensive strategy for scaling {service.toLowerCase()} across your organization.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.6} className="text-center mt-24">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 link-underline pb-1 text-lg"
            >
              Explore all services
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Sophisticated but minimal */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up" distance={50}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-12 leading-none">
              Let&apos;s build better systems
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-xl mx-auto text-balance">
              Available for consulting, advisory roles, and high-impact implementation projects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              Start a project
              <ArrowRight size={24} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Abstract structural elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/30 -z-10" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-border/30 -z-10" />
      </section>
    </div>
  );
}
