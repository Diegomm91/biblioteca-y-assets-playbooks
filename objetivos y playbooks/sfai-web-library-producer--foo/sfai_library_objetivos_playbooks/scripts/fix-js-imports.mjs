// scripts/fix-js-imports-exports.mjs
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('dist');

// Extensiones que NO se deben tocar
const NON_JS_EXTS = ['.css', '.scss', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];

function fixFileImportsAndExports(absFile) {
  let content = fs.readFileSync(absFile, 'utf8');
  let changed = false;

  // Imports estáticos
  content = content.replace(/(\bimport\s+(?:[^'"]*?from\s+)?)['"]([^'"]+)['"]/g, (full, prefix, spec) => {
    const ext = path.extname(spec);
    if (!ext && (spec.startsWith('./') || spec.startsWith('../'))) {
      changed = true;
      return `${prefix}'${spec}.js'`;
    }
    return full;
  });

  // Exports
  content = content.replace(/(\bexport\s+(?:\{[^}]*\}\s+from\s+)?)['"]([^'"]+)['"]/g, (full, prefix, spec) => {
    const ext = path.extname(spec);
    if (!ext && (spec.startsWith('./') || spec.startsWith('../'))) {
      changed = true;
      return `${prefix}'${spec}.js'`;
    }
    return full;
  });

  // Imports dinámicos
  content = content.replace(/\bimport\(\s*['"]([^'"]+)['"]\s*\)/g, (full, spec) => {
    const ext = path.extname(spec);
    if (!ext && (spec.startsWith('./') || spec.startsWith('../'))) {
      changed = true;
      return `import('${spec}.js')`;
    }
    return full;
  });

  if (changed) fs.writeFileSync(absFile, content, 'utf8');
  return changed;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(m?js|cjs)$/i.test(e.name)) fixFileImportsAndExports(p);
  }
}

console.log('🔎 Corrigiendo imports y exports JS relativos (./ o ../) en:', ROOT);
walk(ROOT);
console.log('✅ Listo');