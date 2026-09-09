import type { ReactNode } from 'react';

import { ScanProvider } from '@/lib/scan-context';
import { useUiSounds } from '@/lib/useUiSounds';
import { Cursor } from '@/components/ui/Cursor';
import { ScanOverlay } from '@/components/scan/ScanOverlay';

/**
 * Contexte global du site : curseur custom, etat du mode scan, sons d'interface.
 * Le smooth-scroll (Lenis) est monte dans ScrollExperience.
 */
export function Providers({ children }: { children: ReactNode }) {
  useUiSounds();

  return (
    <ScanProvider>
      <Cursor />
      {children}
      <ScanOverlay />
    </ScanProvider>
  );
}
