'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import AmbientParticles from '@/components/AmbientParticles';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

const metrics = [
  { label: 'Document generation time reduced', value: '85%', icon: '⚡' },
  { label: 'Clinician adoption in 8 weeks', value: '100%', icon: '📈' },
  { label: 'Annual admin cost eliminated', value: '$20K', icon: '💰' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Disable scroll effects on mobile - content fades too early on small screens
  const heroY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], isMobile ? [1, 1, 1] : [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 0.98]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-24 md:pt-28">

        {/* Ambient Particles */}
        <AmbientParticles count={15} className="z-[1]" />

        {/* Cinematic Background Layer - more subtle on mobile */}
        <div className="absolute inset-0 z-0 opacity-[0.06] md:opacity-100">
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full md:opacity-20"
            intensity="subtle"
            overlay="both"
          />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(38 30% 75% / 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(38 20% 60% / 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-center py-16 md:py-20"
        >
          <div className="grid lg:grid-cols-1 items-center justify-center text-center">

            {/* Text Content */}
            <div className="space-y-8 md:space-y-12 mx-auto max-w-4xl">
              <ScrollReveal direction="up" distance={20} blur={10}>
                <motion.span
                  className="inline-block text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 mb-4 border border-white/10 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full backdrop-blur-sm shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.2 }}
                >
                  Implementation Consulting
                </motion.span>
              </ScrollReveal>

              <motion.h1
                className="text-[2.5rem] leading-[0.85] sm:text-5xl md:text-7xl lg:text-8xl font-medium md:leading-[0.9] tracking-tighter mb-8 md:mb-16 text-balance"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.4 }}
              >
                I find bottlenecks and <CharReveal delay={0.8} className="py-1 md:py-2 text-accent italic font-serif">build</CharReveal>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                systems to fix them.
              </motion.h1>

              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.6 }}
              >
                <TextReveal
                  text="Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms. I map out where time and money are leaking, then build the systems, automations, and processes to stop it."
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed"
                  delay={0.8}
                />
              </motion.div>

              {/* Metrics Row */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-4 max-w-3xl mx-auto pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1 }}
              >
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="group relative p-4 sm:p-5 md:p-6 rounded-2xl border border-white/5 hover:border-accent/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 1.1 + i * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <p className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-accent mb-2 md:mb-3 group-hover:scale-105 transition-transform duration-500">{m.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{m.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center pt-4 md:pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.4 }}
              >
                <Link
                  href="/contact"
                  className="group relative flex items-center gap-3 md:gap-4 text-base md:text-lg font-medium tracking-tight bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10">Let&apos;s talk</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link
                  href="/about"
                  className="text-base md:text-lg font-medium tracking-tight text-foreground/60 hover:text-foreground px-4 md:px-6 py-3 md:py-4 transition-all duration-500"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Statement Section */}
      <section className="py-16 md:py-32 lg:py-48 w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        {/* Decorative line */}
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] h-24 md:h-32 -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <ScrollReveal direction="up" blur={20}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] md:leading-[1.2] mb-4 md:mb-6">
              The problem isn&apos;t the software.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
              It&apos;s how it fits into the way people already work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10 w-full px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal direction="up" distance={40} blur={20}>
            <div className="mb-12 md:mb-16 lg:mb-20">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3 md:mb-4 block">Portfolio</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight">Recent Work</h2>
            </div>
          </ScrollReveal>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
