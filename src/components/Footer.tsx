'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParallaxImage from './ParallaxImage';

export default function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-svh md:h-[800px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#141920] pointer-events-auto overflow-hidden">

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* Image — full-bleed so the headline overlays it; a left-to-right scrim keeps the
            left-aligned text legible while the warm detail stays visible on the right */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/footer-image.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.55] md:opacity-[0.7]"
            imgClassName="object-[70%_center] md:object-center"
            fadedVertical={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141920] via-[#141920]/55 to-transparent" />
        </div>
        {/* Bottom scrim so the footer bar stays legible over the image */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/85 to-transparent z-[2] pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center items-start text-left max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 pb-24 md:pb-0">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-[120px] lg:text-[160px] font-medium tracking-tighter mb-8 md:mb-16 lg:mb-20 leading-[0.8]"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.5)' }}
          >
            Reach <br />
            <span className="mt-4 italic font-light font-serif opacity-50">
              out.
            </span>
          </motion.h2>

          <a
            href="/contact"
            className="group relative inline-flex items-center gap-3 md:gap-6 text-base sm:text-lg md:text-2xl lg:text-3xl font-light px-6 sm:px-8 md:px-12 py-3.5 md:py-5 rounded-full overflow-hidden transition-all duration-700 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 hover:bg-white/[0.08]"
          >
            <span className="relative z-10 flex items-center gap-4 md:gap-6">
              Get in touch
              <ArrowRight size={22} className="md:w-7 md:h-7 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-500" />
            </span>
            {/* Inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 md:py-6 flex flex-col md:flex-row justify-between items-center md:items-center gap-3 md:gap-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span className="text-xs font-medium tracking-[0.2em] text-accent/50 uppercase">Kareem Hassanein</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground/50">
              <span>Burlington, ON</span>
              <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
              <span>Remote</span>
              <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
