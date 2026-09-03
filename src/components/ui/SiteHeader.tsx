import { Link } from 'react-router-dom';

import { ModeToggle } from './ModeToggle';
import { SfxToggle } from './SfxToggle';
import styles from './SiteHeader.module.css';

/** Chrome haut, commun a tous les ecrans du mode scroll. */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.wordmark} aria-label="Accueil">
        RAYAN
      </Link>
      <div className={styles.controls}>
        <SfxToggle />
        <ModeToggle />
      </div>
    </header>
  );
}
