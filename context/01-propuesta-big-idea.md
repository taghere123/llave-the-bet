# Big Idea: RentScore Seguro + Renta Garantizada

Fuente: `originals/LLAVE_BigIdea_RentaGarantizada.docx` (Taller 2, 14 sept 2026). Este archivo es la versión en markdown para trabajo en equipo.

> Actualizado el 25 sept 2026 con correcciones del equipo. El docx original no se modificó y en esos puntos ya no coincide. Cambios: (1) el seguro es de hogar y protege de daños; no reemplaza el depósito ni cubre impago (`decisions/003`); (2) prima de 2-5% de la renta (`decisions/010`); (3) Cobro Garantizado cubre el impago, con comisión de 3% (score alto) o 5% (medio) y solo para score medio o alto (`decisions/012`); (4) el inquilino autoriza al postular (`decisions/015`); (5) Renta Adelantada entra al MVP, solo contratos de 1 año, con comisión de 15% (alto) o 25% (medio), y los niveles 2 y 3 son un préstamo de consumo a tasa cero, no factoring (`decisions/016`).

> Actualizado el 29 sept 2026: la sección «Precedente global» corrige la afirmación sobre Latinoamérica (ver `03-mercado-y-fuentes.md`). El texto original se conserva por trazabilidad.

> Actualizado el 30 sept 2026: el piloto dura 30 días (`decisions/026`), se integra el caso financiero a cinco años del modelo del equipo (`decisions/011`) y el mercado es de 700 mil hogares arrendatarios en Lima Metropolitana (`03-mercado-y-fuentes.md`). Las cifras de impacto de la herramienta de IA quedan reemplazadas por el modelo.

## Descripción corta

Plataforma que evalúa al inquilino con datos bancarios reales y lo vincula a un seguro de hogar mensual que protege el inmueble de daños. Además, el propietario puede elegir que Interbank le pague la renta cada mes de forma garantizada (Interbank asume el impago), o incluso le adelante la renta de un contrato de un año.

## Por qué es Box 3 (Crear el Futuro)

RentScore Seguro solo es un seguro con mejor tarificación. Lo que lo vuelve Box 3 es Cobro Garantizado y Renta Adelantada: Interbank pasa de banco donde el propietario tiene cuenta a garante activo del flujo de alquiler, una relación que hoy no existe entre ningún banco peruano y el mercado de arrendamiento. Es un modelo de negocio distinto, con su propia lógica de riesgo, balance y métricas.

## Problema y ajuste solución-problema

El propietario limeño decide por intuición y con papeles falseables, sin protección real ante impagos que tardan más de un año en resolverse legalmente. RentScore Seguro integra evaluación objetiva y un seguro de hogar contra daños, pagado por el inquilino. Con la capa de Cobro Garantizado, el pago ya no depende de que un inquilino específico transfiera a tiempo, sino de un compromiso directo de Interbank.

## Cómo funciona

1. El propietario publica su inmueble o ingresa datos básicos.
2. Para postular, el candidato autoriza que el propietario vea su RentScore, calculado con sus datos bancarios y financieros vía Interbank.
3. En 48 horas RentScore entrega un reporte: score de solvencia (0-100), cuota segura recomendada y comparativa con el mercado.
4. Si el propietario acepta, Interseguro emite un seguro de hogar con prima mensual pagada por el inquilino. Cubre daños al inmueble y responsabilidad civil. No reemplaza el depósito ni cubre impago.
5. El propietario elige cómo cobrar: estándar, Cobro Garantizado o Renta Adelantada. Las dos últimas, solo si el inquilino tiene score medio o alto.
6. El inquilino mejora su score con cada pago puntual y construye historial para un futuro crédito hipotecario con Interbank.

## Arquitectura de 4 niveles

| Nivel | Qué recibe el propietario | Qué asume Interbank | Comisión (referencial) |
| --- | --- | --- | --- |
| 0. RentScore | Evaluación objetiva del candidato antes de firmar | Ninguno, es el punto de entrada | Gratuito |
| 1. RentScore Seguro | Seguro de hogar: cobertura de daños al inmueble y responsabilidad civil. No cubre impago. Siniestro pagado en 15 días hábiles | Riesgo transferido a Interseguro vía póliza | Prima pagada por el inquilino: 2-5% de la renta (decisión 010) |
| 2. Cobro Garantizado | Renta depositada cada mes en fecha fija, haya pagado o no el inquilino. Solo inquilinos con score medio o alto | Impago de todos los inquilinos del programa, más riesgo de timing. Préstamo de consumo a tasa cero | Comisión mensual sobre la renta pagada por el propietario: 3% con score alto, 5% con medio (decisión 012; sin sustento actuarial) |
| 3. Renta Adelantada | Un desembolso único con la renta de un contrato de 1 año. Solo inquilinos con score medio o alto | Préstamo de consumo a tasa cero: asume impago y costo de capital | Comisión sobre la renta del año: 15% con score alto, 25% con medio (decisión 016; sin sustento actuarial) |

