import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';
import { DeckProvider, type DeckApi } from '@/lib/deck';
import { useWheelNavigation } from '@/lib/useWheelNavigation';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { SiteFooter } from '@/components/ui/SiteFooter';
import { NextSlide } from '@/components/ui/NextSlide';
import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';

import styles from './Deck.module.css';

const ECRANS = [Hub, Projects, Experience, About, Contact];

/** Duree d'une transition, et temps pendant lequel les gestes sont ignores. */
const DUREE = 0.75;

/**
 * Le site est un diaporama : une diapo par ecran, un geste par diapo.
 *
 * Il n'y a plus de defilement de page du tout, `html` et `body` sont bloques
 * (voir global.css). La piste est translatee en X par GSAP, et molette, doigt,
 * clavier et fleche "suivant" passent tous par `goTo`.
 *
 * Une diapo dont le contenu depasse la hauteur disponible defile pour
 * elle-meme : le geste ne change de diapo qu'une fois arrive en butee. C'est
 * ce qui rend le telephone praticable sans casser la regle du un geste, une
 * diapo.
 */
export function Deck() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const verrouRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;

  const goTo = useCallback((cible: number) => {
    setIndex(() => Math.min(Math.max(cible, 0), ECRANS.length - 1));
  }, []);

  const deplacer = useCallback(
    (sens: number) => setIndex((i) => Math.min(Math.max(i + sens, 0), ECRANS.length - 1)),
    [],
  );

  const verrouille = useCallback(() => verrouRef.current, []);

  useWheelNavigation({ cible: rootRef, onDeplacer: deplacer, verrouille });

  /**
   * Deplacement vers la diapo courante.
   *
   * `useEffect` et non `useGSAP` : ce dernier revoque ses animations quand une
   * dependance change, donc il ramenait la piste a son point de depart a
   * chaque changement d'index, exactement l'inverse de ce qu'on veut ici. La
   * tween precedente est donc tuee a la main avant d'en lancer une nouvelle.
   */
  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Le verrou empeche un seul coup de pave tactile de traverser trois
     * diapos. Il est libere par une minuterie et non par la fin de la tween :
     * une animation tuee n'appelle jamais son `onComplete`, et un onglet mis
     * en arriere-plan gele le rendu. Dans les deux cas la navigation restait
     * bloquee pour de bon. Une minuterie, elle, finit toujours par tomber.
     */
    verrouRef.current = true;
    const minuterie = window.setTimeout(
      () => {
        verrouRef.current = false;
      },
      reduit ? 0 : DUREE * 1000,
    );

    tweenRef.current = gsap.to(track, {
      x: -index * root.clientWidth,
      duration: reduit ? 0 : DUREE,
      ease: 'power3.inOut',
      overwrite: true,
    });

    return () => {
      window.clearTimeout(minuterie);
      tweenRef.current?.kill();
      verrouRef.current = false;
    };
  }, [index]);

  // Un redimensionnement change la largeur d'une diapo : on recale sans animer.
  // L'index est lu dans une ref pour ne pas re-observer a chaque changement.
  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    const observateur = new ResizeObserver(() => {
      if (tweenRef.current?.isActive()) return;
      gsap.set(track, { x: -indexRef.current * root.clientWidth });
    });
    observateur.observe(root);
    return () => observateur.disconnect();
  }, []);

  const api = useMemo<DeckApi>(() => ({ index, count: ECRANS.length, goTo }), [index, goTo]);

  return (
    <DeckProvider value={api}>
      <SiteHeader />

      <main ref={rootRef} id="contenu" className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {ECRANS.map((Ecran, i) => (
            <div
              key={Ecran.name}
              className={styles.panel}
              /* Les diapos hors champ sortent de l'ordre de tabulation et de
                 l'arbre d'accessibilite : on ne tabule pas dans un ecran qu'on
                 ne voit pas. */
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <Ecran />
            </div>
          ))}
        </div>
      </main>

      <NextSlide />
      <SiteFooter />
    </DeckProvider>
  );
}
