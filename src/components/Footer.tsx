'use client';

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    x.set(distance.x * 0.4);
    y.set(distance.y * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={ref}
        href={href}
        className="group relative flex items-center gap-6 px-16 py-8 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-accent/40 hover:bg-accent/[0.05] transition-all duration-700 shadow-2xl"
      >
        <span className="text-3xl md:text-5xl font-light tracking-tight text-foreground/80 group-hover:text-foreground transition-colors uppercase">
          {children}
        </span>
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-700 group-hover:scale-110">
          <ArrowRight className="w-8 h-8 text-accent group-hover:translate-x-2 transition-transform duration-700" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[90vh] bg-background flex flex-col justify-center items-center overflow-hidden px-6 border-t border-white/5"
    >
      {/* Massive Background Glow */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[180px] pointer-events-none opacity-40 animate-pulse"
      />

      <div className="relative z-10 max-w-[1600px] w-full flex flex-col items-center text-center">

        {/* Visual Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          className="mb-12"
        >
          <span className="text-[10px] font-bold tracking-[1em] uppercase">Project Finality</span>
        </motion.div>

        {/* The "Let's Talk" Statement */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="mb-32"
        >
          <h2 className="text-[15vw] md:text-[10vw] font-medium tracking-tighter leading-none italic font-serif">
            Let&apos;s <span className="text-accent not-italic">Talk.</span>
          </h2>
          <p className="mt-8 text-2xl md:text-4xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-12">
            I solve operational complexity with engineering depth.
          </p>
        </motion.div>

        {/* Primary Interaction */}
        <div className="mb-48">
          <MagneticLink href="/contact">
            Get in touch
          </MagneticLink>
        </div>

        {/* Bottom Metadata */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 pt-24 border-t border-white/5 opacity-20 text-[10px] font-mono tracking-[0.5em] uppercase">
          <div className="flex gap-12">
            <span>© 2026 KAREEM HASSANEIN</span>
            <div className="hidden md:block w-[1px] h-4 bg-white/20" />
            <span className="hidden md:inline">SYSTEMS_ARCHITECT</span>
          </div>

          <Link href="mailto:kareem.hassaneine@gmail.com" className="hover:text-accent transition-colors flex items-center gap-4 group">
            <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
            REACH@KAREEM.IO
          </Link>

          <div className="flex gap-12">
            <span>GMT-5</span>
            <div className="hidden md:block w-[1px] h-4 bg-white/20" />
            <span>GLOBAL_OPS</span>
          </div>
        </div>
      </div>

      {/* Corner Decorative */}
      <div className="absolute top-12 left-12 opacity-5 text-[8px] font-mono tracking-widest uppercase hidden lg:block">
        Footer_Module_v4.0 // FINAL_STATE
      </div>
    </footer>
  );
}
