'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';

// Three actual surfaces from each drawing: search/page/booking, ranked rows,
// desktop/image/phone, then search/page/completion. The same outlines carry through.
type Surface = [number, number, number, number, number];
const SURFACES: Surface[][] = [
  [[32, 52, 102, 88, 14], [166, 50, 128, 108, 8], [302, 152, 106, 94, 14]],
  [[92, 46, 256, 54, 5], [92, 112, 256, 54, 5], [92, 178, 256, 54, 5]],
  [[38, 36, 318, 202, 10], [215, 86, 113, 122, 2], [300, 112, 94, 150, 13]],
  [[32, 111, 72, 72, 18], [178, 38, 84, 72, 10], [334, 111, 72, 72, 18]],
];
const ATTRIBUTES = ['x', 'y', 'width', 'height', 'rx'] as const;

/** A finite, interruptible handoff, with no animation loop left running at rest. */
export function useProcessDrawing(root: RefObject<HTMLElement | null>, active: number) {
  const previous = useRef(active);
  const positions = useRef<Surface[]>(SURFACES[active]);

  useLayoutEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
    const drawing = root.current?.querySelector<HTMLElement>('[data-process-drawing]');
    if (!drawing) return;
    const surfaces = [...drawing.querySelectorAll<SVGRectElement>('[data-morph-surface]')];
    const target = SURFACES[active];
    const from = positions.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const box = drawing.getBoundingClientRect();
    if (reduce.matches || box.bottom < 0 || box.top > innerHeight) {
      positions.current = target;
      return;
    }

    let frame = 0;
    let started: number | undefined;
    const details: Animation[] = [];
    const paint = (values: Surface[]) => surfaces.forEach((surface, i) => {
      ATTRIBUTES.forEach((attribute, n) => surface.setAttribute(attribute, values[i][n].toFixed(2)));
    });
    const finish = () => {
      cancelAnimationFrame(frame);
      positions.current = target;
      paint(target);
      delete drawing.dataset.morphing;
      details.forEach((animation) => animation.cancel());
    };
    const resolveDetails = () => {
      delete drawing.dataset.morphing;
      drawing.querySelectorAll<SVGPathElement>(`[data-scene="${active}"] path`).forEach((path, i) => {
        const length = path.getTotalLength();
        if (!length) return;
        details.push(path.animate([
          { strokeDasharray: `${length} ${length}`, strokeDashoffset: length },
          { strokeDasharray: `${length} ${length}`, strokeDashoffset: 0 },
        ], { duration: 280, delay: Math.min(i * 18, 90), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
      });
    };
    const tick = (time: number) => {
      started ??= time;
      const elapsed = time - started;
      positions.current = from.map((surface, i) => {
        const t = Math.min(1, Math.max(0, (elapsed - i * 35) / 480));
        const eased = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        return surface.map((value, n) => value + (target[i][n] - value) * eased) as Surface;
      });
      paint(positions.current);
      if (elapsed < 550) frame = requestAnimationFrame(tick);
      else resolveDetails();
    };
    paint(from);
    drawing.dataset.morphing = '';
    frame = requestAnimationFrame(tick);
    const preference = () => { if (reduce.matches) finish(); };
    const visibility = () => { if (document.hidden) finish(); };
    reduce.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      details.forEach((animation) => animation.cancel());
      delete drawing.dataset.morphing;
      reduce.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [active, root]);
}
