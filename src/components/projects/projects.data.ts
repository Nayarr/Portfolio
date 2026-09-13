import assurfastLogo from './media/assurfast.png';
import dashboardMedia from './media/dashboard.jpg';
import portfolioMedia from './media/portfolio.jpg';
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
  media?: {
    src: string;
    alt: string;
    /**
     * `capture` (par defaut) : l'image montre le produit, elle remplit le
     * cadre en `cover`. `logo` : la marque seule, contenue et centree sur la
     * couleur du projet. Un logo recadre en `cover` serait tronque.
     */
    kind?: 'capture' | 'logo';
  };
  /**
   * Pourquoi il n'y a pas de capture du produit. Affiche sous le visuel.
   * Un projet sous accord de confidentialite vaut mieux d'etre explique que
   * laisse sans raison apparente.
   */
  mediaNote?: string;
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

/**
 * Du plus recent au plus vieux : un recruteur lit les premieres tuiles, elles
 * doivent porter le travail le plus frais. `index` suit l'ordre du tableau, il
 * est affiche tel quel sur la tuile et dans le compteur de la pellicule.
 *
 * En ajoutant un projet, l'inserer a sa place chronologique et renumeroter.
 * Chiron. passe devant ASSURFAST bien que tous deux soient de 2026 : le stage
 * s'est termine en juin, la SAE est de septembre.
 */
export const PROJECTS: Project[] = [
  {
    id: 'chiron',
    index: '01',
    name: 'Chiron.',
    year: '2026',
    kind: 'Projet universitaire, SAE BUT3, en equipe',
    /**
     * Perimetre confirme. L'animation des dailies Scrum et le role de product
     * owner face au MOA ne sont pas encore arretes : a ajouter ici une fois
     * actes, c'est la part qui distingue le plus le profil.
     */
    role: 'Dev, planification et documentation',
    stack: ['React 19', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'PyTorch'],
    pitch:
      'Plateforme de dossier patient qui réunit deux mondes d’imagerie qui ne se parlent pas : la radiologie DICOM et la biopsie numérisée. Une lame pèse de 100 Mo à plusieurs gigaoctets, donc elle est tuilée en pyramide DZI et servie au zoom. S’y ajoutent une segmentation de noyaux par IA en aide au diagnostic, et un compte rendu que le serveur force à suivre son protocole en quatre étapes.',
    metrics: [
      { value: '7', label: 'conteneurs orchestrés' },
      { value: '18', label: 'routes d’API' },
    ],
    links: [],
    palette: { from: '#1e2a3a', to: '#46586f', ink: '#10b981' },
  },
  {
    id: 'portfolio',
    index: '02',
    name: 'Portfolio',
    year: '2026',
    kind: 'Perso, en ligne',
    role: 'Conception et développement, seul',
    stack: ['React 19', 'TypeScript', 'Vite', 'GSAP', 'CSS Modules'],
    pitch:
      'Ce site. Un diaporama de cinq écrans, sans défilement de page : un geste, un écran. Chaque fiche projet prend la direction artistique de son projet, et l’écran expérience est un circuit de tuyauterie à câbler. Pas de bibliothèque d’interface, pas de framework CSS : tout est écrit à la main.',
    metrics: [
      { value: '100 / 100', label: 'accessibilité et SEO, Lighthouse' },
      /* Une branche et une revue par changement, sur un projet mene seul. */
      { value: '43', label: 'pull requests, une par changement' },
    ],
    links: [
      { label: 'Visiter le site', href: 'https://rayan-oughlis.vercel.app' },
      { label: 'Repo GitHub', href: 'https://github.com/Nayarr/Portfolio' },
    ],
    media: {
      src: portfolioMedia,
      alt: 'Accueil du portfolio : le nom en très grandes capitales à gauche, la stack rangée par famille en pastilles à droite.',
    },
    palette: { from: '#7c3aed', to: '#cdbcf3', ink: '#ffffff' },
  },
  {
    id: 'dashboard',
    index: '03',
    name: 'DASHBOARD',
    year: '2026',
    kind: 'Perso, outil interne',
    role: 'Conception et développement, seul',
    stack: ['Python', 'Flask', 'SQLite', 'JavaScript natif', 'Playwright', 'Claude Code'],
    pitch:
      'L’outil que j’ai écrit pour trouver cette alternance. Il collecte les offres chez La Bonne Alternance et Welcome to the Jungle, dont il interroge l’index de recherche plutôt que d’analyser une page rendue côté client, puis note chaque annonce face au CV sur cinq axes : technique, poste, distance, structure, conditions. Un filtre écarte les écoles qui vendent une formation au lieu d’un poste, et tout doute part dans une file d’arbitrage plutôt qu’à la corbeille. Au-dessus du seuil, Claude Code rédige la lettre depuis le texte de l’annonce, et Playwright dépose la candidature sur les formulaires qui s’y prêtent.',
    metrics: [
      { value: '368 vers 40', label: 'offres collectées, puis retenues' },
      { value: '5', label: 'axes de notation face au CV' },
      { value: '137', label: 'offres écartées par les filtres' },
    ],
    links: [],
    media: {
      src: dashboardMedia,
      alt: 'Vue « Validé » du tableau de bord : la liste des offres retenues avec leur score d’adéquation et les mots-clés relevés, et à droite le détail d’une offre, sa notation sur cinq axes et ses correspondances avec le CV.',
    },
    /* Les trois couleurs de l'outil, reprises de sa propre feuille de style :
       encre, encre-2 et papier. Voir la PR pour le sens du degrade. */
    palette: { from: '#16181d', to: '#4a4f5a', ink: '#faf9f6' },
  },
  {
    id: 'assurfast',
    index: '04',
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
    /* Depot prive : un lien qui mene a une 404 vaut moins que pas de lien. */
    links: [],
    media: {
      src: assurfastLogo,
      alt: 'Logo ASSURFAST : le nom en capitales bleu marine, suivi d’un eclair jaune dans un bouclier.',
      kind: 'logo',
    },
    mediaNote:
      'L’extension traite des permis et des cartes grises de clients du cabinet : aucune capture de l’outil en fonctionnement n’est diffusable.',
    palette: { from: '#0b63f6', to: '#7fb2ff', ink: '#ffd60a' },
  },
  {
    id: 'papyrus',
    index: '05',
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
    index: '06',
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
    index: '07',
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
