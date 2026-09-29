# U1 — Base y tooling · Plan de Functional Design

- [x] Analizar la unidad (unit-of-work.md, story map): U1 es habilitadora, sin pantallas de negocio.
- [x] Definir entidades de dominio compartidas por U2..U4.
- [x] Definir reglas del motor (RentScore, sin cambios) y de las condiciones comerciales.
- [x] Definir el contrato de los 4 providers simulados.
- [x] Definir el estado de la demo, su persistencia y su validación al cargar.
- [x] Generar business-logic-model.md, business-rules.md, domain-entities.md.

## Preguntas (resueltas con la recomendación del modelo; el usuario delegó las decisiones el 2026-09-29)

## Question 1
¿El RentScore se importa desde el archivo legado o se porta a TypeScript?

A) Portarlo literalmente a TypeScript y demostrar equivalencia con una prueba diferencial contra `prototype/src/rentscore.js` (el archivo legado no se puede importar como ESM: asigna a `this`).

B) Importar el archivo legado sin cambios.

X) Otro

[Answer]: A. Un port literal no cambia reglas (decisión 019). La prueba diferencial compara ambos motores en una grilla de entradas.

## Question 2
¿Quién es dueño de la prima del seguro: `scoreProvider` o `paymentProvider`?

A) `paymentProvider` (condiciones comerciales: prima, rango del seguro, Cobro Garantizado, Renta Adelantada). `scoreProvider` solo evalúa.

B) `scoreProvider`, como en el legado.

X) Otro

[Answer]: A. Corrige una inconsistencia entre components.md y component-methods.md.

## Question 3
¿Cómo se trata un estado guardado en `localStorage` con otra versión o corrupto?

A) Se valida la forma al cargar. Si no es válido, se descarta y se arranca del estado inicial (sin migrar v1).

B) Migrar el estado v1 del prototipo legado.

X) Otro

[Answer]: A. Es una demo y no hay datos que preservar.
