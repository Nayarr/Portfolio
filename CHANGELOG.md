# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versionnage : [SemVer](https://semver.org/lang/fr/).

## [Non publie]

### Ajoute

- Squelette du projet : Vite + React 19 + TypeScript.
- Outillage : ESLint (flat config), Prettier, EditorConfig, Husky, lint-staged, commitlint.
- Integration continue GitHub Actions : typecheck, lint, format, build.
- Documentation : README, CONTRIBUTING, ADR 0001 a 0006, feuille de route.
- Coquille applicative : providers, scroll horizontal GSAP, smooth-scroll Lenis, jetons de design.
- Ecran hub : hero, stack, liens, panneau isometrique, index des sections.
- Ecran projets : pellicule a tuiles identiques, ouverture plein panneau en FLIP.
- Ecran experience : circuit a alimenter, revelation chronologique des etapes.
- Ecrans a propos et contact.
- Mode scan : overlay profiler et annotations, bascule globale.
- Sons synthetises en Web Audio, curseur a halo violet.

### Retire

- Mode exploration 3D et route `/explore` : dependances `three`, `@react-three/fiber`,
  `@react-three/drei` sorties du projet (voir ADR 0006).
