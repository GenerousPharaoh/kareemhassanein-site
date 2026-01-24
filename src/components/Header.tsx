'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Overview' },
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
    [0, 100],
    ['rgba(8, 10, 12, 0)', 'rgba(8, 10, 12, 0.9)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(74, 222, 128, 0.1)']
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          borderColor: headerBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 py-10 px-8 lg:px-20 flex items-center justify-between pointer-events-none border-b transition-all duration-700 backdrop-blur-xl"
      >
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-700">
            Kareem Hassanein
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-16 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className={`text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-700 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="header-active-vivid"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                    transition={{ duration: 0.8, ease }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 p-2 -mr-2 text-foreground pointer-events-auto"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5 w-6">
            <div className={`h-[2px] bg-foreground transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`h-[2px] bg-foreground transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
          </div>
        </button>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] bg-[#080a0c]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                >
                  <Link
                    href={item.href}
                    className={`text-6xl font-medium tracking-tighter ${pathname === item.href ? 'text-accent italic' : 'text-foreground'
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
