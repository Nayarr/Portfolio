# 0005, Strategie SEO : prerender au build

Date : 2026-09-03
Statut : la clause "prerender" est remplacee par l’ADR 0007 (2026-09-09)

## Contexte

Le choix d'une SPA Vite (ADR 0001) prive le site du rendu serveur. Un portfolio n'a pas
besoin d'un SEO agressif, mais il doit avoir un titre, une meta description et une carte
sociale (OpenGraph) corrects quand on partage le lien.

## Decision

- Meta essentielles ecrites en dur dans `index.html` (title, description, OG, Twitter card).
- Prerender des routes en HTML statique au build (`vite-react-ssg` ou equivalent), pour
  que le HTML initial contienne le contenu, pas seulement `<div id="root">`.
- Une image OG dediee dans `public/`.
- `sitemap.xml` et `robots.txt` simples.

## Consequences

- Partage de lien propre sur LinkedIn, Slack, messageries.
- Le contenu est indexable sans attendre l'execution du JS.
- Le prerender ajoute une etape de build a garder verte en CI.

## Alternatives ecartees

- **Passer a Next/Astro pour du SSR** : voir ADR 0001, le cout sur les transitions n'en
  vaut pas la peine pour ce besoin SEO limite.
- **Ne rien faire** : carte de partage vide, mauvaise premiere impression.
