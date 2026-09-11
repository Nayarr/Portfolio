import { RETOUR_ACCUEIL, useDeck } from '@/lib/deck';
import styles from './SiteHeader.module.css';

/** Index de la diapo contact, cible du lien d'evitement. */
const CONTACT = 4;
/** Index du hub. */
const ACCUEIL = 0;

/** Chrome haut, commun a toutes les diapos. */
export function SiteHeader() {
  const { goTo } = useDeck();

  /**
   * Le logotype etait un `<Link to="/">`, or le site n'a qu'une route : le
   * clic ne faisait rien. Il ramene maintenant a la premiere diapo, en
   * refermant au passage une eventuelle fiche projet, qui recouvrirait
   * sinon le hub une fois revenu.
   */
  const rentrer = () => {
    window.dispatchEvent(new Event(RETOUR_ACCUEIL));
    goTo(ACCUEIL);
  };

  return (
    <header className={styles.header}>
      {/* Sans ce raccourci, joindre le contact au clavier demande de traverser
          les quatre diapos precedentes. Un bouton et non une ancre : il n'y a
          plus de defilement pour amener une ancre a l'ecran. */}
      <button type="button" className={styles.skip} onClick={() => goTo(CONTACT)}>
        Aller au contact
      </button>
      {/* Le libelle doit contenir le texte visible : sinon la commande vocale
          "clique RAYAN" ne trouve pas la cible (label-content-name-mismatch). */}
      <button
        type="button"
        className={styles.wordmark}
        onClick={rentrer}
        aria-label="Rayan Oughlis, retour a l’accueil"
      >
        RAYAN
      </button>
    </header>
  );
}
