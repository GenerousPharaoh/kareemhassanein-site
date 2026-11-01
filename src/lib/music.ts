/**
 * A short electronic track composed in code and played with the Web Audio API: sixteen bars at
 * 120 beats a minute, so one bar is two seconds and the whole loop is thirty-two. Everything is
 * scheduled on the audio clock from a start time, so a timeline that runs at the same tempo can
 * line its cuts up with the beats. Nothing sounds until `start()` runs inside a user gesture.
 */

export const BPM = 120;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const BARS = 16;
export const LENGTH = BAR * BARS;

type Hit = { t: number; inst: 'kick' | 'clap' | 'hat' | 'ohat' | 'bass' | 'arp' | 'tick'; f?: number; v?: number; d?: number };

/** Chord roots and tones per bar (D minor, a four-bar turn): D, Bb, F, C. */
const CHORDS: { root: number; tones: number[] }[] = [
  { root: 73.42, tones: [146.83, 174.61, 220.0, 261.63] }, // D2: D3 F3 A3 C4 (Dm7)
  { root: 116.54, tones: [116.54, 146.83, 174.61, 220.0] }, // Bb2: Bb2 D3 F3 A3 (Bbmaj7)
  { root: 87.31, tones: [174.61, 220.0, 261.63, 329.63] }, // F2: F3 A3 C4 E4 (Fmaj7)
  { root: 65.41, tones: [130.81, 164.81, 196.0, 233.08] }, // C2: C3 E3 G3 Bb3 (C7)
];
const chordAt = (bar: number) => CHORDS[bar % 4];

/** Kick times in beats from the start, for anything that wants to move with them. */
export function kickBeats(): number[] {
  const out: number[] = [];
  for (let bar = 0; bar < BARS; bar++) for (const h of barHits(bar)) if (h.inst === 'kick') out.push(bar * 4 + h.t);
  return out;
}

/** The hits in one bar, times in beats within the bar. */
function barHits(bar: number): Hit[] {
  const hits: Hit[] = [];
  const c = chordAt(bar);
  const section = bar < 4 ? 'intro' : bar < 8 ? 'drop' : bar < 12 ? 'build' : 'out';
  const push = (t: number, inst: Hit['inst'], extra: Partial<Hit> = {}) => hits.push({ t, inst, ...extra });

  // Hats: eighths in the intro, sixteenths from the drop, busier in the build
  const hatStep = section === 'intro' ? 0.5 : 0.25;
  for (let t = 0; t < 4; t += hatStep) {
    const off = Math.abs((t % 1) - 0.5) < 0.01;
    const v = (off ? 0.55 : 0.3) * (section === 'intro' ? 0.5 : section === 'build' ? 1.1 : 1) * (0.85 + 0.15 * Math.sin(t * 7 + bar));
    push(t, 'hat', { v });
  }
  if (section !== 'intro' && section !== 'out') push(2.5, 'ohat', { v: 0.35 });

  // A soft tick on every beat in the intro, so the pulse is there before the drums
  if (section === 'intro') for (let t = 0; t < 4; t++) push(t, 'tick', { v: bar < 2 ? 0.5 : 0.8 });

  // Kick and clap
  if (section === 'drop' || section === 'build') {
    [0, 1.5, 2, 3].forEach((t) => push(t, 'kick', { v: t === 0 ? 1 : 0.85 }));
    if (bar === 11) [3.25, 3.5, 3.75].forEach((t) => push(t, 'kick', { v: 0.7 }));
    push(1, 'clap', { v: 0.8 });
    push(3, 'clap', { v: 0.9 });
  } else if (section === 'out') {
    push(0, 'kick', { v: 1 });
    push(2, 'kick', { v: 0.75 });
    if (bar >= 13) push(3, 'clap', { v: 0.5 });
  } else if (bar === 3) {
    push(3.5, 'kick', { v: 0.6 });
  }

  // Bass: eighth pulses on the root from bar 3; a lift to the fifth on the last eighth
  if (bar >= 2 && bar !== 12) {
    const soft = section === 'intro' ? 0.5 : section === 'out' ? 0.6 : 1;
    for (let t = 0; t < 4; t += 0.5) {
      const accent = t === 0 || t === 1.5 || t === 3;
      push(t, 'bass', { f: t === 3.5 ? c.root * 1.5 : c.root, v: (accent ? 1 : 0.6) * soft, d: t === 3.5 ? 0.22 : 0.3 });
    }
  }

  // Arp: sixteenth notes over the chord tones from bar 8, rising and falling
  if (bar >= 8 && bar !== 12) {
    const seq = [0, 1, 2, 3, 2, 1, 0, 2, 1, 3, 2, 0, 1, 2, 3, 1];
    for (let i = 0; i < 16; i++) {
      const tone = c.tones[seq[i]] * (i % 5 === 0 ? 2 : 1);
      push(i * 0.25, 'arp', { f: tone, v: (0.4 + 0.3 * ((i * 7) % 4) / 3) * (section === 'out' ? 0.55 : 1) });
    }
  }
  return hits;
}

