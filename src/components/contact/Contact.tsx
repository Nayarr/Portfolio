import styles from './Contact.module.css';

/** Ecran 05, Contact. Coordonnees, liens, telechargement du CV. */
export function Contact() {
  return (
    <section className={styles.contact} id="contact" aria-label="Contact">
      <div className={styles.inner}>
        <p className={styles.status}>
          En recherche d&apos;alternance, 1 an, rythme 1 sem. / 1 sem., dispo sept. 2026
        </p>

        <h2 className={styles.title}>
          On en
          <br />
          <span className={styles.accent}>parle ?</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.primary}>
            <a className={styles.email} href="mailto:rayan.oughlis@etu.u-pec.fr">
              rayan.oughlis@etu.u-pec.fr
            </a>
            <a className={styles.phone} href="tel:+33769415909">
              +33 7 69 41 59 09
            </a>
          </div>

          <nav className={styles.links} aria-label="Liens">
            <a href="https://linkedin.com/in/oughlis-rayan/">LinkedIn, in/oughlis-rayan &#8599;</a>
            <a href="https://github.com/Nayarr">GitHub, Nayarr &#8599;</a>
            <a href="https://instagram.com/rayan.ough">Instagram, rayan.ough &#8599;</a>
            <a className={styles.cv} href="/cv.pdf" download>
              &#8595; Telecharger le CV (PDF)
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
