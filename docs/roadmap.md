# Feuille de route

Chaque ligne devient une issue GitHub, prise une par une sur une branche `feat/...`.
Les milestones regroupent les issues par jalon.

## v0.1, mode scroll (jalon 1)

- [ ] `feat/app-shell` : layout, header fixe, providers cables, smooth-scroll Lenis
- [ ] `feat/horizontal-scroll` : detournement du scroll + snap sur section (GSAP ScrollTrigger)
- [ ] `feat/hub-screen` : hero, stack, liens, toggle de mode
- [ ] `feat/projects-filmstrip` : pellicule, tuiles identiques, projet actif centre
- [ ] `feat/project-flip` : morph tuile vers plein ecran (GSAP Flip) + ecran deploye
- [ ] `feat/project-explore` : panneau editorial, galerie photo, boutons visiter / detail
- [ ] `feat/project-detail` : fiche bento, chiffres, etude de cas
- [ ] `feat/experience-circuit` : mini-jeu de circuit, revelation des etapes
- [ ] `feat/about-screen` : photo, recit, formation, hors-code
- [ ] `feat/contact-screen` : coordonnees, liens, telechargement du CV
- [ ] `feat/scan-mode` : overlay profiler + annotations, toggle global
- [ ] `feat/sfx` : sprite audio Howler, sons de clic et de scan, respect de reduced-motion
- [ ] `feat/cursor` : halo violet qui suit le pointeur

## v0.2, exploration 3D (jalon 2)

- [ ] `feat/explore-room` : chargement de room.glb, camera isometrique, deplacement
- [ ] `feat/explore-hotspots` : objets interactifs qui ouvrent les sections
- [ ] `feat/explore-scan` : mode scan dans la chambre
- [ ] `perf/lazy-load-three` : verifier le budget de bundle, code-splitting

## v1.0, lancement (jalon 3)

- [ ] `chore/seo` : meta, OpenGraph, image OG, prerender au build
- [ ] `perf/lighthouse-budget` : budget Lighthouse CI en garde-fou
- [ ] `chore/a11y-pass` : focus visible, navigation clavier, contrastes, reduced-motion
- [ ] `chore/domain` : domaine perso + redirections
- [ ] `docs/readme-final` : capture, lien live, section decisions
