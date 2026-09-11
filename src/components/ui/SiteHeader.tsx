import { Link } from 'react-router-dom';

import { useDeck } from '@/lib/deck';
import styles from './SiteHeader.module.css';

/** Index de la diapo contact, cible du lien d'evitement. */
const CONTACT = 4;

/** Chrome haut, commun a toutes les diapos. */
export function SiteHeader() {
  const { goTo } = useDeck();

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
      <Link to="/" className={styles.wordmark} aria-label="Rayan Oughlis, retour a l’accueil">
        RAYAN
      </Link>
    </header>
  );
}
