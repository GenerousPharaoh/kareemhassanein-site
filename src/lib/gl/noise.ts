/** 2D simplex noise for fragment shaders (Ashima Arts / Stefan Gustavson, MIT). Returns -1 to 1. */
export const SNOISE = /* glsl */ `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

/** Maps a plane's UV onto a texture the way object-fit: cover does; focus is the vertical anchor (0 = top). */
export const COVER = /* glsl */ `
vec2 cover(vec2 uv, vec2 plane, vec2 size, float focus) {
  float ra = plane.x / plane.y;
  float ta = size.x / size.y;
  vec2 s = ra > ta ? vec2(1.0, ta / ra) : vec2(ra / ta, 1.0);
  vec2 anchor = vec2(0.5, 1.0 - focus);
  return (uv - anchor) * s + anchor;
}
`;

export type Source = HTMLVideoElement | HTMLImageElement;

export const isVideo = (el: Source): el is HTMLVideoElement => el instanceof HTMLVideoElement;

/** Whether an image or video has a frame that can be uploaded to the GPU. */
export const hasFrame = (el: Source) => (isVideo(el) ? el.readyState >= 2 && el.videoWidth > 0 : el.complete && el.naturalWidth > 0);

export const frameSize = (el: Source): [number, number] => (isVideo(el) ? [el.videoWidth || 16, el.videoHeight || 10] : [el.naturalWidth || 16, el.naturalHeight || 10]);

/** WebGL is worth starting: a context can be made and textures can hold a large frame. */
export function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ok = (gl.getParameter(gl.MAX_TEXTURE_SIZE) as number) >= 2048;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return ok;
  } catch {
    return false;
  }
}
