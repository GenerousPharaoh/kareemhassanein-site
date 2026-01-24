'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.8)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.06)']
  );
  const headerPadding = useTransform(scrollY, [0, 100], ['28px 20px', '16px 20px']);
  const headerWidth = useTransform(scrollY, [0, 100], ['100%', '90%']);
  const headerY = useTransform(scrollY, [0, 100], [0, 20]);

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header
          style={{
            backgroundColor: headerBg,
            borderColor: headerBorder,
            padding: headerPadding,
            width: headerWidth,
            y: headerY,
          }}
          className="pointer-events-auto border-b backdrop-blur-xl transition-all duration-700 max-w-7xl lg:rounded-full lg:px-12"
        >
          <nav className="flex items-center justify-between mx-auto">
            <Link
              href="/"
              className="group relative z-50 transition-colors"
            >
              <span className="text-xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-500">
                Kareem Hassanein
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group py-2"
                  >
                    <span className={`text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
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
              className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5 w-6">
                <div className={`h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[45] bg-background/98 backdrop-blur-2xl md:hidden pt-40 px-8"
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
                    className={`text-5xl font-medium tracking-tighter ${pathname === item.href ? 'text-accent' : 'text-foreground'
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
