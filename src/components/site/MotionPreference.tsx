'use client';

import { useEffect } from 'react';
import { subscribeMotionPreference } from '@/lib/useReducedMotion';

/** Mount once in the layout to keep CSS in sync with device and saved preferences. */
export function MotionPreference() {
  useEffect(() => subscribeMotionPreference(() => {}), []);
  return null;
}
