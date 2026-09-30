// Genera las capturas del walkthrough (public/walkthrough/capturas/) recorriendo los dos journeys
// como lo haría una persona: clic en los mismos botones, mismos datos ficticios de Lucía.
//
// Uso: npm run walkthrough:capturas
// Requiere un navegador Chromium instalado (Chrome, Chromium, Edge o Brave). Si no lo encuentra,
// indica la ruta con LLAVE_NAVEGADOR=/ruta/al/ejecutable.
//
// Las capturas son deterministas: reloj fijo (29 sept 2026, hora de Lima), viewport móvil de
// 390 px a 2x, animaciones desactivadas y estado inicial limpio en cada recorrido.
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';

const APP = fileURLToPath(new URL('..', import.meta.url));
const SALIDA = join(APP, 'public', 'walkthrough', 'capturas');
const FECHA_FIJA = new Date('2026-09-29T10:00:00-05:00');
const VIEWPORT = { width: 390, height: 844 };

// Datos ficticios de Lucía (mismos que src/data/fixtures.ts). Nada de esto es real.
const LUCIA = {
  nombre: 'Lucía',
  apellido: 'Paredes',
  dni: '45872913',
  celular: '987654321',
  email: 'lucia.paredes@example.com',
};

function rutaNavegador() {
  let delPaquete;
  try {
    delPaquete = chromium.executablePath();
  } catch {
    delPaquete = undefined;
  }
  const candidatos = [
    process.env.LLAVE_NAVEGADOR,
    delPaquete,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const ruta = candidatos.find((c) => c && existsSync(c));
  if (!ruta) {
    throw new Error(
      'No encontré un navegador Chromium. Instala Chrome o define LLAVE_NAVEGADOR=/ruta/al/ejecutable.',
    );
  }
  return ruta;
}

const generadas = [];

/** Espera a que el router llegue a la ruta (las guardias redirigen en un efecto). */
async function esperarRuta(page, prefijo) {
  await page.waitForFunction((p) => location.hash.startsWith(p), `#/${prefijo}`);
  await page.locator('main h1').first().waitFor({ state: 'visible' });
}

async function clic(page, testid, destino) {
  await page.getByTestId(testid).click();
  if (destino) await esperarRuta(page, destino);
}

async function capturar(page, nombre) {
  await page.evaluate(async () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    await document.fonts.ready;
  });
  // La barra de progreso tiene una transición de 300 ms.
  await page.waitForTimeout(400);
  const archivo = `${nombre}.png`;
  await page.screenshot({
    path: join(SALIDA, archivo),
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
  generadas.push(archivo);
  console.log(`  ✓ ${archivo}`);
}

async function nuevaPagina(browser, base) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    locale: 'es-PE',
    timezoneId: 'America/Lima',
    reducedMotion: 'reduce',
  });
  await context.clock.setFixedTime(FECHA_FIJA);
  const page = await context.newPage();
  page.on('pageerror', (e) => {
    throw e;
  });
  await page.goto(`${base}#/inicio`);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await esperarRuta(page, 'inicio');
  return { context, page };
}

