import { useRef } from 'react';

import { useEffect, type CSSProperties } from 'react';

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
    '--p-muted': `color-mix(in srgb, ${project.palette.ink} 22%, #b9c2d6)`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.root} style={theme}>
      <button type="button" className={styles.close} onClick={onClose}>
        Retour aux projets
      </button>

      <div className={styles.visual}>
        <h2 className={`${styles.title} ${styles.reveal}`}>{project.name}</h2>

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
