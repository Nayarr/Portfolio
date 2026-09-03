import styles from './SiteFooter.module.css';

/** Chrome bas, commun a tous les ecrans du mode scroll. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.status}>
        Developpeur independant
        <br />
        Dispo alternance, sept. 2026
      </p>
      <nav className={styles.links} aria-label="Reseaux">
        <a href="https://instagram.com/rayan.ough">Instagram</a>
        <a href="https://github.com/Nayarr">GitHub</a>
        <a href="https://linkedin.com/in/oughlis-rayan/">LinkedIn</a>
      </nav>
    </footer>
  );
}
