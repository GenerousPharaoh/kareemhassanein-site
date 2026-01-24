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
    icon: <Target className="w-6 h-6" />,
  },
  {
    metric: '85%',
    label: 'Time reduction',
    description: 'Built automation systems reducing document generation time',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    metric: '$600K+',
    label: 'Revenue generated',
    description: 'Highest performing clinician for three consecutive years',
    icon: <Gauge className="w-6 h-6" />,
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const expoEasing = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={containerRef} className="relative">
      {/* Flagship Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center px-6 pt-40 pb-32 overflow-hidden">
        {/* Layered Background Geometry */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
            className="absolute top-1/4 right-[-10%] w-[60%] h-[1px] bg-accent/20 -rotate-[25deg]"
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
            className="absolute bottom-1/4 left-[-10%] w-[80%] h-[1px] bg-accent/10 rotate-[15deg]"
          />
          <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-accent/5 blur-[120px] rounded-full" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto text-center z-10"
        >
          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: expoEasing }}
              className="text-accent font-bold tracking-[0.5em] uppercase text-[10px]"
            >
              Operations Re-Engineered
            </motion.p>
          </div>

          <h1 className="relative">
            <ScrollReveal maskReveal direction="none" className="text-7xl md:text-[120px] lg:text-[160px] font-medium leading-[0.8] tracking-[-0.05em] mb-16 text-center italic">
              Solve. <br />
              <span className="text-accent not-italic">Scale.</span> <br />
              Sustain.
            </ScrollReveal>
          </h1>

          <ScrollReveal delay={0.4} distance={30} className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl text-muted-foreground leading-[1.3] mb-20 font-light text-balance">
              Implementation specialist bridging the gap between <span className="text-foreground">technical possibility</span> and <span className="text-foreground">human productivity</span>.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: expoEasing }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link
              href="/contact"
              className="group relative px-14 py-7 bg-foreground text-background rounded-full font-semibold overflow-hidden transition-transform duration-500 hover:scale-[1.05] active:scale-95 text-xl"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 flex items-center gap-4">
                Let&apos;s talk systems
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Performance Section - Complex Masking & Layers */}
      <section className="py-72 px-6 relative bg-[#09090b] mask-skew-up overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-end">
          <div className="relative">
            <ScrollReveal direction="left" distance={100} parallaxVelocity={0.05}>
              <p className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-8">Performance Metrics</p>
              <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-12 leading-[0.8]">
                Proven <br /> <span className="text-accent italic">Impact.</span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
                Redesigning operations is a science. I deliver the data to prove it works.
              </p>
            </ScrollReveal>

            {/* Background Slash Element */}
            <div className="absolute top-1/2 left-0 w-[200%] h-[1px] bg-accent/20 -rotate-[15deg] translate-y-24 pointer-events-none" />
          </div>

          <div className="grid gap-10 relative">
            {work.map((item, i) => (
              <ScrollReveal
                key={item.metric}
                direction="right"
                distance={60}
                delay={i * 0.15}
                className="group/item"
              >
                <div
                  className="glass-premium p-14 rounded-[3.5rem] flex items-center justify-between group-hover/item:border-accent/40 transition-all duration-700"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-1.5deg' : '1.5deg'}) hover:rotate(0deg)` }}
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-3 text-accent/60">
                      {item.icon}
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                    </div>
                    <p className="text-xl text-muted-foreground leading-[1.4] font-light max-w-xs transition-colors group-hover/item:text-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-7xl md:text-9xl font-medium text-accent tracking-tighter leading-none italic group-hover/item:not-italic transition-all duration-700">
                    {item.metric}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Domains - Layered Grid */}
      <section className="py-72 px-6 relative overflow-hidden bg-card/5">
        <div className="absolute inset-0 -z-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-40 text-center">
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8">Strategic Capabilities</p>
            <h2 className="text-7xl md:text-[130px] font-medium tracking-tighter leading-[0.75] mb-12">
              Deep <span className="italic">Systems</span> Expertise.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {[
              { title: 'AI Implementation', desc: 'Rollout strategy & user adoption stabilization.' },
              { title: 'Workflow Automation', desc: 'End-to-end efficiency through modular scaling.' },
              { title: 'Process Design', desc: 'Architecture for high-throughput professional services.' },
              { title: 'Training Enablement', desc: 'Driving adoption across resistant user bases.' },
              { title: 'Clinical Strategy', desc: 'Bridging med-tech innovation and frontline reality.' },
              { title: 'Ops Optimization', desc: 'Throughput gains through data-driven refinement.' }
            ].map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="none"
                delay={i * 0.1}
                className="group/card h-full"
                parallaxVelocity={0.02 * (i + 1)}
              >
                <div
                  className="h-full p-16 rounded-[4rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 relative overflow-hidden"
                  style={{ transform: `rotate(${i % 2 === 0 ? '1.5deg' : '-1.5deg'})` }}
                >
                  <div className="absolute top-0 right-0 p-10 opacity-20 group-hover/card:opacity-100 transition-opacity">
                    <ArrowRight size={32} className="-rotate-45" />
                  </div>
                  <h3 className="text-4xl font-medium mb-8 leading-tight">
                    {service.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-accent/40 mb-8 transition-all duration-1000 group-hover/card:w-full" />
                  <p className="text-muted-foreground text-xl font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - The Climax */}
      <section className="py-[30vh] px-6 relative overflow-hidden flex items-center justify-center">
        <ScrollReveal direction="up" parallaxVelocity={0.1}>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-8xl md:text-[180px] lg:text-[240px] font-medium tracking-tighter mb-24 leading-[0.7]">
              Let&apos;s Advance <br />
              <span className="text-accent italic underline decoration-8 underline-offset-[20px]">Operations.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-8 px-24 py-12 bg-foreground text-background rounded-full font-bold hover:bg-foreground/90 transition-all duration-700 hover:scale-110 active:scale-95 text-4xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            >
              Start high-stakes project
              <ArrowRight size={48} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Closing Geometric Slashes */}
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent/30 -rotate-[15deg] translate-y-32" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/30 rotate-[15deg] -translate-y-32" />
      </section>
    </div>
  );
}
