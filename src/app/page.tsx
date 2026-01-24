'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-40 md:pt-32">

        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

            {/* Text Content */}
            <div className="space-y-12">
              <ScrollReveal direction="up" distance={20} blur={10}>
                <span className="inline-block text-sm font-medium tracking-[0.3em] uppercase opacity-40 mb-4 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm shadow-inner mt-10 md:mt-0">
                  Operational Architecture
                </span>
              </ScrollReveal>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl lg:text-[115px] font-medium leading-[0.85] tracking-tight mb-16 text-balance">
                Technical <br />
                <CharReveal delay={0.6} className="py-2 text-accent">Design.</CharReveal>
              </motion.h1>

              <div className="max-w-xl">
                <TextReveal
                  text="I design and build operational systems for professional service firms. I specialize in removing technical friction for health and legal groups through automation."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic"
                  delay={0.8}
                />
              </div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-8 text-xl font-bold tracking-tight text-foreground link-underline pb-1 transition-all"
                >
                  Contact me
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
                </Link>
              </motion.div>
            </div>

            {/* Visual Content - Natural Aspect Ratio */}
            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative w-full"
              >
                <ParallaxImage
                  src="/assets/n_hero.png"
                  alt="Abstract Architecture"
                  className="w-full aspect-[4/5] rounded-[3rem] shadow-2xl border border-white/5"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="py-24 relative z-10 w-full px-6 md:px-12">
        <ScrollReveal direction="up" distance={40} blur={20}>
          <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8 hover:border-white/20 transition-colors duration-700">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase opacity-40">Previous Work</h2>
            <span className="text-sm font-mono opacity-20">2023 — 2025</span>
          </div>
        </ScrollReveal>

        <ProjectList />
      </section>

    </main>
  );
}
