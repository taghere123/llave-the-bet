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
| Hogares arrendatarios en Lima Metropolitana hoy | ~700,000 | 520,202 x (1.035)^8 a (1.035)^9 = 685-709 mil, con la tasa de crecimiento intercensal. El equipo fijó 700 mil como cifra única el 30 sept 2026 (antes: rango de 650-700 mil) |

## Datos heredados sin verificar

- Alza interanual del alquiler en Lima de +3.5%: viene del deck original, sin cita verificada.
- Comisión de corretaje en Perú de ~1 mes de renta: práctica de mercado, no regulada. Confirmada en prensa el 29 sept 2026 (ver «Verificaciones del 29 sept 2026»). La cifra de 8-10% que traía una herramienta de IA es práctica española.

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

- D. Leg. 1177 (2015, Régimen de Promoción del Arrendamiento para Vivienda): confirmado como real. Crea el contrato FUA y el registro RAV, con desalojo notarial. Reglamento: D.S. 017-2015-VIVIENDA. Precisión del 29 sept 2026: el D. Leg. 1177 crea un proceso único de desalojo; el desalojo con intervención notarial lo regula la Ley 30933 (2019), ver abajo.
- No se encontró un seguro de impago de alquiler en Rímac, Pacífico ni La Positiva. La "Renta Garantizada" de Rímac es un seguro de vida con ahorro, sin relación con arrendamiento. Un texto generado por IA afirmaba lo contrario y fue corregido.
- Duración del desalojo judicial: 12-24 meses según una fuente, hasta 7 años según otra. Sin reconciliar.
- REDJUM (Ley 30201): registro reactivo de morosos ya sentenciados, no predictivo.

## Verificaciones del 29 sept 2026

Páginas abiertas el 29 sept 2026 para `06-recomendaciones-final.md`. Son hechos observados en la fuente citada, no proyecciones. Las marcadas con (*) se contrastaron dos veces, en el texto oficial o en una segunda lectura.

### Precedentes de renta garantizada

