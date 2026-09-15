import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { STACK } from './stack.data';
import styles from './Hub.module.css';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Nayarr',
    path: 'M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.28 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/oughlis-rayan/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z',
  },
];

/** Ecran 01, Hub. Hero editorial : nom, accroche, stack rangee, liens. */
export function Hub() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(rootRef.current!.querySelectorAll('[data-rise]'), {
          y: 26,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.hub} aria-label="Hub">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.kicker} data-rise>
          Développeur Full stack | Automatisation &amp; IA | Paris
        </p>

        <h1 className={styles.title}>
          <span data-rise>Rayan</span>
          <span className={styles.accent} data-rise>
            Oughlis
          </span>
        </h1>

        <p className={styles.lede} data-rise>
          Je conçois des applications web, des pipelines de données et des agents IA, et je fais en
          sorte qu’on les <em>ressente</em> au fil de la navigation.
        </p>

        <div className={styles.foot} data-rise>
          <nav className={styles.socials} aria-label="Liens">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Colonne de droite : la stack rangee par famille. Elle remplace le
          panneau isometrique, qui occupait la place sans rien apprendre. */}
      <aside className={styles.stack} data-rise aria-label="Stack">
        <p className={styles.stackTag}>Ce avec quoi je travaille</p>
        <dl className={styles.stackList}>
          {STACK.map(({ titre, outils }) => (
            <div key={titre} className={styles.stackGroup}>
              <dt>{titre}</dt>
              <dd>
                <ul>
                  {outils.map(({ nom, ton }) => (
                    <li key={nom} className={styles[`ton${ton}`]}>
                      {nom}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        {/* Deux lignes explicites. Sur une seule, les trois informations se
            suivaient separees par des virgules et la ligne se coupait la ou la
            largeur tombait, pas la ou le sens change : on lisait un bloc
            fouillis. Le quoi est maintenant au-dessus, le quand en dessous. */}
        <p className={styles.avail}>
          <span className={styles.availDot} aria-hidden="true" />
          <span className={styles.availTexte}>
            <strong>Dispo en alternance</strong>1 an, à partir de sept. 2026
          </span>
        </p>
      </aside>
    </section>
  );
}
