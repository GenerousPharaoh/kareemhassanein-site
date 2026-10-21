import type { ReactNode } from 'react';

/** Keeps a short phrase on one line, so "20-minute" never breaks at its hyphen. */
export function Keep({ children }: { children: ReactNode }) {
  return <span style={{ whiteSpace: 'nowrap' }}>{children}</span>;
}
