'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

/** Whether the viewer prefers reduced motion; false on the server and until hydration. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/** The same preference, read once outside React (for observers and timers). */
export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
