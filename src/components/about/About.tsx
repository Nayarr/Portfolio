import photo from './rayan-oughlis.png';
import styles from './About.module.css';

const INTERESTS = ['UI / UX design', 'création de jeux vidéo', 'e-sport', 'musculation'];

/** Les langues aussi sont des etiquettes : rien ne justifiait qu'elles seules
    restent une phrase, juste sous une liste de pastilles. */
const LANGUES = ['Français natif', 'Anglais B2', 'Espagnol B1'];

/** Ecran 04, A propos. Photo, recit, formation, centres d'interet, hors-code. */
export function About() {
  return (
    <section className={styles.about} id="a-propos" aria-label="À propos">
      <div className={styles.grid}>
        <aside className={styles.side}>
          <div className={styles.photo}>
            <img src={photo} alt="Rayan Oughlis" />
          </div>
          <p className={styles.id}>
            Rayan Oughlis, 20 ans
            <br />
            Vitry-sur-Seine 94, permis B (véhiculé)
          </p>
        </aside>

        <div className={styles.story}>
          <h2 className={styles.title}>
            Développeur full-stack,
            <br />
            <span className={styles.accent}>penchant data &amp; automatisation.</span>
          </h2>

          <p className={styles.lede}>
            Rayan, 20 ans, Vitry. BUT Informatique 3<sup>e</sup> année, parcours conception /
            développement / validation. J’aime quand le code sert à quelque chose de concret :
            automatiser une saisie, structurer de la donnée en vrac, donner à voir des chiffres. En
            stage j’étais le seul dev d’un cabinet de courtage, du besoin jusqu’à la prod. Sur mon
            temps libre je maintiens deux applis en prod pour un serveur Minecraft, j’apprends la
            3D, et je fais des jeux qui ne sortiront probablement jamais. Objectif : une alternance
            où je construis des trucs qui tiennent.
          </p>

          <div className={styles.cols}>
            <div>
              <h3 className={styles.label}>Formation</h3>
              <p className={styles.block}>
                <strong>BUT Informatique</strong>, IUT Créteil/Vitry (UPEC)
                <br />
                <span className={styles.meta}>2024 vers 2027 (prévu)</span>
              </p>
              <p className={styles.block}>
                <strong>Bac STI2D</strong>, Lycée Paul Langevin, Beauvais
                <br />
                <span className={styles.meta}>Mention Très Bien, 2024</span>
              </p>
            </div>
            <div>
              <h3 className={styles.label}>Ce qui m’anime</h3>
              <ul className={styles.chips}>
                {INTERESTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className={styles.label}>Langues</h3>
              <ul className={styles.chips}>
                {LANGUES.map((langue) => (
                  <li key={langue}>{langue}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className={styles.offcode}>
            <span className={styles.label}>Hors-code</span> Été 2024 : BAFA, puis
            animateur-surveillant baignade (CE EDF, CIE Thales).
          </p>
        </div>
      </div>
    </section>
  );
}
