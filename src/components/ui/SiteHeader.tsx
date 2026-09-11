import { Link } from 'react-router-dom';

import styles from './SiteHeader.module.css';

/** Chrome haut, commun a tous les ecrans du mode scroll. */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      {/* La piste est epinglee : sans ce raccourci, joindre le contact au
          clavier demande de traverser les cinq panneaux. */}
      <a className={styles.skip} href="#contact">
        Aller au contact
      </a>
      {/* Le libelle doit contenir le texte visible : sinon la commande vocale
          "clique RAYAN" ne trouve pas la cible (label-content-name-mismatch). */}
      <Link to="/" className={styles.wordmark} aria-label="Rayan Oughlis, retour a l’accueil">
        RAYAN
      </Link>
    </header>
  );
}
