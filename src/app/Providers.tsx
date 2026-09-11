import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { Cursor } from '@/components/ui/Cursor';

/**
 * Contexte global du site : pour l'instant le seul curseur custom.
 * Le smooth-scroll (Lenis) est monte dans ScrollExperience.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Cursor />
      {children}
      <Analytics />
    </>
  );
}
