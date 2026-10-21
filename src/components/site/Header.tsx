'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV, SITE } from '@/content/site';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Close the menu when the route changes (adjusting state during render, not in an effect).
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    setOpen(false);
  }
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scrolling and keep focus inside the open menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const first = sheet.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key !== 'Tab' || !sheet.current) return;
      const items = [...sheet.current.querySelectorAll<HTMLElement>('a, button')];
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.mark} aria-label={`${SITE.name}, home`}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{SITE.name}</span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link} aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={SITE.bookingHref} className={styles.cta} data-track="header-book">
          Book a call
        </Link>
        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
      <div id="site-menu" ref={sheet} className={styles.sheet} hidden={!open}>
        <nav aria-label="Menu" className={`container ${styles.sheetNav}`}>
          <Link href="/" className={styles.sheetLink} aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.sheetLink} aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/notes" className={styles.sheetLink} aria-current={isActive('/notes') ? 'page' : undefined}>
            Notes
          </Link>
          <div className={styles.sheetFoot}>
            <Link href={SITE.bookingHref} className={styles.sheetCta} data-track="menu-book">
              Book a 20-minute call
            </Link>
            <p className={styles.sheetNote}>{SITE.reply}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
