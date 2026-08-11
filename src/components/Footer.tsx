'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (pathname === '/contact') {
    return (
      <footer className="relative z-10 border-t border-white/[0.09] bg-background text-foreground">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-20">
          <span>Kareem Hassanein</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Hamilton and Burlington, Ontario</span>
            <span>Remote across North America</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 overflow-hidden bg-[#070807] text-[#f1ede6]">
      <div className="relative border-t border-white/[0.09]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-3xl" />
          <div className="absolute bottom-[-30%] left-[-8%] h-[30rem] w-[30rem] rounded-full bg-accent/[0.04] blur-3xl" />
        </div>

        <div
          className={`relative mx-auto flex max-w-[1440px] items-end px-6 pb-16 pt-12 sm:px-8 lg:items-center lg:px-12 xl:px-20 ${
            isHome ? 'min-h-[520px] lg:min-h-[700px]' : 'min-h-[430px] lg:min-h-[520px]'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.8, ease }}
            className="relative max-w-2xl lg:max-w-[46%]"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              Available for AI, implementation, operations, and advisory work
            </p>
            <h2 className="max-w-xl font-sans text-[clamp(2.7rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f1ede6]">
              Bring me the workflow that should work better.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#f1ede6]/62 sm:text-lg">
              If the process is useful in theory but difficult in practice, I can help shape the workflow, technology,
              and adoption around how the work actually gets done.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
            >
              Start a conversation
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/[0.09]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-20">
          <span>Kareem Hassanein</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Hamilton and Burlington, Ontario</span>
            <span>Remote across North America</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
