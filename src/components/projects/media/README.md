# Captures des projets

Une image par projet, importee depuis `projects.data.ts` et posee dans le champ
`media` avec son texte alternatif. Sans `media`, l'ecran du projet retombe sur le
degrade `tint` et affiche "apercu, media a venir" : c'est volontaire, un degrade
assume vaut mieux qu'une image bouche-trou.

## Format

- **JPEG**, largeur 1440 px, cadrage 16/9 (l'ecran recadre en `cover`, ancre en haut).
- Viser moins de 200 ko par image. Au dela, reduire la qualite avant d'ajouter.
- Nommer d'apres l'`id` du projet : `tropioutils.jpg`, `assurfast.jpg`, etc.

## Etat

| Projet         | Capture | Comment l'obtenir                                               |
| -------------- | ------- | --------------------------------------------------------------- |
| `tropioutils`  | oui     | Accueil du site en production                                   |
| `assurfast`    | non     | Extension Chrome, a capturer en local (formulaire pre-rempli)   |
| `tropisole`    | non     | Le site est derriere un login, capture a faire depuis un compte |
| `diplomatique` | non     | Projet universitaire, capture de l'appli de consultation        |
| `oceano`       | non     | Projet universitaire, la carte interactive                      |
| `hubeau`       | non     | Projet universitaire, la carte de la qualite de l'eau           |

## Ajouter une capture

1. Deposer le fichier ici.
2. Dans `projects.data.ts`, importer l'image en haut, puis remplir `media` sur le
   projet concerne :

```ts
import assurfastMedia from './media/assurfast.jpg';
// ...
media: { src: assurfastMedia, alt: 'Ce que montre la capture, en une phrase.' },
```

Le texte alternatif decrit ce qu'on voit, pas le projet : il est lu par les
lecteurs d'ecran et s'affiche si l'image ne charge pas.