export class Music {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private comp!: DynamicsCompressorNode;
  private duck!: GainNode;
  private reverb!: ConvolverNode;
  private wet!: GainNode;
  private delay!: DelayNode;
  private delayWet!: GainNode;
  private padFilter!: BiquadFilterNode;
  private noise!: AudioBuffer;
  private t0 = 0;
  private nextBar = 0;
  private timer: number | null = null;
  private padBar = -1;
  private running = false;
  private out = 0.8;

  get playing() {
    return this.running;
  }

  private setup() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    this.ctx = ctx;
    // Master: compressor, a soft clip for warmth, then the volume
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.knee.value = 10;
    comp.ratio.value = 3.5;
    comp.attack.value = 0.004;
    comp.release.value = 0.18;
    const clip = ctx.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const x = (i / 1023) * 2 - 1;
      curve[i] = Math.tanh(x * 1.6) / Math.tanh(1.6);
    }
    clip.curve = curve;
    clip.oversample = '2x';
    this.master = ctx.createGain();
    this.master.gain.value = this.out;
    comp.connect(clip);
    clip.connect(this.master);
    this.master.connect(ctx.destination);
    // Reverb: a generated stereo tail
    const len = Math.floor(ctx.sampleRate * 2.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4) * (ch ? 0.9 : 1);
    }
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = ir;
    this.wet = ctx.createGain();
    this.wet.gain.value = 0.22;
    this.reverb.connect(this.wet);
    this.wet.connect(comp);
    // Delay for the arp: a dotted eighth with a filtered feedback
    this.delay = ctx.createDelay(1);
    this.delay.delayTime.value = BEAT * 0.75;
    const fb = ctx.createGain();
    fb.gain.value = 0.32;
    const fbFilter = ctx.createBiquadFilter();
    fbFilter.type = 'highpass';
    fbFilter.frequency.value = 500;
    this.delay.connect(fbFilter);
    fbFilter.connect(fb);
    fb.connect(this.delay);
    this.delayWet = ctx.createGain();
    this.delayWet.gain.value = 0.3;
    this.delay.connect(this.delayWet);
    this.delayWet.connect(comp);
    this.delayWet.connect(this.reverb);
    // The pad and bass duck under every kick
    this.duck = ctx.createGain();
    this.duck.connect(comp);
    this.padFilter = ctx.createBiquadFilter();
    this.padFilter.type = 'lowpass';
    this.padFilter.frequency.value = 520;
    this.padFilter.Q.value = 0.8;
    this.padFilter.connect(this.duck);
    this.padFilter.connect(this.reverb);
    // Noise for the drums
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = this.noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.comp = comp;
    return ctx;
  }

  /** Start (or restart) the track `offset` seconds in. Call from a user gesture the first time. */
  start(offset = 0) {
    const ctx = this.setup();
    void ctx.resume();
    this.stopTimer();
    const now = ctx.currentTime + 0.06;
    this.t0 = now - offset;
    this.nextBar = Math.max(0, Math.floor(offset / BAR));
    this.padBar = -1;
    this.running = true;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(0.0001, now);
    this.master.gain.exponentialRampToValueAtTime(this.out, now + 0.08);
    const tick = () => {
      if (!this.ctx || !this.running) return;
      const ahead = this.ctx.currentTime + 0.3;
      while (this.nextBar < BARS && this.t0 + this.nextBar * BAR < ahead) {
        this.scheduleBar(this.nextBar);
        this.nextBar++;
      }
    };
    tick();
    this.timer = window.setInterval(tick, 60);
  }

  /** Fade out and stop. */
  stop(fade = 0.25) {
    if (!this.ctx || !this.running) return;
    this.running = false;
    this.stopTimer();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.exponentialRampToValueAtTime(0.0001, now + fade);
    const ctx = this.ctx;
    window.setTimeout(() => { if (!this.running) void ctx.suspend(); }, fade * 1000 + 50);
  }

  dispose() {
    this.running = false;
    this.stopTimer();
    void this.ctx?.close();
    this.ctx = null;
  }

  private stopTimer() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  private scheduleBar(bar: number) {
    const ctx = this.ctx!;
    const base = this.t0 + bar * BAR;
    // Starting part-way through, anything already past is skipped and nothing is scheduled before now
    const now = ctx.currentTime + 0.01;
    const skipBefore = now;
    const c = chordAt(bar);
    // Pad: one chord a bar, swelling in; the filter opens through the build
    const padStart = Math.max(base, now);
    this.pad(c.tones, padStart, base + BAR, bar);
    this.padFilter.frequency.setTargetAtTime(bar < 8 ? 520 : bar < 12 ? 520 + (bar - 7) * 420 : 900, Math.max(base, now), 0.5);
    for (const h of barHits(bar)) {
      const t = base + h.t * BEAT;
      if (t < skipBefore) continue;
      switch (h.inst) {
        case 'kick': this.kick(t, h.v ?? 1); break;
        case 'clap': this.clap(t, h.v ?? 1); break;
        case 'hat': this.hat(t, h.v ?? 0.5, 0.045); break;
        case 'ohat': this.hat(t, h.v ?? 0.4, 0.22); break;
        case 'tick': this.tick(t, h.v ?? 0.6); break;
        case 'bass': this.bass(t, h.f ?? 73, h.v ?? 1, h.d ?? 0.3); break;
        case 'arp': this.arp(t, h.f ?? 220, h.v ?? 0.5); break;
      }
    }
    // The riser through bars 11 and 12 into the impact on 13, with a gap just before it
    if (bar === 10 && base >= now) this.riser(base, BAR * 2 - BEAT * 0.5);
    if (bar === 12 && base + BAR >= now) this.impact(base);
    // The last bar fades the whole mix, so the loop can start clean
    if (bar === BARS - 1) {
      const from = Math.max(now, base + BAR - BEAT * 1.5);
      this.master.gain.setValueAtTime(this.out, from);
      this.master.gain.exponentialRampToValueAtTime(0.0001, Math.max(from + 0.05, base + BAR - 0.05));
      this.master.gain.setValueAtTime(this.out, Math.max(from + 0.1, base + BAR));
    }
  }

  private osc(type: OscillatorType, f: number, t0: number, t1: number, detune = 0) {
    const o = this.ctx!.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, t0);
    o.detune.value = detune;
    o.start(t0);
    o.stop(t1 + 0.05);
    return o;
  }

  private env(t0: number, peak: number, attack: number, hold: number, release: number, sustain = 0) {
    const g = this.ctx!.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    if (sustain > 0) {
      g.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * sustain), t0 + attack + hold);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
    } else {
      g.gain.setValueAtTime(peak, t0 + attack + hold);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
    }
    return g;
  }

  private noiseSrc(t0: number, t1: number) {
    const s = this.ctx!.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    s.start(t0);
    s.stop(t1 + 0.05);
    return s;
  }

  private kick(t: number, v: number) {
    const ctx = this.ctx!;
    const o = this.osc('sine', 165, t, t + 0.5);
    o.frequency.exponentialRampToValueAtTime(44, t + 0.09);
    const g = this.env(t, 0.95 * v, 0.003, 0.02, 0.42);
    o.connect(g);
    g.connect(this.comp);
    // The click on top
    const n = this.noiseSrc(t, t + 0.03);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2500;
    const ng = this.env(t, 0.18 * v, 0.001, 0.004, 0.02);
    n.connect(hp);
    hp.connect(ng);
    ng.connect(this.comp);
    // Everything under it ducks
    const d = this.duck.gain;
    d.cancelScheduledValues(t);
    d.setValueAtTime(1, t);
    d.linearRampToValueAtTime(0.3, t + 0.012);
    d.linearRampToValueAtTime(1, t + 0.34);
  }

  private clap(t: number, v: number) {
    const ctx = this.ctx!;
    [0, 0.012, 0.025].forEach((off, i) => {
      const n = this.noiseSrc(t + off, t + off + 0.25);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1700;
      bp.Q.value = 0.9;
      const g = this.env(t + off, 0.5 * v * (i === 2 ? 1 : 0.5), 0.002, 0.01, i === 2 ? 0.22 : 0.03);
      n.connect(bp);
      bp.connect(g);
      g.connect(this.comp);
      if (i === 2) g.connect(this.reverb);
    });
  }

  private hat(t: number, v: number, decay: number) {
    const ctx = this.ctx!;
    const n = this.noiseSrc(t, t + decay + 0.05);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 8500;
    const g = this.env(t, 0.22 * v, 0.001, 0.005, decay);
    n.connect(hp);
    hp.connect(g);
    g.connect(this.comp);
  }

  private tick(t: number, v: number) {
    const o = this.osc('square', 2200, t, t + 0.03);
    const g = this.env(t, 0.05 * v, 0.001, 0.004, 0.025);
    o.connect(g);
    g.connect(this.comp);
    g.connect(this.reverb);
  }

  private bass(t: number, f: number, v: number, d: number) {
    const ctx = this.ctx!;
    const sub = this.osc('sine', f, t, t + d + 0.1);
    const saw = this.osc('sawtooth', f * 2, t, t + d + 0.1, 4);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1400, t);
    lp.frequency.exponentialRampToValueAtTime(260, t + d);
    lp.Q.value = 2;
    const g = this.env(t, 0.42 * v, 0.004, d * 0.4, d * 0.6);
    const sg = this.env(t, 0.5 * v, 0.004, d * 0.5, d * 0.5);
    saw.connect(lp);
    lp.connect(g);
    sub.connect(sg);
    g.connect(this.duck);
    sg.connect(this.duck);
  }

  private pad(tones: number[], t0: number, t1: number, bar: number) {
    if (this.padBar === bar) return;
    this.padBar = bar;
    const dur = t1 - t0;
    const level = bar < 2 ? 0.05 : bar < 12 ? 0.075 : 0.06;
    tones.forEach((f, i) => {
      [-7, 7].forEach((det) => {
        const o = this.osc('sawtooth', f * (i === 3 ? 1 : 1), t0, t1 + 0.6, det + (i - 1.5) * 2);
        const g = this.env(t0, level, Math.min(0.9, dur * 0.4), Math.max(0.01, dur - 0.9 - 0.5), 0.6, 0.85);
        o.connect(g);
        g.connect(this.padFilter);
      });
    });
  }

  private arp(t: number, f: number, v: number) {
    const ctx = this.ctx!;
    const o = this.osc('triangle', f, t, t + 0.3);
    const o2 = this.osc('square', f * 2, t, t + 0.3);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t);
    lp.frequency.exponentialRampToValueAtTime(600, t + 0.18);
    const g = this.env(t, 0.1 * v, 0.002, 0.03, 0.2);
    const g2 = this.env(t, 0.035 * v, 0.002, 0.02, 0.12);
    o.connect(lp);
    o2.connect(lp);
    lp.connect(g);
    lp.connect(g2);
    g.connect(this.comp);
    g.connect(this.delay);
    g2.connect(this.comp);
  }

  private riser(t0: number, dur: number) {
    const ctx = this.ctx!;
    const n = this.noiseSrc(t0, t0 + dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(240, t0);
    bp.frequency.exponentialRampToValueAtTime(5200, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.28, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0 + dur + 0.01);
    n.connect(bp);
    bp.connect(g);
    g.connect(this.comp);
    g.connect(this.reverb);
    const o = this.osc('sawtooth', 110, t0, t0 + dur);
    o.frequency.exponentialRampToValueAtTime(440, t0 + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(300, t0);
    lp.frequency.exponentialRampToValueAtTime(2400, t0 + dur);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t0);
    og.gain.exponentialRampToValueAtTime(0.09, t0 + dur);
    og.gain.setValueAtTime(0.0001, t0 + dur + 0.01);
    o.connect(lp);
    lp.connect(og);
    og.connect(this.comp);
  }

  /** The hit on the downbeat of bar 13. */
  private impact(barStart: number) {
    const ctx = this.ctx!;
    const t = barStart + BAR;
    const o = this.osc('sine', 70, t, t + 1.6);
    o.frequency.exponentialRampToValueAtTime(28, t + 0.5);
    const g = this.env(t, 1.0, 0.004, 0.08, 1.4);
    o.connect(g);
    g.connect(this.comp);
    const n = this.noiseSrc(t, t + 1.2);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(6000, t);
    lp.frequency.exponentialRampToValueAtTime(300, t + 1.0);
    const ng = this.env(t, 0.5, 0.003, 0.02, 1.0);
    n.connect(lp);
    lp.connect(ng);
    ng.connect(this.comp);
    ng.connect(this.reverb);
    const d = this.duck.gain;
    d.cancelScheduledValues(t);
    d.setValueAtTime(1, t);
    d.linearRampToValueAtTime(0.15, t + 0.02);
    d.linearRampToValueAtTime(1, t + 0.9);
  }
}
