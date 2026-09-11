# Carte de partage

`index.html` est la source de `public/og.jpg`, l'image que LinkedIn, Slack ou
iMessage affichent quand le lien du site est colle quelque part. Le fichier
livre est un JPEG plat : sans cette source, la moindre correction de texte
oblige a refaire la carte a la main.

## Regenerer

1. `npm run dev`
2. Ouvrir `http://localhost:5173/tools/og/index.html`
3. Capturer la zone `.carte` a l'echelle 1, soit exactement 1200 x 630
4. Enregistrer en JPEG sous `public/og.jpg`

Le gabarit importe `src/styles/fonts.css` et `src/styles/tokens.css` : les
polices et les couleurs sont celles du site, jamais des valeurs recopiees.

## A verifier avant de remplacer l'image

Le texte doit dire la meme chose que l'accroche du hub et que les donnees
structurees de `index.html`. Une carte de partage qui annonce autre chose que
la page est le genre d'ecart que personne ne voit pendant des mois.
