# 0004, Mode exploration 3D en opt-in

Date : 2026-09-03
Statut : remplace par l'ADR 0006 (2026-09-09)

## Contexte

Le site propose une chambre en 3D isometrique (React Three Fiber) ou l'on se deplace
et interagit. C'est un atout de differenciation, mais Three.js et un modele `.glb`
pesent lourd, et un recruteur presse veut aller vite au contenu.

## Decision

Deux modes qui exposent le meme contenu :

- **Mode normal** (par defaut) : sections en scroll, aucune dependance 3D chargee.
- **Mode exploration** : route `/explore` chargee en lazy (`import()` dynamique), donc
  Three.js et les assets 3D sortent du bundle initial.

Bascule via un toggle sur le hub. Preference memorisee.

## Consequences

- Premier chargement rapide pour tout le monde.
- Le mode 3D reste une experience a part entiere, sans penaliser le reste.
- Il faut maintenir la parite de contenu entre les deux modes.
- `prefers-reduced-motion` et l'absence de WebGL retombent proprement sur le mode normal.

## Alternatives ecartees

- **3D en page d'accueil obligatoire** (facon Bruno Simon) : trop couteux a l'entree,
  et exclut les visiteurs presses ou sans WebGL.
- **Pas de 3D du tout** : on perd l'element le plus memorable et une preuve de competence.
