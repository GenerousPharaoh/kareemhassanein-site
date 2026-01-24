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
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-5xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent font-medium tracking-[0.3em] uppercase text-[10px] mb-8">
              Implementation & Workflow Optimization
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[110px] font-medium leading-[0.9] tracking-tighter mb-12 text-balance"
          >
            I help organizations adopt technology and optimize the way they work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-16 max-w-3xl mx-auto text-balance"
          >
            From AI implementation to workflow automation, I bridge the gap between
            possibility and productivity through human-centric operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              Get in touch
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-foreground rounded-full font-medium border border-border hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              Learn more
            </Link>
          </motion.div>
        </motion.div>

        {/* Angular Background Element */}
        <div className="absolute top-1/2 left-0 w-full h-[300px] bg-accent/5 -skew-y-6 -z-10 pointer-events-none" />
      </section>

      {/* Results Section - Angular Layout */}
      <section className="py-48 px-6 relative bg-card/20 mask-skew-up">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-muted-foreground mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Results</p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-24 max-w-3xl leading-[1.1]">
              Driving adoption and delivering measurable operational gains
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {work.map((item, i) => (
              <ScrollReveal
                key={item.metric}
                direction="none"
                delay={i * 0.15}
                className="group relative"
              >
                <div
                  className="relative p-10 rounded-[2rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4 shadow-2xl"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}
                >
                  <p className="text-6xl md:text-7xl font-medium text-accent mb-6 leading-none">
                    {item.metric}
                  </p>
                  <p className="text-xs text-foreground font-bold uppercase tracking-[0.2em] mb-4">
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

      {/* About Section - Angled Containers */}
      <section className="py-64 px-6 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <ScrollReveal direction="left" distance={100} parallaxVelocity={0.1}>
            <p className="text-muted-foreground mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Background</p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 leading-[1.1]">
              Frontline clinical roots meet digital operations
            </h2>
            <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                I understand both the pressure of clinical practice and the power of automation. I bridge that gap to ensure technology actually gets adopted.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-12 text-foreground hover:text-accent transition-all duration-300 group text-xl"
            >
              <span className="link-underline pb-1">Read more</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </ScrollReveal>

          <div className="relative">
            <ScrollReveal direction="right" distance={50} className="relative z-10">
              <div
                className="p-12 rounded-[3rem] border border-border bg-card shadow-[0_0_100px_rgba(0,0,0,0.5)] -rotate-3"
              >
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Current Roles</p>
                <div className="space-y-12">
                  {[
                    { role: 'Digital Strategy & Operations Lead', company: 'Endorphins Health' },
                    { role: 'Workflow Automation Consultant', company: 'Tax Relief Counsel' },
                    { role: 'Clinical Advisor', company: 'Neuro-Mod' },
                  ].map((item, idx) => (
                    <div key={item.role} className="group flex items-start gap-6">
                      <div className="text-accent/30 font-medium pt-1">0{idx + 1}</div>
                      <div>
                        <p className="text-2xl font-medium mb-1 group-hover:text-accent transition-colors duration-300 leading-tight">{item.role}</p>
                        <p className="text-lg text-muted-foreground">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {/* Background Slash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-accent/5 mask-slash -z-10 -rotate-12 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Services Section - Angled Dividers & Tiles */}
      <section className="py-48 px-6 bg-foreground text-background mask-diagonal-right relative">
        <div className="max-w-6xl mx-auto py-24">
          <ScrollReveal direction="up" className="text-center mb-32">
            <p className="text-background/60 mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Expertise</p>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-8 leading-none">
              Optimization through adoption
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto text-balance font-medium">
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
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="h-full p-12 rounded-3xl border border-background/10 bg-background/5 hover:bg-background/10 transition-all duration-500 relative overflow-hidden"
                  style={{ transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})` }}
                >
                  <h3 className="text-3xl font-medium mb-6 transition-colors duration-300">
                    {service}
                  </h3>
                  <div className="h-[2px] w-12 bg-background/20 mb-8" />
                  <p className="text-background/70 text-lg leading-relaxed">
                    Strategy for scaling {service.toLowerCase()} across your organization.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.6} className="text-center mt-32">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-background hover:scale-110 transition-transform duration-300 text-2xl font-medium"
            >
              Explore all services
              <ArrowRight size={32} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Minimal Angular */}
      <section className="py-80 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up" distance={50}>
            <h2 className="text-6xl md:text-8xl lg:text-[140px] font-medium tracking-tighter mb-16 leading-[0.85]">
              Let&apos;s build better systems
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-4 px-16 py-8 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-110 active:scale-95 text-2xl"
            >
              Start a project
              <ArrowRight size={32} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Abstract Angular Elements */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 -z-10 translate-x-1/4 pointer-events-none" />
        <div className="absolute top-0 left-0 w-1/4 h-full border-r border-border/20 -z-10 -skew-x-12 pointer-events-none" />
      </section>
    </div>
  );
}
