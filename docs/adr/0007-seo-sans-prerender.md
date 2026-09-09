# 0007, SEO sans prerender

Date : 2026-09-09
Statut : accepte, remplace la clause "prerender" de l'ADR 0005

## Contexte

L'ADR 0005 prevoyait, en plus des meta et de la carte sociale, un prerender des
routes en HTML statique au build (`vite-react-ssg` ou equivalent).

Au moment de le mettre en place, deux faits ont change la donne :

- Le site n'a plus qu'une seule route (`/`) depuis l'abandon du mode exploration
  3D (ADR 0006). Un prerender de routes n'a plus qu'une route a prerendre.
- Toute la valeur de l'ecran tient dans une experience animee : pin ScrollTrigger,
  Lenis, FLIP, mode scan. Un rendu serveur impose de neutraliser ces effets cote
  Node, donc de maintenir une seconde version du composant racine, pour un HTML
  que Googlebot obtient de toute facon en executant le JS.

Le besoin reel est plus etroit : que le lien partage sur LinkedIn, Slack ou une
messagerie affiche un titre, une description et une image, et qu'un robot sans JS
reparte avec le nom, le poste et un moyen de contact.

## Decision

On couvre le SEO sans etape de rendu :

- Meta completes en dur dans `index.html` : title, description, canonical,
  OpenGraph (avec dimensions et alt), Twitter card, `theme-color`.
- Un bloc **JSON-LD `Person`** : identite, poste, coordonnees, formation,
  competences, profils. Lisible sans executer une ligne de JavaScript.
- Un **repli `<noscript>`** dans `#root` : titre, accroche, courriel, CV, liens.
- Une image de partage dediee, `public/og.jpg` (1200 x 630).
- `robots.txt` et `sitemap.xml` **emis au build** par le plugin `vite/seo.ts`,
  a partir de la meme `VITE_SITE_URL` que les meta.

Pas de `vite-react-ssg`, pas de rendu headless au build.

## Consequences

- Zero dependance et zero etape de build en plus, la CI ne gagne pas de point
  de rupture.
- L'URL publique vit a un seul endroit (`VITE_SITE_URL`). Le jour du branchement
  du domaine, une variable d'environnement suffit : les meta, le JSON-LD, le
  `robots.txt` et le `sitemap.xml` suivent.
- Sans cette variable, le build previent en console et retombe sur l'URL Vercel.
- Un agregateur qui n'execute pas le JS voit le JSON-LD et le `<noscript>`, pas
  le contenu des cinq ecrans. C'est assume : ce contenu est du recit et des
  visuels, pas des mots-cles a positionner.
- Si un besoin d'indexation par ecran apparait (des pages projet distinctes,
  par exemple), la question du prerender se rouvre avec une vraie raison.

## Alternatives ecartees

- **`vite-react-ssg`** : impose sa propre declaration de routes et un composant
  racine tolerant au rendu Node. Beaucoup de contrainte pour une route.
- **Prerender headless au build** (Playwright ou Puppeteer sur le build) :
  ajoute un navigateur en dependance de CI, pour capturer l'etat initial d'une
  animation dont l'interet est justement de ne pas etre statique.
- **Ne rien faire de plus** : le repli `<noscript>` et le JSON-LD coutent
  quelques lignes et repondent au vrai besoin.
