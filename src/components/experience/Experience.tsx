import { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useMediaQuery } from '@/lib/useMediaQuery';
import { Pipe } from './Pipe';
import { useDragModule } from './useDragModule';
import {
  A_PLACER,
  COLONNES,
  LIGNES,
  LIGNE_SOURCE,
  SOLUTION,
  grilleInitiale,
  index,
  lignesAlimentees,
  piecesDuPlateau,
  type Piece,
} from './circuit';
import styles from './Experience.module.css';

type Step = {
  title: string;
  period: string;
  lines: string[];
};

/** Une etape par ligne de la grille, de la plus recente a la plus ancienne. */
const STEPS: Step[] = [
  {
    title: 'ASSURFAST, lead technique projets (stage S4)',
    period: 'Avr. vers juin 2026, 8 semaines, Alfortville',
    lines: [
      'Seul profil technique du cabinet, du besoin à la mise en production.',
      'AssurFill (OCR permis + carte grise), refonte SEO (impressions x5), traitement 100 % local.',
    ],
  },
  {
    title: 'BUT Informatique, IUT Créteil/Vitry (UPEC)',
    period: 'Sept. 2024 vers juin 2027 (prévu)',
    lines: ['Parcours réalisation d’applications : conception, développement, validation.'],
  },
  {
    title: 'Lycée Paul Langevin, Beauvais',
    period: 'Juillet 2024',
    lines: ['Bac STI2D, mention Très Bien.'],
  },
];

/** Les cases que le joueur manipule. Les autres sont scellees. */
const MANIPULABLES = new Set(A_PLACER);

/**
 * Ecran 03, Experience. Une grille de tuyauterie relie la source a chaque
 * experience : on pose les modules manquants depuis la reserve, on les tourne,
 * et la ligne s'allume quand le courant passe.
 *
 * Le jeu est un habillage, pas un peage. Les cartes restent lisibles sans y
 * toucher : c'est la section la plus importante du site, et un recruteur
 * presse ne doit pas avoir a jouer pour lire un parcours. Le circuit donne
 * envie de s'attarder, et le bouton donne la reponse a qui n'a pas le temps.
 */