/** Historia completa: Carmen publica, Lucía postula, Carmen la acepta, Lucía ve el resultado. */
async function historiaPrincipal(browser, base) {
  const { context, page } = await nuevaPagina(browser, base);

  // Parte 1 · Propietaria publica
  await capturar(page, '01-propietaria-inicio');
  await clic(page, 'inicio-publicar-link', 'publicar');
  await capturar(page, '02-propietaria-publicar');
  await clic(page, 'publicar-submit-button', 'inmueble');
  await capturar(page, '03-propietaria-inmueble');

  // Parte 2 · Inquilino postula
  await clic(page, 'header-cambiar-rol-link', 'marketplace');
  await capturar(page, '04-inquilino-marketplace');
  await clic(page, 'marketplace-card-surquillo-01', 'propiedad/surquillo-01');
  await capturar(page, '05-inquilino-propiedad');
  await clic(page, 'propiedad-postular-button', 'registro');
  for (const [campo, valor] of Object.entries(LUCIA)) {
    await page.getByTestId(`registro-${campo}-input`).fill(valor);
  }
  await capturar(page, '06-inquilino-registro');
  await clic(page, 'registro-submit-button');
  await page.getByTestId('registro-codigo-input').fill('123456');
  await capturar(page, '07-inquilino-codigo');
  await clic(page, 'registro-verificar-button', 'autorizar');
  await page.getByTestId('autorizar-checkbox').check();
  await capturar(page, '08-inquilino-autorizar');
  await clic(page, 'autorizar-submit-button', 'mi-score');
  await capturar(page, '09-inquilino-mi-score');
  await clic(page, 'mi-score-continuar-link', 'postular/surquillo-01');
  await page.getByTestId('postular-compartir-checkbox').check();
  await capturar(page, '10-inquilino-postular');
  await clic(page, 'postular-submit-button', 'mis-postulaciones');
  await capturar(page, '11-inquilino-postulacion-enviada');

  // Parte 3 · Propietaria evalúa y elige cómo cobrar
  await clic(page, 'header-cambiar-rol-link', 'inicio');
  await clic(page, 'inicio-ver-inmueble-link', 'inmueble');
  await clic(page, 'inmueble-ver-postulantes-link', 'postulantes');
  await capturar(page, '12-propietaria-postulantes');
  await clic(page, 'postulante-card-marketplace', 'postulante/');
  await capturar(page, '13-propietaria-postulante');
  await clic(page, 'postulante-ver-autorizacion-link', 'consentimiento/');
  await capturar(page, '14-propietaria-autorizacion');
  await page.getByRole('link', { name: 'Volver', exact: true }).click();
  await esperarRuta(page, 'postulante/');
  await clic(page, 'postulante-ver-score-link', 'resultado/');
  await capturar(page, '15-propietaria-rentscore');
  await clic(page, 'resultado-aceptar-button', 'poliza/');
  await capturar(page, '16-propietaria-poliza');
  await clic(page, 'poliza-elegir-cobro-link', 'cobro');
  await page.getByTestId('cobro-opcion-cobro').click();
  await capturar(page, '17-propietaria-cobro');
  await clic(page, 'cobro-confirmar-button', 'confirmacion');
  await capturar(page, '18-propietaria-confirmacion');

  // Parte 4 · Inquilino ve el resultado
  await clic(page, 'header-cambiar-rol-link', 'marketplace');
  await page.getByRole('link', { name: /^Mis postulaciones/ }).click();
  await esperarRuta(page, 'mis-postulaciones');
  await capturar(page, '19-inquilino-postulacion-aceptada');
  await clic(page, 'postulacion-deudor-link', 'deudor/');
  await capturar(page, '20-inquilino-deudor');

  await context.close();
}

/** Herramientas de demo y variantes por banda de score, desde un estado limpio. */
async function variantes(browser, base) {
  const { context, page } = await nuevaPagina(browser, base);

  await clic(page, 'footer-demo-link', 'demo');
  await capturar(page, '21-demo-panel');
  await page.goto(`${base}#/resultado/jorge`);
  await esperarRuta(page, 'resultado/jorge');
  await capturar(page, '22-variante-score-medio');
  await page.goto(`${base}#/resultado/kevin`);
  await esperarRuta(page, 'resultado/kevin');
  await capturar(page, '23-variante-score-bajo');
  await clic(page, 'resultado-aceptar-button', 'poliza/kevin');
  await clic(page, 'poliza-elegir-cobro-link', 'cobro');
  await capturar(page, '24-variante-cobro-score-bajo');

  await context.close();
}

async function main() {
  mkdirSync(SALIDA, { recursive: true });
  for (const f of readdirSync(SALIDA)) if (f.endsWith('.png')) rmSync(join(SALIDA, f));

  const server = await createServer({
    root: APP,
    logLevel: 'warn',
    server: { host: '127.0.0.1', port: 5199, strictPort: false },
  });
  await server.listen();
  const base = server.resolvedUrls?.local[0];
  if (!base) throw new Error('No se pudo levantar el servidor de Vite.');

  const browser = await chromium.launch({ executablePath: rutaNavegador(), headless: true });
  try {
    console.log(`Capturando desde ${base}`);
    await historiaPrincipal(browser, base);
    await variantes(browser, base);
  } finally {
    await browser.close();
    await server.close();
  }
  console.log(`${generadas.length} capturas en ${SALIDA}`);
  console.log('Siguiente paso: npm run walkthrough:verificar');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
