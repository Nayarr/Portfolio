/**
 * La stack, reprise telle quelle du CV de Rayan : memes familles, memes
 * outils, meme decoupage en trois tons de pastilles. Le site et le CV doivent
 * raconter la meme chose, et un recruteur qui a les deux sous les yeux doit
 * reconnaitre l'un dans l'autre.
 *
 * Le ton n'a pas de sens semantique, il sert a aerer la lecture d'une longue
 * liste. Il est fixe et non aleatoire, pour que la composition ne change pas
 * d'une visite a l'autre.
 */
export type Ton = 1 | 2 | 3;
export type Outil = { nom: string; ton: Ton };
export type Famille = { titre: string; outils: Outil[] };

export const STACK: Famille[] = [
  {
    titre: 'Développement',
    outils: [
      { nom: 'HTML5 / CSS3', ton: 3 },
      { nom: 'Python', ton: 3 },
      { nom: 'Rust', ton: 1 },
      { nom: 'ReactJS', ton: 2 },
      { nom: 'JavaScript', ton: 2 },
      { nom: 'PHP', ton: 1 },
      { nom: 'Java', ton: 1 },
      { nom: 'TypeScript', ton: 1 },
      { nom: 'C / C#', ton: 1 },
      { nom: 'API REST', ton: 3 },
      { nom: 'Vite', ton: 2 },
      { nom: 'Flask', ton: 2 },
    ],
  },
  {
    titre: 'Données & backend',
    outils: [
      { nom: 'PL/SQL', ton: 1 },
      { nom: 'MySQL', ton: 2 },
      { nom: 'OracleSQL', ton: 1 },
      { nom: 'Supabase', ton: 3 },
      { nom: 'MongoDB', ton: 1 },
      { nom: 'PostgreSQL', ton: 1 },
    ],
  },
  {
    titre: 'IA',
    outils: [
      { nom: 'Claude', ton: 1 },
      { nom: 'Prompt engineering', ton: 2 },
      { nom: 'Agents IA', ton: 1 },
      { nom: 'LLM', ton: 2 },
      { nom: 'RAG', ton: 1 },
      { nom: 'Embedding', ton: 1 },
      { nom: 'Chunking', ton: 1 },
    ],
  },
  {
    titre: 'Outils & DevOps',
    outils: [
      { nom: 'Bash', ton: 1 },
      { nom: 'Ubuntu', ton: 1 },
      { nom: 'Virtual Box', ton: 1 },
      { nom: 'n8n', ton: 2 },
      { nom: 'Docker', ton: 3 },
      { nom: 'Git / GitLab', ton: 3 },
      { nom: 'Figma', ton: 3 },
    ],
  },
  {
    titre: 'Méthodes & gestion de projet',
    outils: [
      { nom: 'Agile / Scrum', ton: 3 },
      { nom: 'UML', ton: 2 },
      { nom: 'Automatisation', ton: 2 },
      { nom: 'PERT', ton: 1 },
      { nom: 'Audit', ton: 1 },
      { nom: 'Gantt', ton: 2 },
      { nom: 'Kanban', ton: 2 },
    ],
  },
];
