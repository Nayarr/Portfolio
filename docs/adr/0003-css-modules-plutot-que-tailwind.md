# 0003, CSS Modules plutot que Tailwind

Date : 2026-09-03
Statut : accepte

## Contexte

Chaque ecran a une mise en page unique : positionnement absolu, chevauchements,
compositions asymetriques, valeurs precises issues de la maquette. Peu de motifs
repetes d'un ecran a l'autre.

## Decision

CSS Modules par composant, plus un fichier de jetons global (`src/styles/tokens.css`)
en custom properties pour la palette, la typo et l'echelle.

## Consequences

- Le CSS reste lisible et scope au composant ; les valeurs de la maquette vivent
  au meme endroit que le markup.
- Les jetons centralisent la palette : ajouter une couleur hors liste demande un ADR.
- Pas de classe utilitaire qui alourdit le JSX pour des layouts one-shot.
- Il faut nommer ses classes, mais le scope automatique enleve la charge mentale.

## Alternatives ecartees

- **Tailwind** : puissant pour un design system repetitif ; ici le JSX deviendrait une
  soupe de classes pour des layouts uniques.
- **vanilla-extract** : bon compromis typage + zero-runtime, mais outillage en plus
  pour un benefice marginal a cette echelle.
