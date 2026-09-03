import { useHorizontalScroll } from '@/lib/useHorizontalScroll';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { SfxToggle } from '@/components/ui/SfxToggle';

/**
 * Mode normal : les sections defilent horizontalement (scroll detourne via Lenis + GSAP).
 * Ordre : Hub, Projets, Experience, A propos, Contact.
 * TODO(feat/hub-screen ...) : brancher les sections reelles.
 */
export function ScrollExperience() {
  const trackRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <main>
      <header className="site-header">
        <a href="/" className="wordmark">
          RAYAN
        </a>
        <ModeToggle />
        <SfxToggle />
      </header>

      <div ref={trackRef} className="h-track">
        <section className="panel" id="hub" aria-label="Hub" />
        <section className="panel" id="projets" aria-label="Projets" />
        <section className="panel" id="experience" aria-label="Experience" />
        <section className="panel" id="a-propos" aria-label="A propos" />
        <section className="panel" id="contact" aria-label="Contact" />
      </div>
    </main>
  );
}
