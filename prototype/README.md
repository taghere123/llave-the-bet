# Prototipo (taller AI-DLC, 29-30 sept 2026)

Objetivo: un prototipo navegable del journey del propietario que sirva para la demo. No es un producto. **Todos los datos son ficticios y no hay ninguna conexión a sistemas de Interbank o Interseguro.**

## Primer mockup (25 sept 2026)

Abrir `src/index.html` con doble clic en el navegador. No necesita servidor, build ni instalación. Mobile-first, funciona también en escritorio.

- 11 pasos: entrada, publicar, mis inmuebles, postulantes, detalle, consentimiento (vista del postulante), evaluando, RentScore, póliza, cómo cobrar, confirmación. Más una pantalla informativa de Renta Adelantada.
- Tres postulantes ficticios caen en banda alta, media y baja para mostrar los tres casos.
- Todo número inventado lleva la etiqueta SUPUESTO en pantalla y está listado en `docs/supuestos.md`.
- El progreso se guarda en `localStorage`. "Reiniciar demo" al pie vuelve al estado inicial.
- Publicación en Vercel: `vercel.json` en la raíz copia solo `prototype/src` y `prototype/data` a `public/`. Así `context/`, `decisions/` y los originales no se publican. Al importar el repo en Vercel, dejar Root Directory en la raíz. La página lleva `noindex`.
- No es un entregable validado: sirve para alinear al equipo antes del taller. Sin validación con usuarios.

## Journey a cubrir

1. El propietario publica su inmueble (o entra vía portal existente, simulado).
2. Recibe un postulante.
3. Solicita el RentScore. El postulante autoriza el uso de sus datos (pantalla de consentimiento).
4. Ve el score (0-100), la cuota segura recomendada y la comparativa con el mercado.
5. Acepta al candidato y ve la póliza de RentScore Seguro.
6. Explora Cobro Garantizado y deja su interés. Renta Adelantada solo como pantalla informativa, nunca activable.

## Alcance técnico propuesto

- Front navegable (Vite o Next.js) con datos en JSON local.
- RentScore como función pura de reglas sobre datos inventados. Sin ML.
- Sin backend, sin base de datos, sin APIs. Si algo necesita persistir, `localStorage` o un archivo JSON.
- Pantallas mobile-first: el propietario limeño usa el celular.

## Design system

`design-system/` tiene tokens (`tokens.json`), fundamentos de contenido y visuales (`README.md`) y 10 componentes con su `README.md` y un `preview.html` estático. Sale de medir el portal Zona Hipotecaria de Interbank el 25 sept 2026; cada token indica si es Medido, Estimado, Ajustado o Propuesto. Es referencia, no código importable: no hay librería ni build.

Pendientes que el propio sistema declara: precio del seguro (decisión 010, `SolutionOption` no muestra monto), cortes de las bandas de score (0-39, 40-69, 70-100 provisionales), texto legal de consentimiento, licencia de Geometria y logotipo.

## Fuera del prototipo

Integración bancaria real, emisión real de pólizas, marketplace propio, Renta Adelantada funcional, Housing Graph.

## Antes de escribir código (decidir el primer día del taller)

- Usuario principal y su escena.
- Qué versión de precio del seguro mostramos (decisión 010). En el prototipo debe ser un solo modelo, marcado como supuesto.
- Si Cobro Garantizado muestra comisión (decisión 012).
- Qué queremos que el jurado crea después de 3 minutos de demo.

## Estructura sugerida

```
prototype/
  README.md
  src/         index.html, styles.css (tokens), app.js (pantallas), rentscore.js (reglas)
  data/        datos.js ficticio: inmueble, postulantes (JS en vez de JSON para abrir sin servidor)
  design-system/  tokens, fundamentos y componentes de referencia
  docs/        supuestos.md, capturas y guion de la demo
```
