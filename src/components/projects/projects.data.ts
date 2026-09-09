export type Project = {
  id: string;
  index: string;
  name: string;
  year: string;
  kind: string;
  role: string;
  stack: string[];
  pitch: string;
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
  /** degrade violet pour le bloc media en attendant les vraies captures */
  tint: [string, string];
};

export const PROJECTS: Project[] = [
  {
    id: 'assurfast',
    index: '01',
    name: 'ASSURFAST',
    year: '2026',
    kind: 'Stage S4, seul profil technique',
    role: 'Conception vers mise en production',
    stack: ['Extension Chrome', 'PaddleOCR', 'OpenCV', 'Flask', 'CI GitHub'],
    pitch:
      'AssurFill : l’extension qui fait l’OCR d’un permis et d’une carte grise puis pré-remplit le devis chez les partenaires du courtier. OCR 100 % local (RGPD). Plus une refonte SEO et un proto de chatbot.',
    metrics: [
      { value: '5 vers 1 min', label: 'temps de saisie par devis' },
      { value: '90 / 85 %', label: 'fiabilité OCR carte grise / permis' },
      { value: 'x5', label: 'impressions du site après refonte SEO' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/Nayarr' }],
    tint: ['#2f1f70', '#8b52ff'],
  },
  {
    id: 'diplomatique',
    index: '02',
    name: 'diplomAAtique',
    year: '2025',
    kind: 'Projet universitaire, collaboratif',
    role: 'Conception du pipeline et des données',
    stack: ['Python', 'Regex', 'JSON', 'Git / GitLab'],
    pitch:
      'Pipeline Python qui structure des milliers de textes réglementaires bruts (Attrap’) en base JSON, pour alimenter une application de consultation publique des actes administratifs.',
    metrics: [{ value: 'milliers', label: 'de textes structurés' }],
    links: [],
    tint: ['#241a52', '#6a46c6'],
  },
  {
    id: 'oceano',
    index: '03',
    name: 'Suivi océanographique',
    year: '2025',
    kind: 'Projet universitaire',
    role: 'Full-stack, base de données, cartographie',
    stack: ['PHP / MVC', 'MySQL', 'MapLibre GL', 'API Copernicus Marine'],
    pitch:
      'Application web qui interroge le service Copernicus Marine pour visualiser l’évolution mondiale de la température, de la salinité et du pH des océans. Interface glassmorphism, carte interactive.',
    metrics: [{ value: 'mondiale', label: 'couverture des données' }],
    links: [],
    tint: ['#1a1440', '#5a3fa0'],
  },
  {
    id: 'hubeau',
    index: '04',
    name: 'Qualité de l’eau',
    year: '2025',
    kind: 'Projet universitaire',
    role: 'Full-stack, base de données relationnelle',
    stack: ['Python / Flask', 'API Hub’eau', 'BDD relationnelle'],
    pitch:
      'Application web qui cartographie en temps réel la qualité de l’eau en France via l’API nationale Hub’eau. Cartes interactives.',
    metrics: [{ value: 'temps réel', label: 'données nationales' }],
    links: [],
    tint: ['#181334', '#4a3a86'],
  },
  {
    id: 'tropioutils',
    index: '05',
    name: 'TropiOutils',
    year: '2026',
    kind: 'Perso, en production',
    role: 'Full-stack, seul',
    stack: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'Cloudflare R2'],
    pitch:
      'Plateforme web communautaire pour un serveur Minecraft : carte interactive et économie de jeu complète (banque, marché, change, trades, loterie, paris, leaderboard, tracker de shinies, admin). Worker de découpe de tuiles cartographiques, 60+ migrations SQL.',
    metrics: [{ value: '60+', label: 'migrations SQL' }],
    links: [{ label: 'Visiter le site', href: 'https://tropi-outil.vercel.app' }],
    tint: ['#2f1f70', '#7c3aed'],
  },
  {
    id: 'tropisole',
    index: '06',
    name: 'Tropisole',
    year: '2026',
    kind: 'Perso, en production',
    role: 'Full-stack, seul',
    stack: ['Flask (Python)', 'JavaScript', 'SQLite', 'Firebase'],
    pitch:
      'Outil de tri et de recherche optimisée des spawns de Pokémon du mod Minecraft Cobblemon : base de données structurée depuis les fichiers du mod (biomes, moment, météo, niveaux, rareté, conditions).',
    metrics: [{ value: '~150 / mois', label: 'utilisateurs de mes projets perso' }],
    links: [{ label: 'Visiter le site', href: 'https://nayar.pythonanywhere.com' }],
    tint: ['#161234', '#3f337a'],
  },
];
