import { useCallback, useEffect, useRef, useState } from 'react';

/** Distance a parcourir avant qu'un appui devienne un glisser. */
const SEUIL = 6;

export type Glisse = {
  /** Identifiant du module deplace. */
  id: number;
  /** Position du pointeur, pour dessiner le module sous le doigt. */
  x: number;
  y: number;
  /** Vrai une fois le seuil franchi : avant, c'est peut-etre un simple clic. */
  actif: boolean;
};

type Options = {
  /** Appele quand un module est lache sur une case. */
  onDepose: (id: number, cible: number) => void;
};

/**
 * Glisser-deposer des modules du circuit, en evenements de pointeur.
 *
 * Pointer events plutot que l'API drag and drop native : celle-ci ne fonctionne
 * pas au doigt sans polyfill, et ne permet pas de dessiner librement l'objet
 * deplace. Ici la souris, le stylet et le doigt suivent le meme chemin.
 *
 * Un appui ne devient un glisser qu'apres quelques pixels. En deca, le clic
 * passe normalement : selectionner un module d'un clic reste possible, et
 * chaque module garde son bouton de rotation.
 */
export function useDragModule({ onDepose }: Options) {
  const [glisse, setGlisse] = useState<Glisse | null>(null);
  const depart = useRef<{ x: number; y: number } | null>(null);
  /** Case survolee, pour la mettre en evidence pendant le deplacement. */
  const [survolee, setSurvolee] = useState<number | null>(null);

  const commencer = useCallback((id: number, e: React.PointerEvent) => {
    // Bouton principal seulement : un clic droit ne deplace rien.
    if (e.button !== 0) return;
    depart.current = { x: e.clientX, y: e.clientY };
    setGlisse({ id, x: e.clientX, y: e.clientY, actif: false });
  }, []);

  useEffect(() => {
    if (!glisse) return;

    /** La case sous le pointeur, s'il y en a une qui accepte un module. */
    const caseSous = (x: number, y: number): number | null => {
      const el = document.elementFromPoint(x, y);
      const cellule = el?.closest<HTMLElement>('[data-case]');
      if (!cellule || cellule.dataset.accepte !== 'oui') return null;
      return Number(cellule.dataset.case);
    };

    const onMove = (e: PointerEvent) => {
      const d = depart.current;
      const actif = !!d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > SEUIL;
      setGlisse((g) => (g ? { ...g, x: e.clientX, y: e.clientY, actif: g.actif || actif } : g));
      if (actif) setSurvolee(caseSous(e.clientX, e.clientY));
    };

    const onUp = (e: PointerEvent) => {
      const courant = glisse;
      const cible = courant.actif ? caseSous(e.clientX, e.clientY) : null;
      depart.current = null;
      setGlisse(null);
      setSurvolee(null);
      if (cible !== null) onDepose(courant.id, cible);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [glisse, onDepose]);

  return { glisse, survolee, commencer };
}
