import styles from './SiteFooter.module.css';

/** Chrome bas, commun a tous les ecrans du mode scroll. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.status}>
        Développeur indépendant
        <br />
        Dispo alternance, sept. 2026
      </p>
      <nav className={styles.links} aria-label="Réseaux">
        <a href="https://instagram.com/rayan.ough" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://github.com/Nayarr" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/in/oughlis-rayan/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}
