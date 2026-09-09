# 0006, Pas de mode exploration 3D pour la v1

Date : 2026-09-09
Statut : accepte, remplace l'ADR 0004

## Contexte

L'ADR 0004 prevoyait une chambre isometrique navigable en React Three Fiber,
en mode opt-in. Un premier jet a ete code (primitives + hotspots) puis teste.
Constat : le cout de fabrication d'un vrai modele (Blender, textures, calage
camera, deep-link vers les sections) est eleve, et l'objectif immediat est
d'avoir un site **visitable et deployable**, pas une demo technique.

## Decision

On abandonne le mode exploration 3D pour la v1. Le site se limite au mode
scroll horizontal plus le mode scan. On retire :

- la route `/explore` et le composant `ExploreRoom`
- le `ModeToggle` du header
- les dependances `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`

Des modeles 3D pourront revenir plus tard, mais integres au site (un objet sur
le hub, un par projet, elements decoratifs) plutot qu'un espace navigable a part.

## Consequences

- Bundle allege : le chunk lazy de ~838 ko disparait, moins de dependances a suivre.
- Le hub garde son panneau "poste de travail" en SVG isometrique, sans mention de 3D.
- Le blockout `scripts/export-room.mjs` et l'ancien code 3D restent dans l'historique
  Git (branche `feat/explore-room`) si on veut repartir de la.
- La feuille de route perd son jalon v0.2.

## Alternatives ecartees

- **Garder le stub `/explore`** : une route qui montre un cube qui tourne, sans
  valeur, avec le poids des dependances 3D.
- **Finir le modele Blender maintenant** : repousse la mise en ligne pour un
  element non essentiel.
