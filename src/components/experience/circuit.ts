/**
 * Logique du circuit, sans rien connaitre de React ni du DOM.
 *
 * La grille fait COLONNES x LIGNES cases. Une ligne par experience. Le courant
 * entre par l'ouest de la case (0, LIGNE_SOURCE), remonte un tronc vertical en
 * colonne 1, puis part vers l'est sur chaque ligne jusqu'a sa borne.
 */

export const COLONNES = 5;
export const LIGNES = 3;
/** Ligne par laquelle le courant entre, la derniere. */
export const LIGNE_SOURCE = LIGNES - 1;

/** Nord, Est, Sud, Ouest. L'ordre compte : une rotation ajoute 1. */
export const NORD = 0;
export const EST = 1;
export const SUD = 2;
export const OUEST = 3;

export type Forme = 'droit' | 'coude' | 'te';
export type Piece = { forme: Forme; rotation: number };

/** Ouvertures de chaque forme a la rotation zero. */
const OUVERTURES: Record<Forme, number[]> = {
  droit: [EST, OUEST],
  coude: [NORD, EST],
  te: [EST, SUD, OUEST],
};

/** Les cotes ouverts d'une piece, rotation appliquee. */
export function ouvertures(piece: Piece): number[] {
  return OUVERTURES[piece.forme].map((cote) => (cote + piece.rotation) % 4);
}

export function ouvreVers(piece: Piece, cote: number): boolean {
  return ouvertures(piece).includes(cote);
}

export const index = (colonne: number, ligne: number) => ligne * COLONNES + colonne;
export const colonneDe = (i: number) => i % COLONNES;
export const ligneDe = (i: number) => Math.floor(i / COLONNES);

/** Le voisin d'une case dans une direction, ou -1 hors grille. */
function voisin(i: number, cote: number): number {
  const c = colonneDe(i);
  const l = ligneDe(i);
  if (cote === NORD) return l > 0 ? index(c, l - 1) : -1;
  if (cote === SUD) return l < LIGNES - 1 ? index(c, l + 1) : -1;
  if (cote === EST) return c < COLONNES - 1 ? index(c + 1, l) : -1;
  return c > 0 ? index(c - 1, l) : -1;
}

const oppose = (cote: number) => (cote + 2) % 4;

/**
 * Cases atteintes par le courant, depuis l'ouest de la case source.
 * Deux cases voisines ne se transmettent le courant que si chacune ouvre vers
 * l'autre : un tuyau qui pointe vers un mur ne sert a rien.
 */
export function casesAlimentees(grille: (Piece | null)[]): Set<number> {
  const depart = index(0, LIGNE_SOURCE);
  const premiere = grille[depart];
  const atteintes = new Set<number>();
  if (!premiere || !ouvreVers(premiere, OUEST)) return atteintes;

  const pile = [depart];
  atteintes.add(depart);

  while (pile.length) {
    const i = pile.pop()!;
    const piece = grille[i];
    if (!piece) continue;

    for (const cote of ouvertures(piece)) {
      const j = voisin(i, cote);
      if (j < 0 || atteintes.has(j)) continue;
      const suivante = grille[j];
      if (!suivante || !ouvreVers(suivante, oppose(cote))) continue;
      atteintes.add(j);
      pile.push(j);
    }
  }

  return atteintes;
}

/**
 * Une experience est alimentee quand la derniere case de sa ligne recoit le
 * courant et ouvre vers l'est, la ou se trouve sa carte.
 */
export function lignesAlimentees(grille: (Piece | null)[]): boolean[] {
  const atteintes = casesAlimentees(grille);
  return Array.from({ length: LIGNES }, (_, ligne) => {
    const borne = index(COLONNES - 1, ligne);
    const piece = grille[borne];
    return atteintes.has(borne) && !!piece && ouvreVers(piece, EST);
  });
}

/**
 * La solution, ecrite a la main et non calculee : elle garantit que le circuit
 * a toujours une issue, et sert de reponse au bouton qui la donne.
 *
 * Colonne 0 : l'arrivee du courant, sur la seule ligne source.
 * Colonne 1 : le tronc vertical qui distribue aux quatre lignes.
 * Colonnes 2 a 4 : la ligne droite qui mene a chaque carte.
 */
export const SOLUTION: (Piece | null)[] = (() => {
  const grille: (Piece | null)[] = Array.from({ length: COLONNES * LIGNES }, () => null);

  grille[index(0, LIGNE_SOURCE)] = { forme: 'droit', rotation: 0 };

  // Tronc : un te qui dessert l'est a chaque ligne, un coude au sommet.
  grille[index(1, 2)] = { forme: 'te', rotation: 2 }; // ouvre N, E, O
  grille[index(1, 1)] = { forme: 'te', rotation: 3 }; // ouvre N, E, S
  grille[index(1, 0)] = { forme: 'coude', rotation: 1 }; // ouvre E, S

  for (let ligne = 0; ligne < LIGNES; ligne += 1) {
    for (let colonne = 2; colonne < COLONNES; colonne += 1) {
      grille[index(colonne, ligne)] = { forme: 'droit', rotation: 0 };
    }
  }

  return grille;
})();

/** Cases que le joueur doit remplir. Les autres sont posees d'avance. */
export const A_PLACER = [index(1, 2), index(1, 0), index(2, 1), index(3, 2), index(4, 0)];

/** Grille de depart : la solution moins les cases a placer. */
export function grilleInitiale(): (Piece | null)[] {
  const grille = SOLUTION.map((piece) => (piece ? { ...piece } : null));
  for (const i of A_PLACER) grille[i] = null;
  return grille;
}

/**
 * Les pieces du plateau : celles retirees de la grille, melangees et mal
 * orientees. Melange deterministe, pour que le circuit se comporte pareil a
 * chaque visite et reste reproductible en cas de bug.
 */
export function piecesDuPlateau(): { id: number; piece: Piece }[] {
  const rotationsBrouillees = [1, 3, 2, 1, 2];
  const ordre = [2, 0, 4, 1, 3];
  return ordre.map((rang, n) => {
    const source = SOLUTION[A_PLACER[rang]]!;
    return {
      id: A_PLACER[rang],
      piece: { forme: source.forme, rotation: (source.rotation + rotationsBrouillees[n]) % 4 },
    };
  });
}
