import { useEffect } from 'react';

import { playSfx } from '@/lib/audio';

/**
 * Joue un son de clic feutre sur chaque interaction avec un lien ou un bouton.
 * Ecouteur delegue unique, monte une fois dans les providers.
 */
export function useUiSounds() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target;
      if (el instanceof Element && el.closest('a, button, [role="button"], summary')) {
        playSfx('click');
      }
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);
}
