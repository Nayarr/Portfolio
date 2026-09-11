# 0008, Diaporama plutot que scroll pilote

Date : 2026-09-11
Statut : accepte, remplace la mecanique de l'ADR 0002 sur le defilement

## Contexte

Le site convertissait le defilement vertical de la page en translation
horizontale d'une piste, via un `pin` et un `scrub` ScrollTrigger, le tout
lisse par Lenis. Trois consequences :

- Le deplacement etait **continu**. On pouvait s'arreter entre deux ecrans, sur
  une composition qui n'a jamais ete dessinee pour etre vue comme ca.
- La page portait une hauteur artificielle, donc **une barre de defilement** qui
  ne correspondait a aucun contenu vertical.
- La quantite de geste necessaire pour passer un ecran dependait de la
  configuration de la souris ou du pave tactile.

## Decision

Le site devient un **diaporama** : une diapo par ecran, un geste par diapo.

- Plus aucun defilement de page. `html` et `body` sont bloques, la barre
  disparait.
- La piste est translatee par une tween GSAP vers la diapo demandee.
- Molette, doigt, fleches du clavier et un bouton "suivant" present sur chaque
  ecran passent tous par la meme fonction.
- Une diapo dont le contenu ne tient pas dans la hauteur disponible defile pour
  elle-meme, et le geste ne change d'ecran qu'une fois en butee. C'est ce qui
  rend le telephone praticable sans casser la regle.

Lenis et ScrollTrigger disparaissent avec la mecanique qu'ils servaient.

## Consequences

- Chaque ecran est vu tel qu'il a ete compose, jamais a cheval.
- Le bundle passe de **447 a 382 ko** (151 a 128 ko compresses), soit 15 % de
  moins, en retirant une dependance et un plugin.
- Les diapos hors champ sortent de l'ordre de tabulation (`inert`) : on ne
  tabule plus dans un ecran qu'on ne voit pas.
- Le lien d'evitement du chrome devient un bouton : il n'y a plus de defilement
  pour amener une ancre a l'ecran.
- Le verrou entre deux transitions est libere par une minuterie et non par la
  fin de l'animation. Une tween tuee n'appelle jamais son `onComplete`, et un
  onglet en arriere-plan gele le rendu : dans les deux cas la navigation
  serait restee bloquee pour de bon.

## Alternatives ecartees

- **Garder le scrub en le magnetisant** (`snap` de ScrollTrigger) : on garde la
  barre de defilement, la hauteur artificielle et les deux dependances, pour un
  resultat approchant.
- **CSS scroll snap** : plus simple, mais la piste reste un conteneur defilant,
  donc la barre et le defilement libre entre deux points d'ancrage subsistent.
