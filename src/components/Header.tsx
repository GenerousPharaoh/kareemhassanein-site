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
    ['rgba(26, 29, 35, 0)', 'rgba(36, 41, 51, 0.8)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(24px)']);

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
        }}
        className="fixed top-0 left-0 right-0 z-50 py-10 px-8 lg:px-16 flex items-center justify-between pointer-events-none"
      >
        <Link
          href="/"
          className="pointer-events-auto group"
        >
          <span className="text-sm font-semibold tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-700">
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
                <span className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-700 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="header-nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground/30"
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
            <div className={`h-[1px] bg-foreground transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`h-[1px] bg-foreground transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
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
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] bg-[#1a1d23]/95 backdrop-blur-3xl md:hidden flex flex-col justify-center px-12"
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
                    className={`text-5xl font-light tracking-tighter ${pathname === item.href ? 'text-foreground italic' : 'text-muted-foreground'
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
