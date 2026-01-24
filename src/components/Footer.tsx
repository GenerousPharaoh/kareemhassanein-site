'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[800px] z-0 flex flex-col justify-end pointer-events-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-full w-full bg-[#0d1117] flex flex-col justify-center items-center text-center pointer-events-auto">
        <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
          Let&apos;s <br /><span className="opacity-40 italic font-light font-serif">talk.</span>
        </h2>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-12 text-5xl font-light link-underline pb-4 px-12 transition-all"
        >
          Get in touch
          <ArrowRight size={72} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[1.5s]" />
        </Link>

        <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between text-sm uppercase tracking-widest opacity-30">
          <span>© 2024 Kareem Hassanein</span>
          <span>Cairo / Global</span>
        </div>
      </div>
    </div>
  );
}
