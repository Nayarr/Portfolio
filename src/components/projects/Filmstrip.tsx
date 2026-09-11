import { useRef, type KeyboardEvent } from 'react';

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
                background: `linear-gradient(160deg, ${project.tint[0]}, ${project.tint[1]})`,
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
        Touche une tuile pour la choisir, la tuile centrale pour l’ouvrir.
        <span className={styles.hintKeys}> Au clavier : flèches, puis Entrée.</span>
      </p>
    </div>
  );
}
