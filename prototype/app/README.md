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
```

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
