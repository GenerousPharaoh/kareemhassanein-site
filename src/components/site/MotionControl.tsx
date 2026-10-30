'use client';

import { useId } from 'react';
import { setMotionEnabled, useReducedMotion, useSystemReducedMotion } from '@/lib/useReducedMotion';
import s from './MotionControl.module.css';

export function MotionControl({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const systemReduced = useSystemReducedMotion();
  const description = useId();

  return (
    <span className={`${s.control} ${className}`}>
      <button
        type="button"
        className={s.switch}
        role="switch"
        aria-label="Motion"
        aria-checked={!reduced}
        aria-disabled={systemReduced || undefined}
        aria-describedby={systemReduced ? description : undefined}
        onClick={() => { if (!systemReduced) setMotionEnabled(reduced); }}
      >
        <span>Motion</span>
        <span className={s.state} aria-hidden="true">{reduced ? 'Off' : 'On'}</span>
        <span className={s.track} aria-hidden="true"><span /></span>
      </button>
      {systemReduced && <span id={description} className="sr-only">Reduced motion is enabled on your device.</span>}
    </span>
  );
}
