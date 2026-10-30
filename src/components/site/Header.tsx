'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { NAV, SERVICES, SITE } from '@/content/site';
import { prefersReducedMotion } from '@/lib/useReducedMotion';
import { getLenis } from './SmoothScroll';
import { MotionControl } from './MotionControl';
import styles from './Header.module.css';

const MENU = [{ href: '/', label: 'Home' }, ...NAV, { href: '/notes', label: 'Notes' }];

/** The phone menu: shut, open, or on its way out (it stays in place for its short exit). */
type Phase = 'closed' | 'open' | 'closing';

export function Header() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('closed');
  const open = phase === 'open';
  const menuVisible = phase !== 'closed';
  // The route reveal owns the handoff, including dismissal of the phone menu.
  // (Adjusting state during render, not in an effect.)
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    if (phase !== 'closed') setPhase('closed');
  }
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const brand = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const services = useRef<HTMLDetailsElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Native details keeps the service destinations reachable without JavaScript.
  useEffect(() => {
    const menu = services.current;
    if (!menu) return;
    menu.open = false;
    const outside = (event: Event) => {
      if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    };
    const narrow = window.matchMedia('(max-width: 959px)');
    const resize = () => { if (narrow.matches) menu.open = false; };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    document.addEventListener('keydown', escape);
    narrow.addEventListener('change', resize);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      document.removeEventListener('keydown', escape);
      narrow.removeEventListener('change', resize);
    };
  }, [pathname]);

  const close = useCallback((returnFocus = false) => {
    setPhase((p) => (p === 'open' ? 'closing' : p));
    if (returnFocus) menuButton.current?.focus({ preventScroll: true });
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
        [...document.querySelectorAll<HTMLElement>('main [data-theme], main .paper, main .night, body > footer')].reverse().find((el) => {
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
    if (!menuVisible) return;
    const root = document.documentElement;
    const before = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.overflow = 'hidden';
    root.style.scrollbarGutter = 'stable';
    const lenis = getLenis();
    const resumeScroll = !!lenis && !lenis.isStopped;
    lenis?.stop();
    const behind = [document.getElementById('main'), document.querySelector<HTMLElement>('body > footer')].filter((el): el is HTMLElement => !!el);
    behind.forEach((el) => el.setAttribute('inert', ''));
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
      if (!wide.matches) return;
      const focused = document.activeElement;
      const menuHadFocus = focused === menuButton.current || !!(focused && sheet.current?.contains(focused));
      setPhase('closed');
      if (menuHadFocus) brand.current?.focus({ preventScroll: true });
    };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      root.style.overflow = before.overflow;
      root.style.scrollbarGutter = before.gutter;
      const currentLenis = getLenis();
      if (resumeScroll || currentLenis !== lenis) currentLenis?.start();
      behind.forEach((el) => el.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [menuVisible, close]);

  useLayoutEffect(() => {
    if (!open) return;
    // This also covers reopening during the short close, while the scroll lock is still held.
    if (sheet.current) sheet.current.scrollTop = 0;
    sheet.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true });
  }, [open]);

  // The exit normally ends on the sheet's own animationend; this is the backstop (and the whole
  // exit for reduced motion, where there is no animation).
  useEffect(() => {
    if (phase !== 'closing') return;
    // The surface exits over 320ms; allow a short margin if animationend is interrupted.
    const t = window.setTimeout(() => setPhase('closed'), prefersReducedMotion() ? 0 : 420);
    return () => window.clearTimeout(t);
  }, [phase]);

  // A link to the page already showing does not change the route, so close the menu for it here.
  const onSheetClick = (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as Element).closest('a');
    if (a && new URL(a.href).pathname === pathname) close(true);
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <header
      className={styles.header}
      data-home={pathname === '/' || undefined}
      data-scrolled={scrolled || undefined}
      data-tucked={(tucked && phase === 'closed' && !servicesOpen) || undefined}
      data-open={menuVisible || undefined}
      data-theme={theme}
      data-slow={slow || undefined}
      onFocusCapture={() => setTucked(false)}
    >
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={`container ${styles.inner}`}>
        <Link ref={brand} href="/" className={styles.mark} aria-label={`${SITE.name}, home`}>
          <span className={styles.monogram} aria-hidden="true"><span>K</span><span>H</span></span>
          <span className={styles.markName}>
            <span>Kareem</span>{' '}<span>Hassanein</span>
          </span>
          <span className={styles.markLine} aria-hidden="true">
            {SITE.descriptor}
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {NAV.map((item, i) => (
            <Fragment key={item.href}>
            <Link key={item.href} href={item.href} className={styles.link} aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
            {i === 0 ? <details ref={services} className={styles.services} onToggle={(event) => setServicesOpen(event.currentTarget.open)}>
              <summary className={styles.serviceToggle} data-active={SERVICES.some((service) => isActive(service.href)) || undefined}>
                Services<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </summary>
              <div className={styles.servicePanel}>
                {SERVICES.map((service) => <Link key={service.href} href={service.href} className={styles.serviceLink} aria-current={isActive(service.href) ? 'page' : undefined}>
                  <span>{service.label}</span>
                  <small>{service.description}</small>
                </Link>)}
              </div>
            </details> : null}
            </Fragment>
          ))}
        </nav>
        <Link href={SITE.bookingHref} className={styles.cta} data-track="header-book" aria-current={pathname.startsWith('/book') ? 'page' : undefined}>
          <span className={styles.ctaText}>Book a call</span>
        </Link>
        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setPhase((p) => (p === 'open' ? 'closing' : 'open'))}
        >
          <span className={styles.menuLabel} aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <noscript>
          <details className={styles.fallbackMenu}>
            <summary className={styles.fallbackToggle}>Menu</summary>
            <nav className={styles.fallbackNav} aria-label="Main navigation">
              {MENU.map((item) => (
                <Fragment key={item.href}>
                  <a href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a>
                  {item.href === '/work' ? <div className={styles.fallbackServices}>
                    <p>Services</p>
                    {SERVICES.map((service) => <a key={service.href} href={service.href} aria-current={isActive(service.href) ? 'page' : undefined}>
                      <span>{service.label}</span><small>{service.description}</small>
                    </a>)}
                  </div> : null}
                </Fragment>
              ))}
              <a href={SITE.bookingHref} className={styles.fallbackCta} data-track="menu-book">Book a 20-minute call</a>
            </nav>
          </details>
        </noscript>
      </div>
      <div
        id="site-menu"
        data-lenis-prevent
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
            <Fragment key={item.href}>
            <Link
              key={item.href}
              href={item.href}
              className={styles.sheetLink}
              style={{ ['--i' as string]: i }}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
            {item.href === '/work' ? <div className={styles.sheetServices}>
              <p>Services</p>
              {SERVICES.map((service) => <Link key={service.href} href={service.href} className={styles.sheetServiceLink} aria-current={isActive(service.href) ? 'page' : undefined}>
                <span>{service.label}</span><small>{service.description}</small>
              </Link>)}
            </div> : null}
            </Fragment>
          ))}
          <div className={styles.sheetFoot} style={{ ['--i' as string]: MENU.length }}>
            <Link href={SITE.bookingHref} className={styles.sheetCta} data-track="menu-book">
              Book a 20-minute call
            </Link>
            <p className={styles.sheetNote}>{SITE.reply}</p>
            <MotionControl />
          </div>
        </nav>
      </div>
    </header>
  );
}
