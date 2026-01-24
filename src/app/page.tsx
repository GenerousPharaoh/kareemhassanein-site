'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import MaskedReveal from '@/components/MaskedReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12">

        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col justify-center">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 items-center">

            {/* Text Content */}
            <div className="space-y-12">
              <ScrollReveal direction="up" distance={20} blur={10}>
                <span className="inline-block text-sm font-medium tracking-[0.3em] uppercase opacity-40 mb-4 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  Digital Experience Designer
                </span>
              </ScrollReveal>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl lg:text-[115px] font-medium leading-[0.85] tracking-tight mb-16 text-balance">
                Orchestrating <br />
                <MaskedReveal delay={0.5} className="py-2">complexity.</MaskedReveal>
              </motion.h1>

              <div className="max-w-xl">
                <TextReveal
                  text="I build systems that bridge the gap between human intuition and technical scale."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                  delay={0.8}
                />
              </div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-8 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Get in touch
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
                </Link>
              </motion.div>
            </div>

            {/* Visual Content - Parallax Card */}
            <div className="hidden lg:block relative h-[800px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative w-full h-full"
              >
                <ParallaxImage
                  src="/assets/n_hero.png" // Using the high-quality asset path
                  alt="Abstract Architecture"
                  className="w-full h-full rounded-[3rem] shadow-2xl border border-white/5"
                />

                {/* Floating Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="absolute -left-12 bottom-24 p-8 glass-card rounded-3xl max-w-xs border border-white/10"
                >
                  <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                    &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-3 opacity-50">
                    <div className="w-8 h-[1px] bg-foreground" />
                    <span className="text-[10px] uppercase tracking-widest">Philosophy</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="py-24 relative z-10 w-full px-6 md:px-12">
        <ScrollReveal direction="up" distance={40} blur={20}>
          <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8 hover:border-white/20 transition-colors duration-700">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase opacity-40">Selected Work</h2>
            <span className="text-sm font-mono opacity-20">2023 — 2025</span>
          </div>
        </ScrollReveal>

        <ProjectList />
      </section>

    </main>
  );
}
