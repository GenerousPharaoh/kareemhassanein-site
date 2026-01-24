'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ParallaxImage from './ParallaxImage';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease }
    }
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 w-full h-[420px] sm:h-[500px] md:h-[700px] lg:h-[800px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#0a0d12] flex flex-col justify-center items-center text-center pointer-events-auto overflow-hidden">

        {/* Animated Gradient Orbs */}
        <motion.div
          variants={glowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(38 30% 75% / 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          variants={glowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(38 20% 60% / 0.25) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 opacity-10 md:opacity-15">
          <ParallaxImage
            src="/images/bridging.png"
            alt="Footer Texture"
            className="w-full h-full"
            intensity="subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-transparent to-[#0a0d12]" />
        </div>

        {/* Animated Scan Line */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2
            }}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 px-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Heading with character animation */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[180px] font-medium tracking-tighter mb-6 sm:mb-8 md:mb-12 lg:mb-16 leading-[0.8]">
              <motion.span
                className="inline-block"
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
              >
                Let&apos;s
              </motion.span>
              <br />
              <motion.span
                className="inline-block opacity-40 italic font-light font-serif"
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 0.4 } : { y: 60, opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.45 }}
              >
                talk.
              </motion.span>
            </h2>
          </motion.div>

          {/* CTA Button with enhanced interactions */}
          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-base sm:text-lg md:text-2xl lg:text-5xl font-light border border-white/20 rounded-full px-5 sm:px-6 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-5 lg:py-6 overflow-hidden transition-all duration-700 hover:border-white/40"
            >
              {/* Button background animation */}
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                Get in touch
              </span>
              <ArrowRight
                className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 group-hover:text-black group-hover:translate-x-2 transition-all duration-500"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/30 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
        >
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-8">
            {/* Watermark */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 1, ease, delay: 1 }}
            >
              <h2 className="text-[28px] sm:text-[40px] md:text-[80px] lg:text-[120px] leading-[0.7] font-bold tracking-tighter opacity-[0.04] select-none pointer-events-none">
                HASSANEIN
              </h2>
            </motion.div>

            {/* Footer Info */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-8 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-mono opacity-40"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 1, ease, delay: 1.1 }}
            >
              <span>Burlington, ON</span>
              <span className="hidden sm:inline">•</span>
              <span>Available remotely</span>
              <span className="hidden sm:inline">•</span>
              <span>© 2026</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
