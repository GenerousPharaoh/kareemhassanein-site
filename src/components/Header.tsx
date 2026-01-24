'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const headerHeight = useTransform(scrollY, [0, 50], ['5.5rem', '4rem']);
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(9, 9, 11, 0)', 'rgba(15, 15, 17, 0.8)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.06)']
  );
  const headerBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(12px)']);

  return (
    <motion.header
      style={{
        height: headerHeight,
        backgroundColor: headerBg,
        borderColor: headerBorder,
        backdropFilter: headerBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500"
    >
      <nav className="h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
          >
            Kareem Hassanein
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-300 link-underline ${pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-lg transition-colors duration-300 ${pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
