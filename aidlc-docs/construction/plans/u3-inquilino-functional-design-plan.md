# U3 — Journey del inquilino · Plan de Functional Design

- [x] Analizar US-I01..I10 y las convenciones de `prototype/docs/historias-inquilino.md`.
- [x] Resolver las 4 preguntas abiertas del borrador.
- [x] Definir el flujo de navegación y sus guardias.
- [x] Generar business-rules.md, business-logic-model.md, domain-entities.md y frontend-components.md.

## Preguntas abiertas del borrador (resueltas con la recomendación del modelo; decisiones delegadas por el usuario)

## Question 1 (HU-02)
¿La ficha muestra el rango del seguro o un solo número?

A) El rango 2-5% con montos, por ejemplo "S/36 a S/90 al mes". Es el criterio de la historia y no inventa un punto medio que la decisión 010 no fija.

B) El punto medio.

X) Otro

[Answer]: A

## Question 2 (HU-06)
Con score bajo, ¿se mencionan las modalidades de pago garantizado?

A) Solo un aviso breve: "igual puedes postular; el propietario no podrá activar Cobro Garantizado ni Renta Adelantada". Sin tarjetas de "no disponible" en el lado del inquilino.

B) Mostrarlas como no disponibles.

C) No mencionarlas.

X) Otro

[Answer]: A. Es transparente sin cargar al inquilino con producto del propietario.

## Question 3
¿Cuántas propiedades tiene el marketplace?

A) 9 (dentro del rango 8-10 de la respuesta 12). Llenan una grilla de 3×3 en escritorio.

B) 10-12.

X) Otro

[Answer]: A

## Question 4 (HU-12)
¿Dónde va el indicador de bancarización?

A) En el Panel de demo (`#/demo`, enlazado desde el pie). No aparece en las pantallas del inquilino: es una métrica interna, no un mensaje para el usuario.

B) En la pantalla del inquilino.

X) Otro

[Answer]: A (se implementa en U4)
