'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { } from 'lucide-react';
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
  const headerRef = useRef<HTMLElement>(null);

  // Mouse tracking for "shimmer" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Header transformation values
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 15, 17, 0)', 'rgba(15, 15, 17, 0.4)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(32px)']);
  const headerY = useTransform(scrollY, [0, 100], [20, 12]);
  const headerWidth = useTransform(scrollY, [0, 100], ['95%', '85%']);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  const expoEasing = [0.16, 1, 0.3, 1] as const;

  // Shimmer gradient background
  const shimmerBg = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(249, 115, 22, 0.1) 0%, transparent 60%)`
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <motion.header
          ref={headerRef}
          style={{
            backgroundColor: headerBg,
            borderColor: headerBorder,
            backdropFilter: headerBlur,
            y: headerY,
            width: headerWidth,
            scale: headerScale,
          }}
          className="pointer-events-auto border rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-700 overflow-hidden max-w-7xl relative group/header"
        >
          {/* Dynamic Light Reflection */}
          <motion.div
            style={{ background: shimmerBg }}
            className="absolute inset-0 opacity-0 group-hover/header:opacity-100 transition-opacity duration-1000 -z-10"
          />

          <nav className="flex items-center justify-between px-8 lg:px-12 py-5 lg:py-6">
            <Link
              href="/"
              className="flex items-center gap-4 group/logo relative z-50 overflow-hidden"
            >
              <div className="w-1.5 h-6 bg-accent rounded-full -rotate-12 group-hover/logo:rotate-[168deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="relative">
                <span className="text-lg font-semibold tracking-[-0.03em] text-foreground inline-block group-hover/logo:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  Kareem Hassanein
                </span>
                <span className="text-lg font-semibold tracking-[-0.03em] text-accent absolute top-full left-0 inline-block group-hover/logo:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  Advance.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: expoEasing }}
                  >
                    <Link
                      href={item.href}
                      className="relative group py-2"
                    >
                      <span className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                        {item.label}
                      </span>
                      {isActive ? (
                        <motion.div
                          layoutId="sophisticated-nav-active"
                          className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                          transition={{ duration: 0.8, ease: expoEasing }}
                        />
                      ) : (
                        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent/40 transition-all duration-500 group-hover:w-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button - Sophisticated State */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-[60] p-2 -mr-2 flex flex-col items-end gap-1.5 group/menu"
              aria-label="Toggle menu"
            >
              <div className={`h-0.5 bg-foreground transition-all duration-500 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8 group-hover/menu:w-6'}`} />
              <div className={`h-0.5 bg-foreground transition-all duration-500 ${isMenuOpen ? 'w-8 -rotate-45' : 'w-5 group-hover/menu:w-8'}`} />
            </button>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Navigation - Ultra Blur Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: expoEasing }}
            className="fixed inset-0 z-[45] bg-[#09090b]/80 backdrop-blur-3xl md:hidden overflow-hidden"
          >
            {/* Background Geometric Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_50%)]" />
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-12 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -50, skewX: 20 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  exit={{ opacity: 0, x: 50, skewX: -20 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: expoEasing }}
                >
                  <Link
                    href={item.href}
                    className={`text-6xl font-medium tracking-tighter transition-all duration-500 ${pathname === item.href ? 'text-accent italic' : 'text-foreground hover:text-accent'
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
