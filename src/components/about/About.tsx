import photo from './rayan-oughlis.png';
import styles from './About.module.css';

const INTERESTS = ['UI / UX design', 'creation de jeux video', 'e-sport', 'musculation'];

/** Ecran 04, A propos. Photo, recit, formation, centres d'interet, hors-code. */
export function About() {
  return (
    <section className={styles.about} id="a-propos" aria-label="A propos">
      <div className={styles.grid}>
        <aside className={styles.side}>
          <div className={styles.photo}>
            <img src={photo} alt="Rayan Oughlis" />
          </div>
          <p className={styles.id}>
            Rayan Oughlis, 20 ans
            <br />
            Vitry-sur-Seine 94, permis B (vehicule)
          </p>
        </aside>

        <div className={styles.story}>
          <h2 className={styles.title}>
            Developpeur full-stack,
            <br />
            <span className={styles.accent}>penchant data &amp; automatisation.</span>
          </h2>

          <p className={styles.lede}>
            Rayan, 20 ans, Vitry. BUT Informatique 3<sup>e</sup> annee, parcours conception /
            developpement / validation. J&apos;aime quand le code sert a quelque chose de concret :
            automatiser une saisie, structurer de la donnee en vrac, donner a voir des chiffres. En
            stage j&apos;etais le seul dev d&apos;un cabinet de courtage, du besoin jusqu&apos;a la
            prod. Sur mon temps libre je maintiens deux applis en prod pour un serveur Minecraft,
            j&apos;apprends la 3D, et je fais des jeux qui ne sortiront probablement jamais.
            Objectif : une alternance ou je construis des trucs qui tiennent.
          </p>

          <div className={styles.cols}>
            <div>
              <h3 className={styles.label}>Formation</h3>
              <p className={styles.block}>
                <strong>BUT Informatique</strong>, IUT Creteil/Vitry (UPEC)
                <br />
                <span className={styles.meta}>2024 vers 2027 (prevu)</span>
              </p>
              <p className={styles.block}>
                <strong>Bac STI2D</strong>, Lycee Paul Langevin, Beauvais
                <br />
                <span className={styles.meta}>Mention Tres Bien, 2024</span>
              </p>
            </div>
            <div>
              <h3 className={styles.label}>Ce qui m&apos;anime</h3>
              <ul className={styles.chips}>
                {INTERESTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className={styles.label}>Langues</h3>
              <p className={styles.block}>Francais natif, Anglais B2, Espagnol B1</p>
            </div>
          </div>

          <p className={styles.offcode}>
            <span className={styles.label}>Hors-code</span> Ete 2024 : BAFA, puis
            animateur-surveillant baignade (CE EDF, CIE Thales).
          </p>
        </div>
      </div>
    </section>
  );
}
