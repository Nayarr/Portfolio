import { Howl } from 'howler';

/**
 * SFX du site. Un seul sprite audio, charge a la premiere interaction.
 * Respecte la preference utilisateur (mute) et prefers-reduced-motion.
 * TODO(feat/sfx) : ajouter public/audio/sfx.webm + la map de sprites.
 */
type SfxName = 'click' | 'hover' | 'zap' | 'scan-on' | 'scan-off';

const SPRITE: Record<SfxName, [number, number]> = {
  click: [0, 120],
  hover: [200, 90],
  zap: [400, 320],
  'scan-on': [800, 260],
  'scan-off': [1160, 260],
};

let howl: Howl | null = null;
let muted = false;

function getHowl(): Howl {
  howl ??= new Howl({
    src: ['/audio/sfx.webm', '/audio/sfx.mp3'],
    sprite: Object.fromEntries(Object.entries(SPRITE)) as Record<string, [number, number]>,
    preload: false,
    volume: 0.4,
  });
  return howl;
}

export function playSfx(name: SfxName) {
  if (muted) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  getHowl().play(name);
}

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}
