'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Zap, Target, Gauge } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const work = [
  {
    metric: '100%',
    label: 'Adoption rate',
    description: 'Led Heidi AI rollout achieving full clinician adoption in 8 weeks',
    icon: <Target className="w-5 h-5" />,
    marginTop: '0px'
  },
  {
    metric: '85%',
    label: 'Time reduction',
    description: 'Built automation systems reducing document generation time',
    icon: <Zap className="w-5 h-5" />,
    marginTop: '40px'
  },
  {
    metric: '$600K+',
    label: 'Revenue generated',
    description: 'Highest performing clinician for three consecutive years',
    icon: <Gauge className="w-5 h-5" />,
    marginTop: '20px'
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-6xl mx-auto text-center z-10"
        >
          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]"
            >
              Operations & Implementation
            </motion.p>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[140px] font-medium leading-[0.85] tracking-tighter mb-16 text-balance mask-reveal">
            Design. Adapt. <br />
            <span className="text-accent italic">Optimize.</span>
          </h1>

          <ScrollReveal delay={0.4} distance={20} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light text-balance">
              Implementation specialist bridging the gap between technical capability and human productivity across high-stakes organizational operations.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full font-semibold transition-all duration-500 hover:scale-[1.05] active:scale-95 text-lg"
            >
              Start a project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 text-foreground hover:text-accent transition-colors duration-500 text-lg font-medium link-underline"
            >
              The Background
            </Link>
          </motion.div>
        </motion.div>

        {/* Subtle Background Elements */}
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[1px] bg-white/[0.03] rotate-[30deg] -z-10" />
        <div className="absolute bottom-[20%] left-[-5%] w-[60%] h-[1px] bg-white/[0.03] -rotate-[15deg] -z-10" />
      </section>

      {/* Results Section - Asymmetric Grid */}
      <section className="py-64 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-24 items-start">
            <ScrollReveal direction="left" distance={40} className="sticky top-40">
              <p className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-8">Performance</p>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 leading-[1] text-balance">
                Driving adoption <br /> that delivers.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-md">
                I identify bottlenecks and implement systems that translate directly into operational throughput and measurable revenue growth.
              </p>
            </ScrollReveal>

            <div className="grid gap-8">
              {work.map((item, i) => (
                <ScrollReveal
                  key={item.metric}
                  direction="up"
                  distance={30}
                  delay={i * 0.1}
                  className="group"
                  style={{ marginTop: item.marginTop }}
                >
                  <div className="glass-premium p-12 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 group-hover:border-accent/40 transition-all duration-700">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-6 text-accent/60">
                        {item.icon}
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      <p className="text-2xl font-light leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-7xl md:text-8xl font-light text-accent tracking-tighter leading-none whitespace-nowrap">
                      {item.metric}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Clean Sophistication */}
      <section className="py-64 px-6 bg-card relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-40 text-center">
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8">Capabilities</p>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-12">
              Optimization <br /> through <span className="text-accent italic">precision.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Integration', desc: 'Strategy & rollout for sustainable adoption.' },
              { title: 'Workflow Automation', desc: 'Scaling operations through modular systems.' },
              { title: 'Process Architecture', desc: 'Designing high-throughput professional workflows.' },
              { title: 'Training Enablement', desc: 'Accelerating user proficiency in new systems.' },
              { title: 'Clinical Strategy', desc: 'Operationalizing frontline healthcare innovation.' },
              { title: 'Ops Optimization', desc: 'Data-driven throughput and capacity refinement.' }
            ].map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="up"
                delay={i * 0.05}
                className="group h-full"
              >
                <div className="h-full p-12 rounded-[2rem] border border-white/[0.03] bg-background/40 hover:bg-background/80 transition-all duration-700">
                  <h3 className="text-3xl font-medium mb-6 leading-tight">
                    {service.title}
                  </h3>
                  <div className="h-[1px] w-8 bg-accent/40 mb-8 transition-all duration-700 group-hover:w-full" />
                  <p className="text-muted-foreground text-lg font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4} className="mt-32 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-4 text-foreground hover:text-accent transition-all duration-500 text-2xl font-medium group"
            >
              <span>Explore services</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Sophisticated Minimalism */}
      <section className="py-80 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter mb-20 leading-[0.8]">
              Let&apos;s talk <br />
              <span className="text-accent italic">systems.</span>
            </h2>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-4 px-16 py-8 bg-foreground text-background rounded-full font-bold hover:scale-[1.05] active:scale-95 transition-all duration-500 text-3xl shadow-2xl"
            >
              Advance Today
              <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Abstract Background Grid Hint */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </section>
    </div>
  );
}
