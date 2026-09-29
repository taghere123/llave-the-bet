# Units of Work — Plan y preguntas

Objetivo: descomponer el trabajo en unidades manejables para construir por partes, cuidando la paridad del journey del propietario. Es un **monolito de front** (una app Vite+React); las "unidades" son módulos lógicos que se desarrollan y aprueban en secuencia, no servicios desplegables por separado.

## Plan de ejecución (checklist)
- [x] Confirmar la descomposición en unidades (según respuestas) — 4 unidades, orden U1→U4
- [x] Generar `unit-of-work.md` (definiciones y responsabilidades)
- [x] Generar `unit-of-work-dependency.md` (matriz de dependencias)
- [x] Generar `unit-of-work-story-map.md` (historias → unidades)
- [x] Validar límites y que todas las historias estén asignadas

## Descomposición propuesta (del execution-plan)
- **U1 — Base y tooling**: proyecto Vite+React+TS, linter/formateo, estructura, tokens portados, `persistence`, y los 4 providers simulados con `scoreProvider`/`paymentProvider` envolviendo el RentScore actual + **pruebas de caracterización**. (No entrega pantallas de negocio; es la fundación.)
- **U2 — Journey del propietario (migrado)**: pantallas OwnerHome→Confirmation con paridad funcional (US-P01..P03).
- **U3 — Journey del inquilino**: Marketplace→DebtorNotice (US-I01..I10).
- **U4 — Conexión + bancarización**: postulación de Lucía en la bandeja de Carmen, indicador de bancarización, controles de demo (US-C01, US-C02).

---

## Preguntas de descomposición

Responde con la letra después de cada `[Answer]:`.

## Question 1 — Número y forma de las unidades
¿Confirmas la descomposición en 4 unidades (U1 base, U2 propietario, U3 inquilino, U4 conexión)?

A) Sí, las 4 unidades tal cual. (Recomendado.)

B) Combinar U1 dentro de U2 (fundación + propietario en una sola unidad).

C) Combinar U3 y U4 (inquilino + conexión juntos).

X) Otro (describe después de [Answer]:)

[Answer]: A (recomendación aceptada por el usuario)

## Question 2 — Orden de desarrollo
¿Cuál es el orden de construcción?

A) U1 → U2 → U3 → U4 (fundación, luego paridad del propietario, luego inquilino, luego conexión). (Recomendado.)

B) U1 → U3 → U2 → U4 (priorizar el inquilino, que es lo nuevo, antes de migrar al propietario).

X) Otro (describe después de [Answer]:)

[Answer]: A (recomendación aceptada)

## Question 3 — Estrategia de paridad del propietario
La migración del journey del propietario (U2) debe preservar el comportamiento actual. ¿Cómo lo aseguramos?

A) Reimplementar sobre React validando pantalla por pantalla contra el prototipo actual (revisión visual + de flujo), sin pruebas E2E automatizadas. (Adecuado para prototipo/demo. Recomendado.)

B) Añadir pruebas E2E automatizadas (ej. Playwright) para el journey del propietario.

X) Otro (describe después de [Answer]:)

[Answer]: A (recomendación aceptada)

## Question 4 — Punto de verificación entre unidades
¿Quieres aprobar (checkpoint) al terminar cada unidad, o avanzar de corrido y revisar al final?

A) Checkpoint al terminar cada unidad (más control). (Recomendado para cuidar la paridad.)

B) Avanzar de corrido U1→U4 y revisar al final.

X) Otro (describe después de [Answer]:)

[Answer]: A (recomendación aceptada)
```
