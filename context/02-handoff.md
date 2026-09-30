# Handoff del proyecto (resumen estructurado)

Fuente: `originals/LLAVE_Project_Handoff.md.pdf`, generado el 24 sept 2026 a partir del trabajo completo del equipo con un asistente de IA. Este archivo lo condensa. Si algo aquí contradice el PDF, manda el PDF hasta revisarlo.

Convención del handoff: distingue hecho documentado, decisión, hipótesis e inferencia. "No documentado" significa que no hay evidencia, no que sea falso.

## Estado en una línea

No existe código ni producto. Existen un pitch deck de 12-13 láminas, el documento Big Idea, un brief ejecutivo de 2 páginas y los resultados de las herramientas de ideación de Amazon Quick. El equipo fue confirmado el 24 sept para continuar. El prototipo navegable se construye en el taller del 29-30 sept.

## Cliente y problema

- Cliente primario: propietario de 1-2 inmuebles en alquiler en Lima Metropolitana, 35-60 años, muchos ya clientes de Interbank que cobran el alquiler fuera del banco.
- Cliente secundario: el inquilino, beneficiario indirecto y futuro cliente de crédito hipotecario.
- Dolor: decide sin información objetiva, la garantía de 1-2 meses no cubre impagos prolongados, el desalojo es lento, y el inquilino que paga puntual no construye historial.
- Origen de la observación: el trabajo de ventas digitales en Interseguro. El dolor no llega como solicitud de seguro.

## Cambios de alcance

| Antes | Ahora | Por qué |
| --- | --- | --- |
| Marketplace inmobiliario propio | Apalancar el portal de Interbank o una alianza | Feedback externo: construir marketplace es el mayor riesgo de ejecución |
| MVP amplio de 0-6 meses | MVP de 90 días con una sola hipótesis | La rúbrica exige factibilidad en 90 días |
| Seguro como impago que reemplaza el depósito | Seguro de hogar (daños) pagado por el inquilino, 2-5% de la renta | Corrección del equipo del 25 sept 2026. Ver decisiones 003 y 010 |
| Sin niveles 2 y 3 | Cobro Garantizado y Renta Adelantada | Sesión posterior. Desde el 25 sept 2026 ambos entran al MVP (012 y 016) |

## Mecanismo del seguro (actualizado el 25 sept 2026, sujeto a Interseguro)

- Seguro de hogar que contrata y paga el inquilino. El propietario es el beneficiario. Cubre daños al inmueble y responsabilidad civil.
- Prima de 2-5% de la renta (decisión 010).
- No reemplaza la garantía de dos meses y no cubre impago. El impago lo cubre Cobro Garantizado (decisión 012).
- Descartado: la prima fija de S/15-100 con devolución de ahorro (umbrales de S/2,000, S/4,000 y S/10,000) que proponía la sesión anterior.

## Cobro Garantizado (decisión 012, 25 sept 2026)

- Interbank deposita la renta cada mes, haya pagado o no el inquilino, y asume el impago.
- Cobra una comisión mensual sobre la renta que cubre el impago de todos los inquilinos del programa: 3% con score alto, 5% con score medio. Sin sustento actuarial.
- No está disponible con score bajo. Falta aprobación de Riesgos y revisión SBS.

## Renta Adelantada (decisión 016, 25 sept 2026)

- Entra al MVP. El propietario recibe por adelantado la renta de un contrato de 1 año, menos una comisión: 15% con score alto, 25% con medio. No disponible con score bajo.
- Modelo de los niveles 2 y 3: Interbank evalúa al inquilino y da un préstamo de consumo a tasa cero; la comisión es la tasa de interés implícita. Reemplaza la idea de cesión de cobro (factoring).
- Tasa implícita calculada: TEA de 36-44% con score alto y 74-95% con medio. Pendiente con Legal: transparencia (TCEA) y topes de tasa.

## Autorización del inquilino (decisión 015)

El inquilino autoriza que el propietario vea su RentScore al postular. El propietario no lo solicita.

## Hipótesis central del MVP

El propietario paga por la garantía de cobro (RentScore + Cobro Garantizado o Renta Adelantada) más de lo que paga hoy por publicar su inmueble.

## Qué está validado y qué no

| Elemento | Estado |
| --- | --- |
| Tamaño del mercado de alquiler en Lima | Validado (INEI) |
| El problema existe | Parcialmente: prensa peruana y existencia de REDJUM. Sin entrevistas formales |
| El propietario pagaría comisión por Cobro Garantizado | No validado. Es la hipótesis del MVP |
| El inquilino acepta pagar la prima mensual del seguro de hogar además del depósito | No validado |
| Propietarios adoptan Cobro Garantizado con comisión real | No validado. El infográfico original solo medía un formulario de interés |
| Renta Adelantada viable en Perú | No validado. Se define como préstamo de consumo a tasa cero (016); falta Legal y SBS |
| El modelo existe en otros mercados | Validado con casos externos |

