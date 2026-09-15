import { useCallback, useEffect, useRef, useState } from 'react';

import { useDeck, usePanneauActif } from '@/lib/deck';
import { PROJECTS } from './projects.data';
import { Filmstrip } from './Filmstrip';
import { ProjectView } from './ProjectView';
import styles from './Projects.module.css';

/**
 * Ecran 02, Projets. Pellicule centree, puis prise de vue plein panneau du
 * projet choisi (titre geant + media + bento), avec un FLIP maison depuis la
 * tuile d'origine.
 * TODO(feat/projects) : ecran "explore" editorial intermediaire, vraies captures.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  /**
   * La molette parcourt d'abord les projets, puis quitte l'ecran.
   *
   * Sur un pave tactile, le geste naturel est de faire defiler : l'utilisateur
   * arrivait sur la pellicule et la traversait sans en voir un seul projet,
   * parce que le premier cran l'emmenait deja a l'ecran suivant. Le capteur
   * consomme le pas tant qu'il reste une tuile dans le sens demande, et ne
   * rend la main qu'aux deux extremites. Au clavier, les fleches haut et bas
   * suivent la meme regle ; gauche et droite restent traitees par la
   * pellicule, qui emmene le focus avec elle.
   *
   * Le tout est en refs : le capteur est pose une fois et lu au moment du
   * geste, sinon il faudrait le reposer a chaque changement de tuile.
   */
  const { capter } = useDeck();
  const visible = usePanneauActif();
  const etat = useRef({ active, open });
  useEffect(() => {
    etat.current = { active, open };
  }, [active, open]);

  const absorber = useCallback((sens: number) => {
    /* Fiche ouverte : elle a sa propre lecture, la pellicule ne bouge pas
       derriere elle. */
    if (etat.current.open !== null) return false;
    const cible = etat.current.active + sens;
    if (cible < 0 || cible > PROJECTS.length - 1) return false;
    setActive(cible);
    return true;
  }, []);

  useEffect(() => {
    if (!visible) return;
    capter(absorber);
    return () => capter(null);
  }, [visible, capter, absorber]);

  const handleOpen = (index: number) => {
    const tile = document.querySelector(`[data-tile-id="${PROJECTS[index].id}"]`);
    setOriginRect(tile ? tile.getBoundingClientRect() : null);
    setOpen(index);
  };

  return (
    <section className={styles.projects} id="projets" aria-label="Projets">
      <Filmstrip active={active} onActivate={setActive} onOpen={handleOpen} />

      {open !== null && (
        <ProjectView
          project={PROJECTS[open]}
          originRect={originRect}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
