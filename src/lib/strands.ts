/**
 * Strands: a name drawn by thousands of thin lines of light that flow along its letterforms.
 *
 * The letters are a signed distance field (rasterised once from the font). Each strand is a
 * particle with a long trail. Captured strands follow one of the field's isolines inside the
 * strokes, a fixed spacing apart, so the glyphs fill with moving engraved lines; loose strands
 * ride a wind and a slow curl noise across the band, and are caught when they pass a letter
 * beyond their own gate, so every letter gets its share. Rendered as one-pixel WebGL lines added
 * onto whatever is behind the canvas.
 */

export type StrandsOptions = {
  count?: number;
  /** Points kept per strand (its trail). */
  trail?: number;
  dpr?: number;
  /** Line colour, 0..1 each. */
  color?: [number, number, number];
};

export type StrandsParams = {
  /** Wind in CSS px/s, applied to loose strands (and to captured ones as they let go). */
  windX: number;
  windY: number;
  /** 0: the letters hold their strands; 1: everything is released. */
  release: number;
  /** Seconds since the strands began; drives the noise. */
  time: number;
};

type Field = {
  cell: number;
  ox: number;
  oy: number;
  w: number;
  h: number;
  d: Float32Array;
  gx: Float32Array;
  gy: Float32Array;
  /** Half the typical stroke width, in px. */
  half: number;
  /** The text's box, in canvas CSS px. */
  box: { x: number; y: number; w: number; h: number };
};

const LOOSE = 0;
const HELD = 1;
/** Placed in a letter but not yet lit: the opening's front wakes it. */
const WAITING = 2;

const VERT = `attribute vec2 a_pos; attribute float a_alpha; uniform vec2 u_size; uniform vec2 u_offset; varying float v_a;
void main(){ v_a = a_alpha; vec2 p = a_pos + u_offset; gl_Position = vec4(p.x / u_size.x * 2.0 - 1.0, 1.0 - p.y / u_size.y * 2.0, 0.0, 1.0); }`;
const FRAG = `precision mediump float; uniform vec3 u_color; varying float v_a;
void main(){ gl_FragColor = vec4(u_color * v_a, v_a); }`;

const NOISE_N = 64;
/** Spacing of the engraved lines inside a stroke, in px. */
const LINE_GAP = 2.2;

export class Strands {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private vbo: WebGLBuffer;
  private uSize: WebGLUniformLocation;
  private uColor: WebGLUniformLocation;
  private uOffset: WebGLUniformLocation;
  private count: number;
  private trail: number;
  private dpr: number;
  private color: [number, number, number];
  private width = 1;
  private height = 1;
  private x: Float32Array;
  private y: Float32Array;
  private dir: Float32Array;
  private level: Float32Array;
  private speed: Float32Array;
  private bright: Float32Array;
  private state: Uint8Array;
  private homeX: Float32Array;
  private homeY: Float32Array;
  private homeLevel: Float32Array;
  /** A loose strand is caught only once it has passed this x, so the letters share the stream. */
  private gate: Float32Array;
  private ring: Float32Array;
  private head = 0;
  private verts: Float32Array;
  private field: Field | null = null;
  private noise: Float32Array;
  /** The band loose strands live in, in canvas CSS px. */
  private band = { top: 0, bottom: 1 };
  /** How far from the left the letters are lit and accept strands (the opening sweeps it across). */
  private front = Infinity;
  /** How far outside a letter a loose strand is caught, as a multiple of the half stroke. */
  private capture = 2;
  private loosen = 0;
  private seed = 1;
  private disposed = false;

