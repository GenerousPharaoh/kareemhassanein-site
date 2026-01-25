'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ParallaxImage from './ParallaxImage';

export default function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[800px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#0d1117] flex flex-col justify-center items-center text-center pointer-events-auto overflow-hidden">

        {/* Cinematic Background - Layered for depth */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/assets/synergy.png"
            alt="Footer Atmosphere"
            className="w-full h-full object-cover opacity-30 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10">
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-16 leading-[0.75]">
            Let&apos;s <br /><span className="opacity-40 italic font-light font-serif">talk.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-8 text-3xl md:text-5xl font-light border border-white/20 rounded-full px-12 py-6 hover:bg-white hover:text-black transition-all duration-500"
          >
            Get in touch
            <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <h2 className="text-[80px] md:text-[120px] leading-[0.7] font-bold tracking-tighter opacity-[0.05] select-none pointer-events-none">HASSANEIN</h2>
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-mono opacity-40 pb-2">
              <span>Burlington, ON</span>
              <span>Available remotely</span>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
