# Application Design — Plan y preguntas

Objetivo: definir los componentes, sus interfaces, la capa de servicios y las dependencias del prototipo LLAVE migrado, incluyendo las fronteras de los módulos simulados (decisión 019). El detalle de reglas de negocio va después, en Functional Design (por unidad).

## Plan de ejecución (checklist)

- [ ] Elegir el framework y la forma del proyecto (según respuestas de abajo)
- [ ] Definir componentes de UI (pantallas y componentes reutilizables del design system)
- [ ] Definir la capa de servicios/estado (routing, estado de la demo, persistencia)
- [ ] Definir las interfaces de los módulos simulados (`scoreProvider`, `legalTextProvider`, `paymentProvider`, `dataProvider`)
- [ ] Definir el modelo de datos (inquilino extensible, propiedades, postulaciones)
- [ ] Generar components.md, component-methods.md, services.md, component-dependency.md y application-design.md

---

## Preguntas de diseño

Responde con la letra después de cada `[Answer]:`. Si ninguna encaja, usa la última (Otro) y describe.

## Question 1 — Framework
El requisito RNF-01 es migrar a un stack con build; el despliegue es estático en Vercel con build (RNF-02). ¿Qué framework usamos?

A) **Vite + React + TypeScript** — SPA estática, router en cliente por hash/history. Ligero, build simple, encaja con el patrón actual de "router + pantallas". (Recomendado.)

B) **Vite + Preact + TypeScript** — igual que A pero más liviano.

C) **Next.js (export estático) + TypeScript** — más estructura y convenciones; algo más pesado para un prototipo estático.

D) **Vite + Vanilla TS (sin framework de UI)** — solo tipar y modularizar, con plantillas propias.

X) Otro (describe después de [Answer]:)

[Answer]: a

## Question 2 — Estrategia de estilos
Hoy los estilos están en `styles.css` con variables CSS derivadas de `tokens.json`. ¿Cómo los llevamos?

A) Conservar CSS con variables (tokens) + hojas por componente/CSS Modules. Mínima fricción, respeta el design system. (Recomendado.)

B) Introducir un framework de estilos utilitario (ej. Tailwind) mapeando los tokens.

C) CSS-in-JS.

X) Otro (describe después de [Answer]:)

[Answer]: a

## Question 3 — Routing y estado
El prototipo usa router por hash y estado en `localStorage`. ¿Qué patrón adoptamos en el nuevo stack?

A) Router del framework (o hash router) + estado con el manejador nativo del framework (hooks/store ligero) + persistencia en `localStorage` detrás de un módulo. (Recomendado.)

B) Añadir una librería de estado global (ej. Zustand/Redux).

X) Otro (describe después de [Answer]:)

[Answer]: A

## Question 4 — Fronteras de módulos simulados (decisión 019, Q4=A)
Confirmo el conjunto de interfaces simuladas a definir. ¿Cuáles quieres como frontera explícita?

A) Las cuatro: `scoreProvider` (envuelve RentScore), `legalTextProvider` (textos legales placeholder), `paymentProvider` (Cobro Garantizado/Renta Adelantada/póliza), `dataProvider` (propiedades, inquilino, postulantes; hoy datos ficticios). (Recomendado.)

B) Solo `scoreProvider` y `legalTextProvider`; el resto como funciones simples.

X) Otro (describe después de [Answer]:)

[Answer]: a

## Question 5 — Organización de la app (dos journeys)
¿Cómo estructuramos propietario e inquilino?

A) Una sola app con dos áreas/rol (propietario e inquilino) y navegación entre ellas, compartiendo componentes y providers. Refleja la conexión de journeys (US-C01/C02). (Recomendado.)

B) Dos apps/entradas separadas que comparten librerías.

X) Otro (describe después de [Answer]:)

[Answer]: A
```
