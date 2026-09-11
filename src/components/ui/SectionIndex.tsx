import { useDeck } from '@/lib/deck';
import styles from './SectionIndex.module.css';

const ECRANS = ['Hub', 'Projets', 'Expérience', 'À propos', 'Contact'];

/**
 * Fil conducteur du site : la liste des ecrans, presente sur tous, avec celui
 * ou l'on se trouve en surbrillance et une barre qui avance avec la visite.
 *
 * Il vivait dans le hub, ou il n'etait qu'un decor qu'on perdait des la
 * deuxieme diapo. Transverse, il dit en permanence ou l'on est et ce qui
 * reste, et chaque entree y mene directement.
 */
export function SectionIndex() {
  const { index, count, goTo } = useDeck();

  return (
    <nav className={styles.index} aria-label="Écrans du site">
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.progress} style={{ transform: `scaleX(${(index + 1) / count})` }} />
      </span>

      <ol className={styles.list}>
        {ECRANS.map((nom, i) => {
          const courant = i === index;
          return (
            <li key={nom}>
              <button
                type="button"
                className={`${styles.item} ${courant ? styles.itemOn : ''}`}
                onClick={() => goTo(i)}
                aria-current={courant ? 'true' : undefined}
              >
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.nom}>{nom}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
