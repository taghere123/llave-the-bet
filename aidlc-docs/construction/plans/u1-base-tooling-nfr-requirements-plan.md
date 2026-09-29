# U1 — Base y tooling · Plan de NFR Requirements

- [x] Revisar la functional design de U1 y los RNF-01..RNF-11.
- [x] Resolver la selección de stack y versiones.
- [x] Generar nfr-requirements.md y tech-stack-decisions.md.

## Preguntas (resueltas con la recomendación del modelo; decisiones delegadas por el usuario)

## Question 1
¿Qué runner de pruebas usamos?

A) Vitest + Testing Library + jsdom (comparte la configuración de Vite).

B) Jest.

X) Otro

[Answer]: A

## Question 2
¿Qué versión de TypeScript usamos?

A) La última 6.0.x (6.0.3). typescript-eslint 8.71 declara soporte `>=4.8.4 <6.1.0` y no admite TS 7.

B) TypeScript 7 sin linting con tipos.

X) Otro

[Answer]: A

## Question 3
¿Router de librería o propio?

A) Hash router propio (unas 40 líneas). Mantiene las URLs `#/...` del legado, funciona en hosting estático sin rewrites y evita una dependencia.

B) react-router.

X) Otro

[Answer]: A

## Question 4
¿Cómo se carga la tipografía?

A) Igual que el legado: hoja de Google Fonts. SRI no aplica porque la hoja CSS se genera por navegador. La CSP la acepta de forma explícita.

B) Autoalojar Montserrat.

X) Otro

[Answer]: A (autoalojar queda como mejora futura)
