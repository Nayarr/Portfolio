# Feuille de route

Chaque ligne devient une issue GitHub, prise une par une sur une branche `feat/...`.

## v0.1, site visitable (fait)

- [x] `feat/app-shell` : layout, header fixe, providers, smooth-scroll Lenis, scroll horizontal GSAP
- [x] `feat/hub` : hero, stack, liens, panneau iso, index de sections, entree GSAP
- [x] `feat/projects` : pellicule (tuiles identiques, actif centre) + prise de vue plein panneau avec FLIP
- [x] `feat/experience-circuit` : circuit a alimenter, revelation des etapes
- [x] `feat/about` : photo, recit, formation, hors-code
- [x] `feat/contact` : coordonnees, liens, telechargement du CV
- [x] `feat/scan-mode` : overlay profiler + annotations, toggle global
- [x] `feat/sfx` : sons synthetises (Web Audio), clic et scan, respect de reduced-motion
- [x] `feat/cursor` : halo violet qui suit le pointeur
- [x] `chore/remove-3d-mode` : abandon du mode exploration 3D (voir ADR 0006)
- [x] `fix/typography` : polices auto-hebergees, texte accentue, chrome fixe qui ne recouvre plus

## v1.0, lancement

- [x] `chore/cv` : deposer `public/cv.pdf` (version LaTeX)
- [ ] `feat/project-explore` : ecran editorial intermediaire des projets (panneau + galerie)
- [ ] `chore/project-media` : vraies captures / videos a la place des degrades
- [x] `chore/seo` : meta, JSON-LD, image OG, robots + sitemap au build (ADR 0007)
- [ ] `chore/a11y-pass` : focus visible, navigation clavier, contrastes, reduced-motion
- [ ] `perf/lighthouse-budget` : budget Lighthouse CI en garde-fou
- [ ] `chore/polish` : espacements et finitions ecran par ecran sur les previews
- [ ] `chore/domain` : domaine perso + redirections
- [ ] `docs/readme-final` : capture, lien live

## Plus tard, eventuel

- Modeles 3D integres au site (objet sur le hub, un par projet, elements decoratifs),
  pas un espace navigable a part. L'ancien code 3D est sur la branche `feat/explore-room`.
