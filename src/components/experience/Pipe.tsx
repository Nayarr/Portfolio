import { ouvertures, type Piece, NORD, EST, SUD, OUEST } from './circuit';
import styles from './Experience.module.css';

/**
 * Demi-segment allant du centre vers un cote, en coordonnees de 0 a 100.
 *
 * Il deborde largement hors de la case, et le SVG le rogne a son bord. Arrete
 * pile au bord, le trait y posait son bout arrondi, qui deborde d'une
 * demi-epaisseur : chaque raccord se marquait d'un renflement, et le cable
 * ressemblait a une suite de troncons mis bout a bout. Rogne, il arrive a
 * plat exactement sur la limite, ou l'attend celui de la case voisine, qui
 * arrive a plat lui aussi. Les cases se touchent sans ecart, la jointure est
 * donc invisible.
 *
 * Le debord doit rester genereux : le trait garde une epaisseur constante en
 * pixels alors que les coordonnees suivent la case, deux fois plus haute que
 * large, donc une meme valeur ne couvre pas la meme distance selon l'axe.
 */
const DEBORD = 60;
const segments = (debord: number): Record<number, string> => ({
  [NORD]: `M50 50 L50 ${-debord}`,
  [EST]: `M50 50 L${100 + debord} 50`,
  [SUD]: `M50 50 L50 ${100 + debord}`,
  [OUEST]: `M50 50 L${-debord} 50`,
});

type Props = {
  piece: Piece;
  alimente: boolean;
  /**
   * `false` pour un module de la reserve : il ne touche aucun voisin, donc il
   * ne deborde pas et n'est pas rogne. Rogne, ses traits arrivaient a plat sur
   * les quatre bords de sa vignette et le module ressemblait a un bloc plutot
   * qu'a un bout de cable.
   */
  raccorde?: boolean;
};

/**
 * Un module de tuyauterie. Il est dessine a partir de ses ouvertures plutot
 * que d'un trace par forme : une seule regle couvre les trois formes et leurs
 * quatre rotations, et ajouter une forme ne demande que sa liste d'ouvertures.
 */
export function Pipe({ piece, alimente, raccorde = true }: Props) {
  const dessin = segments(raccorde ? DEBORD : 0);
  const trace = ouvertures(piece)
    .map((cote) => dessin[cote])
    .join(' ');

  return (
    /**
     * `preserveAspectRatio="none"` laisse le trace epouser la case, qui est
     * plus haute que large : c'est ce qui rend le tronc vertical continu d'une
     * ligne a l'autre. `vector-effect` garde malgre tout une epaisseur de trait
     * constante, sinon les tuyaux verticaux paraitraient plus fins.
     */
    <svg
      className={`${styles.pipe} ${raccorde ? '' : styles.pipeLibre}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/**
       * Un seul trace par couche, et non un par ouverture : les demi-segments
       * partagent le meme centre, donc le rendu les fond en un seul trait.
       * Dessines separement, leurs bouts arrondis se superposaient au centre
       * et marquaient la jonction.
       *
       * Il n'y a plus de noyau non plus. C'etait un cercle, mais
       * `preserveAspectRatio="none"` l'etirait a la forme de la case, bien
       * plus haute que large : il devenait une ellipse verticale, soit une
       * barre en travers du cable sur chaque segment horizontal.
       */}
      <path className={styles.gaine} vectorEffect="non-scaling-stroke" d={trace} />
      <path
        className={`${styles.fil} ${alimente ? styles.filActif : ''}`}
        vectorEffect="non-scaling-stroke"
        d={trace}
      />
    </svg>
  );
}
