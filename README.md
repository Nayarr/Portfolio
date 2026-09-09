# Portfolio, Rayan Oughlis

Portfolio personnel. Un parcours en **scroll horizontal** (hub, projets, experience, a propos,
contact) double d'un **mode scan** qui revele une couche "profiler" sur tout le site.

**En ligne :** _(a venir)_ &nbsp;·&nbsp; **Maquette-concept :** [docs/design](docs/design/)

![Apercu du hub](docs/design/screens/01-hub.jpg)

## Stack et choix

| Domaine   | Choix                                              | Voir                                                         |
| --------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Build     | Vite + React 19 + TypeScript (SPA)                 | [ADR 0001](docs/adr/0001-vite-plutot-que-next.md)            |
| Animation | GSAP (ScrollTrigger, Flip, `@gsap/react`)          | [ADR 0002](docs/adr/0002-gsap-seul-pour-l-animation.md)      |
| Style     | CSS Modules + jetons CSS (`src/styles/tokens.css`) | [ADR 0003](docs/adr/0003-css-modules-plutot-que-tailwind.md) |
| Scroll    | Lenis (lisse + horizontal)                         |                                                              |
| 3D        | Pas de mode exploration 3D pour la v1              | [ADR 0006](docs/adr/0006-pas-de-mode-exploration-3d.md)      |
| SFX       | Sons synthetises (Web Audio API)                   |                                                              |
| SEO       | `index.html` + prerender au build                  | [ADR 0005](docs/adr/0005-strategie-seo-prerender.md)         |
| Deploy    | Vercel                                             |                                                              |

## Demarrer

```bash
nvm use          # Node 22
npm install
npm run dev
```

## Scripts

| Script                 | Effet                                        |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Serveur de dev Vite                          |
| `npm run build`        | Typecheck puis build de production           |
| `npm run preview`      | Sert le build local                          |
| `npm run typecheck`    | `tsc` sans emission                          |
| `npm run lint`         | ESLint                                       |
| `npm run format`       | Prettier en ecriture                         |
| `npm run format:check` | Prettier en verification (utilise par la CI) |

## Structure

```
src/
  app/            points d'entree : Providers, ScrollExperience
  components/
    ui/           curseur, en-tete, toggles
    hub/          hero, stack, panneau iso, index des sections
    projects/     pellicule, ecran deploye, fiche
    experience/   circuit electrique
    about/        recit, formation, hors-code
    contact/      coordonnees, liens, CV
    scan/         overlay + annotations du mode scan
  lib/            scan-context, audio, gsap, smooth-scroll, sons UI
  styles/         tokens.css, global.css
docs/
  adr/            decisions d'architecture
  design/         maquettes (source .dc.html + reference)
```

## Contribuer

Workflow, conventions de branches et de commits : [CONTRIBUTING.md](CONTRIBUTING.md).