## Evolución del proyecto (hitos)

1. Pitch deck inicial de 11 láminas, luego reescrito para cumplir la rúbrica de 90 días.
2. Incorporación de feedback externo: no construir marketplace, enfocarse en el dolor del pago, pensar como plataforma financiera desde el día 1.
3. Working Backwards (14 sept): cliente, problema raíz, solución, escena de cliente y métricas.
4. Verificaciones de mercado: INEI, prensa, D. Leg. 1177, precedentes globales.
5. Revisión crítica de documentos de la herramienta de IA: se corrigieron alucinaciones y errores.
6. Crazy8 y priorización: 8 ideas reducidas a 4 (RentScore+Seguro, Cobro Garantizado, Depósito en Custodia, Score Híbrido con REDJUM).
7. Aplicación de Box 3: RentScore+Seguro y Cobro Garantizado son Box 3; Depósito en Custodia es Box 1 disfrazado; REDJUM es habilitador.
8. Big Idea final entregado; el 24 sept el equipo avanza de etapa.
9. Revisión crítica del infográfico de MVP original: dedicaba el esfuerzo a un marketplace, reducía Cobro Garantizado a un formulario y omitía el seguro. Se generó una versión ajustada.

## Errores encontrados en el contenido generado por IA (ya corregidos salvo indicación)

1. Afirmó que Rímac, Pacífico y La Positiva ya ofrecen seguro de alquiler. Falso.
2. Presentó una comisión de corretaje de 8-10% como peruana. Es práctica española.
3. Inconsistencia de ~12x entre US$18M de ingresos y US$180 por propietario. Corregida a S/1.5-3M año 1.
4. Regeneración que revirtió el modelo de precio a porcentaje pagado por el propietario. Corregida solo en el texto sugerido; no se verificó en la herramienta.
5. Exclusión de candidatos sin cuenta bancaria, que contradice el Score Híbrido con REDJUM. Corregida en el texto sugerido.

## Componentes y estado

| Componente | Estado |
| --- | --- |
| Pitch deck, Big Idea, brief de MVP | Terminados como documentos |
| RentScore (motor de scoring) | No implementado. Se piensa como scorecard de reglas en el MVP |
| Póliza RentScore Seguro | No implementada |
| Cuenta Arrendador | No implementada. Se reutilizaría el producto existente |
| Cobro Garantizado, Renta Adelantada | No implementados. Ambos dentro del MVP |
| Portal o integración con marketplace | No implementado. Sin socio definido |
| Validación con propietarios | Pendiente |
| Tarificación con Interseguro | Pendiente |
| Validación regulatoria SBS | Pendiente |

## Riesgos principales

- No hay modelo de scoring construido ni validado. Es el corazón del producto.
- Sin diseño técnico de la integración con datos bancarios de Interbank.
- Selección adversa si el seguro se lanza con un score inmaduro.
- El inquilino puede negarse a autorizar acceso a sus datos bancarios.
- Discriminación algorítmica en el scoring y manejo de datos sensibles de terceros.
- SBS: el adelanto de renta podría requerir capital y provisiones como crédito.
- Calendario: pocos días entre el handoff y el taller obligatorio.
- Credibilidad ante el jurado si se detectan las contradicciones abiertas.

## Preguntas abiertas para el equipo

1. ~~Precio del seguro~~. Cerrada: 2-5% de la renta. Ver `decisions/010`.
2. Moneda de las cifras. Ver `decisions/011`.
3. ~~Cobro Garantizado con comisión real~~. Cerrada: sí, 3% score alto y 5% medio. Ver `decisions/012`. Renta Adelantada también entra, ver `decisions/016`.
4. Composición del jurado por etapa.
5. Número de equipo (22 o 23).
6. Portal específico: propio de Interbank o alianza externa. Conversación pendiente con Growth y Victoria.
7. Trabajo previo de scoring bancario reutilizable en Interbank (Diego Herrera o Riesgos).
8. Presupuesto y recursos reales para el prototipo y las fases posteriores.
9. Validación formal con propietarios: si se hizo o se hará.

## Qué no cambiar sin entender primero

- No construir marketplace propio.
- RentScore y Seguro van juntos.
- El seguro no reemplaza el depósito ni cubre impago.
- El MVP cabe en 90 días. *(Nota del 30 sept 2026: el piloto pasó a 30 días, decisión 026.)*
- No reemplazar cifras INEI sin verificar la fuente.
