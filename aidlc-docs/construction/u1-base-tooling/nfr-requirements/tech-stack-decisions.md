# U1 · Tech Stack Decisions

Versiones exactas consultadas en npm el 2026-09-29 (Node 26.8.2, npm 11.19.1 en la máquina de desarrollo).

| Paquete | Versión | Uso |
| --- | --- | --- |
| react / react-dom | 19.3.0 | UI |
| vite | 8.3.1 | Dev server y build |
| @vitejs/plugin-react | 6.1.1 | JSX/React en Vite |
| typescript | 6.0.3 | Tipado. No es TS 7: typescript-eslint soporta `<6.1.0` |
| vitest | 5.0.2 | Runner de pruebas |
| @testing-library/react / dom | 16.3.3 / 10.4.2 | Pruebas de componentes |
| jsdom | 30.1.1 | DOM para las pruebas |
| eslint / @eslint/js | 10.11.0 / 10.0.1 | Lint |
| typescript-eslint | 8.71.0 | Reglas de TS |
| eslint-plugin-react-hooks | 7.1.1 | Reglas de hooks |
| globals | 17.12.0 | Globals de navegador para ESLint |
| prettier | 3.9.9 | Formato |
| @types/react / @types/react-dom / @types/node | 19.3.0 / 19.3.0 / 26.6.3 | Tipos |

## Decisiones
- **Router**: hash router propio (`src/router.ts`). Sin react-router.
- **Estado**: `useReducer` + Context. Sin librería de estado global (Q3=A de Application Design).
- **Estilos**: CSS con variables de `tokens.json`. Hoja base portada del legado (paridad) y hojas por área (`tenant.css`, `demo.css`).
- **Ubicación**: `prototype/app/`. El prototipo legado (`prototype/src`, `prototype/data`) se conserva como referencia de paridad y como oráculo de la prueba diferencial.
- **Deploy**: `vercel.json` instala y construye `prototype/app` y publica `prototype/app/dist`.
