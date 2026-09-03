import { useRef } from 'react';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { SiteFooter } from '@/components/ui/SiteFooter';
import { Hub } from '@/components/hub/Hub';

import styles from './ScrollExperience.module.css';

/**
 * Mode normal : les sections defilent horizontalement.
 * Le scroll vertical est lisse par Lenis puis converti en translation X de la
 * piste par GSAP ScrollTrigger (pin + scrub). Sur mobile ou en reduced-motion,
 * la piste retombe en pile verticale native (voir le module CSS).
 */
export function ScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useSmoothScroll();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Recalcule les mesures une fois les polices chargees.
  useGSAP(() => {
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return (
    <>
      <SiteHeader />

      <div ref={rootRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          <section className={styles.panel} id="hub" aria-label="Hub">
            <Hub />
          </section>
          <section className={styles.panel} id="projets" aria-label="Projets" />
          <section className={styles.panel} id="experience" aria-label="Experience" />
          <section className={styles.panel} id="a-propos" aria-label="A propos" />
          <section className={styles.panel} id="contact" aria-label="Contact" />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
