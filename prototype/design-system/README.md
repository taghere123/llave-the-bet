# LLAVE

Hogares que abren oportunidades. Sistema de diseño base para el MVP de LLAVE (The Bet, equipo 22): el propietario publica su inmueble, recibe postulantes, ve el RentScore, y elige una solución financiera.

## De dónde sale

Se midió en vivo el portal Zona Hipotecaria de Interbank (micasapropia.interbank.pe/proyectos-inmobiliarios/) el 25 de septiembre de 2026: colores, tipografía, radios, sombras, medidas y patrones de componentes. Cada token dice en su nota si fue **Medido** en el portal, **Estimado** de captura, **Ajustado** o **Propuesto**. Solo se revisó esa página; los flujos de simulador, solicitud de crédito y el chat de evaluación no se revisaron. El logotipo de Interbank no está incluido: hay que pedirlo al equipo de marca.

## Fundamentos de contenido

Español de Perú, tuteo, frases cortas y verbos de acción. El portal habla con calidez y sin jerga: "Conócelo", "Déjanos tus datos", "Premiamos tu esfuerzo ahorrador", "Paga tu departamento hasta en 30 años". LLAVE conserva ese tono y suma claridad sobre el dinero y los datos.

- Titulares cortos y en oración: "Encuentra tu inmueble ideal", no "ENCUENTRA TU INMUEBLE IDEAL".
- Botones con verbo: "Ver RentScore", "Publicar inmueble", "Autorizar y continuar".
- Montos siempre en soles: `S/2,400` (sin espacio tras S/, coma de miles). Nunca dólares en pantalla.
- Mayúsculas solo en etiquetas cortas (`label-caps`): ESTADO, FINANCIADO POR, RENTA MENSUAL.
- Lo que no está definido se dice: "referencial", "por definir". No se inventan cifras ni tasas.

## Fundamentos visuales

**Color.** Blanco y ink dominan. Azul (`azul-900`, `azul-600`) da estructura; verde (`action`) marca la acción principal; amarillo, celeste y magenta identifican estados. Un solo botón primario por vista.

**Tipografía.** Display en Geometria (licenciada) con Montserrat como respaldo, cuerpo en Montserrat. Titulares de sección en peso 300 con tracking cerrado; nombres y montos en 500 y 600; botones y etiquetas en 700. Geometria no está en Google Fonts: si el equipo la tiene, se carga como archivo en `fonts/`; si no, Montserrat cubre.

**Forma firma.** Tarjetas y tiles redondean dos esquinas opuestas a `radius-signature` (28px) y dejan las otras dos rectas: `border-radius: var(--radius-signature) 0`. Es lo más reconocible del portal; usarla en tarjetas, no en botones. Botones: `radius-sm` (3px) en formulario, `radius-pill` (20px) en el CTA de cabecera.

**Profundidad.** Sombra solo en la cabecera (`shadow-header`) y, suave, en tarjetas (`shadow-card`). Bordes de 1px en `border` para separar tarjetas.

**Fotografía.** Personas y familias reales, cálidas, con luz natural; se recortan con la forma firma. En el héroe llevan un overlay oscuro para sostener texto blanco.

**Layout.** Contenido de 896px (`size-container`), cuadrículas de 2 a 3 columnas, aire de 48 a 64px entre secciones, gutter móvil de 16px.

## Iconografía

El portal usa trazos finos y simples: documento con esquina doblada en el CTA, flecha dentro de círculo en la banda, chevron pequeño tras los enlaces, cruz para cerrar. No hay librería de iconos publicada: en el MVP usar trazo de 2px, esquinas suaves, color heredado del texto, y no usar emojis. Los iconos se dibujan en `currentColor`.

## Accesibilidad: dónde se corrige el portal

| Par en el portal | Contraste | Qué usa LLAVE |
| --- | --- | --- |
| Texto blanco sobre `green-500` | 2.5:1 | `on-action` sobre `action`: 5.5:1 (claro) y 7.2:1 (oscuro) |
| Enlaces en `green-500` sobre blanco | 2.5:1 | `action` (green-700): 5.5:1 |
| Texto blanco sobre `yellow-400` | 1.5:1 | Texto `ink`: 11.9:1 |
| Texto blanco sobre `sky-300` | 1.9:1 | Texto `ink`: 9.3:1 |
| Texto blanco pequeño sobre `magenta-500` | 3.9:1 | `magenta-700`: 6.0:1; sobre `magenta-500` solo texto de 24px o más |
| `gray-500` como texto | 3.4:1 | `text-muted`: 6.1:1 |

El tema oscuro no existe en el portal: es una propuesta para uso en pantallas de gestión, con valores validados a 4.5:1 o más en texto.

## Cómo se usa en LLAVE

| Paso del MVP | Componentes |
| --- | --- |
| Propietario publica inmueble | NavHeader, Button, PropertyCard |
| Recibe postulante | PropertyCard, StatusBadge |
| Postulante autoriza al postular que se vea su score | ConsentBlock, Button |
| Visualiza el score | RentScoreCard, StatusBadge |
| Explora solución financiera o deja interés | SolutionOption, CtaBanner, Button |

## Pendiente de definir

- Modelo de precio del seguro (prima fija en soles o porcentaje de la renta): `SolutionOption` no muestra monto hasta que Interseguro lo cierre.
- Cortes de las bandas de score (hoy 0-39, 40-69, 70-100, provisionales) con Riesgos.
- Texto legal de consentimiento con Legal.
- Licencia de Geometria y logotipo de la marca, con el equipo de marca de Interbank.
- Pantallas de tabla, formulario largo y estados vacíos: aún no hay componentes; se diseñan en el taller de prototipado.
