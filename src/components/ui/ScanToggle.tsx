import { useScan } from '@/lib/scan-context';
import { playSfx } from '@/lib/audio';
import styles from './ScanToggle.module.css';

/** Active / coupe le mode scan. */
export function ScanToggle() {
  const { active, toggle } = useScan();

  return (
    <button
      type="button"
      className={`${styles.toggle} ${active ? styles.on : ''}`}
      aria-pressed={active}
      onClick={() => {
        playSfx(active ? 'scan-off' : 'scan-on');
        toggle();
      }}
    >
      <span className={styles.dot} aria-hidden="true" />
      Mode scan
    </button>
  );
}
