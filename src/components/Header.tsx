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

  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(12px)']);
  const headerY = useTransform(scrollY, [0, 50], [0, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        style={{
          opacity: headerOpacity,
          backdropFilter: headerBlur,
          y: headerY,
        }}
        className="fixed top-0 left-0 right-0 z-50 py-8 px-8 lg:px-16 flex items-center justify-between pointer-events-none"
      >
        <Link
          href="/"
          className="pointer-events-auto group"
        >
          <span className="text-sm font-medium tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            Kareem Hassanein
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'
                  }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="header-active"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground/20"
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
          <div className="space-y-1 w-5">
            <div className={`h-[1px] bg-foreground transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
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
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[45] bg-background/95 backdrop-blur-2xl md:hidden pt-40 px-12"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.7, ease }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-light tracking-tighter"
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
