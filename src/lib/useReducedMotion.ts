'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const STORAGE_KEY = 'kh-motion';
export const MOTION_PREFERENCE_EVENT = 'motion-preference-change';
type Choice = 'on' | 'off' | null;

let choice: Choice | undefined;
let query: MediaQueryList | undefined;
const listeners = new Set<() => void>();

const systemQuery = () => query ??= window.matchMedia(QUERY);
const readChoice = () => {
  if (choice !== undefined) return choice;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    choice = saved === 'off' || saved === 'on' ? saved : null;
  } catch {
    choice = null;
  }
  return choice;
};

/** Device preferences always win over a saved request to turn motion on. */
export const prefersReducedMotion = () => typeof window !== 'undefined' && (systemQuery().matches || readChoice() === 'off');
const systemReducedMotion = () => typeof window !== 'undefined' && systemQuery().matches;
const serverSnapshot = () => false;

const syncDocument = () => {
  document.documentElement.dataset.motion = prefersReducedMotion() ? 'off' : 'on';
};

const publish = () => {
  syncDocument();
  listeners.forEach((listener) => listener());
  window.dispatchEvent(new Event(MOTION_PREFERENCE_EVENT));
};

const onStorage = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  choice = event.newValue === 'on' || event.newValue === 'off' ? event.newValue : null;
  publish();
};

/** Shared by React, media playback and motion that lives outside React. */
export const subscribeMotionPreference = (onChange: () => void) => {
  if (typeof window === 'undefined') return () => {};
  if (!listeners.size) {
    systemQuery().addEventListener('change', publish);
    window.addEventListener('storage', onStorage);
  }
  listeners.add(onChange);
  syncDocument();
  return () => {
    listeners.delete(onChange);
    if (!listeners.size) {
      systemQuery().removeEventListener('change', publish);
      window.removeEventListener('storage', onStorage);
    }
  };
};

export function setMotionEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return;
  choice = enabled ? 'on' : 'off';
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // The current tab still remembers the choice if storage is unavailable.
  }
  publish();
}

/** Effective preference, with a stable server snapshot for hydration. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribeMotionPreference, prefersReducedMotion, serverSnapshot);
}

export function useSystemReducedMotion() {
  return useSyncExternalStore(subscribeMotionPreference, systemReducedMotion, serverSnapshot);
}
