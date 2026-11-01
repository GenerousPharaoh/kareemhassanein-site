/**
 * The ident scene: a corridor of glass panes etched with words from the work, lit and reflecting,
 * that the camera flies through, with four large words in front of the lens and a glass monolith
 * at the end that turns to show the name. Three.js, with bloom for the light.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type WordView = { scale: number; wipe: number; bright: number; y: number; alpha: number };

export type IdentView = {
  camZ: number;
  camX: number;
  camY: number;
  roll: number;
  fov: number;
  /** 1 on a kick, falling to 0: the camera pulse. */
  hit: number;
  /** Seconds since the last kick: the wave of light down the corridor. */
  waveT: number;
  words: WordView[];
  /** 0 edge-on, 1 facing the camera. */
  monoRot: number;
  monoSweep: number;
  monoBright: number;
  urlAlpha: number;
  /** Bloom strength multiplier. */
  glow: number;
};

export const initialView = (): IdentView => ({
  camZ: 0, camX: 0, camY: 0, roll: 0, fov: 55, hit: 0, waveT: 10,
  words: [0, 1, 2, 3].map(() => ({ scale: 1, wipe: 0, bright: 1, y: 0, alpha: 0 })),
  monoRot: 0, monoSweep: -0.4, monoBright: 1, urlAlpha: 0, glow: 1,
});

const IVORY = new THREE.Color('#eeede8');
const STAGE = 0x0c0c0b;
const SLAB_W = 1.6;
const SLAB_H = 1.0;
const MONO_Z = -62;

const TEXT_VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const TEXT_FRAG = `precision highp float; uniform sampler2D map; uniform float uWipe; uniform float uBright; uniform float uAlpha; uniform float uSweep; uniform vec3 uColor; varying vec2 vUv;
void main(){
  vec4 c = texture2D(map, vUv);
  float m = 1.0 - smoothstep(uWipe, uWipe + 0.05, vUv.x);
  float s = exp(-pow((vUv.x - uSweep) * 5.0, 2.0));
  vec3 col = uColor * (uBright + s * 1.8);
  float a = c.a * m * uAlpha;
  if (a < 0.002) discard;
  gl_FragColor = vec4(col, a);
}`;

type SlabGroup = { glass: THREE.InstancedMesh; text: THREE.InstancedMesh; z: Float32Array; n: number };

