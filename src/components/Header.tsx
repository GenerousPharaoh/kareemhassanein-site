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
    [0, 80],
    ['rgba(5, 6, 8, 0)', 'rgba(12, 14, 18, 0.9)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-6 lg:px-12 pointer-events-none">
        <motion.header
          style={{
            backgroundColor: headerBg,
            borderColor: headerBorder,
          }}
          className="pointer-events-auto border-b backdrop-blur-2xl transition-all duration-700 w-full max-w-7xl flex items-center justify-between py-6 px-10 rounded-sm titanium-border"
        >
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="group flex flex-col"
            >
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-accent mb-1 transition-all group-hover:tracking-[0.6em]">
                Kareem Hassanein
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-40">
                System Architect
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12 ml-12 border-l border-white/5 pl-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group py-2"
                  >
                    <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-titanium"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                        transition={{ duration: 0.8, ease }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-8 border-l border-white/5 pl-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">Current Region</span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-accent">Ontario, CA</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
          >
            <div className="space-y-1 w-6">
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'w-6'}`} />
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <div className={`h-[1px] bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'w-5'}`} />
            </div>
          </button>
        </motion.header>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] bg-[#050608]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                >
                  <Link
                    href={item.href}
                    className={`text-6xl font-medium tracking-tighter ${pathname === item.href ? 'text-accent' : 'text-foreground'
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
