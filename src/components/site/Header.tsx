'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
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
  // The route reveal owns the handoff, including dismissal of the phone menu.
  // (Adjusting state during render, not in an effect.)
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    if (phase !== 'closed') setPhase('closed');
  }
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
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

  // The background and hairline once the page has moved under the header (with a little hysteresis
  // so they cannot flicker at the threshold), and the header tucked away while reading down the page,
  // back as soon as the page moves up.
  useEffect(() => {
    let on = false;
    let tuck = false;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const next = on ? y > 4 : y > 12;
      if (next !== on) {
        on = next;
        setScrolled(next);
      }
      const dy = y - last;
      if (Math.abs(dy) > 8 || y < 80) {
        const t = dy > 0 && y > window.innerHeight * 0.7;
        if (t !== tuck) {
          tuck = t;
          setTucked(t);
        }
        last = y;
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
  // When the reel's stage changes colour, the header's colours change as slowly as the stage does
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    let t = 0;
    const onStage = () => {
      setSlow(true);
      window.clearTimeout(t);
      t = window.setTimeout(() => setSlow(false), 1000);
    };
    window.addEventListener('stagechange', onStage);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('stagechange', onStage);
    };
  }, []);
  useLayoutEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const header = document.querySelector('body > header');
      const y = (header?.getBoundingClientRect().height ?? 72) / 2;
      const x = window.innerWidth / 2;
      const under = document.elementsFromPoint(x, y).find((el) => !el.closest('body > header'));
      // An open menu makes main inert, which excludes its surfaces from hit testing.
      // Geometry still identifies the incoming sheet while that menu is being dismissed.
      const host = under?.closest('[data-theme], .paper, .night') ??
        [...document.querySelectorAll<HTMLElement>('main [data-theme], main .paper, main .night')].reverse().find((el) => {
          const box = el.getBoundingClientRect();
          return box.width > 0 && box.left <= x && box.right > x && box.top <= y && box.bottom > y && getComputedStyle(el).visibility !== 'hidden';
        });
      const t = host?.getAttribute('data-theme') ?? (host?.classList.contains('paper') ? 'light' : 'dark');
      setTheme(t === 'light' ? 'light' : 'dark');
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('stagechange', queue);
    window.addEventListener('route-capture', read);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('stagechange', queue);
      window.removeEventListener('route-capture', read);
    };
  }, [pathname]);

  // While open: the page behind cannot scroll or take focus, focus stays in the menu, Escape closes it,
  // and widening the window past the phone layout closes it at once.
  useLayoutEffect(() => {
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
    <header
      className={styles.header}
      data-scrolled={scrolled || undefined}
      data-tucked={(tucked && phase === 'closed') || undefined}
      data-open={open || undefined}
      data-theme={theme}
      data-slow={slow || undefined}
      onFocusCapture={() => setTucked(false)}
    >
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.mark} aria-label={`${SITE.name}, home`}>
          <span className={styles.markName} data-mark="name">
            {SITE.name}
          </span>
          <span className={styles.markLine} aria-hidden="true" data-mark="line">
            {SITE.descriptor}
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link} aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={SITE.bookingHref} className={styles.cta} data-track="header-book">
          <span className={styles.ctaText}>Book a call</span>
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
