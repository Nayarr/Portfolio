import styles from './Hub.module.css';

const STACK = ['JavaScript', 'TypeScript', 'Python', 'PHP', 'React', 'Flask', 'SQL', 'Supabase'];

/**
 * Ecran 01, Hub. Hero editorial : nom, accroche, stack, liens.
 * TODO(feat/hub-screen) : animation d'entree (GSAP), glow curseur, entree vers le mode 3D.
 */
export function Hub() {
  return (
    <section className={styles.hub} aria-label="Hub">
      <p className={styles.kicker}>Developpeur full-stack · Freelance (EI) · Vitry-sur-Seine 94</p>

      <h1 className={styles.title}>
        <span>Rayan</span>
        <span className={styles.accent}>Oughlis</span>
      </h1>

      <p className={styles.lede}>
        Je conçois des applications web, des pipelines de données et des agents IA, et je fais en
        sorte qu'on les <em>ressente</em> au fil de la navigation.
      </p>

      <ul className={styles.stack}>
        {STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <nav className={styles.socials} aria-label="Liens">
        <a href="https://github.com/Nayarr">GitHub</a>
        <a href="https://linkedin.com/in/oughlis-rayan/">LinkedIn</a>
        <a href="https://instagram.com/rayan.ough">Instagram</a>
      </nav>
    </section>
  );
}
