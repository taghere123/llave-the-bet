// Verifica que el walkthrough (public/walkthrough/index.html) siga al día con la app (decisión 020).
// Corre dentro de `npm run check` y antes de `npm run build` / `build:local`. Falla si:
//   - una ruta de PANTALLAS (src/screens/registry.tsx) no tiene un paso con data-ruta en la guía
//   - la guía documenta o enlaza una ruta que ya no existe
//   - una captura referenciada no existe, o hay capturas en la carpeta que la guía no usa
//   - un enlace interno (#ancla) apunta a un id inexistente
//
// Con `--salida <carpeta>` (después del build) verifica el artefacto: que la carpeta tenga la app
// (index.html) y una copia idéntica de public/walkthrough/. Así el deploy de Vercel (dist/) y
// local_deploy/app/ no salen sin la guía o con una versión distinta a la del repo.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = fileURLToPath(new URL('..', import.meta.url));
const REGISTRO = join(APP, 'src', 'screens', 'registry.tsx');
const WALKTHROUGH = join(APP, 'public', 'walkthrough');
const GUIA = join(WALKTHROUGH, 'index.html');
const CAPTURAS = join(WALKTHROUGH, 'capturas');

const argSalida = process.argv.indexOf('--salida');
if (argSalida !== -1) {
  const valor = process.argv[argSalida + 1];
  if (!valor) {
    console.error('Uso: node scripts/walkthrough-verificar.mjs --salida <carpeta del build>');
    process.exit(1);
  }
  verificarArtefacto(resolve(APP, valor));
  process.exit(0);
}

/** Archivos de una carpeta, recursivo y sin archivos ocultos (.DS_Store y similares). */
function archivos(dir) {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && !e.name.startsWith('.'))
    .map((e) => relative(dir, join(e.parentPath, e.name)))
    .sort();
}

function verificarArtefacto(salida) {
  const faltas = [];
  if (!existsSync(join(salida, 'index.html'))) faltas.push('index.html (la app)');
  const destino = join(salida, 'walkthrough');
  const fuentes = archivos(WALKTHROUGH);
  for (const f of fuentes) {
    const copia = join(destino, f);
    if (!existsSync(copia)) faltas.push(`walkthrough/${f}`);
    else if (!readFileSync(copia).equals(readFileSync(join(WALKTHROUGH, f))))
      faltas.push(`walkthrough/${f} (distinto al de public/)`);
  }
  if (faltas.length) {
    console.error(`El artefacto ${salida} no incluye el walkthrough completo:`);
    for (const f of faltas) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(
    `Artefacto con walkthrough: ${fuentes.length} archivos en ${relative(APP, destino)}.`,
  );
}

const errores = [];

// Claves de primer nivel del objeto PANTALLAS (dos espacios de sangría, con o sin comillas).
const fuente = readFileSync(REGISTRO, 'utf8');
const bloque = fuente.split('export const PANTALLAS')[1]?.split(/\n};/)[0] ?? '';
const rutas = new Set(
  [...bloque.matchAll(/^ {2}(?:'([\w-]+)'|([\w-]+)):/gm)].map((m) => m[1] ?? m[2]),
);
if (rutas.size === 0) {
  console.error(`No pude leer las rutas de ${REGISTRO}. ¿Cambió la forma de PANTALLAS?`);
  process.exit(1);
}

if (!existsSync(GUIA)) {
  console.error(`Falta la guía: ${GUIA}`);
  process.exit(1);
}
const html = readFileSync(GUIA, 'utf8');

const documentadas = new Set([...html.matchAll(/data-ruta="([\w-]+)"/g)].map((m) => m[1]));
for (const r of rutas) {
  if (!documentadas.has(r))
    errores.push(`La ruta #/${r} no está documentada (falta data-ruta="${r}").`);
}
for (const r of documentadas) {
  if (!rutas.has(r)) errores.push(`data-ruta="${r}" no corresponde a ninguna ruta de la app.`);
}

const enlazadas = [...html.matchAll(/href="\.\.\/index\.html#\/([\w-]+)/g)].map((m) => m[1]);
for (const r of enlazadas) {
  if (!rutas.has(r)) errores.push(`El enlace ../index.html#/${r} apunta a una ruta inexistente.`);
}

const referenciadas = new Set(
  [...html.matchAll(/(?:src|href)="capturas\/([^"]+)"/g)].map((m) => m[1]),
);
const enCarpeta = existsSync(CAPTURAS)
  ? readdirSync(CAPTURAS).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  : [];
for (const f of referenciadas) {
  if (!enCarpeta.includes(f)) errores.push(`Falta la captura capturas/${f}.`);
}
for (const f of enCarpeta) {
  if (!referenciadas.has(f)) errores.push(`La captura capturas/${f} no se usa en la guía.`);
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, ancla] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(ancla)) errores.push(`El enlace #${ancla} no tiene destino.`);
}

if (errores.length) {
  console.error('El walkthrough no está al día:');
  for (const e of errores) console.error(`  - ${e}`);
  console.error('Actualiza public/walkthrough/ (npm run walkthrough:capturas y los textos).');
  process.exit(1);
}
console.log(
  `Walkthrough al día: ${rutas.size} rutas documentadas, ${enCarpeta.length} capturas referenciadas.`,
);
