// Static audit of every stylesheet in src/: the motion and hover rules the brief sets.
// Usage: node scripts/audit/css.mjs [--inventory]
//   Flags :hover outside @media (hover: hover), transitions or keyframes on properties that
//   force layout or paint every frame, `transition: all`, animation without a reduced-motion
//   answer, and focus styles that use :focus instead of :focus-visible.
//   --inventory also lists every duration and easing in use, to check they come from a small set.
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const root = path.resolve('src');
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.css')) files.push(p);
  }
})(root);

// Properties the compositor can animate on its own. Everything else repaints or relayouts each frame.
const CHEAP = new Set(['transform', 'opacity', 'filter', 'translate', 'scale', 'rotate', 'clip-path', 'backdrop-filter', 'visibility', 'offset-distance']);
// Paint-only properties: acceptable on small elements for short transitions, flagged as notes.
const PAINT = new Set(['color', 'background-color', 'background', 'border-color', 'outline-color', 'fill', 'stroke', 'box-shadow', 'text-decoration-color', 'outline-offset', 'stroke-dashoffset', 'caret-color', 'accent-color', 'text-underline-offset', 'opacity']);

const issues = [];
const notes = [];
const durations = new Map();
const easings = new Map();
const add = (map, k, where) => map.set(k, [...(map.get(k) || []), where]);

const inHover = (node) => {
  for (let p = node.parent; p; p = p.parent) {
    if (p.type === 'atrule' && p.name === 'media' && /hover\s*:\s*hover/.test(p.params)) return true;
  }
  return false;
};
const inReduced = (node) => {
  for (let p = node.parent; p; p = p.parent) {
    if (p.type === 'atrule' && p.name === 'media' && /prefers-reduced-motion/.test(p.params)) return true;
  }
  return false;
};

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replaceAll('\\', '/');
  const css = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = postcss.parse(css, { from: file });
  } catch (e) {
    issues.push(`${rel}: parse error ${e.message}`);
    continue;
  }
  const keyframeProps = new Map();
  ast.walkAtRules('keyframes', (at) => {
    const props = new Set();
    at.walkDecls((d) => props.add(d.prop));
    keyframeProps.set(at.params.trim(), props);
  });
  const hasReducedBlock = /prefers-reduced-motion/.test(css);
  let animates = false;

  ast.walkRules((rule) => {
    const where = `${rel}:${rule.source?.start?.line}`;
    if (/:hover/.test(rule.selector) && !inHover(rule)) {
      issues.push(`${where}  :hover outside @media (hover: hover)  →  ${rule.selector.replace(/\s+/g, ' ').slice(0, 110)}`);
    }
    if (/:focus(?![-\w])/.test(rule.selector) && !/:focus-visible|:focus-within/.test(rule.selector)) {
      notes.push(`${where}  :focus rather than :focus-visible  →  ${rule.selector.replace(/\s+/g, ' ').slice(0, 110)}`);
    }
    rule.walkDecls((d) => {
      if (inReduced(d)) return;
      const v = d.value;
      if (d.prop === 'transition' || d.prop === 'transition-property') {
        animates = true;
        const parts = v.split(/,(?![^(]*\))/).map((s) => s.trim());
        for (const part of parts) {
          const prop = d.prop === 'transition-property' ? part : part.split(/\s+/)[0];
          if (prop === 'all') issues.push(`${where}  transition: all  (${rule.selector.slice(0, 80)})`);
          else if (prop && !/^\d|^var\(/.test(prop) && !CHEAP.has(prop)) {
            (PAINT.has(prop) ? notes : issues).push(
              `${where}  transition on ${prop} ${PAINT.has(prop) ? '(paint only)' : '(forces layout or paint each frame)'}  →  ${rule.selector.replace(/\s+/g, ' ').slice(0, 80)}`,
            );
          }
          for (const m of part.matchAll(/(\d*\.?\d+)(ms|s)\b/g)) add(durations, m[0], where);
          const ease = part.match(/cubic-bezier\([^)]*\)|ease-in-out|ease-out|ease-in|\bease\b|linear\([^)]*\)|\blinear\b|steps\([^)]*\)|var\(--[\w-]*ease[\w-]*\)/);
          if (ease) add(easings, ease[0], where);
        }
      }
      if (d.prop === 'transition-duration' || d.prop === 'animation-duration') for (const m of v.matchAll(/(\d*\.?\d+)(ms|s)\b/g)) add(durations, m[0], where);
      if (d.prop === 'transition-timing-function' || d.prop === 'animation-timing-function') add(easings, v, where);
      if (d.prop === 'animation' || d.prop === 'animation-name') {
        animates = true;
        for (const [name, props] of keyframeProps) {
          if (new RegExp(`(^|[\\s,])${name.replace(/[-]/g, '\\-')}($|[\\s,])`).test(v)) {
            const bad = [...props].filter((p) => !CHEAP.has(p) && !p.startsWith('--'));
            if (bad.length) {
              const paintOnly = bad.every((p) => PAINT.has(p));
              (paintOnly ? notes : issues).push(`${where}  @keyframes ${name} animates ${bad.join(', ')}${paintOnly ? ' (paint only)' : ''}`);
            }
          }
        }
        for (const m of v.matchAll(/(\d*\.?\d+)(ms|s)\b/g)) add(durations, m[0], where);
      }
      if (d.prop === 'will-change' && !/transform|opacity|auto/.test(v)) notes.push(`${where}  will-change: ${v}`);
    });
  });
  if (animates && !hasReducedBlock && !rel.endsWith('globals.css')) {
    notes.push(`${rel}  animates but has no prefers-reduced-motion block of its own (globals.css may cover it)`);
  }
}

console.log(`Scanned ${files.length} stylesheets.\n`);
console.log(`ISSUES (${issues.length})`);
issues.forEach((i) => console.log('  ' + i));
console.log(`\nNOTES (${notes.length})`);
notes.forEach((n) => console.log('  ' + n));
if (process.argv.includes('--inventory')) {
  console.log('\nDURATIONS');
  [...durations].sort((a, b) => b[1].length - a[1].length).forEach(([k, w]) => console.log(`  ${k.padEnd(8)} ×${w.length}  ${[...new Set(w.map((x) => x.split(':')[0].split('/').pop()))].join(', ')}`));
  console.log('\nEASINGS');
  [...easings].sort((a, b) => b[1].length - a[1].length).forEach(([k, w]) => console.log(`  ${k.padEnd(40)} ×${w.length}  ${[...new Set(w.map((x) => x.split(':')[0].split('/').pop()))].join(', ')}`));
}