## Impacto en el negocio (todo proyectado, nada observado)

- Evaluación de inquilino de 30 días a 48 horas.
- Penetración aseguradora en MIPYME inmobiliario: menos de 5% hoy, objetivo 30% en 3 años.
- Primas del seguro de hogar: S/12.7M en el año 5 del caso base, sobre los contratos con Cobro Garantizado o Renta Adelantada. Reemplaza la cifra de S/8-12M con 15,000 pólizas de la herramienta de IA del taller.
- Ingresos financieros de Cobro Garantizado y Renta Adelantada: S/16.7M en el año 5 del caso base, sobre un saldo medio colocado de S/75.0M. Precios del equipo, sin sustento actuarial.
- Siniestralidad proyectada 40% menor que un seguro tradicional (no verificado).
- Churn de propietarios de 35% a 10% (no verificado).
- Datos de comportamiento de inquilinos como activo para scoring y crédito hipotecario.

## Caso financiero a cinco años (proyección)

Modelo financiero del equipo (`decisions/011`), sin validación actuarial ni de Riesgos. Cuenta solo los contratos con Cobro Garantizado o Renta Adelantada, también para las primas del seguro. Mercado: 700 mil hogares arrendatarios en Lima Metropolitana hoy, +3.5% anual. Los dos escenarios comparten precio, riesgo y costos; solo cambia la penetración de hogares al año 5.

| Año 5 | Conservador | Base |
| --- | --- | --- |
| Penetración de hogares | 5% | 10% |
| Contratos con Cobro Garantizado o Renta Adelantada | 5.9 mil | 13.3 mil |
| Saldo medio colocado | S/33.4M | S/75.0M |
| Ingresos brutos | S/13.1M | S/29.4M |
| BAI | S/3.4M | S/8.9M |
| BAI acumulado en 5 años | S/4.3M | S/19.1M |
| Primer año con BAI positivo | Año 3 | Año 2 |

El 46% del margen bruto viene del seguro, que no consume activo. El ROA solo crédito (BAI del crédito sobre saldo) es de 5.3% a 6.2%.

## Impacto social

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

> **Corrección del 29 sept 2026:** la afirmación sobre Latinoamérica es falsa. QuintoAndar (Brasil), Houm (Chile), Homie (México) y el seguro de arrendamiento en Colombia ya garantizan rentas o cubren el impago. En el Perú no se encontró un jugador equivalente. Fuentes en `03-mercado-y-fuentes.md`.

## Riesgos y regulación (niveles 2 y 3)

- Capital y provisiones (SBS): un adelanto de renta podría tratarse como operación crediticia, con provisiones y capital regulatorio.
- Estructura: el equipo descartó la cesión de cobro (el camino de Wectory en Reino Unido) y definió los niveles 2 y 3 como préstamo de consumo a tasa cero, con la comisión como interés implícito (decisión 016). Legal debe revisar transparencia (TCEA) y topes de tasa: la TEA implícita calculada es 36-44% con score alto y 74-95% con medio.
- Concentración: adelantar contratos completos concentra exposición en inquilinos sin historial de mora maduro.
- Secuencia: la recomendación original era activar el nivel 2 cuando el score tuviera historial suficiente para descartar selección adversa. El equipo decidió probarlo en el piloto de 30 días, solo con score medio o alto (decisión 012). El nivel 3 también entra al piloto, solo con contratos de 1 año (decisión 016).

## Ventaja competitiva

Datos exclusivos de Interbank para scoring, capacidad de balance para garantizar y adelantar flujos, y la relación de cuenta que ya tiene el propietario. Escalable a Arequipa y Trujillo. Requiere acuerdos entre Riesgos, Legal y Finanzas de Interbank e Interseguro, y validación SBS antes de escalar los niveles 2 y 3.

## Rol de la IA generativa (diseño, no implementado)

- Clasificar siniestros a partir de contratos e incidencias.
- Generar recomendaciones de cobro y personalizar comunicaciones.
- Niveles 2 y 3: sugerir comisión por plazo según perfil de riesgo del inquilino, historial del propietario y tipo de propiedad. Siempre como recomendación revisable por Riesgos, nunca decisión automática.
