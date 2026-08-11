'use client';

import Image from 'next/image';
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
    <footer className="relative z-10 overflow-hidden bg-[#ece7de] text-[#25292f]">
      <div className="relative border-t border-[#25292f]/10">
        <div className="relative lg:absolute lg:inset-0">
          <Image
            src="/images/system-flow-footer-v2.webp"
            alt=""
            width={1935}
            height={812}
            sizes="100vw"
            className="h-auto w-full lg:h-full lg:object-cover lg:object-center"
          />
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
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#25292f]/58">
              Available for implementation, operations, and advisory work
            </p>
            <h2 className="max-w-xl font-sans text-[clamp(2.7rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#25292f]">
              Bring me the workflow that should work better.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#25292f]/68 sm:text-lg">
              If the process is useful in theory but difficult in practice, I can help make it clearer, more usable,
              and easier to adopt.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#25292f] px-7 text-sm font-semibold text-[#f3eee6] transition-colors duration-500 hover:bg-[#15181c]"
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

      <div className="border-t border-[#25292f]/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#25292f]/55 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-20">
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
