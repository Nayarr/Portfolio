import echoceanMedia from './media/echocean.jpg';
import hubleauMedia from './media/hubleau.jpg';
import papyrusMedia from './media/papyrus.jpg';

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
  /**
   * Capture du projet. Absente, l'ecran retombe sur la palette : mieux vaut un
   * aplat assume qu'une image bouche-trou qui ne montre rien.
   */
  media?: { src: string; alt: string };
  /**
   * Couleurs dominantes du projet, relevees sur le produit lui-meme.
   * Elles habillent la tuile de la pellicule et servent de fond a l'ecran du
   * projet tant qu'il n'a pas de capture. Chaque projet garde ainsi son
   * identite au lieu du violet du site, et les animations a venir auront de
   * quoi se distinguer d'un projet a l'autre.
   */
  palette: {
    /** haut du degrade de fond */
    from: string;
    /** bas du degrade de fond */
    to: string;
    /** le nom, en grand, sur la tuile */
    ink: string;
  };
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
    palette: { from: '#0b63f6', to: '#7fb2ff', ink: '#ffd60a' },
  },
  {
    id: 'chiron',
    index: '02',
    name: 'Chiron.',
    year: '2026',
    kind: 'Projet universitaire, SAE BUT3, en equipe',
    role: 'Conception et developpement',
    stack: ['React 19', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'PyTorch'],
    pitch:
      'Plateforme de dossier patient qui réunit deux mondes d’imagerie qui ne se parlent pas : la radiologie DICOM et la biopsie numérisée. Une lame pèse de 100 Mo à plusieurs gigaoctets, donc elle est tuilée en pyramide DZI et servie au zoom. S’y ajoutent une segmentation de noyaux par IA en aide au diagnostic, et un compte rendu que le serveur force à suivre son protocole en quatre étapes.',
    metrics: [
      { value: '15 vers 1,7 Go', label: 'image du backend, en isolant PyTorch' },
      { value: '7', label: 'conteneurs orchestrés' },
      { value: '18', label: 'routes d’API' },
    ],
    links: [],
    palette: { from: '#1e2a3a', to: '#46586f', ink: '#10b981' },
  },
  {
    id: 'papyrus',
    index: '03',
    name: 'Papyrus',
    year: '2025',
    kind: 'Projet universitaire, collaboratif',
    role: 'Conception du pipeline et des données',
    stack: ['Python', 'Regex', 'JSON', 'Git / GitLab'],
    pitch:
      'Plateforme de consultation des arrêtés préfectoraux français, extraits et structurés depuis les Recueils des Actes Administratifs officiels. Juristes, chercheurs et citoyens y filtrent et analysent les actes réglementaires publiés par les préfectures.',
    metrics: [
      { value: '2 532', label: 'arrêtés préfectoraux structurés' },
      { value: '17', label: 'préfectures couvertes' },
    ],
    links: [],
    media: {
      src: papyrusMedia,
      alt: 'Accueil de Papyrus : « Votre partenaire légal pour consulter des données », sur fond vert sombre, avec le compte des arrêtés préfectoraux et des préfectures couvertes.',
    },
    palette: { from: '#0f2a1d', to: '#1c4634', ink: '#e8c56a' },
  },
  {
    id: 'echocean',
    index: '04',
    name: 'ECHOcean',
    year: '2025',
    kind: 'Projet universitaire',
    role: 'Full-stack, base de données, cartographie',
    stack: ['PHP / MVC', 'MySQL', 'MapLibre GL', 'API Copernicus Marine'],
    pitch:
      'Application qui interroge le service Copernicus Marine pour informer sur la pollution de l’eau et suivre l’évolution mondiale de la température, de la salinité et du pH des océans. Carte interactive, interface glassmorphism.',
    metrics: [{ value: 'mondiale', label: 'couverture des données' }],
    links: [],
    media: {
      src: echoceanMedia,
      alt: 'Accueil d’ECHOcean : le nom en grandes capitales argentées sur une nappe bleu nuit ondulante, avec l’accroche « le site qui vous informe sur la pollution de l’eau ».',
    },
    palette: { from: '#060b26', to: '#16295e', ink: '#dfe6f5' },
  },
  {
    id: 'hubleau',
    index: '05',
    name: 'Hubleau',
    year: '2025',
    kind: 'Projet universitaire',
    role: 'Full-stack, base de données relationnelle',
    stack: ['Python / Flask', 'API Hub’eau', 'BDD relationnelle'],
    pitch:
      'Carte en temps réel des stations hydrométriques de France, alimentée par l’API nationale Hub’eau. Chaque station est localisée, filtrable et consultable en détail, en service ou hors service.',
    metrics: [
      { value: '5 971', label: 'stations hydrométriques' },
      { value: 'temps réel', label: 'données nationales' },
    ],
    links: [],
    media: {
      src: hubleauMedia,
      alt: 'Carte Hubleau des stations hydrométriques de France, semée de points verts en service et rouges hors service, avec la fiche d’une station ouverte.',
    },
    palette: { from: '#0d3c6e', to: '#2f8fd6', ink: '#f2f8ff' },
  },
];
