'use client';

import { Mail, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import MaskedReveal from '@/components/MaskedReveal';
import ParallaxImage from '@/components/ParallaxImage';
import AmbientParticles from '@/components/AmbientParticles';
import { useRef } from 'react';

const socialLinks = [
  { label: 'Email', href: 'mailto:kareem.hassanein@gmail.com', icon: <Mail className="w-4 h-4 md:w-5 md:h-5" /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kareemhassanein', icon: <Linkedin className="w-4 h-4 md:w-5 md:h-5" /> },
  { label: 'Kinetikare Physio', href: 'https://www.kinetikarephysio.com', icon: <Globe className="w-4 h-4 md:w-5 md:h-5" /> },
  { label: 'Endorphins Health', href: 'https://www.endorphinshealth.com', icon: <Globe className="w-4 h-4 md:w-5 md:h-5" /> },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const contentInView = useInView(contentRef, { once: true, margin: "-10%" });
  const linksInView = useInView(linksRef, { once: true, margin: "-10%" });

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-background">

      {/* Ambient Particles */}
      <AmbientParticles count={10} className="z-[1]" />

      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/images/flow.png"
          alt="Flow"
          className="w-full h-full opacity-20"
          intensity="subtle"
          overlay="both"
        />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(38 30% 75% / 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(38 20% 60% / 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <div className="section-container relative z-10 w-full pt-24 md:pt-32 pb-8 md:pb-12 flex-grow flex items-center">
        {/* Animated background lines */}
        <div className="absolute inset-0 flex justify-around pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-16 lg:gap-32 items-center w-full">
          <div ref={contentRef}>
            <motion.div
              className="mb-6 md:mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={contentInView ? { opacity: 0.3, x: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase">Contact</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[140px] font-medium tracking-tighter mb-6 md:mb-10 lg:mb-20 leading-[0.8] md:leading-[0.75]">
                Get in <br /><span className="opacity-40 italic font-light font-serif"><MaskedReveal delay={0.3} className="py-1 md:py-2">touch.</MaskedReveal></span>
              </h1>
            </motion.div>

            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8 md:mb-16 lg:mb-24 italic border-l border-white/5 pl-4 md:pl-8 lg:pl-12">
                Whether you have a project in mind or just want to connect, I&apos;d be happy to hear from you.
              </p>
            </motion.div>
          </div>

          <div ref={linksRef} className="space-y-3 md:space-y-6 relative">
            {/* Decorative glow behind links */}
            <motion.div
              className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, hsl(38 30% 75% / 0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={linksInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {socialLinks.map((link, i) => (
              <motion.div
                key={link.label}
                className="group w-full"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={linksInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }}
              >
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between p-4 md:p-6 lg:p-10 transition-all glass-card hover:bg-white/[0.04] border border-white/5 hover:border-accent/20 rounded-xl md:rounded-2xl overflow-hidden"
                  whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.3, ease } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover gradient sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  <div className="flex items-center gap-3 md:gap-6 lg:gap-10 relative z-10">
                    <motion.div
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-700 text-foreground/50 group-hover:text-accent shrink-0"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {link.icon}
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-base md:text-lg lg:text-xl font-medium tracking-tight opacity-50 group-hover:opacity-100 transition-all duration-700 leading-none mb-0.5 md:mb-1">{link.label}</span>
                      <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-20 group-hover:opacity-40 transition-all font-bold">Link</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 opacity-10 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700 text-accent relative z-10" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Anchor Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
        {/* Animated scan line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
        />

        <motion.div
          className="section-container flex flex-col md:flex-row justify-between items-center md:items-end py-8 md:py-12 gap-4 md:gap-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
        >
          <div className="relative">
            {/* Subtle glow behind text */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent blur-3xl"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h2
              className="text-[36px] sm:text-[50px] md:text-[80px] lg:text-[120px] leading-[0.7] font-bold tracking-tighter opacity-[0.03] select-none pointer-events-none text-center md:text-left relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ duration: 1, delay: 1.4, ease }}
            >
              HASSANEIN
            </motion.h2>
          </div>
          <motion.div
            className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-8 text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-mono opacity-40 pb-1 md:pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <span>Burlington, ON</span>
            <span className="hidden sm:inline">•</span>
            <span>Available remotely</span>
            <span className="hidden sm:inline">•</span>
            <span>© 2026</span>
          </motion.div>
        </motion.div>
      </footer>
    </main>
  );
}