export function Experience() {
  /**
   * Au telephone, le circuit disparait. Poser un module de la reserve sur une
   * case de grille demande une precision que le doigt n'a pas a cette taille :
   * le jeu devenait un obstacle devant la section la plus importante du site.
   * Le parcours se lit alors directement, ce qui est de toute facon ce qu'on
   * vient chercher.
   */
  const compact = useMediaQuery('(max-width: 900px)');
  const [grille, setGrille] = useState<(Piece | null)[]>(grilleInitiale);
  const [reserve, setReserve] = useState(piecesDuPlateau);
  const [choisie, setChoisie] = useState<number | null>(null);

  const allumees = useMemo(() => lignesAlimentees(grille), [grille]);
  const total = allumees.filter(Boolean).length;
  const resolu = total === LIGNES;
  /** Rien n'a ete pose ni tourne : reinitialiser n'aurait aucun effet. */
  const vierge = reserve.length === A_PLACER.length && total === 0;

  /** Sort un module de la reserve et le pose sur une case libre. */
  const poser = useCallback((id: number, cible: number) => {
    setReserve((t) => {
      const prise = t.find((p) => p.id === id);
      if (!prise) return t;
      setGrille((g) => (g[cible] ? g : g.map((p, n) => (n === cible ? { ...prise.piece } : p))));
      return t.filter((p) => p.id !== id);
    });
    setChoisie(null);
  }, []);

  /**
   * Reprise d'un module deja pose.
   *
   * Une erreur de placement etait definitive : la case occupee ne repondait
   * qu'a la rotation, et rien ne permettait de recuperer le module pour
   * l'essayer ailleurs. Il repart maintenant en reserve des que l'appui
   * devient un glisser, et se repose comme n'importe quel module.
   *
   * Le retrait attend le franchissement du seuil, et non l'appui : en deca,
   * le geste est encore un clic, qui doit tourner le module sur place.
   */
  const enAttente = useRef<{ id: number; depuis: number } | null>(null);
  const prochainId = useRef(1000);

  const leverDeLaGrille = useCallback((id: number) => {
    const pret = enAttente.current;
    if (!pret || pret.id !== id) return;
    enAttente.current = null;
    setGrille((g) => {
      const piece = g[pret.depuis];
      if (!piece) return g;
      setReserve((t) => [...t, { id, piece }]);
      return g.map((p, n) => (n === pret.depuis ? null : p));
    });
  }, []);

  const { glisse, survolee, commencer } = useDragModule({
    onDepose: poser,
    onActif: leverDeLaGrille,
  });

  /** Amorce la reprise : rien n'est retire tant que le doigt n'a pas bouge. */
  const amorcerReprise = (i: number, e: React.PointerEvent) => {
    if (!grille[i] || !MANIPULABLES.has(i)) return;
    const id = ++prochainId.current;
    enAttente.current = { id, depuis: i };
    commencer(id, e);
  };

  /** Pose le module choisi sur une case vide, ou tourne celui deja pose. */
  const toucherCase = (i: number) => {
    if (grille[i]) {
      setGrille((g) =>
        g.map((p, n) => (n === i && p ? { ...p, rotation: (p.rotation + 1) % 4 } : p)),
      );
      return;
    }
    if (choisie === null) return;
    poser(choisie, i);
  };

  const moduleGlisse = glisse ? reserve.find((p) => p.id === glisse.id) : undefined;

  /** Tourne un module reste en reserve, avant de le poser. */
  const tournerEnReserve = (id: number) => {
    setReserve((t) =>
      t.map((p) =>
        p.id === id ? { ...p, piece: { ...p.piece, rotation: (p.piece.rotation + 1) % 4 } } : p,
      ),
    );
  };

  const donnerLaReponse = () => {
    setGrille(SOLUTION.map((p) => (p ? { ...p } : null)));
    setReserve([]);
    setChoisie(null);
  };

  const rejouer = () => {
    setGrille(grilleInitiale());
    setReserve(piecesDuPlateau());
    setChoisie(null);
  };

  return (
    <section className={styles.experience} id="experience" aria-label="Expérience">
      <div className={styles.inner}>
        <header className={styles.intro}>
          {compact ? (
            <>
              <h2 className={styles.title}>Parcours</h2>
              <p className={styles.text}>
                Un stage comme seul profil technique, un BUT en cours, un bac STI2D. De la plus
                récente à la plus ancienne.
              </p>
            </>
          ) : (
            <>
              <h2 className={styles.title}>
                Rétablis
                <br />
                le courant
              </h2>
              <p className={styles.text}>
                Pose les modules qui manquent, tourne-les d’un clic pour aligner les tuyaux, et
                amène le courant jusqu’à chaque expérience. Un module mal placé se reprend en le
                glissant ailleurs. Les cartes se lisent sans jouer.
              </p>
            </>
          )}

          {!compact && (
            <>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.revealAll}
                  onClick={donnerLaReponse}
                  disabled={resolu}
                >
                  Donne moi la réponse !
                </button>
                {/* Bouton distinct et toujours present : on doit pouvoir tout
                remettre a plat sans avoir a resoudre d'abord. */}
                <button type="button" className={styles.reset} onClick={rejouer} disabled={vierge}>
                  Réinitialiser
                </button>
                <span className={styles.count} role="status">
                  {total} / {LIGNES} alimentées
                </span>
              </div>

              <div className={styles.tray} role="group" aria-label="Modules en réserve">
                {reserve.map(({ id, piece }) => {
                  const active = choisie === id;
                  return (
                    <span key={id} className={styles.trayItem}>
                      <button
                        type="button"
                        className={[
                          styles.trayPiece,
                          active ? styles.trayPieceOn : '',
                          glisse?.id === id && glisse.actif ? styles.trayPiecePrise : '',
                        ].join(' ')}
                        aria-pressed={active}
                        aria-label={`Module ${piece.forme}${active ? ', sélectionné' : ''}`}
                        onPointerDown={(e) => commencer(id, e)}
                        onClick={() => setChoisie(active ? null : id)}
                      >
                        <Pipe piece={piece} alimente={false} raccorde={false} />
                      </button>
                      <button
                        type="button"
                        className={styles.trayTurn}
                        aria-label={`Tourner le module ${piece.forme}`}
                        onClick={() => tournerEnReserve(id)}
                      >
                        &#8635;
                      </button>
                    </span>
                  );
                })}

                {/**
                 * Emplacements liberes. Ils gardent leur place, sinon la
                 * reserve perdait une ligne des qu'on prenait un module, et
                 * toute la colonne de gauche remontait sous le doigt. Leur
                 * nombre est constant : chaque module est soit ici, soit sur
                 * la grille.
                 */}
                {Array.from({ length: A_PLACER.length - reserve.length }, (_, n) => (
                  <span key={`vide-${n}`} className={styles.trayItem} aria-hidden="true">
                    <span className={styles.trayVide} />
                    <span className={styles.trayTurnVide} />
                  </span>
                ))}
              </div>
            </>
          )}
        </header>

        <div className={styles.board}>
          {STEPS.map((step, ligne) => (
            <div
              key={step.title}
              className={styles.row}
              /* Le rang sert a reordonner au telephone : toutes les lignes de
                 grille d'abord, puis toutes les cartes. */
              style={{ ['--ligne' as string]: ligne }}
            >
              {!compact && (
                <div className={styles.cells}>
                  {/* Une seule ligne recoit le courant : ailleurs le gabarit
                    garde la place pour que les grilles restent alignees. */}
                  {ligne === LIGNE_SOURCE ? (
                    <span className={styles.source} aria-hidden="true" />
                  ) : (
                    <span className={styles.sourceVide} aria-hidden="true" />
                  )}
                  {Array.from({ length: COLONNES }, (_, colonne) => {
                    const i = index(colonne, ligne);
                    const piece = grille[i];
                    const libre = MANIPULABLES.has(i);

                    // Une case hors trace n'accueille jamais rien : c'est du
                    // decor, pas un bouton desactive de plus dans l'ordre de
                    // lecture d'un lecteur d'ecran.
                    if (!SOLUTION[i]) {
                      return <span key={i} className={styles.cellVide} aria-hidden="true" />;
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        data-case={i}
                        data-accepte={libre && !piece ? 'oui' : 'non'}
                        className={[
                          styles.cell,
                          piece ? styles.cellPleine : '',
                          libre ? '' : styles.cellFixe,
                          glisse?.actif && libre && !piece ? styles.cellCandidate : '',
                          survolee === i ? styles.cellVisee : '',
                        ].join(' ')}
                        onClick={() => toucherCase(i)}
                        onPointerDown={(e) => amorcerReprise(i, e)}
                        disabled={!libre}
                        aria-label={
                          piece
                            ? `Colonne ${colonne + 1}, module ${piece.forme}, tourner ou deplacer`
                            : `Colonne ${colonne + 1}, case vide`
                        }
                      >
                        {piece && <Pipe piece={piece} alimente={allumees[ligne] ?? false} />}
                      </button>
                    );
                  })}
                </div>
              )}

              <article className={`${styles.card} ${allumees[ligne] ? styles.cardOn : ''}`}>
                <h3>{step.title}</h3>
                <p className={styles.period}>{step.period}</p>
                {step.lines.map((line) => (
                  <p key={line} className={styles.line}>
                    {line}
                  </p>
                ))}
              </article>
            </div>
          ))}
        </div>
      </div>

      {/**
       * Le module suit le pointeur pendant le deplacement.
       *
       * Sorti du document par un portail, et non pose ici : la piste du
       * diaporama porte une transformation, et un ancetre transforme fait
       * qu'un `position: fixed` se cale sur lui au lieu de la fenetre. Le
       * module se retrouvait alors a plusieurs milliers de pixels hors ecran,
       * donc invisible, des qu'on n'etait plus sur la premiere diapo.
       */}
      {glisse?.actif &&
        moduleGlisse &&
        createPortal(
          <span
            className={styles.fantome}
            style={{ left: glisse.x, top: glisse.y }}
            aria-hidden="true"
          >
            <Pipe piece={moduleGlisse.piece} alimente={false} raccorde={false} />
          </span>,
          document.body,
        )}
    </section>
  );
}
