# Workflow

Projet solo, mais tenu comme un projet d'equipe.

## Branches, GitHub Flow

- `main` est toujours deployable. Vercel deploie `main` en production et cree un preview par PR.
- Une branche courte par changement coherent, mergee puis supprimee. Pas de branche `develop`.
- Nommage : `type/resume-court-en-kebab`, avec le numero d'issue si pertinent.

```
feat/horizontal-scroll
feat/projects-filmstrip
fix/cursor-glow-safari
chore/eslint-flat-config
docs/adr-0006-...
refactor/scan-context
perf/lighthouse-budget
```

- Si une branche vit plus de deux ou trois jours, elle est trop grosse : decouper.
- Les branches sont creees a la demande, quand on prend l'issue. On ne pre-cree pas de branches vides.

## Commits, Conventional Commits

`feat`, `fix`, `refactor`, `perf`, `docs`, `style`, `test`, `build`, `ci`, `chore`, `revert`.

- Scope optionnel : `feat(projects): morph FLIP tuile vers plein ecran`.
- Sujet a l'imperatif, court. Le corps explique le pourquoi, pas le comment.
- `commitlint` verifie le format via un hook `commit-msg`.

## Pull requests

- Petites PR, une par branche. Remplir le template.
- Captures ou GIF pour tout changement visuel, avec le lien du preview Vercel.
- `Closes #NN` pour lier l'issue.
- **Squash and merge** : `main` garde un commit propre par feature.
- Attendre la CI verte (typecheck, lint, format, build) avant de merger.

## Hooks locaux

Actives par `npm install` (`prepare` lance `husky`).

- `pre-commit` : `lint-staged` (Prettier + ESLint sur les fichiers stages).
- `commit-msg` : `commitlint`.

## Versions et releases

- Tags SemVer (`v0.1.0`, `v0.2.0`, ...), GitHub Releases avec notes.
- `v1.0.0` = mise en ligne.

## Feuille de route

Voir [docs/roadmap.md](docs/roadmap.md) et les milestones GitHub.
