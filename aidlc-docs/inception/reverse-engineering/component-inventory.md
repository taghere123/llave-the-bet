# Component Inventory — LLAVE Prototipo

## Application "Packages" (no hay paquetes formales; son archivos/módulos)
- `prototype/src/index.html` — Shell de la SPA.
- `prototype/src/app.js` — Router por hash, estado y 9 pantallas del journey del propietario.
- `prototype/src/rentscore.js` — Motor de reglas (score, prima, modalidades).
- `prototype/src/styles.css` — Estilos y tokens CSS.

## Shared / Model
- `prototype/data/datos.js` — Datos ficticios (`window.LLAVE_DATA`).

## Design System (referencia, no importable)
- `prototype/design-system/tokens.json` — Tokens.
- `prototype/design-system/README.md` — Fundamentos.
- 10 componentes de referencia (cada uno con `README.md` + `preview.html`):
  - Button
  - ConsentBlock
  - Cover
  - CtaBanner
  - NavHeader
  - PropertyCard
  - RentScoreCard
  - SearchFilters
  - SolutionOption
  - StatusBadge

## Documentación del prototipo
- `prototype/docs/historias-inquilino.md` — Historias del flujo del inquilino (backlog, no implementado).
- `prototype/docs/supuestos.md` — Supuestos etiquetados en pantalla.
- `prototype/docs/capturas/` — Capturas de la demo.

## Infrastructure Packages
- `vercel.json` (raíz del repo) — Configuración de despliegue estático.

## Test Packages
- Ninguno. No hay pruebas automatizadas.

## Total Count
- **Application (archivos fuente)**: 4 (index.html, app.js, rentscore.js, styles.css)
- **Shared/Model**: 1 (datos.js)
- **Design system**: tokens + 10 componentes de referencia
- **Infrastructure**: 1 (vercel.json)
- **Test**: 0
