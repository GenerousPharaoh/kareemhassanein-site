/*
  The homepage scene: every client screen, propped in rows on a floor and hung in rows from a
  ceiling, both running toward the viewer and meeting at a dark horizon where the name sits.
  Plain WebGL2, one instanced draw per screen image. Rows travel and drift in the vertex shader,
  so a frame only updates a few uniforms.
*/

export type HorizonTile = {
  /** Image URL at the width this device needs */
  src: string;
  /** Width over height of the screen as captured */
  ratio: number;
  /** The client's colour, as a hex string */
  ground: string;
  device: 'desktop' | 'phone';
};

/** The camera and the motion the component animates. */
export type HorizonView = {
  /** Degrees; negative looks down at the floor */
  pitch: number;
  /** Degrees around the line of sight */
  roll: number;
  /** Camera height above its resting point, in world units */
  lift: number;
  /** 0 is the bare stage, 1 the lit scene */
  exposure: number;
  /** Distance the rows have come toward the viewer, in world units */
  travel: number;
  /** Sideways distance each row has drifted, in world units (alternate rows go the other way) */
  drift: number;
  /** How far the screens have switched on, from the nearest rows (0) out to the horizon (1) */
  wave: number;
};

const ROWS = 10;
const PITCH = 1.9; // depth from one row to the next
const NEAR = -1.6; // rows wrap to the far end once they are this far behind the camera
const SPAN = ROWS * PITCH;
const TILE_H = 1;
const TILT = (48 * Math.PI) / 180; // screens lean back from the floor (and hang from the ceiling) at this angle
const GAP = 0.3;
const ROW_W = 54; // each row repeats its screens across this width, wider than the view at the far fog
const FOV_Y = 74;

const VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec4 aTile;   // centre x, row, plane (1 floor, -1 ceiling), width
layout(location = 2) in vec4 aMeta;   // ground rgb, seed
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTravel;
uniform float uDrift;
uniform float uH; // floor below and ceiling above the eye
out vec2 vCorner;
out float vOn;
out vec2 vSize;
out vec3 vGround;
out float vDepth;
out float vPlane;
out float vSeed;
const float SPAN = ${SPAN.toFixed(4)};
const float PITCH = ${PITCH.toFixed(4)};
const float NEAR = ${NEAR.toFixed(4)};
const float TILE_H = ${TILE_H.toFixed(4)};
const float TS = ${Math.sin(TILT).toFixed(5)};
const float TC = ${Math.cos(TILT).toFixed(5)};
const float W = ${ROW_W.toFixed(4)};
void main() {
  float row = aTile.y;
  float plane = aTile.z;
  float w = aTile.w;
  // Rows come toward the viewer and wrap to the far end, out of sight behind the camera
  float d = NEAR + mod(row * PITCH - uTravel + plane * 0.5 * PITCH, SPAN);
  // Alternate rows drift opposite ways; each row wraps across its own width
  float dir = mod(row, 2.0) < 0.5 ? 1.0 : -1.0;
  float x = mod(aTile.x + dir * uDrift * (0.8 + 0.25 * mod(row, 3.0)) + W * 0.5, W) - W * 0.5;
  float lx = (aCorner.x - 0.5) * w;
  float lv = aCorner.y * TILE_H;
  vec3 p = vec3(x + lx, plane * (-uH + lv * TS), -(d + lv * TC));
  vec4 view = uView * vec4(p, 1.0);
  gl_Position = uProj * view;
  vCorner = aCorner;
  vSize = vec2(w, TILE_H);
  vGround = aMeta.rgb;
  vSeed = aMeta.a;
  vDepth = -view.z;
  vPlane = plane;
  // When this screen switches on in the opening: nearer rows first, a little scattered
  vOn = (d - NEAR) / SPAN * 0.85 + aMeta.a * 0.15;
}
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec2 vCorner;
in vec2 vSize;
in vec3 vGround;
in float vDepth;
in float vPlane;
in float vSeed;
in float vOn;
uniform sampler2D uTex;
uniform float uWave;
uniform float uImgAspect;
uniform float uLoaded;   // 0 until this image has arrived, then fades to 1
uniform float uExposure;
uniform vec3 uStage;
uniform vec2 uFog;
out vec4 outColor;
float box(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main() {
  vec2 p = (vCorner - 0.5) * vSize;
  float mat = 0.032;
  float outer = box(p, vSize * 0.5, 0.05);
  float aa = max(fwidth(outer), 1e-4);
  float alpha = 1.0 - smoothstep(-aa, aa, outer);
  if (alpha < 0.01) discard;
  vec2 inner = vSize * 0.5 - mat;
  float ib = box(p, inner, 0.028);
  float ia = 1.0 - smoothstep(-aa, aa, ib);

  // The screen image fills the inner box, cropped from its top like the captures on the site
  vec2 q = (p + inner) / (2.0 * inner);            // 0..1 inside the screen, y toward the tile's far edge
  float fromTop = vPlane > 0.0 ? 1.0 - q.y : q.y;  // floor screens stand up; ceiling screens hang down
  float boxA = inner.x / inner.y;
  vec2 uv;
  if (uImgAspect > boxA) uv = vec2(0.5 + (q.x - 0.5) * boxA / uImgAspect, fromTop);
  else uv = vec2(q.x, fromTop * uImgAspect / boxA);
  vec3 img = texture(uTex, uv).rgb;

  vec3 ground = vGround;
  vec3 unlit = mix(uStage, ground, 0.16);
  // Switching on: the screen lights from dark through a brief brightness to its picture
  float k = clamp((uWave * 1.25 - vOn) / 0.14, 0.0, 1.0);
  k = k * k * (3.0 - 2.0 * k);
  vec3 screen = mix(unlit, img * 0.94, uLoaded * k) + k * (1.0 - k) * 0.55;
  // A faint sheen across the glass
  float sheen = smoothstep(0.35, 1.0, q.y + (q.x - 0.5) * 0.35) * 0.05;
  screen += sheen;
  // Until it switches on, the whole screen, frame included, is dark glass
  vec3 col = mix(mix(unlit, ground * 0.9, uLoaded * k), screen, ia);
  // The light comes from below: the ceiling rows sit a little darker than the floor
  col *= vPlane > 0.0 ? 1.0 : 0.8;

  // Distance fades in gradually, then completes before the rows wrap at the far end
  float fog = max(1.0 - exp(-max(vDepth - uFog.x, 0.0) * 0.21), smoothstep(uFog.y, uFog.y + 3.5, vDepth));
  col = mix(col, uStage, fog);
  col = mix(uStage, col, uExposure);
  outColor = vec4(col, alpha);
}
`;

const hex = (h: string): [number, number, number] => {
  const v = parseInt(h.replace('#', '').slice(0, 6), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
};

type Group = { tex: WebGLTexture; vao: WebGLVertexArrayObject; count: number; aspect: number; loadedAt: number };

export class HorizonGL {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private groups: Group[] = [];
  private u: Record<string, WebGLUniformLocation | null> = {};
  private width = 1;
  private height = 1;
  private horizonY = 0.45;
  private planeH = 2.2;
  private fog: [number, number] = [2.6, 10];
  private dpr = 1;
  private disposed = false;
  private stage: [number, number, number];
  private buffers: WebGLBuffer[] = [];
  private pending: (() => void)[] = [];
  /** Called when an image arrives, so a paused scene can draw again */
  onLoad: (() => void) | null = null;

  static supported(canvas: HTMLCanvasElement) {
    return !!canvas.getContext('webgl2');
  }

  constructor(private canvas: HTMLCanvasElement, tiles: HorizonTile[], stage: string, dpr: number) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance' });
    if (!gl) throw new Error('WebGL2 unavailable');
    this.gl = gl;
    this.dpr = dpr;
    this.stage = hex(stage);
    this.program = this.link();
    for (const name of ['uProj', 'uView', 'uTravel', 'uDrift', 'uH', 'uWave', 'uTex', 'uImgAspect', 'uLoaded', 'uExposure', 'uStage', 'uFog']) {
      this.u[name] = gl.getUniformLocation(this.program, name);
    }
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    gl.clearColor(this.stage[0], this.stage[1], this.stage[2], 1);
    this.build(tiles);
  }

  private link() {
    const gl = this.gl;
    const make = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, make(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, make(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
    return p;
  }

  /** Lay the screens out in rows on both planes, then one instance buffer per image. */
  private build(tiles: HorizonTile[]) {
    const gl = this.gl;
    const n = tiles.length;
    const per: number[][] = tiles.map(() => []);
    const width = (t: HorizonTile) => (t.device === 'phone' ? 0.56 : Math.min(Math.max(t.ratio, 1.35), 1.8)) * TILE_H;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const plane of [1, -1]) {
      for (let row = 0; row < ROWS; row++) {
        // Each row starts at a different place in the list, so rows and planes never line up
        // About half the list apart from the row before, so the same screen is never close by
        let i = Math.floor(row * n * 0.47 + (plane > 0 ? 0 : n * 0.23)) % n;
        let x = -ROW_W / 2 + rand() * 1.6;
        while (true) {
          const t = tiles[i];
          const w = width(t);
          if (x + w > ROW_W / 2 - GAP) break;
          const g = hex(t.ground);
          per[i].push(x + w / 2, row, plane, w, g[0], g[1], g[2], rand());
          x += w + GAP;
          i = (i + 1) % n;
        }
      }
    }

    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    this.buffers.push(quad);

    tiles.forEach((t, i) => {
      if (!per[i].length) return;
      const vao = gl.createVertexArray()!;
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      const inst = gl.createBuffer()!;
      this.buffers.push(inst);
      gl.bindBuffer(gl.ARRAY_BUFFER, inst);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(per[i]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0);
      gl.vertexAttribDivisor(1, 1);
      gl.enableVertexAttribArray(2);
      gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16);
      gl.vertexAttribDivisor(2, 1);
      gl.bindVertexArray(null);

      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
      const group: Group = { tex, vao, count: per[i].length / 8, aspect: t.device === 'phone' ? 0.46 : t.ratio, loadedAt: -1 };
      this.groups.push(group);

      void fetch(t.src)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((b) => createImageBitmap(b))
        .then((bmp) => {
          if (this.disposed) return bmp.close();
          // Uploads wait for the next frame, a couple at a time, so a burst of arrivals cannot stall one
          this.pending.push(() => this.upload(group, bmp));
          this.onLoad?.();
        })
        .catch(() => {});
    });
  }

  private upload(group: Group, bmp: ImageBitmap) {
    const gl = this.gl;
    const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
    gl.bindTexture(gl.TEXTURE_2D, group.tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    group.aspect = bmp.width / bmp.height;
    group.loadedAt = performance.now();
    bmp.close();
  }


  /** How many images have arrived (decoded, waiting or uploaded), out of how many. */
  progress() {
    return { loaded: this.groups.filter((g) => g.loadedAt >= 0).length + this.pending.length, total: this.groups.length };
  }

  /** Size the canvas and say where, in CSS px from the top, the horizon should fall. */
  resize(width: number, height: number, horizonPx: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.horizonY = horizonPx / this.height;
    // Tall screens stand the planes farther apart, so the nearest rows are not oversized
    const aspect = this.width / this.height;
    this.planeH = aspect < 0.8 ? 3.1 : 2.2;
    this.fog = aspect < 0.8 ? [2.4, 13] : [1.9, 12.5];
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  /** True while any image is still waiting or fading in, so a still scene keeps drawing. */
  render(v: HorizonView, now = performance.now()) {
    const gl = this.gl;
    for (let k = 0; k < 2 && this.pending.length; k++) this.pending.shift()!();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);

    // Projection with the principal point moved to the horizon
    const aspect = this.width / this.height;
    // Narrow screens keep the same horizontal sweep of the floor, so phones are not zoomed in too far
    const fovY = aspect < 0.8 ? FOV_Y + 10 : FOV_Y;
    const f = 1 / Math.tan((fovY * Math.PI) / 360);
    const near = 0.05;
    const far = 60;
    const shift = 1 - 2 * this.horizonY;
    const proj = new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, -shift, (far + near) / (near - far), -1,
      0, 0, (2 * far * near) / (near - far), 0,
    ]);
    // View: inverse of translate(lift) * rotX(pitch) * rotZ(roll)
    const p = (v.pitch * Math.PI) / 180;
    const r = (v.roll * Math.PI) / 180;
    const cp = Math.cos(p), sp = Math.sin(p), cr = Math.cos(r), sr = Math.sin(r);
    // R = Rx(p) * Rz(r); view rotation = R^T
    const R = [
      [cr, -sr, 0],
      [cp * sr, cp * cr, -sp],
      [sp * sr, sp * cr, cp],
    ];
    const ty = -v.lift;
    const view = new Float32Array([
      R[0][0], R[0][1], R[0][2], 0,
      R[1][0], R[1][1], R[1][2], 0,
      R[2][0], R[2][1], R[2][2], 0,
      R[1][0] * ty, R[1][1] * ty, R[1][2] * ty, 1,
    ]);
    gl.uniformMatrix4fv(this.u.uProj, false, proj);
    gl.uniformMatrix4fv(this.u.uView, false, view);
    gl.uniform1f(this.u.uTravel, v.travel);
    gl.uniform1f(this.u.uDrift, v.drift);
    gl.uniform1f(this.u.uExposure, v.exposure);
    gl.uniform1f(this.u.uWave, v.wave);
    gl.uniform3fv(this.u.uStage, this.stage);
    gl.uniform2f(this.u.uFog, this.fog[0], this.fog[1]);
    gl.uniform1f(this.u.uH, this.planeH);
    gl.uniform1i(this.u.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    let fading = false;
    for (const g of this.groups) {
      const t = g.loadedAt < 0 ? 0 : Math.min(1, (now - g.loadedAt) / 450);
      if (g.loadedAt >= 0 && t < 1) fading = true;
      gl.uniform1f(this.u.uLoaded, t * t * (3 - 2 * t));
      gl.uniform1f(this.u.uImgAspect, g.aspect);
      gl.bindTexture(gl.TEXTURE_2D, g.tex);
      gl.bindVertexArray(g.vao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, g.count);
    }
    gl.bindVertexArray(null);
    return fading || this.pending.length > 0;
  }

  dispose() {
    this.disposed = true;
    const gl = this.gl;
    for (const g of this.groups) {
      gl.deleteTexture(g.tex);
      gl.deleteVertexArray(g.vao);
    }
    for (const b of this.buffers) gl.deleteBuffer(b);
    gl.deleteProgram(this.program);
    this.groups = [];
    // Hand the context back now; browsers cap how many a page may hold across visits to the homepage
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
