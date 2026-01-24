'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

  // Header transformation values
  const headerPadding = useTransform(scrollY, [0, 100], ['20px', '12px']);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 15, 17, 0)', 'rgba(15, 15, 17, 0.8)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(16px)']);
  const headerY = useTransform(scrollY, [0, 100], [20, 12]);
  const headerWidth = useTransform(scrollY, [0, 100], ['95%', '90%']);

  const expoEasing = [0.16, 1, 0.3, 1] as const;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <motion.header
          style={{
            backgroundColor: headerBg,
            borderColor: headerBorder,
            backdropFilter: headerBlur,
            y: headerY,
            width: headerWidth,
            padding: headerPadding,
          }}
          className="pointer-events-auto border rounded-[2rem] shadow-2xl transition-shadow duration-500 overflow-hidden max-w-7xl"
        >
          <nav className="flex items-center justify-between px-6 lg:px-10">
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-50"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xl font-medium tracking-tight text-foreground">
                Kareem Hassanein
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group py-2"
                  >
                    <span className={`text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="pill-nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                        transition={{ duration: 0.6, ease: expoEasing }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-[60] p-2 -mr-2 text-foreground"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.4, ease: expoEasing }}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[45] bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: expoEasing }}
                >
                  <Link
                    href={item.href}
                    className={`text-5xl font-medium tracking-tighter transition-all duration-300 ${pathname === item.href ? 'text-accent scale-110' : 'text-foreground hover:text-accent'
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
