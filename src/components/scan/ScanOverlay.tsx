import { useScan } from '@/lib/scan-context';
import { FUN_FACTS, READOUT } from './scan.data';
import styles from './ScanOverlay.module.css';

/**
 * Couche "profiler" plein ecran affichee quand le mode scan est actif :
 * teinte + scanlines, fun facts en annotations, petit releve de competences.
 */
export function ScanOverlay() {
  const { active } = useScan();

  return (
    <div className={`${styles.overlay} ${active ? styles.on : ''}`} aria-hidden={!active}>
      <div className={styles.hud} />

      <div
        className={styles.box}
        style={{ top: '12%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <span>Identité</span> {READOUT.identity}
      </div>
      <div className={styles.box} style={{ top: '20%', right: '6%' }}>
        <span>Statut</span> {READOUT.status}
      </div>

      {FUN_FACTS.map((fact) => (
        <p
          key={fact.text}
          className={`${styles.fact} ${'big' in fact && fact.big ? styles.big : ''}`}
          style={fact.at}
        >
          <svg viewBox="0 0 30 30" aria-hidden="true">
            <path
              d="M4 4c10 5 17 14 15 24M19 28l0-7M19 28l-7-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {fact.text}
        </p>
      ))}

      <div className={styles.readout}>
        <p className={styles.cmd}>&gt; analyse_competences.exe</p>
        {READOUT.skills.map(([name, pct]) => (
          <p key={name} className={styles.bar}>
            <span>{name}</span>
            <span className={styles.track}>
              <span className={styles.fill} style={{ width: `${pct}%` }} />
            </span>
          </p>
        ))}
        <p className={styles.langs}>FR natif, EN B2, ES B1</p>
      </div>
    </div>
  );
}
