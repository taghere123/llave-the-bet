# U1 · Resumen de código

Proyecto nuevo en `prototype/app/`. El prototipo legado (`prototype/src`, `prototype/data`) no se modificó.

## Creado
- Tooling: `package.json` (versiones exactas), `package-lock.json`, `tsconfig.json` (strict), `vite.config.ts` (+ Vitest/jsdom), `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `index.html`.
- Dominio: `src/domain/types.ts`, `src/domain/rentscore.ts` (port literal del motor legado), `src/domain/format.ts`.
- Datos ficticios: `src/data/fixtures.ts` (9 propiedades, Carmen, Jorge, Kevin, Lucía).
- Providers: `src/providers/types.ts` (4 interfaces), `src/providers/simulated/{score,payment,legalText,data}Provider.ts`, `src/providers/ProvidersContext.tsx`.
- Estado: `src/store/{state,reducer,persistence,selectors}.ts`, `src/store/StoreContext.tsx`.
- Router: `src/router.ts` (hash router propio).
- Validación: `src/validation/leadForm.ts`.
- Componentes base: `src/components/{Icon,Illustrations,ui,RentScoreCard,PropertyCard,Layout,ErrorBoundary}.tsx`.
- Estilos: `src/styles/base.css` (copia de `prototype/src/styles.css`, paridad), `src/styles/app.css`.
- Pruebas: `tests/setup.ts`, `tests/helpers.ts`, `tests/rentscore.characterization.test.ts`, `tests/reducer.test.ts`, `tests/persistence.test.ts`, `tests/providers.test.ts`, `tests/leadForm.test.ts`.

## Modificado
- `vercel.json`: instala y construye `prototype/app`, publica `prototype/app/dist`, redirige las URLs `/src/*` del legado a `/`, y agrega CSP, HSTS, nosniff, X-Frame-Options y Referrer-Policy. Se mantiene `X-Robots-Tag: noindex`.

## Verificación al cierre de U1
- `vitest run`: 5 archivos, 48 pruebas en verde.
- La prueba diferencial compara el port con el motor legado en una grilla de valores alrededor de cada corte (609,840 combinaciones en la versión final) y no encuentra diferencias. En Build and Test se comprobó que detecta 7 mutaciones distintas de umbrales, bandas y cuota segura.
