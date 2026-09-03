import { useEffect } from 'react';
import Lenis from 'lenis';

import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scroll lisse Lenis, synchronise avec le ticker GSAP et ScrollTrigger.
 * Ne fait rien si l'utilisateur demande de reduire les animations : on garde
 * alors le scroll natif du navigateur.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
}
