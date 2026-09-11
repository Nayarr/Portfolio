import photo from './rayan-oughlis.jpg';
import styles from './About.module.css';

/**
 * Centres d'interet et langues repris du CV, qui fait foi : le site et le CV
 * doivent dire la meme chose, un recruteur ayant souvent les deux sous les
 * yeux. Le site annoncait un espagnol B1 absent du CV, et un anglais B2 la ou
 * le CV dit intermediaire.
 */
const INTERESTS = ['Design', 'Musculation', 'E-sport', 'Jeux « Souls-like »'];
const LANGUES = ['Français, natif', 'Anglais, intermédiaire'];

/** Ecran 04, A propos. Photo, recit, formation, centres d'interet, hors-code. */
export function About() {
  return (
    <section className={styles.about} id="a-propos" aria-label="À propos">
      <div className={styles.grid}>
        <aside className={styles.side}>
          <div className={styles.photo}>
            <img
              src={photo}
              alt="Rayan Oughlis, assis à une table de pique-nique sur le campus, un ordinateur portable posé à côté de lui"
            />
          </div>
          <p className={styles.id}>
            Rayan Oughlis
            <br />
            20 ans
            <br />
            Paris
            <br />
            permis B (véhiculé)
          </p>
        </aside>

        <div className={styles.story}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Développeur full stack</span>
            <span className={`${styles.titleLine} ${styles.accent}`}>Automatisation &amp; IA</span>
            <span className={styles.titleCity}>Paris</span>
          </h2>

          <div className={styles.body}>
            <div className={styles.read}>
              <p className={styles.lede}>
                J’aime quand le code sert à quelque chose de concret : automatiser une saisie,
                structurer de la donnée en vrac, donner à voir des chiffres.
              </p>

              <div className={styles.recit}>
                <p>
                  BUT Informatique 3<sup>e</sup> année, parcours conception, développement et
                  validation.
                </p>
                <p>
                  En stage, j’étais le seul développeur d’un cabinet de courtage : du besoin jusqu’à
                  la mise en production.
                </p>
                <p>
                  Sur mon temps libre, je maintiens deux applications en production pour un serveur
                  Minecraft, j’apprends la 3D, et je fais des jeux qui ne sortiront probablement
                  jamais.
                </p>
              </div>

              <p className={styles.objectif}>
                <span className={styles.label}>Objectif</span> Une alternance d’un an où je
                construis des choses qui tiennent.
              </p>
            </div>

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
