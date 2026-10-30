// Small, separately compressed copies for the decorative homepage wall.
// The full case-study images keep their original sizes and quality.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'work-media');
const widths = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/content/wall-media.json'), 'utf8'));

export async function buildWallAssets(only) {
  const generated = fs.readFileSync(path.join(ROOT, 'src/content/media.generated.ts'), 'utf8');
  const { stills } = JSON.parse(generated.match(/\/\*DATA(.*)DATA\*\//s)[1]);
  let count = 0;
  for (const [key, info] of Object.entries(stills)) {
    if (only && !key.startsWith(`${only}/`)) continue;
    const device = key.includes('--phone') ? 'phone' : 'desktop';
    if (device === 'desktop' && (info.w / info.h < 1.35 || info.w / info.h > 2)) continue;
    const input = path.join(OUT, `${key}-${Math.max(...info.widths)}.webp`);
    const base = path.join(OUT, 'wall', key);
    fs.mkdirSync(path.dirname(base), { recursive: true });
    for (const width of widths[device]) {
      await Promise.all([
        sharp(input).resize({ width }).avif({ quality: 42, effort: 4 }).toFile(`${base}-${width}.avif`),
        sharp(input).resize({ width }).webp({ quality: 64, effort: 5 }).toFile(`${base}-${width}.webp`),
      ]);
    }
    count++;
  }
  console.log(`Generated wall thumbnails for ${count} screens.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await buildWallAssets(process.argv[2]);
}
