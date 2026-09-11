import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Enregistrement unique des plugins GSAP pour toute l'app.
 * ScrollTrigger est parti avec le defilement de page : le diaporama pilote
 * lui-meme ses transitions (voir app/Deck).
 */
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
