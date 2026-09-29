# Prototipo (taller AI-DLC, 29-30 sept 2026)

Objetivo: un prototipo navegable del journey del propietario que sirva para la demo. No es un producto. **Todos los datos son ficticios y no hay ninguna conexión a sistemas de Interbank o Interseguro.**

## Primer mockup (25 sept 2026)

Abrir `src/index.html` con doble clic en el navegador. No necesita servidor, build ni instalación. Mobile-first, funciona también en escritorio.

- Journey del propietario: entrada, publicar, mis inmuebles, postulantes, detalle, RentScore, póliza, cómo cobrar, confirmación.
- Journey del inquilino (decisión 017): marketplace, ficha de propiedad, registro (lead form + código simulado), consentimiento, Mi RentScore, Mis postulaciones y aviso de deudor al ser aceptado.
- Tres postulantes ficticios caen en banda alta, media y baja para mostrar los tres casos. Lucía es no-cliente de Interbank y protagoniza el flujo del inquilino; postula al inmueble de Carmen y aparece en su bandeja marcada como "Nuevo".
- Responsive: una columna en móvil y 2 a 3 columnas desde 720px, dentro del contenedor de 896px del design system. Las ilustraciones son SVG inline con la paleta de `tokens.json`; no hay fotos ni archivos de imagen.
- Todo número inventado lleva la etiqueta SUPUESTO en pantalla y está listado en `docs/supuestos.md`.
- El progreso se guarda en `localStorage`. "Reiniciar demo" al pie vuelve al estado inicial.
- Publicación en Vercel: `vercel.json` en la raíz copia solo `prototype/src` y `prototype/data` a `public/`. Así `context/`, `decisions/` y los originales no se publican. Al importar el repo en Vercel, dejar Root Directory en la raíz. La página lleva `noindex`.
- No es un entregable validado: sirve para alinear al equipo antes del taller. Sin validación con usuarios.

## Journeys a cubrir

Dos journeys conectados: el inquilino que postula desde el marketplace aparece en la bandeja del propietario. Protagonista de la demo: el propietario.

### Propietario

1. El propietario publica su inmueble (o entra vía portal existente, simulado).
2. Recibe un postulante. Al postular, el postulante ya autorizó que el propietario vea su RentScore.
3. Abre el detalle del postulante (autorización visible en la pantalla de consentimiento, solo lectura).
4. Ve el score (0-100), la cuota segura recomendada y la comparativa con el mercado.
5. Acepta al candidato y ve la póliza de RentScore Seguro: seguro de hogar que paga el inquilino para proteger el inmueble de daños. No reemplaza la garantía ni cubre impago.
6. Elige cómo cobrar: estándar, Cobro Garantizado (3% mensual con score alto, 5% con medio) o Renta Adelantada de un año (15% con alto, 25% con medio). Con score bajo, ninguna de las dos está disponible.

### Inquilino (decisión 017)

1. Entra al marketplace de LLAVE y navega libremente propiedades en alquiler en Lima Moderna. No se le piden datos para mirar.
2. Abre la ficha de una propiedad. La ficha muestra el rango del seguro de hogar (2-5% de la renta) que pagaría el inquilino.
3. Al tocar "Postular" por primera vez, se registra con un lead form: nombre, apellido, DNI, email y celular, más un código de verificación simulado. El esquema de datos queda abierto para pedir más información después.
4. Da el consentimiento general para calcular su RentScore (con datos de Interbank si es cliente, o de centrales de riesgo si no lo es) y, en cada postulación, autoriza compartir su score con ese propietario (decisión 015).
5. Ve su propio RentScore completo: score, banda, cuota segura y cómo mejorarlo. Puede postular con cualquier banda; no hay bloqueo por cuota.
6. Con los datos ya dejados, sigue navegando y postulando a otras propiedades sin repetir la evaluación. Puede ver el estado de sus postulaciones y retirarlas.
7. Si el propietario lo acepta bajo una modalidad de pago garantizado, se le informa que figura como deudor de un préstamo de consumo con Interbank (decisión 018). Texto legal pendiente.

## Alcance técnico propuesto

- Front navegable (Vite o Next.js) con datos en JSON local.
- RentScore como función pura de reglas sobre datos inventados. Sin ML.
- Sin backend, sin base de datos, sin APIs. Si algo necesita persistir, `localStorage` o un archivo JSON.
- Pantallas mobile-first: el propietario limeño usa el celular.

## Design system

`design-system/` tiene tokens (`tokens.json`), fundamentos de contenido y visuales (`README.md`) y 10 componentes con su `README.md` y un `preview.html` estático. Sale de medir el portal Zona Hipotecaria de Interbank el 25 sept 2026; cada token indica si es Medido, Estimado, Ajustado o Propuesto. Es referencia, no código importable: no hay librería ni build.

Pendientes que el propio sistema declara: tarificación del seguro con Interseguro (decisión 010 cerrada en 2-5%, `SolutionOption` no muestra monto), cortes de las bandas de score (0-39, 40-69, 70-100 provisionales), texto legal de consentimiento, licencia de Geometria y logotipo.

## Fuera del prototipo

Integración bancaria real, emisión real de pólizas, desembolso real de Renta Adelantada, marketplace propio, Housing Graph.

## Antes de escribir código (decidir el primer día del taller)

- Usuario principal y su escena.
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
