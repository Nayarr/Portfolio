# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versionnage : [SemVer](https://semver.org/lang/fr/).

## [Non publie]

### Ajoute

- Squelette du projet : Vite + React 19 + TypeScript.
- Outillage : ESLint (flat config), Prettier, EditorConfig, Husky, lint-staged, commitlint.
- Integration continue GitHub Actions : typecheck, lint, format, build.
- Documentation : README, CONTRIBUTING, ADR 0001 a 0006, feuille de route.
- Coquille applicative : providers, scroll horizontal GSAP, smooth-scroll Lenis, jetons de design.
- Ecran hub : hero, stack rangee par famille, liens.
- Ecran projets : pellicule a tuiles identiques, ouverture plein panneau en FLIP.
- Ecran experience : circuit a alimenter, revelation chronologique des etapes.
- Ecrans a propos et contact.
- Curseur a halo violet.

### Retire

- Mode scan et effets sonores : trop de surface pour ce qu'ils apportaient.
- Pied de page : ses coordonnees faisaient doublon avec le hub et l'ecran contact.
- Panneau isometrique du hub : il occupait la moitie de l'ecran sans rien apprendre.
- Mode exploration 3D et route `/explore` : dependances `three`, `@react-three/fiber`,
  `@react-three/drei` sorties du projet (voir ADR 0006).
