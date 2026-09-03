import { useState } from 'react';

import { playSfx } from '@/lib/audio';
import styles from './Experience.module.css';

type Step = {
  title: string;
  period: string;
  lines: string[];
};

const STEPS: Step[] = [
  {
    title: 'Freelance / EI, developpeur full-stack',
    period: 'Juin 2026 vers present, France',
    lines: [
      'Direction et strategie, dev web / mobile et SaaS.',
      'IA et automatisation (workflows, agents, pipelines), dashboards KPI temps reel.',
    ],
  },
  {
    title: 'ASSURFAST, lead technique projets (stage S4)',
    period: 'Avr. vers juin 2026, 8 semaines, Alfortville',
    lines: [
      'Seul profil technique du cabinet, du besoin a la mise en production.',
      'AssurFill (OCR permis + carte grise), refonte SEO (impressions x5), traitement 100 % local.',
    ],
  },
  {
    title: 'BUT Informatique, IUT Creteil/Vitry (UPEC)',
    period: 'Sept. 2024 vers juin 2027 (prevu)',
    lines: ['Parcours realisation d’applications : conception, developpement, validation.'],
  },
  {
    title: 'Lycee Paul Langevin, Beauvais',
    period: 'Juillet 2024',
    lines: ['Bac STI2D, mention Tres Bien.'],
  },
];

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ecran 03, Experience. Circuit a alimenter : chaque etape revelee s'allume. */
export function Experience() {
  const [revealed, setRevealed] = useState(reduced ? STEPS.length : 2);

  const revealNext = () => {
    setRevealed((n) => {
      if (n >= STEPS.length) return n;
      if (!reduced) playSfx('zap');
      return n + 1;
    });
  };

  const revealAll = () => setRevealed(STEPS.length);

  return (
    <section className={styles.experience} id="experience" aria-label="Experience">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 className={styles.title}>
            Retablis
            <br />
            le courant
          </h2>
          <p className={styles.text}>
            Alimente le circuit etape par etape. Une etape alimentee, c&apos;est une etape qui se
            raconte.
          </p>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.revealAll}
              onClick={revealAll}
              disabled={revealed >= STEPS.length}
            >
              Tout reveler
            </button>
            <span className={styles.count}>
              {Math.min(revealed, STEPS.length)} / {STEPS.length} alimentees
            </span>
          </div>
          <p className={styles.legend}>Eteint = lilas, alimente = neon.</p>
        </header>

        <ol className={styles.circuit}>
          <li className={styles.source} aria-hidden="true">
            <span className={styles.plug} />
            Source
          </li>
          {STEPS.map((step, i) => {
            const lit = i < revealed;
            const next = i === revealed;
            return (
              <li key={step.title} className={`${styles.step} ${lit ? styles.lit : ''}`}>
                <span className={styles.wire} aria-hidden="true" />
                <div className={styles.node} aria-hidden="true" />
                <div className={styles.card}>
                  {lit ? (
                    <>
                      <h3>{step.title}</h3>
                      <p className={styles.period}>{step.period}</p>
                      {step.lines.map((line) => (
                        <p key={line} className={styles.line}>
                          {line}
                        </p>
                      ))}
                    </>
                  ) : (
                    <button
                      type="button"
                      className={styles.reveal}
                      onClick={revealNext}
                      disabled={!next}
                    >
                      {next ? 'Alimenter cette etape' : 'A alimenter'}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
