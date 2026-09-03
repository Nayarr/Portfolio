/**
 * SFX synthetises a la volee via la Web Audio API : pas d'asset a charger.
 * Sons courts, feutres, dans l'esprit "jeu video chill". Respecte le mute
 * (persiste en localStorage) et prefers-reduced-motion.
 */
type SfxName = 'click' | 'hover' | 'zap' | 'scan-on' | 'scan-off';

const MUTE_KEY = 'ro.sfx.muted';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = readMuted();

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

type BlipOptions = {
  type?: OscillatorType;
  from?: number;
  to?: number;
  dur?: number;
  gain?: number;
  cutoff?: number;
};

function blip(ac: AudioContext, opts: BlipOptions) {
  const { type = 'sine', from = 440, dur = 0.08, gain = 0.06, cutoff = 2400 } = opts;
  const to = opts.to ?? from;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  const lp = ac.createBiquadFilter();

  osc.type = type;
  osc.frequency.setValueAtTime(from, now);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + dur);

  lp.type = 'lowpass';
  lp.frequency.value = cutoff;

  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.008);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  osc.connect(lp).connect(amp).connect(master!);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

function noise(ac: AudioContext, { dur = 0.14, gain = 0.05, freq = 900, q = 6 }) {
  const now = ac.currentTime;
  const frames = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);

  const src = ac.createBufferSource();
  src.buffer = buf;
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = freq;
  bp.Q.value = q;
  const amp = ac.createGain();
  amp.gain.value = gain;

  src.connect(bp).connect(amp).connect(master!);
  src.start(now);
  src.stop(now + dur);
}

export function playSfx(name: SfxName) {
  if (muted) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ac = ensureContext();
  if (!ac || !master) return;

  switch (name) {
    case 'click':
      blip(ac, { type: 'triangle', from: 520, to: 380, dur: 0.09, gain: 0.05 });
      break;
    case 'hover':
      blip(ac, { type: 'sine', from: 1200, dur: 0.04, gain: 0.02, cutoff: 4000 });
      break;
    case 'zap':
      noise(ac, { dur: 0.16, gain: 0.06, freq: 1100, q: 4 });
      blip(ac, { type: 'sawtooth', from: 180, to: 60, dur: 0.16, gain: 0.03, cutoff: 1200 });
      break;
    case 'scan-on':
      blip(ac, { type: 'sine', from: 240, to: 820, dur: 0.26, gain: 0.045 });
      break;
    case 'scan-off':
      blip(ac, { type: 'sine', from: 820, to: 220, dur: 0.24, gain: 0.045 });
      break;
  }
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0');
  } catch {
    /* stockage indisponible, on garde l'etat en memoire */
  }
}

export function isMuted() {
  return muted;
}
