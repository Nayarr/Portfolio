import { createContext, useContext } from 'react';

/**
 * Un ecran qui a lui-meme plusieurs positions internes, la pellicule des
 * projets, absorbe le pas de navigation tant qu'il lui reste du chemin.
 * Rend `true` quand il l'a consomme, le diaporama ne bouge alors pas.
 */
export type Capteur = (sens: number) => boolean;

export type DeckApi = {
  /** Index de la diapo affichee, 0 pour le hub. */
  index: number;
  /** Nombre total de diapos. */
  count: number;
  /** Va a une diapo, en bornant l'index. */
  goTo: (index: number) => void;
  /**
   * Confie au diaporama le soin de proposer chaque pas a cet ecran avant de
   * changer de diapo. Passer `null` pour rendre la main. Un seul capteur a la
   * fois : c'est toujours celui de l'ecran visible.
   */
  capter: (fn: Capteur | null) => void;
};

/**
 * Emis par le logotype du chrome au retour a l'accueil. Toute couche qui
 * recouvre le diaporama, la fiche projet aujourd'hui, l'ecoute pour se fermer :
 * le chrome est rendu hors de la piste, il n'a aucune autre prise sur leur
 * etat local.
 */
export const RETOUR_ACCUEIL = 'portfolio:retour-accueil';

const DeckContext = createContext<DeckApi | null>(null);

export const DeckProvider = DeckContext.Provider;

/**
 * Index du panneau qui rend l'arbre courant. Chaque diapo est enveloppee dans
 * son propre fournisseur : un ecran peut ainsi savoir s'il est celui qu'on
 * regarde, sans que le diaporama ait a connaitre ses composants.
 */
const PanneauContext = createContext<number | null>(null);

export const PanneauProvider = PanneauContext.Provider;

/** Vrai quand la diapo qui appelle est celle affichee. */
export function usePanneauActif(): boolean {
  const api = useContext(DeckContext);
  const moi = useContext(PanneauContext);
  return api !== null && moi !== null && api.index === moi;
}

/**
 * Donne acces a la navigation du diaporama depuis n'importe quel ecran :
 * la fleche "suivant", le lien d'evitement du chrome, l'index des sections.
 */
export function useDeck(): DeckApi {
  const api = useContext(DeckContext);
  if (!api) throw new Error('useDeck doit etre utilise dans un DeckProvider');
  return api;
}
