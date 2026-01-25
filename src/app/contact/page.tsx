'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Mail, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import MaskedReveal from '@/components/MaskedReveal';
import ParallaxImage from '@/components/ParallaxImage';
import { useRef, useEffect } from 'react';

const socialLinks = [
  { label: 'Email', href: 'mailto:kareem.hassanein@gmail.com', icon: <Mail className="w-5 h-5" /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kareemhassanein', icon: <Linkedin className="w-5 h-5" /> },
  { label: 'Kinetikare Physio', href: 'https://www.kinetikarephysio.com', icon: <Globe className="w-5 h-5" /> },
  { label: 'Endorphins Health', href: 'https://www.endorphinshealth.com', icon: <Globe className="w-5 h-5" /> },
];

function ContactLink({ link, index }: { link: typeof socialLinks[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springConfig = { stiffness: 80, damping: 20 };
  const opacity = useSpring(0, springConfig);
  const x = useSpring(40, springConfig);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        opacity.set(1);
        x.set(0);
      }, 0.5 * 1000 + index * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, index, opacity, x]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="group w-full"
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-8 md:p-10 transition-all duration-500 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-accent/20 group-hover:-translate-y-1"
      >
        <div className="flex items-center gap-8 md:gap-10">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500 text-foreground/50 group-hover:text-accent">
            {link.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-medium tracking-tight opacity-60 group-hover:opacity-100 transition-all duration-500 leading-none mb-1">{link.label}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-50 group-hover:text-accent transition-all duration-500 font-medium">Link</span>
          </div>
        </div>
        <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-accent" />
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="section-container relative z-10 w-full pt-32 pb-12 flex-grow flex items-center will-change-transform"
      >
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-20 lg:gap-32 items-center w-full">
          <div>
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="block text-[10px] font-bold tracking-[0.6em] opacity-30 uppercase mb-10"
            >
              Contact
            </motion.span>

            <motion.h1
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-6xl md:text-[120px] lg:text-[140px] font-medium tracking-tighter mb-16 md:mb-20 leading-[0.8]"
            >
              Get in <br />
              <span className="opacity-40 italic font-light font-serif">
                <MaskedReveal delay={0.4} className="py-2">touch.</MaskedReveal>
              </span>
            </motion.h1>

            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-16 md:mb-24 italic border-l-2 border-accent/20 pl-8 md:pl-12 max-w-xl"
            >
              Whether you have a project in mind or just want to connect, I&apos;d be happy to hear from you.
            </motion.p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {socialLinks.map((link, i) => (
              <ContactLink key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Premium Anchor Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-background/80 backdrop-blur-sm">
        <div className="section-container flex flex-col md:flex-row justify-between items-end py-12 gap-8">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[80px] md:text-[120px] leading-[0.7] font-bold tracking-tighter opacity-[0.03] select-none pointer-events-none"
            >
              HASSANEIN
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-mono pb-2"
          >
            <span>Burlington, ON</span>
            <span>Available remotely</span>
            <span>© 2026</span>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
