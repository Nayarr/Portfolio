import styles from './Contact.module.css';

/** Ecran 05, Contact. Coordonnees, liens, telechargement du CV. */
export function Contact() {
  return (
    <section className={styles.contact} id="contact" aria-label="Contact">
      <div className={styles.inner}>
        {/* Quatre informations separees par des barres et non par des
            virgules : la ligne contient deja « 1 sem. / 1 sem. », dont la
            barre oblique se confondait avec la ponctuation, et on ne voyait
            plus ou finissait un element. Les barres sont plus pales que le
            texte, elles separent sans se lire, et masquees aux lecteurs
            d'ecran, qui annonceraient « barre verticale ». */}
        <p className={styles.status}>
          <span className={styles.statusTexte}>
            En recherche d’alternance
            <span className={styles.sep} aria-hidden="true">
              |
            </span>
            1 an
            <span className={styles.sep} aria-hidden="true">
              |
            </span>
            rythme 1 sem. / 1 sem.
            <span className={styles.sep} aria-hidden="true">
              |
            </span>
            dispo sept. 2026
          </span>
        </p>

        <h2 className={styles.title}>
          On en
          <br />
          <span className={styles.accent}>parle ?</span>
        </h2>

        <div className={styles.grid}>
          {/* Coordonnees et profils dans une seule colonne, a droite. Le mail
              et le telephone etaient seuls a gauche sous le titre : ils y
              faisaient un bloc isole, et l'ecran paraissait vide. Reunis aux
              deux profils, ils forment un unique point de contact, et le
              titre redescend dans la place liberee. */}
          <a className={styles.email} href="mailto:rayan.oughlis@etu.u-pec.fr">
            rayan.oughlis@etu.u-pec.fr
          </a>
          <a className={styles.phone} href="tel:+33769415909">
            +33 7 69 41 59 09
          </a>

          <nav className={styles.links} aria-label="Liens">
            <a href="https://linkedin.com/in/oughlis-rayan/" target="_blank" rel="noreferrer">
              LinkedIn, in/oughlis-rayan &#8599;
            </a>
            <a href="https://github.com/Nayarr" target="_blank" rel="noreferrer">
              GitHub, Nayarr &#8599;
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
