'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 24);
    });
  }, [scrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const focusableSelector = 'a[href], button:not([disabled])';
    const firstMenuItem = mobileMenuRef.current?.querySelector<HTMLElement>('a[href]');
    firstMenuItem?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const items = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );
      const focusable = [menuButtonRef.current, ...items].filter(Boolean) as HTMLElement[];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 px-5 pt-[env(safe-area-inset-top)] sm:px-6 lg:px-10">
        <header
          className={`mx-auto flex min-h-20 max-w-[1380px] items-center justify-between border-b px-0 transition-all duration-500 ${
            scrolled
              ? 'border-white/[0.08] bg-background/[0.88] px-4 sm:px-6 backdrop-blur-xl'
              : 'border-white/[0.06] bg-transparent'
          }`}
        >
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-3 rounded-md pr-3 text-foreground"
            aria-label="Kareem Hassanein, home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/35 font-serif text-sm font-medium text-accent transition-colors duration-500 group-hover:border-accent/70">
              KH
            </span>
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/78 transition-colors duration-500 group-hover:text-foreground sm:block">
              Kareem Hassanein
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8" aria-label="Primary navigation">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-11 items-center text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      active ? 'text-accent' : 'text-foreground/62 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 bottom-1 h-px bg-accent"
                        transition={{ duration: 0.55, ease }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              aria-current={pathname === '/contact' ? 'page' : undefined}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-300 hover:bg-accent/[0.88]"
            >
              Start a conversation
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-md text-foreground/75 transition-colors hover:text-foreground md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform duration-500 ${
                  isMenuOpen ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-1 left-0 h-px w-5 bg-current transition-transform duration-500 ${
                  isMenuOpen ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </header>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-0 z-[45] flex flex-col justify-center bg-[#111317]/[0.985] px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:hidden"
          >
            <nav className="mx-auto flex w-full max-w-sm flex-col" aria-label="Mobile navigation">
              {[...navItems, { href: '/contact', label: 'Contact' }].map((item, index) => {
                const active = pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.7, ease }}
                    className="border-t border-white/[0.08] last:border-b"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-24 items-center justify-between rounded-md px-1 text-5xl font-light tracking-tight ${
                        active ? 'text-accent' : 'text-foreground/72'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-foreground/38">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
