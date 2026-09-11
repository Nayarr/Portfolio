import { useDeck } from '@/lib/deck';
import styles from './NextSlide.module.css';

const NOMS = ['le hub', 'les projets', 'l’expérience', 'à propos', 'le contact'];

/**
 * Fleche de passage a la diapo suivante, presente sur chaque ecran.
 * Elle s'efface sur la derniere, ou elle n'aurait nulle part ou aller.
 */
export function NextSlide() {
  const { index, count, goTo } = useDeck();
  if (index >= count - 1) return null;

  return (
    <button
      type="button"
      className={styles.next}
      onClick={() => goTo(index + 1)}
      aria-label={`Aller à ${NOMS[index + 1] ?? 'la suite'}`}
    >
      <span className={styles.label}>{NOMS[index + 1]}</span>
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}
