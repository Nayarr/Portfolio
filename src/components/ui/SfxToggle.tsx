import { useState } from 'react';

import { isMuted, playSfx, setMuted } from '@/lib/audio';

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
    <button type="button" className="sfx-toggle" aria-pressed={!muted} onClick={onClick}>
      Son {muted ? 'off' : 'on'}
    </button>
  );
}
