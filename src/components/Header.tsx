'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'Identity' },
  { href: '/services', label: 'Capabilities' },
  { href: '/contact', label: 'Dialogue' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(13, 15, 18, 0)', 'rgba(13, 15, 18, 0.85)']
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 py-10 px-8 lg:px-20 flex items-center justify-between pointer-events-none backdrop-blur-3xl transition-all duration-1000"
      >
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-6"
        >
          <div className="w-1 h-1 rounded-full bg-accent-secondary opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 group-hover:text-foreground group-hover:tracking-[0.6em] transition-all duration-1000">
            Kareem Hassanein
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-1000 ${isActive ? 'text-foreground' : 'text-foreground/30 group-hover:text-foreground'
                  }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="header-dot-pearl"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-secondary/50"
                    transition={{ duration: 1, ease }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 p-2 -mr-2 text-foreground/50 hover:text-foreground pointer-events-auto transition-colors"
          aria-label="Toggle menu"
        >
          <div className="space-y-2 w-5">
            <div className={`h-[1px] bg-current transition-all duration-700 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`h-[1px] bg-current transition-all duration-700 ${isMenuOpen ? '-rotate-45 -translate-y-[1px]' : ''}`} />
          </div>
        </button>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease }}
            className="fixed inset-0 z-[45] bg-[#0d0f12]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-16"
          >
            <div className="flex flex-col gap-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 1, ease }}
                >
                  <Link
                    href={item.href}
                    className={`text-6xl font-light tracking-tighter ${pathname === item.href ? 'text-foreground italic' : 'text-foreground/30'
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
