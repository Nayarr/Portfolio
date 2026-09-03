import { Link, useLocation } from 'react-router-dom';

import { playSfx } from '@/lib/audio';

/** Bascule entre le mode normal (scroll) et le mode exploration 3D. */
export function ModeToggle() {
  const { pathname } = useLocation();
  const onExplore = pathname.startsWith('/explore');

  return (
    <nav className="mode-toggle" aria-label="Mode d'affichage">
      <Link to="/" aria-current={!onExplore ? 'page' : undefined} onClick={() => playSfx('click')}>
        Normal
      </Link>
      <Link
        to="/explore"
        aria-current={onExplore ? 'page' : undefined}
        onClick={() => playSfx('click')}
      >
        Exploration 3D
      </Link>
    </nav>
  );
}
