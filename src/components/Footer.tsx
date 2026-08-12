'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { orderedProjects } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// The three link columns, tone-aware, no outer container.
function NavColumns({ tone = 'dark' }: { tone?: 'dark' | 'page' }) {
  const muted = tone === 'dark' ? 'text-white/60' : 'text-muted-foreground';
  const link =
    tone === 'dark'
      ? 'text-[#f1ede6]/72 hover:text-accent'
      : 'text-foreground/72 hover:text-accent';

  return (
    <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 sm:gap-10">
      <div>
        <p className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${muted}`}>Pages</p>
        <ul className="space-y-2">
          {pageLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`inline-flex min-h-8 items-center text-sm transition-colors duration-300 ${link}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${muted}`}>Projects</p>
        <ul className="space-y-2">
          {orderedProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className={`inline-flex min-h-8 items-center text-sm leading-snug transition-colors duration-300 ${link}`}
              >
                {project.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${muted}`}>Elsewhere</p>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.linkedin.com/in/kareemhassanein"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-8 items-center gap-1.5 text-sm transition-colors duration-300 ${link}`}
            >
              LinkedIn
              <ArrowUpRight aria-hidden="true" size={13} className="opacity-60" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:kareem.hassanein@gmail.com"
              className={`inline-flex min-h-8 items-center text-sm transition-colors duration-300 ${link}`}
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function BottomBar({ tone = 'dark' }: { tone?: 'dark' | 'page' }) {
  const muted = tone === 'dark' ? 'text-white/58' : 'text-muted-foreground';
  return (
    <div className={`mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-20 ${muted}`}>
      <span>Kareem Hassanein</span>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <span>Hamilton and Burlington, Ontario</span>
        <span>Remote across North America</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/contact') {
    return (
      <footer className="relative z-10 border-t border-white/[0.09] bg-background text-foreground">
        <div className="border-b border-white/[0.07]">
          <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-8 lg:px-12 xl:px-20">
            <NavColumns tone="page" />
          </div>
        </div>
        <BottomBar tone="page" />
      </footer>
    );
  }

  return (
    <footer className="relative z-10 overflow-hidden bg-[#070807] text-[#f1ede6] md:fixed md:inset-x-0 md:bottom-0 md:z-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-8%] h-[30rem] w-[30rem] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative border-t border-white/[0.09]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-6"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                Available for implementation, operations, and advisory work
              </p>
              <h2 className="max-w-xl font-sans text-[clamp(2.2rem,4.2vw,3.9rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#f1ede6]">
                Have something worth <span className="font-serif font-normal italic text-accent">discussing?</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f1ede6]/62 sm:text-lg">
                If the process is useful in theory but difficult in practice, I can help shape the workflow,
                technology, and adoption around how the work actually gets done.
              </p>
              <Link
                href="/contact"
                className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
              >
                Start a conversation
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>

            <div className="lg:col-span-6 lg:pt-3">
              <NavColumns tone="dark" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.09]">
        <BottomBar tone="dark" />
      </div>
    </footer>
  );
}
