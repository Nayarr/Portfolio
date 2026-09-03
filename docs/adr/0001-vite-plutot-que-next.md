# 0001, Vite plutot que Next

Date : 2026-09-03
Statut : accepte

## Contexte

Le site est tres anime : morph FLIP d'une tuile vers le plein ecran, scroll horizontal
detourne, choregraphie de gros titres, mode exploration 3D. Il tient sur une seule
experience continue plutot que sur des pages independantes. Le SEO se limite a une
page qu'on ouvre depuis un lien (LinkedIn, CV, candidature).

## Decision

Vite + React 19 + TypeScript en SPA. Routing avec react-router. Pas de Next.

## Consequences

- Controle total sur le cycle de rendu, ce qui compte pour piloter GSAP et Three.js.
- Bundle initial maitrise, mode 3D charge en lazy.
- Le SEO n'est pas automatique : on ajoute les meta et un prerender au build (voir ADR 0005).
- Meme configuration que TropiOutils, donc moins de friction.

## Alternatives ecartees

- **Next (App Router)** : les transitions de page inter-routes sont connues pour etre
  penibles, or c'est le coeur du design. Batteries incluses dont on n'a pas besoin ici.
- **Astro** : excellent pour du contenu, mais le modele d'iles se bat contre un site
  aussi applicatif et anime.
