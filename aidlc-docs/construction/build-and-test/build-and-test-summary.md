# Build and Test Summary

Ejecutado el 2026-09-29 en macOS con Node 26.8.2.

## Build
- **Herramienta**: Vite 8.3.1 + TypeScript 6.0.3.
- **Estado**: Success. `tsc --noEmit` sin errores y `vite build` en <1 s.
- **Artefactos**: `prototype/app/dist/` con `index.html` (sin scripts inline), JS de 299 kB (90 kB gzip) y CSS de 16 kB.
- **Smoke test**: `vite preview` devolvió 200 en index, JS y CSS. El bundle contiene las pantallas de la propietaria, del inquilino y del panel de demo.

## Pruebas
| Tipo | Resultado |
| --- | --- |
| Unitarias (dominio, estado, persistencia, providers, validación) | 48 / 48 |
| Integración de pantallas (U2, U3, U4) | 16 / 16 |
| **Total** | **64 / 64, 0 fallas** |
| Caracterización del RentScore | Diferencial sin diferencias en 609,840 combinaciones. Detecta 7 de 7 mutaciones de reglas |
| Lint / formato | `eslint .` y `prettier --check .` sin hallazgos |
| Dependencias | `npm audit`: 0 vulnerabilidades |
| Rendimiento | N/A (sitio estático) |
| E2E en navegador real | No ejecutado. La revisión manual de paridad queda pendiente para el equipo |

## Estado general
- **Build**: Success.
- **Pruebas**: Pass.
- **Listo para deploy**: sí, como demo estática. El siguiente push a la rama publica con el nuevo `vercel.json`, pero el deploy en sí no se probó (se verificó el build local).

## Walkthrough (agregado el 2026-09-29, decisión 020)
- `prototype/app/public/walkthrough/`: guía HTML de ambos journeys con 24 capturas. Se publica en `dist/walkthrough/` y `local_deploy/app/walkthrough/`, enlazada desde el pie de la app.
- `npm run walkthrough:capturas` genera las capturas con Playwright sobre un Chromium local (recorrido real por clics, reloj fijo). Es el primer recorrido E2E en navegador real: pasa por las 19 rutas sin errores de página.
- `npm run walkthrough:verificar` corre dentro de `npm run check`: 19 rutas documentadas, 24 capturas referenciadas.
- **Criterio de cierre para todo cambio futuro de look and feel o navegación**: capturas regeneradas, textos de la guía revisados y `npm run check` en verde.

## Pendientes conocidos
1. Revisión manual lado a lado legado vs. app (paridad visual, Q3=A).
2. Verificar las cabeceras con `curl -I` después del primer deploy en Vercel.
3. Todo lo que es SUPUESTO sigue abierto con Legal, Riesgos e Interseguro (decisiones 010, 012, 016 y 018).
