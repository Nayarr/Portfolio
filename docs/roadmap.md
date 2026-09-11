# Feuille de route

Chaque ligne devient une issue GitHub, prise une par une sur une branche `feat/...`.

## v0.1, site visitable (fait)

- [x] `feat/app-shell` : layout, header fixe, providers, smooth-scroll Lenis, scroll horizontal GSAP
- [x] `feat/hub` : hero, stack, liens, panneau iso, index de sections, entree GSAP
- [x] `feat/projects` : pellicule (tuiles identiques, actif centre) + prise de vue plein panneau avec FLIP
- [x] `feat/experience-circuit` : circuit a alimenter, revelation des etapes
- [x] `feat/experience-grid` : grille de modules a poser et a tourner
- [x] `feat/hub-and-nav` : index des ecrans transverse, hub rebati sans le panneau
- [x] `feat/about` : photo, recit, formation, hors-code
- [x] `feat/contact` : coordonnees, liens, telechargement du CV
- [x] `feat/cursor` : halo violet qui suit le pointeur
- [x] `chore/remove-3d-mode` : abandon du mode exploration 3D (voir ADR 0006)
- [x] `fix/typography` : polices auto-hebergees, texte accentue, chrome fixe qui ne recouvre plus

## v1.0, lancement

- [x] `chore/cv` : deposer `public/cv.pdf` (version LaTeX)
- [ ] `feat/project-explore` : ecran editorial intermediaire des projets (panneau + galerie)
- [x] `chore/project-media` : champ `media`, capture TropiOutils (cinq captures restent a fournir)
- [x] `chore/seo` : meta, JSON-LD, image OG, robots + sitemap au build (ADR 0007)
- [x] `chore/a11y-pass` : focus visible, navigation clavier, contrastes, reduced-motion
- [x] `fix/mobile-layout` : pile verticale reellement utilisable au telephone
- [x] `chore/lighthouse-budget` : budget Lighthouse en CI, a11y/SEO/BP a 100
- [x] `chore/polish` : finitions ecran par ecran
- [x] `chore/remove-scan-and-sfx` : retrait du mode scan et des sons
- [ ] `chore/domain` : domaine perso (le site tourne sur rayan-oughlis.vercel.app)
- [x] `docs/readme-final` : lien live dans le README

## Plus tard, eventuel

- Modeles 3D integres au site (objet sur le hub, un par projet, elements decoratifs),
  pas un espace navigable a part. L'ancien code 3D est sur la branche `feat/explore-room`.
