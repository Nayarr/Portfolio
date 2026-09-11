import { createContext, useContext } from 'react';

export type DeckApi = {
  /** Index de la diapo affichee, 0 pour le hub. */
  index: number;
  /** Nombre total de diapos. */
  count: number;
  /** Va a une diapo, en bornant l'index. */
  goTo: (index: number) => void;
};

const DeckContext = createContext<DeckApi | null>(null);

export const DeckProvider = DeckContext.Provider;

/**
 * Donne acces a la navigation du diaporama depuis n'importe quel ecran :
 * la fleche "suivant", le lien d'evitement du chrome, l'index des sections.
 */
export function useDeck(): DeckApi {
  const api = useContext(DeckContext);
  if (!api) throw new Error('useDeck doit etre utilise dans un DeckProvider');
  return api;
}
