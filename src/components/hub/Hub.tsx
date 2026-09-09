import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Hub.module.css';

const STACK = ['JavaScript', 'TypeScript', 'Python', 'PHP', 'React', 'Flask', 'SQL', 'Supabase'];

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

/** Ecran 01, Hub. Hero editorial : nom, accroche, stack, liens, panneau isometrique. */
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
          Développeur full-stack, freelance (EI), Vitry-sur-Seine 94
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

        <ul className={styles.stack} data-rise>
          {STACK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.foot} data-rise>
          <nav className={styles.socials} aria-label="Liens">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
            <a href="https://instagram.com/rayan.ough" aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </nav>
          <span className={styles.avail}>Dispo alternance, sept. 2026</span>
        </div>
      </div>

      <div className={styles.panel} data-rise aria-hidden="true">
        <span className={styles.scanTag}>Scan pour révéler</span>
        <svg viewBox="0 0 426 330">
          <path d="M213 40 396 150 213 260 30 150Z" fill="var(--bg)" stroke="var(--line)" />
          <path
            d="M213 96 320 158 213 220 106 158Z"
            fill="rgba(124,58,237,.06)"
            stroke="rgba(124,58,237,.28)"
          />
          <path d="M150 150 150 176 250 234 250 208Z" fill="var(--bg-2)" stroke="var(--violet)" />
          <path d="M250 208 250 234 320 194 320 168Z" fill="#e7dffa" stroke="var(--violet)" />
          <path d="M150 150 250 208 320 168 220 110Z" fill="#f1ecfc" stroke="var(--violet)" />
          <path
            d="M176 120 176 92 214 114 214 142Z"
            fill="var(--bg)"
            stroke="var(--violet-bright)"
          />
          <path d="M180 118 180 100 210 118 210 136Z" fill="rgba(154,92,255,.18)" />
          <path
            d="M226 150 226 120 268 144 268 174Z"
            fill="var(--bg)"
            stroke="var(--violet-bright)"
          />
          <path d="M231 148 231 128 263 146 263 166Z" fill="rgba(154,92,255,.18)" />
          <path d="M150 210 150 250 176 264 176 224Z" fill="#e7dffa" stroke="var(--violet)" />
          <path d="M150 178 150 210 176 224 176 192Z" fill="#e7dffa" stroke="var(--violet)" />
        </svg>
        <span className={styles.panelCaption}>mon poste de travail</span>
      </div>

      <ol className={styles.index} data-rise>
        <li className={styles.here}>01, Hub</li>
        <li>02, Projets</li>
        <li>03, Expérience</li>
        <li>04, À propos</li>
        <li>05, Contact</li>
        <li className={styles.arrow} aria-hidden="true">
          &rarr;
        </li>
      </ol>
    </section>
  );
}
