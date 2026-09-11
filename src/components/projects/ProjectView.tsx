import { useCallback, useEffect, useRef, type CSSProperties } from 'react';

import { RETOUR_ACCUEIL } from '@/lib/deck';
import { gsap, useGSAP } from '@/lib/gsap';
import type { Project } from './projects.data';
import styles from './ProjectView.module.css';

type Props = {
  project: Project;
  originRect: DOMRect | null;
  onClose: () => void;
};

/** Prise de vue plein panneau d'un projet : titre geant, media, meta, bento. */
export function ProjectView({ project, originRect, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /** Retrouve la tuile d'ou la fiche est sortie, pour y revenir. */
  const tuile = useCallback(
    () => document.querySelector<HTMLElement>(`[data-tile-id="${project.id}"]`),
    [project.id],
  );

  /**
   * Fermeture animee : l'inverse de l'ouverture. Sans elle la fiche
   * disparaissait d'un coup alors qu'elle etait entree en fondu depuis sa
   * tuile, ce qui donnait une experience bancale d'un cote seulement.
   *
   * Le rectangle de destination est relu au moment de fermer, et non repris
   * de l'ouverture : la pellicule a pu bouger entre-temps.
   */
  const fermeture = useRef(false);
  const fermer = useCallback(() => {
    if (fermeture.current) return;
    fermeture.current = true;

    const root = rootRef.current;
    const hero = heroRef.current;
    const cible = tuile();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!root || !hero || !cible || reduced) {
      onClose();
      return;
    }

    const depart = hero.getBoundingClientRect();
    const arrivee = cible.getBoundingClientRect();

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: onClose });
    tl.to(root.querySelectorAll(`.${styles.reveal}`), {
      autoAlpha: 0,
      y: 14,
      duration: 0.22,
      stagger: { each: 0.03, from: 'end' },
    });
    tl.to(
      hero,
      {
        x: arrivee.left + arrivee.width / 2 - (depart.left + depart.width / 2),
        y: arrivee.top + arrivee.height / 2 - (depart.top + depart.height / 2),
        scaleX: arrivee.width / depart.width,
        scaleY: arrivee.height / depart.height,
        duration: 0.45,
      },
      '-=0.1',
    );
    tl.to(root, { autoAlpha: 0, duration: 0.25 }, '-=0.3');
  }, [onClose, tuile]);

  /** Echap ferme la fiche, comme toute couche qui recouvre la page. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      fermer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fermer]);

  /**
   * Le logotype du chrome ramene au hub. La fiche recouvre le diaporama sans
   * en faire partie : sans ca, elle resterait par-dessus une fois arrive.
   */
  useEffect(() => {
    window.addEventListener(RETOUR_ACCUEIL, fermer);
    return () => window.removeEventListener(RETOUR_ACCUEIL, fermer);
  }, [fermer]);

  /**
   * Le focus entre dans la fiche a l'ouverture et retourne sur la tuile a la
   * fermeture : sinon il restait sur une tuile devenue invisible, puis se
   * retrouvait en tete de document au retour.
   */
  useEffect(() => {
    const retour = tuile();
    closeRef.current?.focus();
    return () => retour?.focus();
  }, [tuile]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const hero = heroRef.current;
      if (!root || !hero) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !originRect) {
        gsap.set(root, { autoAlpha: 1 });
        return;
      }

      // FLIP maison : le media part de la tuile d'origine et rejoint sa place.
      const dest = hero.getBoundingClientRect();
      const dx = originRect.left + originRect.width / 2 - (dest.left + dest.width / 2);
      const dy = originRect.top + originRect.height / 2 - (dest.top + dest.height / 2);

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(root.querySelectorAll(`.${styles.reveal}`), { autoAlpha: 0, y: 24 });
      gsap.set(hero, {
        x: dx,
        y: dy,
        scaleX: originRect.width / dest.width,
        scaleY: originRect.height / dest.height,
        transformOrigin: 'center center',
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.to(hero, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.55 });
      tl.to(
        root.querySelectorAll(`.${styles.reveal}`),
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 },
        '-=0.25',
      );
    },
    { scope: rootRef, dependencies: [project.id] },
  );

  /**
   * Le chrome est fixe au-dessus de la fiche et garde les couleurs du site.
   * Sur un fond de projet sature, son violet tombe a 1,5:1. On le previent que
   * la couche est ouverte, il repasse en neutre clair le temps de la visite.
   */
  useEffect(() => {
    document.documentElement.dataset.takeover = 'on';
    return () => {
      delete document.documentElement.dataset.takeover;
    };
  }, []);

  const isLogo = project.media?.kind === 'logo';

  /**
   * La fiche prend la direction artistique du projet, pas celle du site.
   * Les quatre jetons se deduisent de la palette, ce qui evite d'avoir a
   * declarer un theme complet par projet :
   *
   * - `ground` : la couleur du projet assombrie vers le noir, pour porter du
   *   texte clair. Elle marche pour une palette deja sombre (Papyrus) comme
   *   pour une palette vive (ASSURFAST, dont le bleu seul serait trop clair).
   * - `accent` : la couleur d'accent du projet, celle du nom sur la tuile.
   * - `ink` / `muted` : texte principal et secondaire, tires de l'accent pour
   *   qu'ils restent dans la meme famille chromatique.
   */
  const theme = {
    '--p-ground': `color-mix(in srgb, ${project.palette.from} 70%, #0a0a14)`,
    '--p-ground-2': `color-mix(in srgb, ${project.palette.to} 42%, #0a0a14)`,
    '--p-accent': project.palette.ink,
    '--p-ink': `color-mix(in srgb, ${project.palette.ink} 16%, #ffffff)`,
    '--p-muted': `color-mix(in srgb, ${project.palette.ink} 22%, #ccd3e2)`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.root} style={theme}>
      <button ref={closeRef} type="button" className={styles.close} onClick={fermer}>
        Retour aux projets
      </button>

      {/* Le titre est un enfant direct de la grille, et non de la colonne du
          visuel : c'est ce qui permet a la colonne de lecture de commencer au
          niveau de l'apercu et non du nom. */}
      <h2 className={`${styles.title} ${styles.reveal}`}>{project.name}</h2>

      <div className={styles.visual}>
        <div
          ref={heroRef}
          className={styles.hero}
          style={{
            /**
             * Un logo garde ses propres couleurs. Celui d'ASSURFAST est bleu
             * marine : pose sur le bleu vif de sa palette il deviendrait
             * illisible. Le fond passe donc en lavis de cette meme couleur,
             * assez pale pour que la marque ressorte, assez teinte pour que le
             * projet reste reconnaissable.
             */
            background: isLogo
              ? `linear-gradient(150deg, color-mix(in srgb, ${project.palette.from} 12%, #fff), color-mix(in srgb, ${project.palette.to} 22%, #fff))`
              : `linear-gradient(150deg, ${project.palette.from}, ${project.palette.to})`,
          }}
        >
          {project.media ? (
            <img
              className={isLogo ? styles.heroLogo : styles.heroImage}
              src={project.media.src}
              alt={project.media.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            /* Pas d'etiquette "a venir" quand une note explique qu'il n'y en
               aura pas : les deux se contrediraient. */
            !project.mediaNote && (
              <span className={styles.heroLabel} style={{ color: project.palette.ink }}>
                aperçu, média à venir
              </span>
            )
          )}
        </div>

        {project.mediaNote && (
          <p className={`${styles.mediaNote} ${styles.reveal}`}>{project.mediaNote}</p>
        )}

        <div className={`${styles.meta} ${styles.reveal}`}>
          <span>{project.year}</span>
          <span>{project.kind}</span>
          <span>{project.role}</span>
        </div>
      </div>

      <div className={styles.bento}>
        <p className={`${styles.pitch} ${styles.reveal}`}>{project.pitch}</p>

        <div className={`${styles.stack} ${styles.reveal}`}>
          <span className={styles.label}>Stack</span>
          <ul>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className={styles.metrics}>
          {project.metrics.map((metric) => (
            <div key={metric.label} className={`${styles.metric} ${styles.reveal}`}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        {project.links.length > 0 && (
          <nav className={`${styles.links} ${styles.reveal}`} aria-label="Liens du projet">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} &#8599;
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