  static supported(canvas: HTMLCanvasElement): boolean {
    try {
      return !!canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true });
    } catch {
      return false;
    }
  }

  constructor(private canvas: HTMLCanvasElement, opts: StrandsOptions = {}) {
    this.count = opts.count ?? 3000;
    this.trail = opts.trail ?? 72;
    this.dpr = opts.dpr ?? 1;
    this.color = opts.color ?? [0.945, 0.937, 0.913];
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false });
    if (!gl) throw new Error('WebGL unavailable');
    this.gl = gl;
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(program, 0, 'a_pos');
    gl.bindAttribLocation(program, 1, 'a_alpha');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'program');
    this.program = program;
    this.uSize = gl.getUniformLocation(program, 'u_size')!;
    this.uColor = gl.getUniformLocation(program, 'u_color')!;
    this.uOffset = gl.getUniformLocation(program, 'u_offset')!;
    this.vbo = gl.createBuffer()!;

    const n = this.count;
    this.x = new Float32Array(n);
    this.y = new Float32Array(n);
    this.dir = new Float32Array(n);
    this.level = new Float32Array(n);
    this.speed = new Float32Array(n);
    this.bright = new Float32Array(n);
    this.state = new Uint8Array(n);
    this.homeX = new Float32Array(n);
    this.homeY = new Float32Array(n);
    this.homeLevel = new Float32Array(n);
    this.gate = new Float32Array(n);
    this.ring = new Float32Array(n * this.trail * 2);
    this.verts = new Float32Array(n * (this.trail - 1) * 2 * 3);
    this.noise = new Float32Array(NOISE_N * NOISE_N);
    for (let i = 0; i < this.noise.length; i++) this.noise[i] = this.rand();
    for (let i = 0; i < n; i++) {
      this.dir[i] = this.rand() < 0.85 ? 1 : -1;
      this.speed[i] = 30 + this.rand() * 30;
      this.bright[i] = 0.6 + this.rand() * 0.4;
    }
  }

  private rand() {
    // Deterministic, so a reload looks the same
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  /** One of the letter's engraved lines: the outer ones a little more often, since they draw the letter. */
  private pickLevel(half: number) {
    const lines = Math.max(1, Math.floor((half - 1) / LINE_GAP));
    const r = this.rand();
    return -(1 + LINE_GAP * Math.floor((r * r * 0.4 + r * 0.6) * (lines + 1)));
  }

  setCapture(scale: number) {
    this.capture = scale;
  }

  /** Where the letters are lit from the left: an opening sweeps this across. */
  setFront(x: number) {
    this.front = x;
  }

  /** Size the canvas to its CSS box. */
  resize(width: number, height: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    if (!this.field) this.band = { top: this.height * 0.3, bottom: this.height * 0.6 };
  }

  /** How the strands are doing, for probes. */
  stats() {
    let held = 0;
    let waiting = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.state[i] === HELD) held++;
      else if (this.state[i] === WAITING) waiting++;
    }
    return { count: this.count, captured: held, waiting, half: this.field?.half ?? null, band: { ...this.band }, front: this.front, box: this.field?.box ?? null };
  }

  /**
   * Lay the text out in a box (canvas CSS px) and build its distance field. The font is a CSS
   * font shorthand; the text is scaled to fit the box's width.
   */
  setText(text: string, font: string, letterSpacing: string, stretch: CanvasFontStretch, box: { x: number; y: number; w: number; h: number }, cell = 2) {
    const measure = document.createElement('canvas');
    const mctx = measure.getContext('2d')!;
    mctx.font = font;
    mctx.fontStretch = stretch;
    mctx.letterSpacing = letterSpacing;
    const natural = mctx.measureText(text).width;
    const scale = Math.min(1, box.w / natural);
    const px = parseFloat(font.match(/(\d+(\.\d+)?)px/)?.[1] ?? '100') * scale;
    const scaledFont = font.replace(/(\d+(\.\d+)?)px/, `${px}px`);

    const pad = Math.ceil(px * 0.25);
    const w = Math.ceil((box.w + pad * 2) / cell);
    const h = Math.ceil((box.h + pad * 2) / cell);
    const raster = document.createElement('canvas');
    raster.width = w;
    raster.height = h;
    const ctx = raster.getContext('2d', { willReadFrequently: true })!;
    ctx.scale(1 / cell, 1 / cell);
    ctx.font = scaledFont;
    ctx.fontStretch = stretch;
    ctx.letterSpacing = letterSpacing.endsWith('em') ? `${parseFloat(letterSpacing) * px}px` : `${parseFloat(letterSpacing) * scale || 0}px`;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'alphabetic';
    const m = ctx.measureText(text);
    const inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    const tx = pad + (box.w - m.width) / 2;
    const ty = pad + (box.h - inkH) / 2 + m.actualBoundingBoxAscent;
    ctx.fillText(text, tx, ty);
    const img = ctx.getImageData(0, 0, w, h).data;
    const inside = new Uint8Array(w * h);
    let area = 0;
    for (let i = 0; i < w * h; i++) {
      inside[i] = img[i * 4 + 3] > 127 ? 1 : 0;
      area += inside[i];
    }
    const dOut = edt(inside, w, h, 1);
    const dIn = edt(inside, w, h, 0);
    const d = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) d[i] = (inside[i] ? -Math.sqrt(dIn[i]) : Math.sqrt(dOut[i])) * cell;
    const gx = new Float32Array(w * h);
    const gy = new Float32Array(w * h);
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        const i = yy * w + xx;
        const l = d[yy * w + Math.max(0, xx - 1)];
        const r = d[yy * w + Math.min(w - 1, xx + 1)];
        const u = d[Math.max(0, yy - 1) * w + xx];
        const b = d[Math.min(h - 1, yy + 1) * w + xx];
        let vx = r - l;
        let vy = b - u;
        const len = Math.hypot(vx, vy) || 1;
        vx /= len;
        vy /= len;
        gx[i] = vx;
        gy[i] = vy;
      }
    }
    // Typical half stroke: the mean of the inside depth, scaled (a solid bar of depth D averages D/2)
    let sum = 0;
    for (let i = 0; i < w * h; i++) if (inside[i]) sum += -d[i];
    const half = area ? (sum / area) * 2 : px * 0.08;
    this.field = { cell, ox: box.x - pad, oy: box.y - pad, w, h, d, gx, gy, half, box };
    // Loose strands keep to the dark band around the name, above the line beneath it
    this.band = { top: box.y - box.h * 0.3, bottom: box.y + box.h * 1.05 };
  }

  /** Give the first `share` of the strands a home on a line inside a letter; returns how many. */
  private placeHomes(share: number): number {
    const f = this.field;
    if (!f) return 0;
    const want = Math.floor(this.count * share);
    let placed = 0;
    let guard = 0;
    while (placed < want && guard++ < this.count * 60) {
      const x = f.box.x + this.rand() * f.box.w;
      const y = f.box.y + this.rand() * f.box.h;
      if (this.sample(x, y).d < -0.6) {
        this.homeX[placed] = x;
        this.homeY[placed] = y;
        this.homeLevel[placed] = this.pickLevel(f.half);
        placed++;
      }
    }
    return placed;
  }

  private wake(i: number) {
    this.state[i] = HELD;
    this.x[i] = this.homeX[i];
    this.y[i] = this.homeY[i];
    this.level[i] = this.homeLevel[i];
    this.cutTrail(i);
  }

  /**
   * Put every strand in place at once: most on their lines inside the letters, the rest loose
   * in the band, with trails already drawn. For arrivals that skip the opening.
   */
  settle(params: StrandsParams) {
    const placed = this.placeHomes(0.9);
    for (let i = 0; i < placed; i++) this.wake(i);
    for (let i = placed; i < this.count; i++) {
      this.spawnLoose(i, true);
      this.cutTrail(i);
    }
    for (let k = 0; k < this.trail + 20; k++) this.update(1 / 60, params);
  }

  /**
   * Before the opening: most strands wait unlit in their letters for the front to pass; a thin
   * stream is already crossing the band and more is queued off the left edge to flow in behind.
   */
  scatter() {
    const placed = this.placeHomes(0.86);
    for (let i = 0; i < placed; i++) {
      this.state[i] = WAITING;
      this.x[i] = this.homeX[i];
      this.y[i] = this.homeY[i];
      this.cutTrail(i);
    }
    for (let i = placed; i < this.count; i++) {
      this.spawnLoose(i, true);
      if (i >= placed + (this.count - placed) * 0.45) this.x[i] = -120 - this.rand() * 1400;
      this.cutTrail(i);
    }
  }

  private sample(x: number, y: number) {
    const f = this.field!;
    const fx = (x - f.ox) / f.cell;
    const fy = (y - f.oy) / f.cell;
    if (fx < 0 || fy < 0 || fx >= f.w - 1 || fy >= f.h - 1) return { d: 1e4, gx: 0, gy: 0 };
    const x0 = fx | 0;
    const y0 = fy | 0;
    const tx = fx - x0;
    const ty = fy - y0;
    const i00 = y0 * f.w + x0;
    const i10 = i00 + 1;
    const i01 = i00 + f.w;
    const i11 = i01 + 1;
    const w00 = (1 - tx) * (1 - ty);
    const w10 = tx * (1 - ty);
    const w01 = (1 - tx) * ty;
    const w11 = tx * ty;
    return {
      d: f.d[i00] * w00 + f.d[i10] * w10 + f.d[i01] * w01 + f.d[i11] * w11,
      gx: f.gx[i00] * w00 + f.gx[i10] * w10 + f.gx[i01] * w01 + f.gx[i11] * w11,
      gy: f.gy[i00] * w00 + f.gy[i10] * w10 + f.gy[i01] * w01 + f.gy[i11] * w11,
    };
  }

  private curl(x: number, y: number, t: number) {
    // Curl of a smooth tiled noise, sampled in a drifting frame
    const s = 1 / 170;
    const u = x * s + t * 0.05;
    const v = y * s + t * 0.03;
    const e = 0.08;
    const dx = this.noiseAt(u + e, v) - this.noiseAt(u - e, v);
    const dy = this.noiseAt(u, v + e) - this.noiseAt(u, v - e);
    return { x: dy / (2 * e), y: -dx / (2 * e) };
  }

  private noiseAt(u: number, v: number) {
    const N = NOISE_N;
    const fu = (((u % 1) + 1) % 1) * N;
    const fv = (((v % 1) + 1) % 1) * N;
    const x0 = fu | 0;
    const y0 = fv | 0;
    const tx = smooth(fu - x0);
    const ty = smooth(fv - y0);
    const x1 = (x0 + 1) % N;
    const y1 = (y0 + 1) % N;
    const a = this.noise[y0 * N + x0];
    const b = this.noise[y0 * N + x1];
    const c = this.noise[y1 * N + x0];
    const d = this.noise[y1 * N + x1];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
  }

  private spawnLoose(i: number, anywhere: boolean) {
    const { top, bottom } = this.band;
    const f = this.field;
    this.x[i] = anywhere ? this.rand() * this.width : -this.rand() * 80 - 4;
    // Mostly at the letters' own height, so a strand crossing the band meets them
    this.y[i] = f && this.rand() < 0.8 ? f.box.y + this.rand() * f.box.h : top + this.rand() * (bottom - top);
    this.gate[i] = f ? f.box.x + this.rand() * f.box.w : 0;
    this.state[i] = LOOSE;
  }

  private cutTrail(i: number) {
    const T = this.trail;
    for (let k = 0; k < T; k++) {
      const j = (k * this.count + i) * 2;
      this.ring[j] = this.x[i];
      this.ring[j + 1] = this.y[i];
    }
  }

  update(dt: number, p: StrandsParams) {
    if (this.disposed) return;
    const f = this.field;
    const n = this.count;
    const T = this.trail;
    const half = f ? f.half : 10;
    const loosen = p.release;
    this.loosen = loosen;
    const releaseRate = 0.01 + loosen * 6;
    const captureR = f ? Math.max(3, half * this.capture) : 0;
    const letGo = Math.max(half * 1.6, captureR + 6);
    this.head = (this.head + 1) % T;
    const h = this.head;
    for (let i = 0; i < n; i++) {
      if (this.state[i] === WAITING) {
        if (this.homeX[i] < this.front) this.wake(i);
        else {
          const j = (h * n + i) * 2;
          this.ring[j] = this.x[i];
          this.ring[j + 1] = this.y[i];
          continue;
        }
      }
      let x = this.x[i];
      let y = this.y[i];
      let vx = 0;
      let vy = 0;
      if (this.state[i] === HELD && f) {
        const s = this.sample(x, y);
        if (s.d > letGo || this.rand() < releaseRate * dt) {
          this.state[i] = LOOSE;
          this.gate[i] = f.box.x + this.rand() * f.box.w;
        } else {
          const sp = this.speed[i];
          const dir = this.dir[i];
          vx = -s.gy * dir * sp;
          vy = s.gx * dir * sp;
          // Hold the engraved line the strand was given
          const pull = (this.level[i] - s.d) * 22;
          vx += s.gx * pull;
          vy += s.gy * pull;
          // A breath of the noise so the grain never freezes
          const c = this.curl(x, y, p.time);
          vx += c.x * 1.2;
          vy += c.y * 1.2;
        }
      }
      if (this.state[i] === LOOSE) {
        const c = this.curl(x, y, p.time);
        vx = p.windX + c.x * 18;
        vy = p.windY + c.y * 8;
        if (f && loosen < 0.5 && x < this.front && x >= this.gate[i]) {
          const s = this.sample(x, y);
          // Past its gate and near a letter, a loose strand bends toward it, like a filing to a magnet
          if (s.d < 70 && s.d > captureR) {
            const k = 60 * (1 - s.d / 70);
            vx -= s.gx * k;
            vy -= s.gy * k;
          }
          if (s.d < captureR) {
            this.state[i] = HELD;
            this.level[i] = this.pickLevel(half);
            const sp = this.speed[i];
            vx = -s.gy * this.dir[i] * sp;
            vy = s.gx * this.dir[i] * sp;
          }
        }
      }
      x += vx * dt;
      y += vy * dt;
      let cut = false;
      if (x > this.width + 60 || x < -1600 || y < this.band.top - 30 || y > this.band.bottom + 40) {
        this.spawnLoose(i, false);
        if (p.windX < 0) this.x[i] = this.width + 4 + this.rand() * 80;
        x = this.x[i];
        y = this.y[i];
        cut = true;
      }
      this.x[i] = x;
      this.y[i] = y;
      const j = (h * n + i) * 2;
      this.ring[j] = x;
      this.ring[j + 1] = y;
      if (cut) this.cutTrail(i);
    }
  }

  render(exposure = 1) {
    if (this.disposed) return;
    const gl = this.gl;
    const n = this.count;
    const T = this.trail;
    const v = this.verts;
    const dim = 1 - this.loosen * 0.7;
    let o = 0;
    for (let i = 0; i < n; i++) {
      const st = this.state[i];
      const b = st === WAITING ? 0 : this.bright[i] * (st === HELD ? 0.85 : 0.24) * exposure * dim;
      let x1 = this.ring[(this.head * n + i) * 2];
      let y1 = this.ring[(this.head * n + i) * 2 + 1];
      for (let k = 1; k < T; k++) {
        const slot = (this.head - k + T) % T;
        const j = (slot * n + i) * 2;
        const x0 = this.ring[j];
        const y0 = this.ring[j + 1];
        const f1 = 1 - (k - 1) / T;
        const f0 = 1 - k / T;
        const a1 = b * f1 * Math.sqrt(f1);
        const a0 = b * f0 * Math.sqrt(f0);
        v[o++] = x0; v[o++] = y0; v[o++] = a0;
        v[o++] = x1; v[o++] = y1; v[o++] = a1;
        x1 = x0;
        y1 = y0;
      }
    }
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(this.program);
    gl.uniform2f(this.uSize, this.width, this.height);
    gl.uniform3f(this.uColor, this.color[0], this.color[1], this.color[2]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 12, 8);
    // Twice, a hair apart, so the lines read as fine threads rather than single device pixels
    const hair = 0.5 / this.dpr;
    gl.uniform2f(this.uOffset, 0, 0);
    gl.drawArrays(gl.LINES, 0, n * (T - 1) * 2);
    gl.uniform2f(this.uOffset, hair, hair);
    gl.drawArrays(gl.LINES, 0, n * (T - 1) * 2);
  }

  dispose() {
    this.disposed = true;
    const gl = this.gl;
    gl.deleteBuffer(this.vbo);
    gl.deleteProgram(this.program);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Squared Euclidean distance transform (Felzenszwalb and Huttenlocher) to the nearest cell whose
 * value equals `to`.
 */
function edt(mask: Uint8Array, w: number, h: number, to: number): Float32Array {
  const INF = 1e12;
  const f = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) f[i] = mask[i] === to ? 0 : INF;
  const n = Math.max(w, h);
  const line = new Float32Array(n);
  const out = new Float32Array(n);
  const v = new Int32Array(n);
  const z = new Float32Array(n + 1);
  const dt1 = (len: number) => {
    let k = 0;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    for (let q = 1; q < len; q++) {
      let s = (line[q] + q * q - (line[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      while (s <= z[k]) {
        k--;
        s = (line[q] + q * q - (line[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      }
      k++;
      v[k] = q;
      z[k] = s;
      z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < len; q++) {
      while (z[k + 1] < q) k++;
      out[q] = (q - v[k]) * (q - v[k]) + line[v[k]];
    }
  };
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) line[y] = f[y * w + x];
    dt1(h);
    for (let y = 0; y < h; y++) f[y * w + x] = out[y];
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) line[x] = f[y * w + x];
    dt1(w);
    for (let x = 0; x < w; x++) f[y * w + x] = out[x];
  }
  return f;
}
