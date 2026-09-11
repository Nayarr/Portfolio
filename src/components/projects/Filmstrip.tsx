import { useRef, type KeyboardEvent, type TouchEvent } from 'react';

import { PROJECTS } from './projects.data';
import styles from './Filmstrip.module.css';

type Props = {
  active: number;
  onActivate: (index: number) => void;
  onOpen: (index: number) => void;
};

const TILE = 82;
const ACTIVE = 120;
const GAP = 8;
/** Distance de doigt avant de changer de tuile. */
const SEUIL_TACTILE = 40;

/** Position horizontale d'une tuile par rapport au centre (tuile active = 0). */
function posFor(offset: number): number {
  if (offset === 0) return 0;
  const base = ACTIVE / 2 + GAP + TILE / 2;
  const extra = (Math.abs(offset) - 1) * (TILE + GAP);
  return Math.sign(offset) * (base + extra);
}

/**
 * Pellicule : tuiles identiques, projet actif verrouille au centre.
 *
 * Motif « toolbar » a tabulation glissante : la pellicule ne prend qu'un seul
 * arret de tabulation, les fleches deplacent le focus d'une tuile a l'autre.
 * L'ancien montage (`role="listbox"` avec des `<button role="option">`)
 * n'etait pas valide : une listbox n'accepte pas d'enfants focalisables, et
 * les tuiles restaient inatteignables au clavier une par une.
 */
export function Filmstrip({ active, onActivate, onOpen }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);

  /** Deplace la selection et emmene le focus avec elle. */
  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), PROJECTS.length - 1);
    onActivate(next);
    stripRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tile-id="${PROJECTS[next].id}"]`)
      ?.focus();
  };

  /**
   * Glissement horizontal. Au doigt, la pellicule ne repondait qu'a la touche
   * d'une tuile : le geste qu'on attend d'un carrousel ne faisait rien, et
   * les tuiles lointaines, a demi sorties de l'ecran, etaient hors d'atteinte.
   *
   * La selection change sans emmener le focus : un glissement n'est pas une
   * navigation au clavier, et deplacer le focus ferait apparaitre l'anneau de
   * mise au point sur un ecran tactile.
   */
  const depart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    depart.current = t ? { x: t.clientX, y: t.clientY } : null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const debut = depart.current;
    depart.current = null;
    const fin = e.changedTouches[0];
    if (!debut || !fin) return;

    const dx = debut.x - fin.clientX;
    const dy = debut.y - fin.clientY;
    // Un glissement plus vertical qu'horizontal appartient au diaporama.
    if (Math.abs(dx) < SEUIL_TACTILE || Math.abs(dx) <= Math.abs(dy)) return;

    // Pas de stopPropagation ici : React delegue ses ecouteurs a la racine,
    // donc celui-ci s'execute apres l'ecouteur natif du diaporama. C'est le
    // diaporama qui arbitre, en n'acceptant qu'un glissement franchement
    // vertical (voir useWheelNavigation).
    onActivate(Math.min(Math.max(active + Math.sign(dx), 0), PROJECTS.length - 1));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveTo(active + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveTo(active - 1);
        break;
      case 'Home':
        e.preventDefault();
        moveTo(0);
        break;
      case 'End':
        e.preventDefault();
        moveTo(PROJECTS.length - 1);
        break;
    }
  };

  return (
    <div className={styles.wrap}>
      <p className={styles.kicker}>
        02, Projets
        <span className={styles.count}>
          {PROJECTS[active].index} / {PROJECTS.length.toString().padStart(2, '0')}
        </span>
      </p>

      <div
        ref={stripRef}
        className={styles.strip}
        role="toolbar"
        aria-label="Projets"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PROJECTS.map((project, i) => {
          const offset = i - active;
          const current = i === active;
          return (
            <button
              key={project.id}
              id={`tile-${project.id}`}
              data-tile-id={project.id}
              type="button"
              /* Un seul arret de tabulation pour toute la pellicule. */
              tabIndex={current ? 0 : -1}
              aria-current={current ? 'true' : undefined}
              className={`${styles.tile} ${current ? styles.current : ''}`}
              style={{
                ['--pos' as string]: posFor(offset),
                ['--dim' as string]: Math.min(Math.abs(offset), 6),
                ['--ink' as string]: project.palette.ink,
                background: `linear-gradient(165deg, ${project.palette.from}, ${project.palette.to})`,
              }}
              onClick={() => (current ? onOpen(i) : moveTo(i))}
            >
              <span className={styles.name}>{project.name}</span>
              <span className={styles.idx}>{project.index}</span>
              <span className={styles.sr}>
                {current ? 'Ouvrir la fiche du projet' : 'Selectionner ce projet'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Le conseil parlait de fleches et d'Entree, ce qui ne veut rien dire
          au doigt. Il decrit maintenant le geste, le clavier en complement. */}
      <p className={styles.hint}>
        Glisse pour parcourir, touche la tuile centrale pour l’ouvrir.
        <span className={styles.hintKeys}> Au clavier : flèches, puis Entrée.</span>
      </p>
    </div>
  );
}
