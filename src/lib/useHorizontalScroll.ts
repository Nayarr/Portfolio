import { useEffect, useRef } from 'react';

/**
 * Detourne le scroll vertical en translation horizontale de la piste passee en ref.
 * Version squelette : listener wheel simple. Sera remplace par Lenis + GSAP ScrollTrigger
 * dans feat/horizontal-scroll (inertie, snap sur section, sync avec la pellicule projets).
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return ref;
}
