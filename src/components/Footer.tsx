'use client';

import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              Kareem Hassanein
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Implementation specialist driving technology adoption and operational efficiency.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">Connect</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:kareem.hassanein@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Mail size={14} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/kareemhassanein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            {new Date().getFullYear()} Kareem Hassanein
          </p>
          <p className="text-sm text-muted">
            Hamilton / Burlington, Ontario
          </p>
        </div>
      </div>
    </footer>
  );
}
