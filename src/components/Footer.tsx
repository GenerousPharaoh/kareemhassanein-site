'use client';

import { motion, useSpring } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useRef } from 'react';
import ParallaxImage from './ParallaxImage';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightX = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightOpacity = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => spotlightOpacity.set(1)}
      onMouseLeave={() => spotlightOpacity.set(0)}
      className="fixed bottom-0 left-0 w-full h-[800px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#0a0c10] flex flex-col justify-center items-center text-center pointer-events-auto overflow-hidden">

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Dynamic Spotlight */}
        <motion.div
          className="absolute pointer-events-none z-[2] w-[1000px] h-[1000px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)`,
            x: spotlightX,
            y: spotlightY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: spotlightOpacity,
          }}
        />

        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none z-0" />

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/finale_horizon.png"
            alt="Footer Atmosphere"
            className="w-full h-full object-cover opacity-[0.15]"
            fadedVertical={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" />
        </div>

        <div className="relative z-10 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[160px] font-medium tracking-tighter mb-20 leading-[0.8]"
          >
            Let&apos;s <br />
            <motion.span
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 italic font-light font-serif"
            >
              talk.
            </motion.span>
          </motion.h2>

          <a
            href="https://www.linkedin.com/in/kareem-hassanein-physiotherapy/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-6 text-2xl md:text-3xl font-light px-12 py-5 rounded-full overflow-hidden transition-all duration-700 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 hover:bg-white/[0.08]"
          >
            <span className="relative z-10 flex items-center gap-6">
              Get in touch
              <Linkedin size={28} className="group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
            </span>
            {/* Inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-white/[0.02] backdrop-blur-2xl">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs font-medium tracking-widest text-accent/50">KAREEM HASSANEIN</span>
            </div>
            <div className="flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.3em] font-medium text-muted-foreground/70 pb-2">
              <div className="flex gap-8">
                <span>Burlington, ON</span>
                <span>Available remotely</span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
              <span>© 2026 · All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