function textMaterial(map: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: { map: { value: map }, uWipe: { value: 1 }, uBright: { value: 1 }, uAlpha: { value: 1 }, uSweep: { value: -0.4 }, uColor: { value: IVORY.clone() } },
    vertexShader: TEXT_VERT,
    fragmentShader: TEXT_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export class IdentGL {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private rig = new THREE.Group();
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private groups: SlabGroup[] = [];
  private words: THREE.Mesh[] = [];
  private wordMats: THREE.ShaderMaterial[] = [];
  private mono = new THREE.Group();
  private monoText!: THREE.ShaderMaterial;
  private urlText!: THREE.ShaderMaterial;
  private sweepLight: THREE.PointLight;
  private headLight: THREE.PointLight;
  private tmpColor = new THREE.Color();
  private disposables: { dispose: () => void }[] = [];
  private width = 1;
  private height = 1;

  constructor(private canvas: HTMLCanvasElement, private dpr: number) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setClearColor(STAGE, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.scene.background = new THREE.Color(STAGE);
    this.scene.fog = new THREE.FogExp2(STAGE, 0.03);
    this.camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 140);
    this.rig.add(this.camera);
    this.scene.add(this.rig);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = env;
    this.scene.environmentIntensity = 0.7;
    pmrem.dispose();
    this.disposables.push(env);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    this.headLight = new THREE.PointLight(0xffffff, 18, 26, 2);
    this.headLight.position.set(0.6, 0.4, 1.2);
    this.camera.add(this.headLight);
    this.sweepLight = new THREE.PointLight(0xffffff, 0, 24, 2);
    this.sweepLight.position.set(0, 0.6, MONO_Z + 2.2);
    this.scene.add(this.sweepLight);
    this.scene.add(this.mono);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1024, 576), 0.5, 0.42, 0.84);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  static supported(canvas: HTMLCanvasElement): boolean {
    try {
      return !!canvas.getContext('webgl2');
    } catch {
      return false;
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height, false);
    this.composer.setSize(width * this.dpr, height * this.dpr);
    this.bloom.resolution.set(Math.round(width * 0.8), Math.round(height * 0.8));
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /** Build the corridor, the words and the monolith. `family` is the font the document uses. */
  build(phrases: string[], words: string[], name: string, line: string, url: string, family: string) {
    // Smoked glass: near black, with the room's light caught in the clearcoat
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x090909, metalness: 0.05, roughness: 0.2, transparent: true, opacity: 0.86, envMapIntensity: 0.55,
      clearcoat: 1, clearcoatRoughness: 0.12, side: THREE.DoubleSide, depthWrite: false,
    });
    const glassGeo = new THREE.BoxGeometry(SLAB_W, SLAB_H, 0.05);
    const textGeo = new THREE.PlaneGeometry(SLAB_W - 0.08, SLAB_H - 0.06);
    this.disposables.push(glassMat, glassGeo, textGeo);

    // Every slot in the corridor: rows down the z axis, three on the floor, three on the ceiling,
    // two on each wall, with a few left empty and a little tilt on each
    type Slot = { p: THREE.Vector3; e: THREE.Euler; n: THREE.Vector3 };
    const slots: Slot[] = [];
    const rand = seeded(7);
    for (let i = 0; i < 44; i++) {
      const z = -3 - i * 1.85;
      const put = (x: number, y: number, e: THREE.Euler, n: THREE.Vector3) => {
        if (rand() < 0.14) return;
        const tilt = (rand() - 0.5) * 0.12;
        const ee = new THREE.Euler(e.x + tilt * 0.6, e.y + tilt, e.z + (rand() - 0.5) * 0.05);
        slots.push({ p: new THREE.Vector3(x + (rand() - 0.5) * 0.2, y + (rand() - 0.5) * 0.12, z + (rand() - 0.5) * 0.4), e: ee, n });
      };
      for (const x of [-3.15, 0, 3.15]) {
        put(x, -3, new THREE.Euler(-Math.PI / 2, 0, 0), new THREE.Vector3(0, 1, 0));
        put(x, 3, new THREE.Euler(Math.PI / 2, 0, Math.PI), new THREE.Vector3(0, -1, 0));
      }
      for (const y of [-1.15, 1.15]) {
        put(-5, y, new THREE.Euler(0, Math.PI / 2, 0), new THREE.Vector3(1, 0, 0));
        put(5, y, new THREE.Euler(0, -Math.PI / 2, 0), new THREE.Vector3(-1, 0, 0));
      }
    }
    // Deal the slots across the phrases
    const buckets: Slot[][] = phrases.map(() => []);
    slots.forEach((s, i) => buckets[(i * 7) % phrases.length].push(s));
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = new THREE.Vector3(1, 1, 1);
    const p2 = new THREE.Vector3();
    phrases.forEach((phrase, gi) => {
      const list = buckets[gi];
      if (!list.length) return;
      const tex = slabTexture(phrase, family);
      const tm = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false, side: THREE.DoubleSide });
      const glass = new THREE.InstancedMesh(glassGeo, glassMat, list.length);
      const text = new THREE.InstancedMesh(textGeo, tm, list.length);
      const z = new Float32Array(list.length);
      list.forEach((s, i) => {
        q.setFromEuler(s.e);
        m.compose(s.p, q, one);
        glass.setMatrixAt(i, m);
        p2.copy(s.p).addScaledVector(s.n, 0.032);
        m.compose(p2, q, one);
        text.setMatrixAt(i, m);
        text.setColorAt(i, this.tmpColor.setScalar(0.9));
        z[i] = s.p.z;
      });
      glass.instanceMatrix.needsUpdate = true;
      text.instanceMatrix.needsUpdate = true;
      this.scene.add(glass, text);
      this.groups.push({ glass, text, z, n: list.length });
      this.disposables.push(tex, tm);
    });

    // The four words, in front of the lens
    const wordGeo = new THREE.PlaneGeometry(4.2, 1.05);
    this.disposables.push(wordGeo);
    words.forEach((w) => {
      const tex = wordTexture(w, family, 2048, 512, 330, 700);
      const mat = textMaterial(tex);
      mat.uniforms.uAlpha.value = 0;
      mat.depthTest = false;
      const mesh = new THREE.Mesh(wordGeo, mat);
      mesh.position.set(0, 0, -5.4);
      mesh.renderOrder = 10;
      this.camera.add(mesh);
      this.words.push(mesh);
      this.wordMats.push(mat);
      this.disposables.push(tex, mat);
    });

    // The monolith: a tall pane of glass with the name in it, edge-on until it turns
    const monoGlass = new THREE.Mesh(new THREE.BoxGeometry(6.6, 3.8, 0.14), new THREE.MeshPhysicalMaterial({
      color: 0x0b0b0b, metalness: 0.05, roughness: 0.12, transparent: true, opacity: 0.9, envMapIntensity: 0.7, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide, depthWrite: false,
    }));
    this.disposables.push(monoGlass.geometry, monoGlass.material as THREE.Material);
    const nameTex = nameTexture(name, line, family);
    this.monoText = textMaterial(nameTex);
    this.monoText.uniforms.uAlpha.value = 1;
    const nameMesh = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.1), this.monoText);
    nameMesh.position.z = 0.09;
    const urlTex = wordTexture(url, family, 1024, 160, 84, 500);
    this.urlText = textMaterial(urlTex);
    this.urlText.uniforms.uAlpha.value = 0;
    const urlMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.4), this.urlText);
    urlMesh.position.set(0, -2.35, 0.09);
    this.mono.add(monoGlass, nameMesh, urlMesh);
    this.mono.position.set(0, 0, MONO_Z);
    this.mono.rotation.y = Math.PI / 2;
    this.disposables.push(nameTex, this.monoText, nameMesh.geometry, urlTex, this.urlText, urlMesh.geometry);
  }

  render(v: IdentView) {
    // Camera
    this.rig.position.set(v.camX, v.camY, v.camZ - v.hit * 0.07);
    this.camera.rotation.z = THREE.MathUtils.degToRad(v.roll);
    const fov = v.fov + v.hit * 2.2;
    if (Math.abs(this.camera.fov - fov) > 0.01) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
    // The wave of light down the corridor after each kick
    const waveZ = v.camZ - 1 - v.waveT * 24;
    const life = Math.max(0, 1 - v.waveT / 0.8);
    for (const g of this.groups) {
      const colors = g.text.instanceColor;
      if (!colors) continue;
      for (let i = 0; i < g.n; i++) {
        const d = (g.z[i] - waveZ) / 2.4;
        const b = 0.9 + 2.0 * Math.exp(-d * d) * life;
        colors.setXYZ(i, b, b, b);
      }
      colors.needsUpdate = true;
    }
    // Words
    v.words.forEach((w, i) => {
      const mesh = this.words[i];
      const mat = this.wordMats[i];
      if (!mesh || !mat) return;
      mesh.visible = w.alpha > 0.001;
      mesh.scale.setScalar(w.scale);
      mesh.position.y = w.y;
      mat.uniforms.uWipe.value = w.wipe;
      mat.uniforms.uBright.value = w.bright;
      mat.uniforms.uAlpha.value = w.alpha;
    });
    // The monolith
    this.mono.rotation.y = (1 - v.monoRot) * (Math.PI / 2);
    this.monoText.uniforms.uSweep.value = v.monoSweep;
    this.monoText.uniforms.uBright.value = v.monoBright;
    this.urlText.uniforms.uAlpha.value = v.urlAlpha;
    this.urlText.uniforms.uSweep.value = v.monoSweep;
    const sweepOn = v.monoSweep > -0.3 && v.monoSweep < 1.3 ? 1 : 0;
    this.sweepLight.intensity = 26 * sweepOn * v.monoRot;
    this.sweepLight.position.x = (v.monoSweep - 0.5) * 8;
    this.bloom.strength = 0.5 * v.glow;
    this.composer.render();
  }

  dispose() {
    for (const g of this.groups) {
      g.glass.dispose();
      g.text.dispose();
    }
    this.words.forEach((w) => w.geometry.dispose());
    this.disposables.forEach((d) => d.dispose());
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** A pane's etching: a thin border and a phrase, wrapped. */
function slabTexture(phrase: string, family: string): THREE.CanvasTexture {
  const w = 512;
  const h = 320;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(238,237,232,0.5)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(5, 5, w - 10, h - 10);
  ctx.fillStyle = 'rgba(238,237,232,0.92)';
  ctx.font = `500 38px ${family}`;
  ctx.textBaseline = 'top';
  const lines: string[] = [];
  let cur = '';
  for (const word of phrase.split(' ')) {
    const t = cur ? `${cur} ${word}` : word;
    if (ctx.measureText(t).width > w - 90 && cur) {
      lines.push(cur);
      cur = word;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  lines.slice(0, 4).forEach((l, i) => ctx.fillText(l, 42, 52 + i * 48));
  ctx.fillStyle = 'rgba(238,237,232,0.45)';
  ctx.fillRect(42, h - 62, 90, 3);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

/** Sets a font on the context at the largest size up to `size` at which `text` fits in `maxW`. */
function fitFont(ctx: CanvasRenderingContext2D, text: string, family: string, weight: number, size: number, stretch: CanvasFontStretch, tracking: number, maxW: number) {
  let px = size;
  for (let i = 0; i < 12; i++) {
    ctx.font = `${weight} ${px}px ${family}`;
    ctx.fontStretch = stretch;
    ctx.letterSpacing = `${-px * tracking}px`;
    const width = ctx.measureText(text).width;
    if (width <= maxW) break;
    px = Math.floor(px * Math.min(0.96, maxW / width));
  }
  return px;
}

/** One large word, centred. */
function wordTexture(text: string, family: string, w: number, h: number, size: number, weight: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#eeede8';
  const px = fitFont(ctx, text, family, weight, size, 'expanded', 0.04, w - 80);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + px * 0.04);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** The name with its line beneath, for the monolith. */
function nameTexture(name: string, line: string, family: string): THREE.CanvasTexture {
  const w = 2048;
  const h = 1024;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#eeede8';
  const px = fitFont(ctx, name, family, 700, 228, 'expanded', 0.045, w - 220);
  ctx.fillText(name, w / 2, h / 2 - 40);
  ctx.fillStyle = 'rgba(238,237,232,0.78)';
  fitFont(ctx, line, family, 400, 74, 'semi-expanded', 0.014, w - 300);
  ctx.fillText(line, w / 2, h / 2 - 40 + px * 0.92);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
