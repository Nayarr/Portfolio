import { useEffect, useRef } from 'react';

/** Distance de molette cumulee avant de changer de diapo. */
const SEUIL_MOLETTE = 42;
/** Distance de doigt avant de changer de diapo. */
const SEUIL_TACTILE = 50;

/**
 * Remonte les ancetres du point touche pour savoir si l'un d'eux peut encore
 * defiler dans le sens demande. Sans ca, la colonne de lecture d'une fiche
 * projet ne defilerait jamais : le diaporama intercepterait tout.
 */
function peutDefilerDedans(depart: EventTarget | null, sens: number, limite: Element): boolean {
  let el = depart instanceof Element ? depart : null;
  while (el && el !== limite.parentElement) {
    const style = getComputedStyle(el);
    const defilable =
      /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
    if (defilable) {
      const enHaut = el.scrollTop <= 0;
      const enBas = el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
      if ((sens < 0 && !enHaut) || (sens > 0 && !enBas)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

type Options = {
  /** Zone qui capte les gestes. */
  cible: React.RefObject<HTMLElement | null>;
  /** Appele avec -1 ou +1. */
  onDeplacer: (sens: number) => void;
  /** Vrai pendant l'animation : les gestes sont ignores. */
  verrouille: () => boolean;
};

/**
 * Molette, doigt et clavier pilotent le passage d'une diapo a l'autre.
 * Un geste egale une diapo : la molette est cumulee jusqu'a un seuil puis
 * remise a zero, ce qui evite qu'un seul coup de pave tactile en traverse
 * trois.
 */
export function useWheelNavigation({ cible, onDeplacer, verrouille }: Options) {
  const cumul = useRef(0);
  const departTactile = useRef<number | null>(null);
  const departTactileX = useRef<number | null>(null);

  useEffect(() => {
    const zone = cible.current;
    if (!zone) return;

    const onWheel = (e: WheelEvent) => {
      const sens = Math.sign(e.deltaY || e.deltaX);
      if (!sens) return;
      if (peutDefilerDedans(e.target, sens, zone)) return;

      e.preventDefault();
      if (verrouille()) return;

      cumul.current += e.deltaY || e.deltaX;
      if (Math.abs(cumul.current) < SEUIL_MOLETTE) return;
      cumul.current = 0;
      onDeplacer(sens);
    };

    const onTouchStart = (e: TouchEvent) => {
      departTactile.current = e.touches[0]?.clientY ?? null;
      departTactileX.current = e.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const depart = departTactile.current;
      departTactile.current = null;
      if (depart === null || verrouille()) return;

      const arrivee = e.changedTouches[0]?.clientY ?? depart;
      const delta = depart - arrivee;
      if (Math.abs(delta) < SEUIL_TACTILE) return;
      // Un glissement doit etre franchement vertical. Sans ca, un geste en
      // diagonale sur la pellicule des projets changeait la tuile et l'ecran
      // du meme coup : l'ecran defilait sous le doigt alors qu'on parcourait
      // les projets.
      const departX = departTactileX.current;
      const arriveeX = e.changedTouches[0]?.clientX ?? departX ?? 0;
      if (departX !== null && Math.abs(departX - arriveeX) >= Math.abs(delta)) return;
      if (peutDefilerDedans(e.target, Math.sign(delta), zone)) return;
      onDeplacer(Math.sign(delta));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Un ecran a pu traiter la touche avant nous, la pellicule des projets
      // par exemple, ou les fleches choisissent une tuile.
      if (e.defaultPrevented) return;
      const suivant = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key);
      const precedent = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
      if (!suivant && !precedent) return;
      e.preventDefault();
      if (verrouille()) return;
      onDeplacer(suivant ? 1 : -1);
    };

    zone.addEventListener('wheel', onWheel, { passive: false });
    zone.addEventListener('touchstart', onTouchStart, { passive: true });
    zone.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      zone.removeEventListener('wheel', onWheel);
      zone.removeEventListener('touchstart', onTouchStart);
      zone.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [cible, onDeplacer, verrouille]);
}