| Jugador | País | Qué se verificó | Fuente |
| --- | --- | --- | --- |
| QuintoAndar | Brasil | Paga la renta al propietario aunque el inquilino no pague; el inquilino alquila sin fiador ni depósito; garantía respaldada por Fairfax | [QuintoAndar](https://sobre.quintoandar.com.br/garantia/) |
| QuintoAndar (*) | Perú | Compró el grupo Navent, dueño de Urbania y Adondevivir (23 dic 2021) | [Gestión](https://gestion.pe/economia/empresas/brasilena-quintoandar-compra-grupo-navent-dueno-de-urbania-y-adondevivir-noticia/) |
| Houm | Chile | «Te pagamos el 5 cada mes», sin aval ni garantía, con aseguradoras de crédito; planes de 7%, 8.7% u 11.5% + IVA | [Houm](https://houm.com/cl), [La Tercera](https://www.latercera.com/pulso/noticia/la-promesa-de-la-mayor-corredora-inmobiliaria-online-de-chile-houm-apunta-a-ganar-dinero-en-2026/SNH3CUP76VDSFGJNKFGSE2XSZA/) |
| Houm | Colombia y México | Colombia dice «garantizamos pagos» sin más detalle; en México sus términos dicen que no garantiza el pago de rentas | [Houm Colombia](https://houm.com/co), [términos México](https://help.houm.com/mx/articles/374/terminos-y-condiciones-houm) |
| Homie | México | «Cobras cada mes, pase lo que pase», pago el 5.º día hábil, solo en 5 alcaldías de CDMX | [Homie](https://homie.mx/marketing/landing/propietarios) |
| Homie (*) | Perú | Opera desde septiembre de 2025 LiveSpace La Mar, multifamily de 141 departamentos en Miraflores (Parque Arauco) | [Diario Financiero](https://www.df.cl/peru/homie-la-proptech-mexicana-que-se-adjudico-el-primer-multifamily-de) |
| CredPago (Loft) | Brasil | Alquiler sin fiador ni caução, cobertura de hasta 40 veces el alquiler | [Loft](https://loft.com.br/credpago) |
| Seguros Bolívar | Colombia | Seguro de arrendamiento que paga los cánones si el inquilino incumple | [Seguros Bolívar](https://www.segurosbolivar.com/seguro-de-arrendamiento) |

Conclusión: la frase «No se encontró un jugador equivalente en Perú ni en Latinoamérica» de `01-propuesta-big-idea.md` es falsa para Latinoamérica. En el Perú no se encontró garantía de renta ni seguro de impago.

### Oferta actual en el Perú

- No se encontró producto de impago de alquiler en Rímac, Pacífico, Mapfre, La Positiva, Interseguro ni Chubb. Búsquedas: «alquiler garantizado Perú», «renta garantizada propietarios Lima», «seguro de alquiler impago Perú», «alquilar sin garantía Perú» y cada aseguradora con «alquiler».
- Avla tiene una página «Seguro de arriendo» bajo /pe/, pero su contenido es chileno y el producto no aparece en su menú de Perú ([Avla](https://www.avla.com/pe/subcategorias/seguro-de-arriendo)).
- Proper (Lima) evalúa inquilinos y cobra 1 mes de renta más 7% + IGV; no garantiza la renta ([Proper](https://landing-rentas.proper.com.pe/)).
- Mi Sentinel vende consultas de crédito de inquilinos ([La República](https://larepublica.pe/nota-de-prensa/2024/11/05/mi-sentinel-protege-tu-inversion-revisando-el-historial-crediticio-de-tus-inquilinos-288210)).
- La carta fianza se usa como garantía de alquiler, a 1.5-5% anual ([TMGI](https://tmgi.com.pe/que-es-una-carta-fianza-y-como-funciona/)).
- (*) La Cámara Inmobiliaria Peruana propuso el 20 ago 2024 un seguro contra inquilinos morosos, con costo estimado de ~10% de la renta mensual según el modelo argentino. Es una propuesta, no un producto ([Gestión](https://gestion.pe/tu-dinero/inmobiliarias/nuevo-seguro-inmobiliario-la-propuesta-de-la-cip-para-asegurar-a-propietarios-de-inquilinos-morosos-camara-inmobiliaria-peruana-noticia/)).

### Regulación

- (*) Ley 30933 (abril 2019), desalojo con intervención notarial. El contrato debe estar en FUA o escritura pública y tener cláusula de allanamiento a futuro, cláusula de sometimiento expreso y el número, tipo y moneda de la cuenta de abono en una empresa supervisada por la SBS. Texto leído en la versión difundida por el [Poder Judicial](https://pj.gob.pe/wps/wcm/connect/1278bc804a555a049e38ffb1377c37fd/LEY+N%C2%B030933.pdf?MOD=AJPERES&CACHEID=1278bc804a555a049e38ffb1377c37fd). Plazo real: sin dato oficial; un experto citado en prensa habla de 8 meses a un año.
- D. Leg. 1177 (julio 2015): FUA, RAV a cargo del Fondo MIVIVIENDA y proceso único de desalojo; la causal de impago es 2 meses consecutivos ([El Peruano](https://busquedas.elperuano.pe/dispositivo/NL/1264951-1)).
- (*) Sandbox de la SBS, régimen de modelos novedosos: Res. SBS 2429-2021 (19 ago 2021, vigente desde el 1 feb 2022), modificada por la Res. SBS 04142-2025 (19 nov 2025). Pilotos de hasta 18 meses, ampliables 12; inicio en máximo 6 meses desde la autorización, prorrogables 6; abierto a personas jurídicas no supervisadas ([Res. 2429-2021](https://intranet2.sbs.gob.pe/dv_int_cn/2112/v1.0/Adjuntos/2429-2021.doc.pdf), [Res. 04142-2025](https://intranet2.sbs.gob.pe/dv_int_cn/2540/v1.0/Adjuntos/Res.%204142-2025.doc), [El Peruano, 20 ene 2026](https://www.elperuano.pe/noticia/287566-suplemento-legal-juridica-el-sandbox-sbs-abre-puertas-a-mas-empresas-y-proyectos-informate-aqui)).
- (*) Tope del BCRP para créditos de consumo (Ley 31143): 114.13% de TEA en soles desde el 1 may 2026, para el periodo mayo-octubre 2026; se actualiza el 1 nov 2026. El Ejecutivo pidió facultades para retirar los topes, pendiente en el Congreso ([serie del BCRP](https://estadisticas.bcrp.gob.pe/estadisticas/series/diarias/resultados/PD38590DD/html), [La República](https://larepublica.pe/economia/2026/09/28/tope-de-tasas-de-interes-plantean-cambiar-la-formula-en-lugar-de-eliminar-el-limite-hnews-1011920)).

### Corretaje

- 1 mes de renta es práctica de mercado, no norma: lo dice un agente citado por [La República](https://larepublica.pe/sociedad/2022/09/06/dia-del-agente-inmobiliario-cuanto-gana-un-agente-inmobiliario-en-el-peru-en-promedio-ministerio-de-vivienda-sector-inmobiliario-atmp) y es la tarifa publicada de [Proper](https://proper.com.pe/rentas/).

## Validación con usuarios

No existe. Solo hay observación del equipo en su trabajo de ventas digitales y conversaciones informales. Nadie debe presentarlas como entrevistas ni investigación formal. Ver `mvp/README.md` para el plan de validación.
