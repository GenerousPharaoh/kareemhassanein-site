'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Magnetic from './Magnetic';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(16, 20, 29, 0)', 'rgba(16, 20, 29, 0.95)']
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 py-10 px-8 lg:px-20 flex items-center justify-between pointer-events-none backdrop-blur-3xl transition-all duration-700"
      >
        <Link
          href="/"
          className="pointer-events-auto group"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            Kareem Hassanein
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Magnetic key={item.href}>
                <Link
                  href={item.href}
                  className="relative group py-2"
                >
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-700 ${isActive ? 'text-foreground' : 'text-foreground/30 group-hover:text-foreground'
                    }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="header-active-moon"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground/40"
                      transition={{ duration: 0.8, ease }}
                    />
                  )}
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <Magnetic>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-foreground/50 hover:text-foreground pointer-events-auto"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5 w-5">
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[1px]' : ''}`} />
            </div>
          </button>
        </Magnetic>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-[45] bg-[#10141d]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
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
