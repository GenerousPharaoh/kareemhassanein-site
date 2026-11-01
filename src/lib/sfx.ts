/**
 * Sound effects made on the spot with the Web Audio API: no files, so they are always in sync
 * with whatever fires them. Nothing plays until `enable()` runs inside a user gesture, since
 * browsers keep audio silent until then.
 */
export class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private on = false;

  get enabled() {
    return this.on;
  }

  /** Call from a click or tap. */
  enable() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 12;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.12;
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
      const len = this.ctx.sampleRate;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    void this.ctx.resume();
    this.on = true;
  }

  disable() {
    this.on = false;
    void this.ctx?.suspend();
  }

  dispose() {
    this.on = false;
    void this.ctx?.close();
    this.ctx = null;
  }

  private ready() {
    return this.on && this.ctx && this.master && this.ctx.state === 'running' ? this.ctx : null;
  }

  /** A pitched blip: freq slides to `to` over its life; gain decays to silence by `dur`. */
  private tone(freq: number, dur: number, o: { type?: OscillatorType; gain?: number; to?: number; delay?: number; attack?: number } = {}) {
    const ctx = this.ready();
    if (!ctx) return;
    const t0 = ctx.currentTime + (o.delay ?? 0);
    const osc = ctx.createOscillator();
    osc.type = o.type ?? 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    const g = ctx.createGain();
    const peak = o.gain ?? 0.15;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack ?? 0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  /** Filtered noise whose band sweeps from one frequency to another. */
  private hiss(dur: number, o: { from: number; to: number; q?: number; gain?: number; delay?: number; attack?: number }) {
    const ctx = this.ready();
    if (!ctx || !this.noise) return;
    const t0 = ctx.currentTime + (o.delay ?? 0);
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = o.q ?? 1.2;
    f.frequency.setValueAtTime(o.from, t0);
    f.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    const g = ctx.createGain();
    const peak = o.gain ?? 0.12;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + (o.attack ?? dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master!);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  /** A keystroke. */
  tick() {
    this.tone(1500 + Math.random() * 500, 0.035, { type: 'square', gain: 0.035 });
    this.hiss(0.03, { from: 3000, to: 5000, q: 2, gain: 0.03, attack: 0.002 });
  }

  /** Something small appearing; `step` raises the pitch so a run of them climbs. */
  pop(step = 0) {
    const f = 480 * Math.pow(2, step / 12);
    this.tone(f, 0.14, { gain: 0.1, to: f * 1.6 });
  }

  click() {
    this.tone(1100, 0.025, { type: 'square', gain: 0.07 });
    this.tone(520, 0.05, { type: 'triangle', gain: 0.07, delay: 0.015 });
    this.hiss(0.04, { from: 2000, to: 3500, q: 1.5, gain: 0.04, attack: 0.002 });
  }

  /** Air moving: a transition. */
  whoosh(dur = 0.45, soft = false) {
    this.hiss(dur, { from: 220, to: 2600, q: 0.9, gain: soft ? 0.07 : 0.14 });
  }

  /** A line drawing itself. */
  draw(dur = 0.6) {
    this.hiss(dur, { from: 900, to: 3200, q: 7, gain: 0.06, attack: 0.05 });
  }

  /** A low hit under a headline. */
  hit() {
    this.tone(120, 0.42, { gain: 0.32, to: 42, attack: 0.006 });
    this.hiss(0.08, { from: 1200, to: 300, q: 1, gain: 0.05, attack: 0.002 });
  }

  /** Confirmation. */
  chime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, 1.1 - i * 0.12, { gain: 0.09, delay: i * 0.07, attack: 0.01 }));
  }

  /** Builds toward a moment. */
  riser(dur = 0.7) {
    this.hiss(dur, { from: 160, to: 2200, q: 2.5, gain: 0.1, attack: dur * 0.8 });
    this.tone(180, dur, { type: 'triangle', gain: 0.05, to: 540, attack: dur * 0.7 });
  }
}
