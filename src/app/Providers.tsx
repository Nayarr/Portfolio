import type { ReactNode } from 'react';

import { ScanProvider } from '@/lib/scan-context';
import { Cursor } from '@/components/ui/Cursor';

/**
 * Contexte global du site : curseur custom, etat du mode scan.
 * Le smooth-scroll (Lenis) est monte dans ScrollExperience, pas ici,
 * pour ne pas s'appliquer au mode exploration 3D.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ScanProvider>
      <Cursor />
      {children}
    </ScanProvider>
  );
}
