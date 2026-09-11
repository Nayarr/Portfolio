import { ouvertures, type Piece, NORD, EST, SUD, OUEST } from './circuit';
import styles from './Experience.module.css';

/** Demi-segment allant du centre vers un cote, en coordonnees de 0 a 100. */
const SEGMENTS: Record<number, string> = {
  [NORD]: 'M50 50 L50 0',
  [EST]: 'M50 50 L100 50',
  [SUD]: 'M50 50 L50 100',
  [OUEST]: 'M50 50 L0 50',
};

type Props = { piece: Piece; alimente: boolean };

/**
 * Un module de tuyauterie. Il est dessine a partir de ses ouvertures plutot
 * que d'un trace par forme : une seule regle couvre les trois formes et leurs
 * quatre rotations, et ajouter une forme ne demande que sa liste d'ouvertures.
 */
export function Pipe({ piece, alimente }: Props) {
  const cotes = ouvertures(piece);

  return (
    /**
     * `preserveAspectRatio="none"` laisse le trace epouser la case, qui est
     * plus haute que large : c'est ce qui rend le tronc vertical continu d'une
     * ligne a l'autre. `vector-effect` garde malgre tout une epaisseur de trait
     * constante, sinon les tuyaux verticaux paraitraient plus fins.
     */
    <svg
      className={styles.pipe}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Gaine sombre, puis conducteur : le tuyau garde une epaisseur lisible
          meme eteint, et l'allumage ne joue que sur le conducteur. */}
      {cotes.map((cote) => (
        <path
          key={`gaine-${cote}`}
          className={styles.gaine}
          vectorEffect="non-scaling-stroke"
          d={SEGMENTS[cote]}
        />
      ))}
      {cotes.map((cote) => (
        <path
          key={`fil-${cote}`}
          className={`${styles.fil} ${alimente ? styles.filActif : ''}`}
          vectorEffect="non-scaling-stroke"
          d={SEGMENTS[cote]}
        />
      ))}
      <circle
        className={`${styles.noyau} ${alimente ? styles.noyauActif : ''}`}
        cx="50"
        cy="50"
        r="9"
      />
    </svg>
  );
}
