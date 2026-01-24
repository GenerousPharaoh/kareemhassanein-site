'use client';

import Link from 'next/link';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const connectLinks = [
  {
    href: 'mailto:kareem.hassanein@gmail.com',
    label: 'Email',
    icon: <Mail size={14} />,
    external: false,
  },
  {
    href: 'https://linkedin.com/in/kareemhassanein',
    label: 'LinkedIn',
    icon: <Linkedin size={14} />,
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/[0.005]">
      <div className="section-container py-32">
        <ScrollReveal direction="up" distance={30} blur={20} staggerChildren={0.15}>
          <div className="grid md:grid-cols-3 gap-20 lg:gap-32">
            {/* Brand */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="space-y-8"
            >
              <Link
                href="/"
                className="group inline-block"
              >
                <span className="text-2xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-700">
                  Kareem Hassanein
                </span>
              </Link>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xs italic">
                Implementation specialist helping organizations adopt technology that works.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="space-y-8"
            >
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">Navigation</p>
              <ul className="space-y-5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-3 text-lg text-muted-foreground font-light hover:text-foreground transition-all duration-500"
                    >
                      <span className="w-4 h-[1px] bg-white/10 group-hover:w-8 group-hover:bg-accent transition-all duration-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="space-y-8"
            >
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">Connect</p>
              <ul className="space-y-5">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-4 text-lg text-muted-foreground font-light hover:text-foreground transition-all duration-500"
                    >
                      <span className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500">
                        {link.icon}
                      </span>
                      {link.label}
                      {link.external && (
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-muted-foreground/50 font-light tracking-wide">
              {new Date().getFullYear()} Kareem Hassanein
            </p>
            <p className="text-sm text-muted-foreground/50 font-light tracking-wide">
              Hamilton / Burlington, Ontario
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
