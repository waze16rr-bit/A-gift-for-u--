// Lightweight Web Audio synthesis – no external assets needed.

let ctx: AudioContext | null = null;

export const initAudio = () => {
  if (!ctx) {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
};

const playTone = (freq: number, start: number, duration: number, type: OscillatorType = "sine", gain = 0.18) => {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.05);
};

export const playYay = () => {
  initAudio();
  if (!ctx) return;
  // Happy ascending arpeggio C-E-G-C
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((n, i) => playTone(n, i * 0.09, 0.4, "triangle", 0.22));
  // sparkle on top
  setTimeout(() => {
    [1318.5, 1567.98, 2093].forEach((n, i) => playTone(n, i * 0.06, 0.3, "sine", 0.12));
  }, 350);
};

export const playSparkle = () => {
  initAudio();
  if (!ctx) return;
  [1568, 2093, 2637].forEach((n, i) => playTone(n, i * 0.05, 0.25, "sine", 0.1));
};

export const playKiss = () => {
  initAudio();
  if (!ctx) return;
  playTone(880, 0, 0.15, "sine", 0.18);
  playTone(660, 0.1, 0.25, "sine", 0.14);
};
