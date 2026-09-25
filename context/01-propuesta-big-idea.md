# Big Idea: RentScore Seguro + Renta Garantizada

Fuente: `originals/LLAVE_BigIdea_RentaGarantizada.docx` (Taller 2, 14 sept 2026). Este archivo es la versión en markdown para trabajo en equipo.

> Aviso: el precio del seguro aquí aparece como 2-5% de la renta. Otra versión del equipo usa monto fijo (S/15-100 al mes). Ver `decisions/010-precio-seguro.md`. No citar ninguna de las dos como definitiva hasta cerrar esa decisión.

## Descripción corta

Plataforma que evalúa al inquilino con datos bancarios reales y lo vincula a un seguro de impago mensual que reemplaza el depósito tradicional. Además, el propietario puede elegir que Interbank le pague la renta cada mes de forma garantizada, o incluso se la adelante por trimestre, semestre, año o el contrato completo.

## Por qué es Box 3 (Crear el Futuro)

RentScore Seguro solo es un seguro con mejor tarificación. Lo que lo vuelve Box 3 es Cobro Garantizado y Renta Adelantada: Interbank pasa de banco donde el propietario tiene cuenta a garante activo del flujo de alquiler, una relación que hoy no existe entre ningún banco peruano y el mercado de arrendamiento. Es un modelo de negocio distinto, con su propia lógica de riesgo, balance y métricas.

## Problema y ajuste solución-problema

El propietario limeño decide por intuición y con papeles falseables, sin protección real ante impagos que tardan más de un año en resolverse legalmente. RentScore Seguro integra evaluación objetiva y cobertura de impago pagada por el inquilino. Con la capa de Renta Garantizada, el pago ya no depende de que un inquilino específico transfiera a tiempo, sino de un compromiso directo de Interbank.

## Cómo funciona

1. El propietario publica su inmueble o ingresa datos básicos.
2. El candidato autoriza la consulta de sus datos bancarios y financieros vía Interbank.
3. En 48 horas RentScore entrega un reporte: score de solvencia (0-100), cuota segura recomendada y comparativa con el mercado.
4. Si el propietario acepta, Interseguro emite una póliza de alquiler con prima mensual pagada por el inquilino. Cubre impago hasta 6 meses de renta, daños y responsabilidad civil, y reemplaza el depósito de dos meses.
5. El propietario elige cómo cobrar: estándar, Cobro Garantizado o Renta Adelantada.
6. El inquilino mejora su score con cada pago puntual y construye historial para un futuro crédito hipotecario con Interbank.

## Arquitectura de 4 niveles

| Nivel | Qué recibe el propietario | Qué asume Interbank | Comisión (referencial) |
| --- | --- | --- | --- |
| 0. RentScore | Evaluación objetiva del candidato antes de firmar | Ninguno, es el punto de entrada | Gratuito |
| 1. RentScore Seguro | Cobertura de impago (hasta 6 meses), daños y responsabilidad civil. Siniestro pagado en 15 días hábiles | Riesgo transferido a Interseguro vía póliza | Prima pagada por el inquilino (ver decisión 010) |
| 2. Cobro Garantizado | Renta depositada cada mes en fecha fija, haya pagado o no el inquilino | Gestión de cobro directo; riesgo de timing y morosidad de corto plazo | Adicional sobre la prima base, a validar con Riesgos |
| 3. Renta Adelantada | Un desembolso único por trimestre, semestre, año o contrato completo | Factoriza el flujo futuro; asume riesgo y costo de capital | Creciente según plazo |

## Impacto en el negocio (todo proyectado, nada observado)

- Evaluación de inquilino de 30 días a 48 horas.
- Penetración aseguradora en MIPYME inmobiliario: menos de 5% hoy, objetivo 30% en 3 años.
- Primas recurrentes estimadas en S/8-12 millones anuales con 15,000 pólizas activas (nivel 1). Cifra de la herramienta de IA del taller, no verificada. El handoff tiene una proyección propia más conservadora, ver `03-mercado-y-fuentes.md`.
- Ingresos de niveles 2 y 3: pendientes de modelar con Riesgos y Finanzas. No hay cifra a propósito.
- Siniestralidad proyectada 40% menor que un seguro tradicional (no verificado).
- Churn de propietarios de 35% a 10% (no verificado).
- Datos de comportamiento de inquilinos como activo para scoring y crédito hipotecario.

## Impacto social

- Acceso a vivienda sin depósito de 2 meses.
- Formalización del mercado de alquiler.
- Score transparente frente a sesgos del propietario.
- Historial digital reutilizable para otros productos financieros.
- Menos litigios de alquiler.
- Liquidez inmediata con Renta Adelantada, sin recurrir a créditos de consumo más caros.

## Precedente global

"Rental advance" o "guaranteed rent" es una categoría fintech activa fuera del Perú:

- Rent2Cash (Italia, 2023): adelanta hasta 36-48 meses de renta. Ronda de EUR 100 millones en 2026 vía titulización.
- Nomad (EE.UU.): marketplace de renta garantizada para pequeños propietarios. US$20 millones liderados por Silicon Valley Bank Capital.
- Factored / Wectory (Reino Unido): adelantan renta estructurada como cesión de derechos de cobro (factoring), no como préstamo.
- TheGuarantors (EE.UU.): cobertura de renta con IA para calificar inquilinos.

No se encontró un jugador equivalente en Perú ni en Latinoamérica. Esa búsqueda no fue exhaustiva.

## Riesgos y regulación (niveles 2 y 3)

- Capital y provisiones (SBS): un adelanto de renta podría tratarse como operación crediticia, con provisiones y capital regulatorio.
- Estructura como cesión de cobro y no préstamo: es el camino que usa Wectory en Reino Unido. No hay garantía de que la SBS lo trate igual. Hay que consultarlo con Legal.
- Concentración: adelantar contratos completos concentra exposición en inquilinos sin historial de mora maduro.
- Secuencia recomendada: validar nivel 1 en el piloto de 90 días, activar nivel 2 cuando el score tenga historial suficiente para descartar selección adversa, e introducir nivel 3 solo después de que Riesgos y Legal definan pricing y estructura legal. El nivel 3 es la evolución a 2-3 años, no parte del MVP.

## Ventaja competitiva

Datos exclusivos de Interbank para scoring, capacidad de balance para garantizar y adelantar flujos, y la relación de cuenta que ya tiene el propietario. Escalable a Arequipa y Trujillo. Requiere acuerdos entre Riesgos, Legal y Finanzas de Interbank e Interseguro, y validación SBS antes de escalar los niveles 2 y 3.

## Rol de la IA generativa (diseño, no implementado)

- Clasificar siniestros a partir de contratos e incidencias.
- Generar recomendaciones de cobro y personalizar comunicaciones.
- Niveles 2 y 3: sugerir comisión por plazo según perfil de riesgo del inquilino, historial del propietario y tipo de propiedad. Siempre como recomendación revisable por Riesgos, nunca decisión automática.
