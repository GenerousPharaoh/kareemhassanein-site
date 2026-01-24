'use client';

import Link from 'next/link';
import { useState } from 'react';
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

  const headerHeight = useTransform(scrollY, [0, 100], ['6rem', '4.5rem']);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(9, 9, 11, 0)', 'rgba(15, 15, 17, 0.7)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(16px)']);
  const headerY = useTransform(scrollY, [0, 100], [0, 8]);
  const headerWidth = useTransform(scrollY, [0, 100], ['100%', '95%']);

  const expoEasing = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor: headerBg,
          borderColor: headerBorder,
          backdropFilter: headerBlur,
          y: headerY,
          width: headerWidth,
        }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 border rounded-2xl transition-shadow duration-500 overflow-hidden"
      >
        <nav className="h-full max-w-6xl mx-auto px-8 flex items-center">
          <div className="w-full flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <span className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent duration-300">
                Kareem Hassanein
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-500" />
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
                    <span className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                      {item.label}
                    </span>
                    {isActive ? (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent/40 transition-all duration-500 group-hover:w-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: expoEasing }}
            className="fixed inset-0 z-[40] bg-background/80 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: expoEasing }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-4xl font-medium tracking-tighter ${pathname === item.href ? 'text-accent' : 'text-foreground'
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
