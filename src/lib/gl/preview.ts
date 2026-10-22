import { Mesh, Plane, Program, Renderer, Texture } from 'ogl';
import { COVER, SNOISE } from './noise';

const vertex = /* glsl */ `
attribute vec3 position;
attribute vec2 uv;
uniform vec2 uViewport;
uniform vec2 uCenter;
uniform vec2 uSize;
uniform vec2 uVel;
uniform float uShow;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec2 p = position.xy;
  // The card is pulled from its middle: the centre leads the movement and the edges trail
  p.x += sin(uv.y * 3.14159265) * uVel.x * 0.16;
  p.y -= sin(uv.x * 3.14159265) * uVel.y * 0.16;
  float scale = mix(0.7, 1.0, uShow);
  vec2 px = uCenter + vec2(p.x, -p.y) * uSize * scale;
  gl_Position = vec4(px.x / uViewport.x * 2.0 - 1.0, 1.0 - px.y / uViewport.y * 2.0, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform vec2 uSize;
uniform vec2 uTexSize0;
uniform vec2 uTexSize1;
uniform float uMix;
uniform float uShow;
uniform vec2 uVel;
uniform float uTime;
uniform float uRadius;

${SNOISE}
${COVER}

float box(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec3 pick(sampler2D tex, vec2 size, vec2 uv, vec2 shift) {
  return vec3(
    texture2D(tex, cover(uv + shift, uSize, size, 0.0)).r,
    texture2D(tex, cover(uv, uSize, size, 0.0)).g,
    texture2D(tex, cover(uv - shift, uSize, size, 0.0)).b
  );
}

void main() {
  vec2 px = (vUv - 0.5) * uSize;
  float d = box(px, uSize * 0.5, uRadius);
  float edge = clamp(0.5 - d, 0.0, 1.0);

  // Arriving, the picture settles from a closer framing
  vec2 uv = (vUv - 0.5) / mix(1.18, 1.0, uShow) + 0.5;
  vec2 shift = uVel * 0.022;

  // Changing project: a grainy dissolve with a small push between the two
  float n = snoise(vUv * 2.4 + uTime * 0.3) * 0.5 + 0.5;
  float m = smoothstep(n - 0.25, n + 0.05, uMix * 1.4 - 0.3);
  vec3 c0 = pick(uTex0, uTexSize0, uv + vec2(0.0, m * 0.05), shift);
  vec3 c1 = pick(uTex1, uTexSize1, uv - vec2(0.0, (1.0 - m) * 0.05), shift);
  vec3 col = mix(c0, c1, m);

  float alpha = edge * smoothstep(0.0, 0.35, uShow);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

export type PreviewFrame = {
  center: [number, number];
  size: [number, number];
  vel: [number, number];
  show: number;
  mix: number;
  time: number;
};

/** The work list's floating preview: a soft, bendable card drawn wherever the pointer is. */
export class PreviewGL {
  private renderer: Renderer;
  private program: Program;
  private mesh: Mesh;
  private cache = new Map<string, Texture>();
  private slot: [Texture | null, Texture | null] = [null, null];
  private sizes: [[number, number], [number, number]] = [
    [16, 10],
    [16, 10],
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true, premultipliedAlpha: true, depth: false, antialias: true });
    const gl = this.renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const blank = new Texture(gl);
    this.program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        uViewport: { value: [1, 1] },
        uCenter: { value: [0, 0] },
        uSize: { value: [16, 10] },
        uVel: { value: [0, 0] },
        uShow: { value: 0 },
        uTex0: { value: blank },
        uTex1: { value: blank },
        uTexSize0: { value: [16, 10] },
        uTexSize1: { value: [16, 10] },
        uMix: { value: 0 },
        uTime: { value: 0 },
        uRadius: { value: 10 },
      },
    });
    this.mesh = new Mesh(gl, { geometry: new Plane(gl, { widthSegments: 32, heightSegments: 20 }), program: this.program });
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.program.uniforms.uViewport.value = [width, height];
  }

  /** Upload an image once (with mipmaps where the context allows), keyed by its address. */
  texture(img: HTMLImageElement) {
    const key = img.currentSrc || img.src;
    let tex = this.cache.get(key);
    if (!tex) {
      const gl = this.renderer.gl;
      const mips = this.renderer.isWebgl2;
      tex = new Texture(gl, {
        image: img,
        generateMipmaps: mips,
        minFilter: mips ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
        magFilter: gl.LINEAR,
      });
      this.cache.set(key, tex);
    }
    return { tex, size: [img.naturalWidth || 16, img.naturalHeight || 10] as [number, number] };
  }

  set(slot: 0 | 1, img: HTMLImageElement) {
    const { tex, size } = this.texture(img);
    this.slot[slot] = tex;
    this.sizes[slot] = size;
  }

  has(slot: 0 | 1) {
    return !!this.slot[slot];
  }

  /** The arriving picture becomes the one shown. */
  swap() {
    this.slot = [this.slot[1], null];
    this.sizes = [this.sizes[1], [16, 10]];
  }

  render(f: PreviewFrame) {
    const u = this.program.uniforms;
    if (this.slot[0]) u.uTex0.value = this.slot[0];
    u.uTex1.value = this.slot[1] ?? this.slot[0] ?? u.uTex1.value;
    u.uTexSize0.value = this.sizes[0];
    u.uTexSize1.value = this.slot[1] ? this.sizes[1] : this.sizes[0];
    u.uCenter.value = f.center;
    u.uSize.value = f.size;
    u.uVel.value = f.vel;
    u.uShow.value = f.show;
    u.uMix.value = this.slot[1] ? f.mix : 0;
    u.uTime.value = f.time;
    u.uRadius.value = Math.min(12, f.size[0] * 0.03);
    this.renderer.render({ scene: this.mesh });
  }

  clear() {
    const gl = this.renderer.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  destroy() {
    const gl = this.renderer.gl;
    this.cache.forEach((t) => gl.deleteTexture(t.texture));
    this.cache.clear();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
