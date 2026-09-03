import { useEffect, useRef } from 'react';

import styles from './Cursor.module.css';

/**
 * Halo violet qui suit le pointeur avec une legere trainee (lerp) et grossit
 * au survol des elements interactifs. Desactive au tactile et si
 * prefers-reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && el.closest('a, button, [role="button"], input, label, summary');

    const onOver = (e: PointerEvent) => {
      dot.dataset.hot = isInteractive(e.target) ? 'true' : 'false';
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className={styles.cursor} data-hot="false" aria-hidden="true" />;
}
