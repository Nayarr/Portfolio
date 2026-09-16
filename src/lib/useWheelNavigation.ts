import { useEffect, useRef } from 'react';

/** Distance de molette cumulee avant de changer de diapo. */
const SEUIL_MOLETTE = 42;
/** Distance de doigt, horizontale, avant de changer de diapo. */
const SEUIL_TACTILE = 50;
/**
 * Silence qui separe deux gestes de molette.
 *
 * Un pave tactile de Mac n'arrete pas d'emettre quand les doigts se levent :
 * il continue pendant pres d'une seconde, avec des deltas qui decroissent,
 * pour simuler l'inertie. Ces evenements-la appartiennent encore au geste
 * precedent. En deca de ce silence, on est donc toujours dans le meme geste.
 */
const PAUSE_GESTE = 140;

/**
 * Remonte les ancetres du point touche pour savoir si l'un d'eux peut encore
 * defiler dans le sens demande. Sans ca, la colonne de lecture d'une fiche
 * projet ne defilerait jamais : le diaporama intercepterait tout.
 */
function peutDefilerDedans(depart: EventTarget | null, sens: number, limite: Element): boolean {
  let el = depart instanceof Element ? depart : null;
  while (el && el !== limite.parentElement) {
    const style = getComputedStyle(el);
    const defilable =
      /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
    if (defilable) {
      const enHaut = el.scrollTop <= 0;
      const enBas = el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
      if ((sens < 0 && !enHaut) || (sens > 0 && !enBas)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

type Options = {
  /** Zone qui capte les gestes. */
  cible: React.RefObject<HTMLElement | null>;
  /** Appele avec -1 ou +1. */
  onDeplacer: (sens: number) => void;
  /** Vrai pendant l'animation : les gestes sont ignores. */
  verrouille: () => boolean;
};

/**
 * Molette, doigt et clavier pilotent le passage d'une diapo a l'autre.
 * Un geste egale une diapo : la molette est cumulee jusqu'a un seuil puis
 * remise a zero, ce qui evite qu'un seul coup de pave tactile en traverse
 * trois.
 */
export function useWheelNavigation({ cible, onDeplacer, verrouille }: Options) {
  const cumul = useRef(0);
  /** Date du dernier evenement de molette, pour reperer le debut d'un geste. */
  const dernierWheel = useRef(0);
  /** Vrai quand le geste en cours a deja fait avancer d'un cran. */
  const gesteServi = useRef(false);
  /** Plus grande amplitude vue depuis le debut du geste. */
  const picGeste = useRef(0);
  const departTactile = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const zone = cible.current;
    if (!zone) return;

    /**
     * Un balayage de pave tactile, un cran. Jamais deux.
     *
     * Le verrou seul ne suffisait pas : il tombe au bout de quelques centaines
     * de millisecondes, alors que l'inertie d'un pave Mac emet encore pendant
     * pres d'une seconde. La traine relancait donc un second cran toute seule,
     * et un balayage franchissait deux projets.
     *
     * L'inertie se reconnait a son amplitude : elle demarre sous le pic du
     * geste et ne fait que decroitre. Une molette qu'on continue de tourner,
     * elle, envoie des crans d'amplitude constante. Apres un cran servi, on
     * n'en accorde donc un autre que si l'amplitude revient a son pic, ce qui
     * revient a exiger que l'utilisateur pousse encore. La traine, qui
     * n'atteint jamais ce pic, ne passe pas ; la molette passe, et le verrou
     * l'espace.
     */
    const onWheel = (e: WheelEvent) => {
      /* Axe dominant, et non `deltaY || deltaX`. Un balayage lateral sur pave
         tactile porte toujours un peu de vertical : un demi-pixel parasite
         l'emportait sur les trente pixels horizontaux, et pouvait meme donner
         le sens inverse de celui du doigt. */
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const sens = Math.sign(delta);
      if (!sens) return;
      if (peutDefilerDedans(e.target, sens, zone)) return;

      e.preventDefault();

      const maintenant = performance.now();
      if (maintenant - dernierWheel.current > PAUSE_GESTE) {
        cumul.current = 0;
        gesteServi.current = false;
        picGeste.current = 0;
      }
      dernierWheel.current = maintenant;

      const amplitude = Math.abs(delta);
      if (gesteServi.current && amplitude < picGeste.current) return;
      picGeste.current = Math.max(picGeste.current, amplitude);

      if (verrouille()) return;

      cumul.current += delta;
      if (Math.abs(cumul.current) < SEUIL_MOLETTE) return;
      cumul.current = 0;
      gesteServi.current = true;
      onDeplacer(sens);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      departTactile.current = t ? { x: t.clientX, y: t.clientY } : null;
    };

    /**
     * Le doigt change de diapo horizontalement, jamais verticalement.
     *
     * Avant, un glissement vertical faisait les deux : il tentait de faire
     * defiler le contenu, et s'il n'y avait rien a defiler il sautait a
     * l'ecran suivant. Sur une fiche projet, lire la suite d'un texte
     * emportait donc parfois vers un autre ecran. Le haut et le bas
     * appartiennent maintenant au contenu, et seul le geste lateral navigue,
     * ce qui correspond d'ailleurs a la facon dont la piste se deplace.
     */
    const onTouchEnd = (e: TouchEvent) => {
      const debut = departTactile.current;
      departTactile.current = null;
      const fin = e.changedTouches[0];
      if (!debut || !fin || verrouille()) return;

      const dx = debut.x - fin.clientX;
      const dy = debut.y - fin.clientY;
      if (Math.abs(dx) < SEUIL_TACTILE || Math.abs(dx) <= Math.abs(dy)) return;

      onDeplacer(Math.sign(dx));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Un ecran a pu traiter la touche avant nous, la pellicule des projets
      // par exemple, ou les fleches choisissent une tuile.
      if (e.defaultPrevented) return;
      const suivant = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key);
      const precedent = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
      if (!suivant && !precedent) return;
      e.preventDefault();
      if (verrouille()) return;
      onDeplacer(suivant ? 1 : -1);
    };

    zone.addEventListener('wheel', onWheel, { passive: false });
    zone.addEventListener('touchstart', onTouchStart, { passive: true });
    zone.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      zone.removeEventListener('wheel', onWheel);
      zone.removeEventListener('touchstart', onTouchStart);
      zone.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [cible, onDeplacer, verrouille]);
}
