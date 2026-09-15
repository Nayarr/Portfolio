import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const legendeRef = useRef<HTMLParagraphElement>(null);

  /**
   * Le nom de la tuile choisie descend en pied de pellicule.
   *
   * Chaque tuile porte son nom en petit, a son pied. Quand l'une devient
   * active, le sien s'efface et la legende le reprend en grand, en partant de
   * l'endroit exact qu'il occupait : une seule etiquette qui se deplace,
   * plutot qu'une qui disparait et une autre qui apparait ailleurs.
   *
   * Les deux reperes sont mesures au vol. Celui de la tuile reste fiable
   * pendant sa transition : une tuile ne se deplace qu'en X et ne change que
   * d'echelle horizontale, son sommet ne bouge pas. Et la tuile active etant
   * toujours centree, il n'y a pas d'ecart horizontal a rattraper.
   */
  useGSAP(
    () => {
      const legende = legendeRef.current;
      const nom = stripRef.current?.querySelector<HTMLElement>(
        `[data-tile-id="${PROJECTS[active].id}"] .${styles.name}`,
      );
      if (!legende || !nom) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const depart = nom.getBoundingClientRect();
        const arrivee = legende.getBoundingClientRect();
        if (!arrivee.height) return;

        gsap.from(legende, {
          y: depart.top - arrivee.top,
          scaleX: depart.height / arrivee.height,
          scaleY: depart.height / arrivee.height,
          opacity: 0.25,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: wrapRef },
  );

  /** Deplace la selection et emmene le focus avec elle. */
  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), PROJECTS.length - 1);
    onActivate(next);
    stripRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tile-id="${PROJECTS[next].id}"]`)
      ?.focus();
  };

  /**
   * Glissement horizontal sur la pellicule : il change de projet, pas d'ecran.
   *
   * Ecouteurs natifs et non props React : React delegue les siens a la racine
   * du document, donc ils s'executent apres l'ecouteur natif du diaporama,
   * pose sur la fenetre. Un `stopPropagation` depuis une prop React arriverait
   * trop tard. Poses directement sur la pellicule, ils remontent avant lui et
   * peuvent l'arreter, sinon un meme geste changerait la tuile et l'ecran.
   *
   * La selection change sans emmener le focus : un glissement n'est pas une
   * navigation au clavier, et deplacer le focus ferait apparaitre l'anneau de
   * mise au point sur un ecran tactile.
   */
  const depart = useRef<{ x: number; y: number } | null>(null);
  /* Ecrit dans un effet et non pendant le rendu : une ecriture pendant le
     rendu laisserait la ref sur les valeurs d'un rendu abandonne, React
     pouvant rendre deux fois avant de valider. Le geste arrive apres. */
  const etat = useRef({ active, onActivate });
  useEffect(() => {
    etat.current = { active, onActivate };
  }, [active, onActivate]);

  useEffect(() => {
    const zone = stripRef.current;
    if (!zone) return;

    const onStart = (e: globalThis.TouchEvent) => {
      const t = e.touches[0];
      depart.current = t ? { x: t.clientX, y: t.clientY } : null;
    };

    const onEnd = (e: globalThis.TouchEvent) => {
      const debut = depart.current;
      depart.current = null;
      const fin = e.changedTouches[0];
      if (!debut || !fin) return;

      const dx = debut.x - fin.clientX;
      const dy = debut.y - fin.clientY;
      if (Math.abs(dx) < SEUIL_TACTILE || Math.abs(dx) <= Math.abs(dy)) return;

      e.stopPropagation();
      const { active: courant, onActivate: choisir } = etat.current;
      choisir(Math.min(Math.max(courant + Math.sign(dx), 0), PROJECTS.length - 1));
    };

    zone.addEventListener('touchstart', onStart, { passive: true });
    zone.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      zone.removeEventListener('touchstart', onStart);
      zone.removeEventListener('touchend', onEnd);
    };
  }, []);

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

  const projet = PROJECTS[active];

  return (
    <div ref={wrapRef} className={styles.wrap}>
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

      <p
        ref={legendeRef}
        className={styles.legende}
        style={{ ['--ink-actif' as string]: projet.palette.ink } as CSSProperties}
        aria-hidden="true"
      >
        {projet.name}
      </p>

      {/* Le conseil parlait de fleches et d'Entree, ce qui ne veut rien dire
          au doigt. Il decrit maintenant le geste, le clavier en complement. */}
      <p className={styles.hint}>
        Glisse pour parcourir, touche la tuile centrale pour l’ouvrir.
        <span className={styles.hintKeys}> Au clavier : flèches, puis Entrée.</span>
      </p>
    </div>
  );
}
