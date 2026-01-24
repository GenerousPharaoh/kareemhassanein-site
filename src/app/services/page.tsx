'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const solutions = [
  {
    index: '01',
    title: 'AI Intelligence Implementation',
    desc: 'Strategic architecture and rollout of agentic systems (Heidi AI) for clinical teams. Evaluating technical barriers and constructing SOPs built for immediate field adoption.',
    outcomes: ['SOP System Architecture', 'Technical Tool Baseline Configuration', 'Post-Deployment Stability Auditing'],
    icon: <Layers className="w-5 h-5 opacity-40" />
  },
  {
    index: '02',
    title: 'Agentic Workflow DevOps',
    desc: 'Engineering complex automated modules via Claude Code and Google Antigravity platforms. Reduction in operational friction by 85% via modular automation logic.',
    outcomes: ['Modular Automation Blueprints', 'CI/CD Pipeline System Auditing', 'Reduction in baseline operational friction'],
    icon: <Workflow className="w-5 h-5 opacity-40" />
  },
  {
    index: '03',
    title: 'Discovery Infrastructure',
    desc: 'Constructing search-optimized acquisition streams with technical local SEO and Jane App functional integration. Linking presence to patient conversion.',
    outcomes: ['Local SEO Technical Infrastructure', 'Jane App pathway integration', 'Technical Conversion Audits'],
    icon: <BarChart3 className="w-5 h-5 opacity-40" />
  },
  {
    index: '04',
    title: 'Implementation Advisory',
    desc: 'Consulting for med-tech and health-tech platforms on clinical usability, adoption barriers, and market validation within clinical workflows.',
    outcomes: ['Med-Tech Adoption Root Cause Audit', 'Technical Usability Workflow Mapping', 'Early Market Fit Strategy'],
    icon: <ShieldCheck className="w-5 h-5 opacity-40" />
  }
];

function TiltImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-[3.5rem] overflow-hidden glass-nanobanana ${className}`}
    >
      <div
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none"
      />
      <motion.div style={{ transform: "translateZ(30px)" }} className="relative aspect-video w-full">
        <Image src={src} alt={alt} fill className="object-cover opacity-80" />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <main className="pt-24 overflow-hidden relative">
      <div className="glow-blob top-[15%] -left-[10%] opacity-05" />

      {/* Capability Hero: Fixed Spacing & High-Fi Blur */}
      <section className="py-40 px-6 lg:px-0 relative overflow-hidden perspective-3000">
        <div className="section-container grid lg:grid-cols-[1.3fr_0.7fr] gap-32 items-end">
          <motion.div>
            <ScrollReveal direction="none" blur={30} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase opacity-30">Operational Capabilities</span>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={40} blur={20} delay={0.2}>
              <h1 className="text-8xl md:text-[130px] font-medium tracking-tighter mb-20 leading-[0.75]">
                System <br />
                {"&"} <span className="opacity-30 italic font-light font-serif">Scale.</span>
              </h1>
            </ScrollReveal>
          </motion.div>
          <ScrollReveal direction="right" distance={80} blur={40} delay={0.4} className="group mb-12">
            <TiltImage src="/assets/n_strategy.png" alt="Strategic Outcome Microscopic Detail" />
          </ScrollReveal>
        </div>
      </section>

      {/* Outcome-Driven Capability Dossiers: Staggered Blur-Reveals */}
      <section className="py-40 lg:py-64 bg-white/[0.005] border-y border-white/5">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[3.5rem] glass-nanobanana">
            {solutions.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.15}
                blur={20}
                className="group p-16 lg:p-20 bg-[#0d1117] hover:bg-white/[0.02] transition-all duration-1000 flex flex-col justify-between border-b last:border-0 border-white/5"
              >
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000">
                    {module.icon}
                  </div>
                  <span className="text-7xl font-light tracking-tighter text-white/5 italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">0{module.index}</span>
                </div>

                <div className="space-y-12 mb-20">
                  <h3 className="text-5xl font-medium tracking-tight h-[2.2em] group-hover:text-accent transition-colors duration-1000 leading-none">{module.title}</h3>
                  <p className="text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance italic">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-10">
                  <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">Technical Outcomes</p>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                    {module.outcomes.map(point => (
                      <li key={point} className="flex gap-6 text-xl text-muted-foreground font-light tracking-tight pb-4 border-b border-white/[0.02] items-center group/item hover:text-foreground transition-all duration-700">
                        <ChevronRight className="w-5 h-5 opacity-10 group-hover/item:opacity-100 transition-all duration-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* High-Fi Final Call */}
      <section className="py-96 text-center px-6 border-t border-white/5 bg-white/[0.005]">
        <div className="section-container relative z-10 space-y-32">
          <ScrollReveal direction="up" blur={40}>
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75] text-balance">
              Building <br /> <span className="opacity-10 italic font-light font-serif">Outcome.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} blur={25} className="space-y-32 max-w-4xl mx-auto">
            <p className="text-3xl md:text-5xl text-muted-foreground font-light leading-snug text-balance italic border-x border-white/5 px-20">
              Engineering high-stakes implementation where <span className="text-foreground border-b border-white/10 italic">user adoption</span> is the primary metric.
            </p>
            <div className="pt-24 flex justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-12 text-5xl font-bold tracking-tight text-foreground link-underline pb-4 px-12 transition-all"
              >
                Inquire for Architecture
                <ArrowRight size={72} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[1.5s]" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
