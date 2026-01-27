'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import MaskedReveal from '@/components/MaskedReveal';
import ParallaxImage from '@/components/ParallaxImage';
import { useRef, useEffect } from 'react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kareemhassanein', icon: <Linkedin className="w-5 h-5" /> },
];

function ContactLink({ link }: { link: typeof socialLinks[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightOpacity = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightX = useSpring(0, { stiffness: 150, damping: 25 });
  const spotlightY = useSpring(0, { stiffness: 150, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.touches[0].clientX - rect.left);
    spotlightY.set(e.touches[0].clientY - rect.top);
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        spotlightOpacity.set(0.15);
        scale.set(1.02);
      }}
      onPointerLeave={() => {
        spotlightOpacity.set(0);
        scale.set(1);
      }}
      onTouchMove={handleTouchMove}
      onTouchStart={() => {
        spotlightOpacity.set(0.15);
        scale.set(1.02);
      }}
      onTouchEnd={() => {
        spotlightOpacity.set(0);
        scale.set(1);
      }}
      style={{ scale }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-accent/20 active:scale-[0.98] transition-all duration-500"
    >
      <motion.div
        className="absolute pointer-events-none z-0 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: spotlightOpacity,
        }}
      />
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center justify-between p-8 md:p-10"
      >
        <div className="flex items-center gap-8 md:gap-10">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500 text-foreground/70 group-hover:text-accent">
            {link.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-medium tracking-tight opacity-80 group-hover:opacity-100 transition-all duration-500 leading-none mb-1">{link.label}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-70 group-hover:text-accent transition-all duration-500 font-medium">Link</span>
          </div>
        </div>
        <ArrowUpRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-accent" />
      </a>
    </motion.div>
  );
}

export default function Contact() {
  const heroRef = useRef(null);

  // Hero parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), springConfig);

  // Initial entrance animations
  const labelOpacity = useSpring(0, springConfig);
  const labelY = useSpring(20, springConfig);
  const headingOpacity = useSpring(0, springConfig);
  const headingY = useSpring(40, springConfig);
  const descOpacity = useSpring(0, springConfig);
  const descY = useSpring(30, springConfig);

  useEffect(() => {
    // Staggered entrance
    setTimeout(() => {
      labelOpacity.set(0.4);
      labelY.set(0);
    }, 100);
    setTimeout(() => {
      headingOpacity.set(1);
      headingY.set(0);
    }, 300);
    setTimeout(() => {
      descOpacity.set(1);
      descY.set(0);
    }, 500);
  }, [labelOpacity, labelY, headingOpacity, headingY, descOpacity, descY]);

  return (
    <main ref={heroRef} className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-background">

      {/* Cinematic Background Layer with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
        <ParallaxImage
          src="/images/contact_signals.png"
          alt="Flow"
          className="w-full h-full opacity-30"
          fadedVertical={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="section-container relative z-10 w-full pt-28 md:pt-48 pb-16 md:pb-24 flex-grow flex items-center will-change-transform"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 lg:gap-32 items-start w-full">
          <div>
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="block text-[10px] font-bold tracking-[0.6em] text-accent/60 uppercase mb-8"
            >
              Contact
            </motion.span>

            <motion.h1
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-5xl sm:text-6xl md:text-[100px] lg:text-[120px] font-medium tracking-tighter mb-10 md:mb-16 leading-[0.85]"
            >
              Get in <br />
              <span className="opacity-60 italic font-light font-serif">
                <MaskedReveal delay={0.4} className="py-2">touch.</MaskedReveal>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[1px] w-24 bg-accent/30 mb-8 origin-left"
            />

            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 italic max-w-xl"
            >
              Have a workflow that needs fixing? A system that nobody uses? Let&apos;s figure it out.
            </motion.p>
          </div>

          <div className="space-y-6 lg:pt-32">
            {socialLinks.map((link, i) => (
              <ContactLink key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Premium Anchor Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <div className="section-container flex flex-col md:flex-row justify-between items-end py-12 gap-8">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-medium tracking-widest text-accent/50 uppercase">Kareem Hassanein</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-end gap-2 text-xs md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-muted-foreground/70 pb-2"
          >
            <div className="flex gap-8">
              <span>Burlington, ON</span>
              <span>Available remotely</span>
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
            <span>© 2026 · All Rights Reserved</span>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
