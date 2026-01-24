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

  // Smart Scroll Logic
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const direction = latest > lastScrollY.current ? "down" : "up";
      if (direction === "down" && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
          className="pointer-events-auto flex items-center gap-12 px-8 py-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] inner-glow"
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 pr-8 border-r border-white/10 transition-transform active:scale-95"
          >
            <div className="w-2 h-2 rounded-full bg-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
                  className="relative group py-1"
                >
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-white/40 group-hover:text-white group-hover:translate-y-[-1px]'
                    }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="header-active-blob"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground/40 blur-[1px] rounded-full"
                      transition={{ duration: 0.8, ease }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5 w-4">
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
            </div>
          </button>
        </motion.header>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] bg-[#0d1117]/95 backdrop-blur-3xl md:hidden flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                >
                  <Link
                    href={item.href}
                    className={`text-5xl font-light tracking-tighter ${pathname === item.href ? 'text-foreground italic' : 'text-foreground/30'
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
