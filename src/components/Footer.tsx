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
      <div className="relative h-full w-full bg-[#efe9df] overflow-hidden pointer-events-auto">

        {/* Full-bleed image shown crisp — the warm scene was composed with copy space on the left */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/footer-image.webp"
            alt=""
            className="w-full h-full object-cover"
            imgClassName="object-[28%_center] md:object-center"
            fadedVertical={false}
          />
          {/* Cream wash on the left so the dark headline always rests on clean negative space */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe9df] via-[#efe9df]/60 to-transparent md:via-[#efe9df]/25" />
        </div>

        {/* Paper-grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1] mix-blend-multiply"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Content — dark text set into the image's left negative space */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start text-left max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 pb-24 md:pb-0 text-[#292d34]">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-[120px] lg:text-[150px] font-medium tracking-tighter mb-8 md:mb-12 lg:mb-14 leading-[0.82]"
          >
            Reach <br />
            <span className="italic font-light font-serif text-[#292d34]/45">out.</span>
          </motion.h2>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 md:gap-5 text-base sm:text-lg md:text-xl font-medium px-7 sm:px-9 md:px-11 py-4 md:py-5 rounded-full bg-[#292d34] text-[#f4efe6] transition-all duration-500 hover:bg-[#1d2127] shadow-[0_14px_34px_-14px_rgba(41,45,52,0.55)]"
          >
            Get in touch
            <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform duration-500" />
          </a>
        </div>

        {/* Bottom bar — dark text on a light frosted strip */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#292d34]/[0.1] bg-white/30 backdrop-blur-xl z-10">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b08d57]" />
              <span className="text-xs font-medium tracking-[0.2em] text-[#292d34]/75 uppercase">Kareem Hassanein</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-[#292d34]/55">
              <span>Burlington, ON</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#292d34]/25" />
              <span>Remote</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#292d34]/25" />
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
