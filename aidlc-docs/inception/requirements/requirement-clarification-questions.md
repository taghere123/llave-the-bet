# Requirements — Preguntas de clarificación

Detecté una incompatibilidad y un punto a afinar en tus respuestas. Responde con la letra después de cada `[Answer]:`.

---

## Clarificación 1: Despliegue "como hoy" (Q6=A) vs. migrar a stack con build (Q2=A)

Marcaste **Q2=A** (migrar a Vite/Next.js, que requiere un paso de build) y a la vez **Q6=A** ("debe seguir desplegándose como sitio estático en Vercel **como hoy**"). "Como hoy" hoy significa **sin build** (se abre el HTML directo). Migrar a un framework implica un paso de build. Son parcialmente incompatibles.

Casi seguro lo que quieres es: sigue siendo un **sitio estático en Vercel**, pero **con** un paso de build (Vite/Next export estático). Confirma:
Mantengamos el enfoque a build.

### Pregunta 1.1
¿Cómo resolvemos el despliegue?

A) Sitio estático en Vercel **con** paso de build (Vite o Next.js en export estático). El resultado sigue siendo estático, solo que ahora se compila. (Compatible con Q2=A. Recomendado.)

B) Sin build, sitio 100% estático como hoy → esto implica **cancelar la migración de stack** (revierte Q2 a "mantener vanilla").

C) Otro (describe después de [Answer]:)

[Answer]: Build a Vercel

---

## Clarificación 2: Extensiones de Seguridad y Resiliencia en un prototipo estático

Activaste Seguridad (Q9=A) y Resiliencia (Q10=A). El proyecto es un **prototipo estático sin backend, sin base de datos, sin APIs de red y sin datos reales**. En ese contexto, la mayoría de reglas de ambas extensiones no aplican (N/A), y Resiliencia además exige decisiones de RTO/RPO, DR, topología regional, CI/CD y respuesta a incidentes que son propias de sistemas productivos con backend.

### Pregunta 2.1 — Alcance de la extensión de Seguridad
¿Cómo aplicamos Seguridad a este prototipo estático?

A) Aplicar solo las reglas relevantes a un front estático (cabeceras de seguridad HTTP vía Vercel, sanitización/anti-XSS en el render, integridad de recursos externos/SRI y de dependencias, manejo seguro de errores) y marcar el resto como N/A con justificación. (Recomendado.)

B) Intentar aplicar TODAS las reglas como bloqueantes (implicaría inventar backend/infra que hoy no existe; no recomendado para un prototipo).

C) Desactivar Seguridad en este ciclo.

X) Otro (describe después de [Answer]:)

[Answer]: C

### Pregunta 2.2 — Alcance de la extensión de Resiliencia
¿Cómo aplicamos Resiliencia a este prototipo estático?

A) Tratarla como N/A en su mayoría (sitio estático en CDN de Vercel: alta disponibilidad y recuperación las da la plataforma). Documentar como N/A con justificación y **no** responder las preguntas de RTO/RPO, DR, topología regional, CI/CD e incidentes por ahora. (Recomendado para el prototipo.)

B) Responder igualmente las preguntas de resiliencia (RTO/RPO, DR, CI/CD, topología, incidentes) aunque sea un prototipo.

C) Desactivar Resiliencia en este ciclo y retomarla cuando exista backend/MVP.

X) Otro (describe después de [Answer]:)

[Answer]: C

```
