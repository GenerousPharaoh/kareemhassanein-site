import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';
import { COVER, SNOISE, frameSize, hasFrame, isVideo, type Source } from './noise';

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/*
  Two frames on one screen. During a change, the next project rises from the bottom behind an
  uneven, moving front: the outgoing frame lifts and swells as it is covered, the incoming one
  settles from a closer framing, and the colour channels part slightly along the front.
*/
const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform vec2 uRes;
uniform vec2 uSize0;
uniform vec2 uSize1;
uniform float uFocus0;
uniform float uFocus1;
uniform float uZoom0;
uniform float uZoom1;
uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;

${SNOISE}
${COVER}

vec3 sample0(vec2 uv, float split) {
  vec2 o = vec2(0.0, split);
  return vec3(
    texture2D(uTex0, cover(uv + o, uRes, uSize0, uFocus0)).r,
    texture2D(uTex0, cover(uv, uRes, uSize0, uFocus0)).g,
    texture2D(uTex0, cover(uv - o, uRes, uSize0, uFocus0)).b
  );
}

vec3 sample1(vec2 uv, float split) {
  vec2 o = vec2(0.0, split);
  return vec3(
    texture2D(uTex1, cover(uv + o, uRes, uSize1, uFocus1)).r,
    texture2D(uTex1, cover(uv, uRes, uSize1, uFocus1)).g,
    texture2D(uTex1, cover(uv - o, uRes, uSize1, uFocus1)).b
  );
}

void main() {
  vec2 uv = vUv;
  float p = uProgress;

  float n = snoise(vec2(uv.x * 1.5, uv.y * 0.7 - uTime * 0.18));
  float front = p * 1.5 - 0.25;
  float edge = uv.y + n * 0.11;
  float m = smoothstep(edge - 0.025, edge + 0.025, front);
  // Close to the front, both pictures bend a little, as through the curve of a liquid surface
  float near = 1.0 - smoothstep(0.0, 0.14, abs(front - edge));
  float push = near * near;

  vec2 par = uMouse * 0.009;

  float drift = p * p * (3.0 - 2.0 * p);
  vec2 uv0 = (uv - 0.5) / (uZoom0 + 0.06 * drift) + 0.5 + par;
  uv0.y -= drift * 0.1 + push * 0.025;
  uv0.x += n * 0.02 * push;

  vec2 uv1 = (uv - 0.5) / (uZoom1 * (1.0 + 0.12 * (1.0 - drift))) + 0.5 + par;
  uv1.y += (1.0 - drift) * 0.2 - push * 0.02;
  uv1.x -= n * 0.02 * push;

  float split = 0.003 * push;
  vec3 c0 = p < 0.999 ? sample0(uv0, split) : vec3(0.0);
  vec3 c1 = p > 0.001 ? sample1(uv1, split) : vec3(0.0);
  vec3 col = mix(c0, c1, m);
  // A soft shadow under the front as it passes
  col *= 1.0 - 0.16 * push * (1.0 - m);
  gl_FragColor = vec4(col, 1.0);
}
`;

type Slot = { tex: Texture; el: Source | null; shown: Source | null; lastTime: number; size: [number, number] };

export type ReelFrame = {
  progress: number;
  time: number;
  mouse: [number, number];
  zoom: [number, number];
};

/** The showreel's WebGL screen: one full-screen triangle that draws the current and next project. */
export class ReelGL {
  private renderer: Renderer;
  private program: Program;
  private mesh: Mesh;
  private slots: [Slot, Slot];
  private focus: [number, number] = [0.5, 0.5];

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: false,
      depth: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    const gl = this.renderer.gl;
    gl.clearColor(0.047, 0.047, 0.043, 1);
    const make = (): Slot => ({
      tex: new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR }),
      el: null,
      shown: null,
      lastTime: -1,
      size: [16, 10],
    });
    this.slots = [make(), make()];
    this.program = new Program(gl, {
      vertex,
      fragment,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        uTex0: { value: this.slots[0].tex },
        uTex1: { value: this.slots[1].tex },
        uRes: { value: [1, 1] },
        uSize0: { value: [16, 10] },
        uSize1: { value: [16, 10] },
        uFocus0: { value: 0.5 },
        uFocus1: { value: 0.5 },
        uZoom0: { value: 1 },
        uZoom1: { value: 1 },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
      },
    });
    this.mesh = new Mesh(gl, { geometry: new Triangle(gl), program: this.program });
  }

  get canvas() {
    return this.renderer.gl.canvas as HTMLCanvasElement;
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.program.uniforms.uRes.value = [width, height];
  }

  /** Point a slot at an image or a video (0 is on screen, 1 is arriving). */
  setSource(slot: 0 | 1, el: Source | null, focus = 0.5) {
    const s = this.slots[slot];
    s.el = el;
    s.lastTime = -1;
    this.focus[slot] = focus;
  }

  setSourceIfChanged(slot: 0 | 1, el: Source, focus = 0.5) {
    if (this.slots[slot].el !== el) this.setSource(slot, el, focus);
  }

  /** Whether a slot has a frame on the GPU (or can upload one now). */
  ready(slot: 0 | 1) {
    const s = this.slots[slot];
    return !!s.shown || (!!s.el && hasFrame(s.el));
  }

  /** After a change: the arriving frame becomes the one on screen, keeping its uploaded texture. */
  swap() {
    this.slots.reverse();
    this.focus.reverse();
    const u = this.program.uniforms;
    u.uTex0.value = this.slots[0].tex;
    u.uTex1.value = this.slots[1].tex;
    const old = this.slots[1];
    old.el = null;
    old.shown = null;
    old.lastTime = -1;
  }

  private upload(slot: 0 | 1) {
    const s = this.slots[slot];
    const el = s.el;
    if (!el || !hasFrame(el)) return;
    if (isVideo(el)) {
      // A video uploads whenever its frame has moved on (or when it is new to the slot)
      if (s.shown === el && el.currentTime === s.lastTime) return;
      s.lastTime = el.currentTime;
    } else if (s.shown === el) {
      return;
    }
    s.tex.image = el;
    s.tex.needsUpdate = true;
    s.shown = el;
    s.size = frameSize(el);
  }

  render(frame: ReelFrame) {
    this.upload(0);
    if (frame.progress > 0) this.upload(1);
    const u = this.program.uniforms;
    u.uSize0.value = this.slots[0].size;
    u.uSize1.value = this.slots[1].size;
    u.uFocus0.value = this.focus[0];
    u.uFocus1.value = this.focus[1];
    u.uZoom0.value = frame.zoom[0];
    u.uZoom1.value = frame.zoom[1];
    u.uProgress.value = frame.progress;
    u.uTime.value = frame.time;
    u.uMouse.value = frame.mouse;
    this.renderer.render({ scene: this.mesh });
  }

  destroy() {
    const gl = this.renderer.gl;
    this.slots.forEach((s) => gl.deleteTexture(s.tex.texture));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
