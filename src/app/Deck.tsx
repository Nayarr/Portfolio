import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';
import { DeckProvider, PanneauProvider, type Capteur, type DeckApi } from '@/lib/deck';
import { useWheelNavigation } from '@/lib/useWheelNavigation';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { NextSlide } from '@/components/ui/NextSlide';
import { SectionIndex } from '@/components/ui/SectionIndex';
import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';

import styles from './Deck.module.css';

const ECRANS = [Hub, Projects, Experience, About, Contact];

/**
 * Fond de chaque ecran, clair ou sombre. Le chrome en a besoin : la barre
 * d'index survole les cinq, et sans teinte le texte des diapos qui defilent
 * passait au travers, illisible au telephone. Un simple flou ne suffisait pas
 * sur un fond clair charge de pastilles.
 */
const TONS = ['clair', 'sombre', 'clair', 'clair', 'sombre'] as const;

/** Duree d'une transition, et temps pendant lequel les gestes sont ignores. */
const DUREE = 0.75;

/**
 * Temps d'attente apres un pas absorbe par un ecran. Il est plus court qu'une
 * transition de diapo parce que la pellicule, elle, bouge en 450 ms, et il
 * existe pour la meme raison que le verrou principal : sans lui, une seule
 * poussee de pave tactile, qui emet des dizaines d'evenements, traverserait
 * les sept projets d'un coup.
 */
const PAS_INTERNE = 420;

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
  /**
   * Le miroir de `index` que lit l'observateur de redimensionnement. Il est
   * ecrit dans un effet et non pendant le rendu : React peut rendre deux fois
   * avant de valider, et une ecriture pendant le rendu laisse alors la ref sur
   * une valeur d'un rendu abandonne. L'observateur se declenche apres la mise
   * en page, donc bien apres l'effet, il lit toujours l'index a jour.
   */
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  /* Le chrome est rendu hors de la piste : il lit le ton sur la racine. */
  useEffect(() => {
    document.documentElement.dataset.ton = TONS[index];
  }, [index]);

  /**
   * Une seule minuterie pour le verrou, partagee par le changement de diapo et
   * le pas absorbe : deux minuteries sur la meme ref se seraient annulees
   * l'une l'autre, celle qui tombe en dernier deverrouillant au mauvais
   * moment.
   */
  const minuterieRef = useRef(0);
  const verrouiller = useCallback((ms: number) => {
    window.clearTimeout(minuterieRef.current);
    verrouRef.current = true;
    minuterieRef.current = window.setTimeout(() => {
      verrouRef.current = false;
    }, ms);
  }, []);

  /** Capteur de l'ecran visible, s'il en a pose un. */
  const capteurRef = useRef<Capteur | null>(null);
  const capter = useCallback((fn: Capteur | null) => {
    capteurRef.current = fn;
  }, []);

  const goTo = useCallback((cible: number) => {
    setIndex(() => Math.min(Math.max(cible, 0), ECRANS.length - 1));
  }, []);

  /**
   * Un pas de navigation. L'ecran visible a la priorite : tant que la
   * pellicule des projets a des tuiles devant elle, la molette les parcourt et
   * le diaporama ne bouge pas. Arrivee en butee, elle rend la main et le pas
   * suivant change de diapo.
   */
  const deplacer = useCallback(
    (sens: number) => {
      if (capteurRef.current?.(sens)) {
        verrouiller(PAS_INTERNE);
        return;
      }
      setIndex((i) => Math.min(Math.max(i + sens, 0), ECRANS.length - 1));
    },
    [verrouiller],
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
    verrouiller(reduit ? 0 : DUREE * 1000);

    tweenRef.current = gsap.to(track, {
      x: -index * root.clientWidth,
      duration: reduit ? 0 : DUREE,
      ease: 'power3.inOut',
      overwrite: true,
    });

    return () => {
      window.clearTimeout(minuterieRef.current);
      tweenRef.current?.kill();
      verrouRef.current = false;
    };
  }, [index, verrouiller]);

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

  const api = useMemo<DeckApi>(
    () => ({ index, count: ECRANS.length, goTo, capter }),
    [index, goTo, capter],
  );

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
              <PanneauProvider value={i}>
                <Ecran />
              </PanneauProvider>
            </div>
          ))}
        </div>
      </main>

      <SectionIndex />
      <NextSlide />
    </DeckProvider>
  );
}
