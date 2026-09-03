import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Mode scan : superpose une couche "profiler" (fun facts, data) par-dessus le contenu.
 * Un seul etat global, expose via ce contexte. Les sections lisent `active`
 * pour afficher/masquer leurs annotations.
 */
type ScanContextValue = {
  active: boolean;
  toggle: () => void;
  set: (value: boolean) => void;
};

const ScanContext = createContext<ScanContextValue | null>(null);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => setActive((v) => !v), []);
  const set = useCallback((value: boolean) => setActive(value), []);

  const value = useMemo(() => ({ active, toggle, set }), [active, toggle, set]);

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with its provider, conventional
export function useScan() {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error('useScan doit etre utilise dans <ScanProvider>');
  return ctx;
}
