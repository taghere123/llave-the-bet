# U1 — Base y tooling · Plan de Code Generation

Única fuente de verdad para generar U1. Ubicación del código: `prototype/app/` (nunca `aidlc-docs/`). Brownfield: el prototipo legado (`prototype/src`, `prototype/data`) no se modifica; se conserva como referencia de paridad y como oráculo de la prueba diferencial.

## Contexto
- **Historias**: habilitadora de todas (US-P*, US-I*, US-C*).
- **Requisitos**: RNF-01..RNF-06, RNF-09, RNF-10, RF-16..RF-19 (fronteras).
- **Dependencias**: ninguna.
- **Contratos que expone**: tipos de dominio, 4 providers, `DemoState` + acciones, router, componentes base.

## Pasos
- [x] Step 1 — Estructura del proyecto: `package.json` (versiones exactas), `tsconfig.json`, `vite.config.ts` (+ Vitest), `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `index.html`, `src/main.tsx`.
- [x] Step 2 — Dominio: `src/domain/types.ts`, `src/domain/rentscore.ts` (port literal), `src/domain/format.ts`.
- [x] Step 3 — Datos ficticios: `src/data/fixtures.ts`.
- [x] Step 4 — Providers: `src/providers/types.ts`, `src/providers/simulated/*.ts`, `src/providers/ProvidersContext.tsx`.
- [x] Step 5 — Estado: `src/store/state.ts`, `reducer.ts`, `persistence.ts`, `selectors.ts`, `StoreContext.tsx`.
- [x] Step 6 — Router y validación: `src/router.ts`, `src/validation/leadForm.ts`.
- [x] Step 7 — Componentes base y estilos: `src/components/*`, `src/styles/base.css` (port de `styles.css`), `src/styles/app.css`.
- [x] Step 8 — Pruebas: `tests/setup.ts`, `tests/rentscore.characterization.test.ts`, `tests/reducer.test.ts`, `tests/persistence.test.ts`, `tests/providers.test.ts`, `tests/leadForm.test.ts`.
- [x] Step 9 — Deploy: `vercel.json` (build de `prototype/app`, cabeceras de seguridad).
- [x] Step 10 — Resumen en `aidlc-docs/construction/u1-base-tooling/code/summary.md`.
