'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { getLenis } from './SmoothScroll';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';

type PendingRoute = { pathname: string; position?: number; caseSlug?: string; finish: () => void };
const POSITION = '__khMotionPosition';

function shareCase(element: HTMLElement) {
  element.style.viewTransitionName = 'case-exhibit';
  element.style.setProperty('view-transition-class', 'case-morph');
  element.dataset.sharedCase = '';
}

function clearCase() {
  document.querySelectorAll<HTMLElement>('[data-shared-case]').forEach((element) => {
    element.style.removeProperty('view-transition-name');
    element.style.removeProperty('view-transition-class');
    delete element.dataset.sharedCase;
  });
  delete document.documentElement.dataset.caseTransition;
}

/** Give visible stills a brief chance to decode before the browser takes the incoming snapshot. */
async function prepareImages() {
  const images = [...document.images].filter((image) => {
    const box = image.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && box.top < innerHeight && box.bottom > 0 && getComputedStyle(image).visibility === 'visible';
  });
  let timeout = 0;
  await Promise.race([
    Promise.all(images.map((image) => image.decode().catch(() => {}))),
    new Promise<void>((done) => { timeout = window.setTimeout(done, 120); }),
  ]);
  window.clearTimeout(timeout);
}

/**
 * Capture the viewport, rather than a main element thousands of pixels tall. Next still owns
 * navigation, prefetching, focus and history; the promise only holds the reveal until it commits.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const pending = useRef<PendingRoute | null>(null);
  const position = useRef(0);

  useLayoutEffect(() => {
    currentPath.current = pathname;
    // Discard wheel inertia from the old page without overriding Next's anchor/history position.
    const lenis = getLenis();
    lenis?.resize();
    lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    const route = pending.current;
    if (route?.pathname === pathname) {
      const hero = document.querySelector<HTMLElement>('[data-case-hero]');
      if (route.caseSlug && hero?.dataset.casePreview === route.caseSlug) shareCase(hero);
      if (route.position !== undefined) {
        position.current = route.position;
        window.history.replaceState({ ...window.history.state, [POSITION]: route.position }, '');
      }
      route.finish();
    }
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let active: ViewTransition | null = null;
    let timeout = 0;
    let captureDeadline = 0;
    const savedPosition = window.history.state?.[POSITION];
    position.current = typeof savedPosition === 'number' ? savedPosition : 0;
    window.history.replaceState({ ...window.history.state, [POSITION]: position.current }, '');

    const begin = (destination: string, navigate?: () => void, direction: 'forward' | 'back' = 'forward', targetPosition?: number, source?: HTMLElement | null) => {
      pending.current?.finish();
      active?.skipTransition();
      clearCase();
      window.clearTimeout(timeout);
      window.clearTimeout(captureDeadline);
      const lenis = getLenis();
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });

      if (!document.startViewTransition || typeof ViewTransition === 'undefined' || !('types' in ViewTransition.prototype) || prefersReducedMotion()) {
        root.dataset.routeArrival = direction;
        if (navigate) {
          // The same history accounting works when animation is disabled.
          pending.current = { pathname: destination, position: position.current + 1, finish: () => { pending.current = null; } };
        } else if (targetPosition !== undefined) position.current = targetPosition;
        navigate?.();
        return;
      }

      let resolve: () => void;
      const box = source?.getBoundingClientRect();
      const caseSlug = source && box && box.bottom > 0 && box.top < innerHeight && CSS.supports('view-transition-class', 'case-morph') ? source.dataset.casePreview : undefined;
      if (source && caseSlug) {
        root.dataset.caseTransition = caseSlug;
        shareCase(source);
      }
      const committed = new Promise<void>((done) => { resolve = done; });
      const route: PendingRoute = {
        pathname: destination,
        caseSlug,
        position: navigate ? position.current + 1 : targetPosition,
        finish: () => {
          if (pending.current === route) pending.current = null;
          resolve();
        },
      };
      pending.current = route;
      root.dataset.routeChanging = '';

      const update = () => {
        // A later click can supersede a transition before the browser has captured its old view.
        if (pending.current !== route) return;
        // Its value is the direction, for anything that should keep still on the way back
        root.dataset.routeArrival = direction;
        navigate?.();
        return committed.then(async () => {
          if (active !== transition || location.pathname !== destination) return;
          await prepareImages();
          // Commit the incoming header theme before the browser freezes its snapshot.
          flushSync(() => window.dispatchEvent(new Event('route-capture')));
        });
      };

      const transition = document.startViewTransition({
        update,
        types: ['page', direction],
      });
      active = transition;
      // An uncached route must not freeze the old screen while the network catches up.
      // Skipping the animation leaves the router's update intact.
      const deadline = window.setTimeout(() => {
        transition.skipTransition();
        if (active === transition) {
          route.caseSlug = undefined;
          delete root.dataset.routeChanging;
          clearCase();
        }
      }, 300);
      captureDeadline = deadline;
      // A failed navigation must not leave a frozen snapshot or an unresolved update callback.
      timeout = window.setTimeout(() => {
        route.finish();
        transition.skipTransition();
      }, 8000);
      const settle = () => {
        if (active !== transition) return;
        active = null;
        window.clearTimeout(timeout);
        window.clearTimeout(captureDeadline);
        delete root.dataset.routeChanging;
        clearCase();
        window.dispatchEvent(new Event('route-settled'));
      };
      void transition.ready.then(() => window.clearTimeout(deadline), () => window.clearTimeout(deadline));
      void transition.finished.then(settle, settle);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === currentPath.current) return;
      event.preventDefault();
      // A quick second tap on the same destination must not add another history entry.
      if (pending.current?.pathname === url.pathname) return;
      const up = url.pathname === '/' || (url.pathname === '/work' && currentPath.current.startsWith('/work/'))
        || (url.pathname === '/notes' && currentPath.current.startsWith('/notes/'));
      const preview = link.closest('[data-case-card], [data-case-next]')?.querySelector<HTMLElement>('[data-case-preview]');
      const source = preview && url.pathname === `/work/${preview.dataset.casePreview}` ? preview : null;
      begin(url.pathname, () => router.push(url.pathname + url.search + url.hash), up ? 'back' : 'forward', undefined, source);
    };

    const onPopState = (event: PopStateEvent) => {
      const target = event.state?.[POSITION];
      const targetPosition = typeof target === 'number' ? target : undefined;
      const direction = targetPosition !== undefined && targetPosition > position.current ? 'forward' : 'back';
      if (location.pathname !== currentPath.current) begin(location.pathname, undefined, direction, targetPosition);
    };
    const onPreference = () => { if (prefersReducedMotion()) active?.skipTransition(); };
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState, true);
    const unsubscribePreference = subscribeMotionPreference(onPreference);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState, true);
      unsubscribePreference();
      pending.current?.finish();
      active?.skipTransition();
      window.clearTimeout(timeout);
      window.clearTimeout(captureDeadline);
      delete root.dataset.routeChanging;
      clearCase();
    };
  }, [router]);

  return null;
}
