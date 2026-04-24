'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Smart Scroll Logic
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (isMenuOpen) {
        setHidden(false);
        lastScrollY.current = latest;
        return;
      }

      const direction = latest > lastScrollY.current ? "down" : "up";
      if (direction === "down" && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = latest;
    });
  }, [scrollY, isMenuOpen]);

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    setHidden(false);
    const focusableSelector = 'a[href], button:not([disabled])';
    const getFocusable = () => {
      const menuItems = Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      return [menuButtonRef.current, ...menuItems].filter(Boolean) as HTMLElement[];
    };

    const firstMenuItem = mobileMenuRef.current?.querySelector<HTMLElement>('a[href]');
    firstMenuItem?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <motion.header
          variants={{
            visible: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: -20, opacity: 0, scale: 0.95 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.4, ease }}
          className="pointer-events-auto flex items-center gap-12 px-8 py-3 rounded-full bg-[hsl(222,12%,12%)]/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.28)] inner-glow"
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 pr-8 border-r border-white/10 transition-transform active:scale-95"
          >
            <div className="w-2 h-2 rounded-full bg-accent opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              K. Hassanein
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative group py-1"
                >
                  <span className={`text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-500 ${isActive ? 'text-accent' : 'text-white/65 group-hover:text-white/90 group-hover:translate-y-[-1px]'
                    }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="header-active-blob"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent/60 rounded-full"
                      transition={{ duration: 0.6, ease }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-3 -mr-2 text-white/70 hover:text-white transition-colors"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="space-y-1.5 w-5">
              <div className={`h-[1.5px] bg-current transition-all duration-500 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <div className={`h-[1.5px] bg-current transition-all duration-500 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
            </div>
          </button>
        </motion.header>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] bg-[#141920]/98 backdrop-blur-2xl md:hidden flex flex-col justify-center px-12"
          >
            <nav className="flex flex-col gap-10" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`flex items-baseline gap-4 text-5xl font-light tracking-tight ${pathname === item.href ? 'text-accent' : 'text-foreground/65 hover:text-foreground'
                      }`}
                  >
                    <span className="text-sm font-mono text-accent/60">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      {item.label}
                      {pathname === item.href && (
                        <div className="h-[2px] w-10 bg-accent/50 mt-3 rounded-full" />
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
