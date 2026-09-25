# Mercado, cifras y fuentes

Regla del repo: ninguna cifra de "proyectado" se presenta como resultado observado. Las cifras de herramientas de IA del taller tuvieron alucinaciones en el pasado (ver `02-handoff.md`, sección de verificaciones). Antes de reemplazar cualquier cifra, verificar la fuente.

## Datos observados (INEI)

| Métrica | Valor | Fuente |
| --- | --- | --- |
| Viviendas particulares con ocupantes presentes (nacional) | 7,698,900 | Censo 2017, INEI |
| Viviendas en alquiler (nacional) | 1,256,520 (16.3%) | Censo 2017, INEI |
| Viviendas en alquiler (Provincia de Lima) | 520,202 (23.9% del parque de Lima; 41.4% del total nacional) | Censo 2017, INEI, Cuadro 1.23 |
| Viviendas totales en Perú | 13.8 millones | Censo 2025, INEI (preliminar) |
| Habitantes en Lima Metropolitana | 9.6 millones | Censo 2025, INEI (preliminar) |
| Tamaño promedio del hogar | ~3.8 personas | Cálculo propio: 31,237,385 hab. / 8,252,284 hogares (Censo 2017) |

## Estimaciones (cálculo propio, no cifra oficial)

| Métrica | Valor | Cómo se calculó |
| --- | --- | --- |
| Personas viviendo en alquiler (nacional) | ~4.8 millones | 1,256,520 viviendas x 3.8 |
| Hogares arrendatarios en Lima Metropolitana hoy | ~650,000-700,000 | 520,202 x (1.035)^8, con la tasa de crecimiento intercensal |

## Datos heredados sin verificar

- Alza interanual del alquiler en Lima de +3.5%: viene del deck original, sin cita verificada.
- Comisión de corretaje en Perú de ~1 mes de renta: práctica de mercado según fuentes secundarias, no regulada. La cifra de 8-10% que traía una herramienta de IA es práctica española.

## Proyecciones de negocio (preliminares, sin validación actuarial)

| Métrica | Valor | Origen |
| --- | --- | --- |
| Ingresos año 1 (solo RentScore Seguro) | S/1.5M - S/3M | Cálculo propio, corrigiendo la cifra original de la herramienta (US$18M) |
| Ingresos año 3 (solo RentScore Seguro) | S/15M - S/25M | Ídem |
| Ingresos de Cobro Garantizado y Renta Adelantada | Sin cifra | Decisión explícita: no poner número sin sustento actuarial. Los precios sí están fijados por el equipo (decisiones 012 y 016), sin sustento actuarial |
| Penetración aseguradora MIPYME inmobiliario | menos de 5% a 30% en 3 años | Herramienta de IA, no verificado |
| Churn de propietarios | 35% a 10% | Herramienta de IA, no verificado |
| Siniestralidad vs. seguro tradicional | 40% menos impagos | Herramienta de IA, no verificado |
| Market share por etapa | 1-2% año 1, 5-8% año 3, 15-20% visión madura | Marco de planificación propio, tomando como referencia al líder del mercado español; no auditado |
| Costo de tecnología y operaciones | US$400-500K | Herramienta de IA, no verificado, sin aprobación conocida |

Inconsistencia abierta: la cifra de S/8-12 millones anuales con 15,000 pólizas (Big Idea) no cuadra con S/1.5-3M año 1 (handoff). Son horizontes distintos, pero hay que aclararlo antes de presentar. Ver `decisions/011-moneda-y-cifras.md`.

## Verificaciones ya hechas

- D. Leg. 1177 (2015, Régimen de Promoción del Arrendamiento para Vivienda): confirmado como real. Crea el contrato FUA y el registro RAV, con desalojo notarial. Reglamento: D.S. 017-2015-VIVIENDA.
- No se encontró un seguro de impago de alquiler en Rímac, Pacífico ni La Positiva. La "Renta Garantizada" de Rímac es un seguro de vida con ahorro, sin relación con arrendamiento. Un texto generado por IA afirmaba lo contrario y fue corregido.
- Duración del desalojo judicial: 12-24 meses según una fuente, hasta 7 años según otra. Sin reconciliar.
- REDJUM (Ley 30201): registro reactivo de morosos ya sentenciados, no predictivo.

## Validación con usuarios

No existe. Solo hay observación del equipo en su trabajo de ventas digitales y conversaciones informales. Nadie debe presentarlas como entrevistas ni investigación formal. Ver `mvp/README.md` para el plan de validación.
