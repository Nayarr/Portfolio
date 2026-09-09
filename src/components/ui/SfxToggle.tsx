import { useState } from 'react';

import { isMuted, playSfx, setMuted } from '@/lib/audio';
import styles from './SfxToggle.module.css';

/** Coupe / active les effets sonores. Etat conserve dans le module audio. */
export function SfxToggle() {
  const [muted, setLocalMuted] = useState(isMuted());

  const onClick = () => {
    const next = !muted;
    setMuted(next);
    setLocalMuted(next);
    if (!next) playSfx('click');
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} ${muted ? styles.muted : ''}`}
      aria-pressed={!muted}
      onClick={onClick}
    >
      <span className={styles.bars} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      Son {muted ? 'off' : 'on'}
    </button>
  );
}
