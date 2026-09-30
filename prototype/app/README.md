# LLAVE · App del prototipo (Vite + React + TypeScript)

Prototipo navegable con los dos journeys conectados: propietaria (Carmen) e inquilino (Lucía). Todos los datos son ficticios y no hay conexión con sistemas de Interbank ni de Interseguro.

## Uso

Requiere Node 20.19 o superior.

```bash
cd prototype/app
npm ci            # instala las versiones exactas del lockfile
npm run dev       # servidor local con recarga
npm run check     # typecheck + lint + formato + pruebas
npm run build     # genera dist/ (sitio estático)
npm run preview   # sirve dist/ localmente
npm run build:local  # genera ../../local_deploy/app/, que se abre con doble clic (ver local_deploy/README.md)
npm run walkthrough:capturas   # regenera las capturas de la guía (necesita Chrome, Chromium, Edge o Brave)
npm run walkthrough:verificar  # comprueba que la guía cubre todas las rutas (también corre en check)
```

## Walkthrough (decisión 020)

`public/walkthrough/` tiene la guía paso a paso de ambos journeys (`index.html`, `walkthrough.css` y `capturas/`). Vite la copia tal cual a `dist/walkthrough/` y a `local_deploy/app/walkthrough/`; en la app se abre desde el pie ("Guía de la demo").

- `scripts/walkthrough-capturas.mjs` levanta Vite, recorre la historia completa con Playwright (Carmen publica, Lucía postula, Carmen la acepta con Cobro Garantizado, Lucía ve el aviso de deudor) más las variantes de score medio y bajo, y reemplaza `capturas/`. Reloj fijo, viewport de 390 px a 2x y estado limpio: el resultado es reproducible. Si no encuentra el navegador: `LLAVE_NAVEGADOR=/ruta/al/ejecutable npm run walkthrough:capturas`.
- `scripts/walkthrough-verificar.mjs` falla si una ruta de `src/screens/registry.tsx` no tiene un paso con `data-ruta` en la guía, si falta o sobra una captura, o si un enlace interno no tiene destino.
- La guía no usa JavaScript ni estilos inline, por la CSP de `vercel.json`.
- Si agregas una pantalla: suma su recorrido al script, un `<article class="paso" data-ruta="...">` a la guía y su fila en el mapa rápido.

Vercel usa `vercel.json` en la raíz del repo: instala y construye esta carpeta y publica `prototype/app/dist`.

## Rutas

- Propietaria: `#/inicio` → `#/publicar` → `#/inmueble` → `#/postulantes` → `#/postulante/:id` → `#/resultado/:id` → `#/poliza/:id` → `#/cobro` → `#/confirmacion`.
- Inquilino: `#/marketplace` → `#/propiedad/:id` → `#/registro` → `#/autorizar` → `#/mi-score` → `#/postular/:id` → `#/mis-postulaciones` → `#/deudor/:id`.
- Panel de demo: `#/demo` (indicador de bancarización y precarga de Lucía). "Reiniciar demo" está en el pie.

## Estructura

```
src/
  domain/      tipos, RentScore (port literal del legado) y formatos
  data/        datos ficticios (solo los providers los importan)
  providers/   fronteras simuladas: score, payment, legalText, data (decisión 019)
  store/       estado, reducer puro, selectores y persistencia en localStorage
  components/  design system en React
  screens/     owner/, tenant/, demo/ y la tabla de rutas (registry.tsx)
  styles/      base.css (portada del legado) y app.css
tests/         caracterización del RentScore, reducer, persistencia, providers, pantallas e integración
```

## Reglas del proyecto

- La UI no importa el RentScore, los datos ficticios ni los textos legales: los consume a través de `useProviders()`. Así cada módulo simulado se puede reemplazar por su integración real.
- `src/domain/rentscore.ts` no se modifica sin acuerdo con Riesgos. `tests/rentscore.characterization.test.ts` lo compara con `prototype/src/rentscore.js`.
- Todo valor inventado lleva la etiqueta SUPUESTO en pantalla y se lista en `prototype/docs/supuestos.md`.
- Todo cambio de look and feel o de navegación (pantallas, textos visibles, estilos, componentes, rutas, flujo) actualiza el walkthrough en el mismo cambio: `npm run walkthrough:capturas`, textos y fecha de `public/walkthrough/index.html`, y `npm run check` en verde. Sin eso el cambio no está terminado (decisión 020).
