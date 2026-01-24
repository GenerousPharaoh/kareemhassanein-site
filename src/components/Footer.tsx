'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[500px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#0d1117] flex flex-col justify-center items-center text-center pointer-events-auto">

        <div className="relative z-10 px-6">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Ready to start?</p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-10">
            Let&apos;s talk.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 text-lg font-medium bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent transition-all duration-500"
          >
            Get in touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm font-medium tracking-tight text-foreground/40">
              Kareem Hassanein
            </span>
            <div className="flex gap-6 text-xs text-muted-foreground/60">
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
