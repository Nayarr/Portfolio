# Portfolio, Rayan Oughlis

Portfolio personnel. Deux facons de le parcourir : un **mode normal** (sections qui defilent
horizontalement) et un **mode exploration 3D** (une chambre modelisee, vue isometrique, dans
laquelle on se deplace et on interagit avec les objets).

**En ligne :** _(a venir)_ &nbsp;·&nbsp; **Maquette-concept :** voir [docs/design](docs/design/)

## Stack et choix

| Domaine   | Choix                                              | Voir                                   |
| --------- | -------------------------------------------------- | -------------------------------------- |
| Build     | Vite + React 19 + TypeScript (SPA)                 | [ADR 0001](docs/adr/0001-vite-plutot-que-next.md) |
| Animation | GSAP (ScrollTrigger, Flip, `@gsap/react`)          | [ADR 0002](docs/adr/0002-gsap-seul-pour-l-animation.md) |
| Style     | CSS Modules + jetons CSS (`src/styles/tokens.css`) | [ADR 0003](docs/adr/0003-css-modules-plutot-que-tailwind.md) |
| Scroll    | Lenis (lisse + horizontal)                         |                                        |
| 3D        | React Three Fiber + drei + three, route lazy       | [ADR 0004](docs/adr/0004-mode-exploration-3d-opt-in.md) |
| SFX       | Howler.js                                          |                                        |
| SEO       | `index.html` + prerender au build                 | [ADR 0005](docs/adr/0005-strategie-seo-prerender.md) |
| Deploy    | Vercel                                             |                                        |

## Demarrer

```bash
nvm use          # Node 22
npm install
npm run dev
```

## Scripts

| Script                 | Effet                                       |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Serveur de dev Vite                         |
| `npm run build`        | Typecheck puis build de production          |
| `npm run preview`      | Sert le build local                         |
| `npm run typecheck`    | `tsc` sans emission                         |
| `npm run lint`         | ESLint                                      |
| `npm run format`       | Prettier en ecriture                        |
| `npm run format:check` | Prettier en verification (utilise par la CI) |

## Structure

```
src/
  app/            points d'entree : Providers, ScrollExperience, ExploreRoom
  components/
    ui/           curseur, toggles, primitives
    projects/     pellicule, ecran deploye, ecran explore, fiche
    experience/   circuit electrique
    scan/         overlay + annotations du mode scan
  lib/            scan-context, audio, useHorizontalScroll
  three/          chambre 3D, hotspots, camera
  styles/         tokens.css, global.css
docs/
  adr/            decisions d'architecture
  design/         maquettes (source .dc.html + reference)
```

## Contribuer

Workflow, conventions de branches et de commits : [CONTRIBUTING.md](CONTRIBUTING.md).
