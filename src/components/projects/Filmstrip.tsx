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

/** Pellicule : tuiles identiques, projet actif verrouille au centre. */
export function Filmstrip({ active, onActivate, onOpen }: Props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.kicker}>
        02, Projets
        <span className={styles.count}>
          {PROJECTS[active].index} / {PROJECTS.length.toString().padStart(2, '0')}
        </span>
      </p>

      <div
        className={styles.strip}
        role="listbox"
        aria-label="Projets"
        aria-activedescendant={`tile-${PROJECTS[active].id}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') onActivate(Math.min(active + 1, PROJECTS.length - 1));
          if (e.key === 'ArrowLeft') onActivate(Math.max(active - 1, 0));
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(active);
          }
        }}
      >
        {PROJECTS.map((project, i) => {
          const offset = i - active;
          return (
            <button
              key={project.id}
              id={`tile-${project.id}`}
              data-tile-id={project.id}
              type="button"
              role="option"
              aria-selected={i === active}
              className={`${styles.tile} ${i === active ? styles.current : ''}`}
              style={{
                ['--pos' as string]: posFor(offset),
                ['--dim' as string]: Math.min(Math.abs(offset), 6),
                background: `linear-gradient(160deg, ${project.tint[0]}, ${project.tint[1]})`,
              }}
              onClick={() => (i === active ? onOpen(i) : onActivate(i))}
            >
              <span className={styles.name}>{project.name}</span>
              <span className={styles.idx}>{project.index}</span>
            </button>
          );
        })}
      </div>

      <p className={styles.hint}>
        Fleches pour parcourir, le projet actif reste au centre. Entree ou clic pour ouvrir.
      </p>
    </div>
  );
}
