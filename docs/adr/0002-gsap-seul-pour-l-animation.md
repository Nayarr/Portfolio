# 0002, GSAP seul pour l'animation

Date : 2026-09-03
Statut : accepte

## Contexte

Le vocabulaire de mouvement du site : morphs FLIP, animations pilotees par le scroll,
titres en stagger, revelations orchestrees. Framer Motion (Motion) couvre bien les
transitions de composants React mais pas le scroll-driven ni FLIP nativement.

## Decision

GSAP comme unique moteur d'animation : `ScrollTrigger`, `Flip`, et le hook `@gsap/react`
(`useGSAP`) pour l'integration React propre (cleanup automatique). Pas de Motion.

## Consequences

- Un seul modele mental, une seule dependance d'animation, bundle plus leger.
- FLIP resout directement la morph tuile vers plein ecran.
- Depuis 2024, tout GSAP est gratuit, plugins Club compris : pas de blocage de licence.
- Les quelques transitions triviales (fondu d'overlay) se font en CSS ou avec GSAP,
  pas besoin d'une lib dediee.

## Alternatives ecartees

- **Motion (Framer Motion)** partout : plus verbeux pour le scroll-driven, et il aurait
  quand meme fallu GSAP pour FLIP et ScrollTrigger. Deux systemes pour peu de gain.
