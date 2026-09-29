# Requirements — Preguntas de verificación

Responde con la letra después de cada `[Answer]:`. Si ninguna opción encaja, elige la última (Otro) y describe. Avísame cuando termines.

Contexto del ciclo (ya acordado): desarrollamos la deuda técnica del prototipo (decisión 019), EXCEPTO el motor RentScore y todo lo que dependa de Legal/Riesgos/integraciones técnicas, que quedan como módulos simulados.

---

## Bloque A — Alcance funcional

## Question 1
Además de pagar deuda técnica, ¿qué debe entregar este ciclo a nivel de producto?

A) Solo saneamiento técnico del journey del propietario existente (sin funcionalidad nueva).

B) Saneamiento técnico + implementar el journey del inquilino (HU-01..HU-12 de `historias-inquilino.md`).

C) Saneamiento técnico + journey del inquilino + conectar ambos journeys (la postulación de Lucía aparece en la bandeja de Carmen, HU-11/HU-12).

D) Otro (describe después de [Answer]:)

[Answer]: C

## Question 2
Sobre el stack (tu preferencia inicial fue migrar a Vite/Next.js). ¿Qué hacemos en ESTE ciclo?

A) Migrar a un stack con build ahora (parte de la deuda técnica). Elegir framework en Workflow/Design.

B) Mantener el stack vanilla actual en este ciclo y dejar la migración para un ciclo posterior.

C) Otro (describe después de [Answer]:)

[Answer]: A 

## Question 3
¿Qué debe cubrir el saneamiento técnico en este ciclo? (puedes marcar varias con letras, ej. "A,B,D")

A) Pruebas automatizadas (empezando por el motor RentScore como caja negra: entradas/salidas, sin rehacer sus reglas).

B) Estructura de proyecto y build (linting, formateo, organización de módulos).

C) Refactor del render por strings hacia algo más mantenible (componentes/plantillas).

D) Tipado (por ejemplo TypeScript) para las estructuras de datos y el contrato del motor.

E) Accesibilidad y responsive (formalizar lo que ya existe y cerrar brechas).

F) Otro (describe después de [Answer]:)

[Answer]: A, B, C, D, E

---

## Bloque B — Módulos simulados (excepciones de la decisión 019)

## Question 4
Los módulos simulados (RentScore, Legal, Riesgos, integraciones Interbank/Interseguro/centrales/SBS) deben quedar detrás de una frontera clara para reemplazo futuro. ¿Qué nivel de formalidad quieres?

A) Interfaz explícita por módulo (ej. `scoreProvider`, `legalTextProvider`, `paymentProvider`) con implementación simulada intercambiable.

B) Mantenerlos como funciones simuladas simples, sin formalizar interfaces (más rápido, menos preparado para el futuro).

C) Otro (describe después de [Answer]:)

[Answer]: A

## Question 5
El motor RentScore actual, ¿debe quedar cubierto por pruebas aunque no se reescriba su lógica?

A) Sí, pruebas de caracterización (fijan el comportamiento actual como referencia).

B) No, se deja tal cual sin pruebas.

C) Otro (describe después de [Answer]:)

[Answer]: A

---

## Bloque C — Requisitos no funcionales

## Question 6
¿Cuál es la restricción de despliegue para este ciclo?

A) Debe seguir desplegándose como sitio estático en Vercel (como hoy).

B) Puede requerir un paso de build antes del deploy estático (compatible con Vercel).

C) Otro (describe después de [Answer]:)

[Answer]: A

## Question 7
¿Se mantiene la regla de "cero datos reales" y todo dato ficticio con etiqueta SUPUESTO?

A) Sí, sin cambios: todo ficticio y etiquetado.

B) Otro (describe después de [Answer]:)

[Answer]: A

---

## Bloque D — Extensiones AI-DLC (opt-in)

## Question 8: Extensión de Testing (Property-Based Testing)
¿Se deben aplicar reglas de property-based testing (PBT) en este proyecto?

A) Sí — aplicar todas las reglas PBT como restricciones bloqueantes (recomendado si hay lógica de negocio, transformaciones de datos, serialización o componentes con estado).

B) Parcial — aplicar PBT solo a funciones puras y round-trips de serialización (adecuado si la complejidad algorítmica es limitada).

C) No — omitir todas las reglas PBT (adecuado para CRUD simple, proyectos solo-UI o capas delgadas de integración sin lógica de negocio relevante).

X) Otro (describe después de [Answer]:)

[Answer]: C

## Question 9: Extensión de Seguridad (Security Baseline)
¿Se deben aplicar las reglas de la extensión de seguridad en este proyecto?

A) Sí — aplicar todas las reglas de SEGURIDAD como restricciones bloqueantes (recomendado para aplicaciones de nivel productivo).

B) No — omitir las reglas de SEGURIDAD (adecuado para PoCs, prototipos y proyectos experimentales).

X) Otro (describe después de [Answer]:)

[Answer]: A

## Question 10: Extensión de Resiliencia (Resiliency Baseline)
¿Se debe aplicar la línea base de resiliencia a este proyecto?

Qué es: aplica buenas prácticas direccionales de diseño (AWS Well-Architected, pilar de Fiabilidad) hacia tolerancia a fallos, alta disponibilidad, observabilidad y recuperabilidad. No certifica ni garantiza disponibilidad; es un punto de partida, no un reemplazo de una revisión formal.

A) Sí — aplicar la línea base de resiliencia como guía direccional de diseño (recomendado para cargas críticas de negocio).

B) No — omitir la línea base de resiliencia (adecuado para PoCs, prototipos y proyectos experimentales donde prima iterar rápido).

X) Otro (describe después de [Answer]:)

[Answer]: A
```
