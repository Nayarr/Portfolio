# Captures des projets

Une image par projet, importee depuis `projects.data.ts` et posee dans le champ
`media` avec son texte alternatif. Sans `media`, l'ecran du projet retombe sur la
`palette` du projet et affiche "apercu, media a venir" : c'est volontaire, un
aplat assume vaut mieux qu'une image bouche-trou.

## Format

- **JPEG**, largeur 1440 px, cadrage 16/9 (l'ecran recadre en `cover`, ancre en haut).
- **Moins de 200 ko par image.** Au dela, le budget Lighthouse passe au rouge sur
  le poids total (voir `lighthouserc.json`).
- Nommer d'apres l'`id` du projet : `papyrus.jpg`, `assurfast.jpg`, etc.
- L'essentiel doit tenir dans le tiers superieur : c'est ce qu'on voit apres recadrage.

## Etat

| Projet      | Capture | Poids  | Comment l'obtenir                                           |
| ----------- | ------- | ------ | ----------------------------------------------------------- |
| `portfolio` | oui     | 79 ko  | Accueil du site lui-meme                                    |
| `papyrus`   | oui     | 79 ko  | Accueil de la plateforme                                    |
| `echocean`  | oui     | 82 ko  | Accueil, le hero avec la carte                              |
| `hubleau`   | oui     | 193 ko | La carte des stations hydrometriques                        |
| `dashboard` | oui     | 145 ko | Vue Valide, tiroir ouvert, adresse masquee                  |
| `assurfast` | non     | --     | Extension Chrome, a capturer en local (un devis pre-rempli) |
| `chiron`    | non     | --     | A fournir                                                   |

## Deux sortes de visuel

`media.kind` vaut `capture` par defaut : l'image montre le produit et remplit
le cadre en `cover`, ancree en haut.

`kind: 'logo'` affiche la marque seule, contenue et centree, jamais recadree.
Le fichier doit etre **detoure**, fond transparent : l'ecran pose derriere un
lavis pale de la couleur du projet, pour que la marque garde ses propres
couleurs sans se noyer dans la palette.
A utiliser quand le produit lui-meme n'est pas montrable. Dans ce cas, remplir
aussi `mediaNote` pour dire pourquoi : un projet sous confidentialite vaut
mieux d'etre explique que laisse sans raison apparente. L'etiquette "media a
venir" s'efface d'elle-meme quand une note est presente.

## Ajouter une capture

1. Deposer le fichier ici, nomme d'apres l'`id` du projet.
2. Dans `projects.data.ts`, importer l'image en haut, puis remplir `media` sur le
   projet concerne :

```ts
import assurfastMedia from './media/assurfast.jpg';
// ...
media: { src: assurfastMedia, alt: 'Ce que montre la capture, en une phrase.' },
```

Le texte alternatif decrit **ce qu'on voit**, pas le projet : il est lu par les
lecteurs d'ecran et s'affiche si l'image ne charge pas. C'est un des points qui
tiennent le score d'accessibilite a 100.

## Convertir une capture

Depuis un PNG brut, avec Pillow :

```python
from PIL import Image
im = Image.open("brut.png").convert("RGB")
w, h = im.size
im = im.crop((0, 0, w, int(w / (16 / 9))))          # 16/9 ancre en haut
im = im.resize((1440, 810), Image.LANCZOS)
im.save("projet.jpg", "JPEG", quality=85, optimize=True, progressive=True)
```

Baisser `quality` jusqu'a passer sous 200 ko. Une carte detaillee compresse mal,
il faut parfois descendre a 76.

## Plusieurs captures pour un meme projet

Les garder, numerotees (`papyrus-2.jpg`, `papyrus-3.jpg`). Elles serviront a
l'ecran galerie `feat/project-explore`, qui passera alors a un dossier par projet.
