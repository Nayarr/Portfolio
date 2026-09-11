import { useEffect, useState } from 'react';

/**
 * Suit une media query depuis le composant. Utile quand une difference entre
 * ecrans ne peut pas se regler en CSS : ici, l'ecran experience ne se contente
 * pas de masquer le circuit au telephone, il change aussi son titre et son
 * texte, qui invitent a poser des modules.
 *
 * L'etat part de `false` et se cale au premier effet : le rendu initial est
 * donc celui du grand ecran, corrige avant peinture.
 */
export function useMediaQuery(query: string): boolean {
  const [vrai, setVrai] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const maj = () => setVrai(mq.matches);
    maj();
    mq.addEventListener('change', maj);
    return () => mq.removeEventListener('change', maj);
  }, [query]);

  return vrai;
}
