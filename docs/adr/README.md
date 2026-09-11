# Architecture Decision Records

Une decision structurante = un fichier court et date, jamais reecrit (on ajoute une decision
qui remplace, on ne modifie pas l'ancienne). Format inspire de Michael Nygard.

| #    | Titre                                 | Statut                             |
| ---- | ------------------------------------- | ---------------------------------- |
| 0001 | Vite plutot que Next                  | Accepte                            |
| 0002 | GSAP seul pour l'animation            | Accepte                            |
| 0003 | CSS Modules plutot que Tailwind       | Accepte                            |
| 0004 | Mode exploration 3D en opt-in         | Remplace par le 0006               |
| 0005 | Strategie SEO : prerender au build    | Partiellement remplace par le 0007 |
| 0006 | Pas de mode exploration 3D pour la v1 | Accepte                            |
| 0007 | SEO sans prerender                    | Accepte                            |
| 0008 | Diaporama plutot que scroll pilote    | Accepte                            |

Gabarit : `contexte` / `decision` / `consequences` / `alternatives ecartees`.
