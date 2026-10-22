'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { RollText } from '@/components/motion/RollText';
import { NAV, SITE } from '@/content/site';
import { prefersReducedMotion } from '@/lib/useReducedMotion';
import styles from './Header.module.css';

const MENU = [{ href: '/', label: 'Home' }, ...NAV, { href: '/notes', label: 'Notes' }];

/** The phone menu: shut, open, or on its way out (it stays in place for its short exit). */
type Phase = 'closed' | 'open' | 'closing';

export function Header() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('closed');
  const open = phase === 'open';
  // Close the menu once the new page is in place, so it fades out over the page it led to.
  // (Adjusting state during render, not in an effect.)
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    if (phase === 'open') setPhase('closing');
  }
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = false) => {
    setPhase((p) => (p === 'open' ? 'closing' : p));
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // iOS Safari shows :active (every pressed state on the site) only when a touch listener exists;
  // one passive, empty listener for the whole document is enough and cannot delay scrolling.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener('touchstart', noop, { passive: true });
    return () => document.removeEventListener('touchstart', noop);
  }, []);

  // The hairline under the header, with a little hysteresis so it cannot flicker at the threshold.
  useEffect(() => {
    let on = false;
    const onScroll = () => {
      const next = on ? window.scrollY > 4 : window.scrollY > 12;
      if (next !== on) {
        on = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The header takes the colours of whatever passes under it: ivory type over the dark stage and
  // client grounds, dark type over ivory paper. Sections say which they are with .paper, .night or
  // data-theme; the default is the dark stage.
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const header = document.querySelector('body > header');
      const y = (header?.getBoundingClientRect().height ?? 72) / 2;
      const under = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !el.closest('body > header'));
      const host = under?.closest('[data-theme], .paper, .night');
      const t = host?.getAttribute('data-theme') ?? (host?.classList.contains('paper') ? 'light' : 'dark');
      setTheme(t === 'light' ? 'light' : 'dark');
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [pathname]);

  // While open: the page behind cannot scroll or take focus, focus stays in the menu, Escape closes it,
  // and widening the window past the phone layout closes it at once.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const before = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.overflow = 'hidden';
    root.style.scrollbarGutter = 'stable';
    const behind = [document.getElementById('main'), document.querySelector<HTMLElement>('body > footer')].filter((el): el is HTMLElement => !!el);
    behind.forEach((el) => el.setAttribute('inert', ''));
    sheet.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== 'Tab' || !sheet.current || !menuButton.current) return;
      // The close button and the menu's links form one loop.
      const items = [menuButton.current, ...sheet.current.querySelectorAll<HTMLElement>('a[href], button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const wide = window.matchMedia('(min-width: 960px)');
    const onWide = () => {
      if (wide.matches) setPhase('closed');
    };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      root.style.overflow = before.overflow;
      root.style.scrollbarGutter = before.gutter;
      behind.forEach((el) => el.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open, close]);

  // The exit normally ends on the sheet's own animationend; this is the backstop (and the whole
  // exit for reduced motion, where there is no animation).
  useEffect(() => {
    if (phase !== 'closing') return;
    const t = window.setTimeout(() => setPhase('closed'), prefersReducedMotion() ? 0 : 400);
    return () => window.clearTimeout(t);
  }, [phase]);

  // A link to the page already showing does not change the route, so close the menu for it here.
  const onSheetClick = (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as Element).closest('a');
    if (a && new URL(a.href).pathname === pathname) close();
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={open || undefined} data-theme={theme}>
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
              <RollText text={item.label} />
            </Link>
          ))}
        </nav>
        <Link href={SITE.bookingHref} className={styles.cta} data-track="header-book">
          <RollText text="Book a call" />
        </Link>
        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setPhase((p) => (p === 'open' ? 'closing' : 'open'))}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
      <div
        id="site-menu"
        ref={sheet}
        className={styles.sheet}
        data-phase={phase}
        hidden={phase === 'closed'}
        inert={phase === 'closing'}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && phase === 'closing') setPhase('closed');
        }}
      >
        <nav aria-label="Menu" className={`container ${styles.sheetNav}`} onClick={onSheetClick}>
          {MENU.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.sheetLink}
              style={{ ['--i' as string]: i }}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <div className={styles.sheetFoot} style={{ ['--i' as string]: MENU.length }}>
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
