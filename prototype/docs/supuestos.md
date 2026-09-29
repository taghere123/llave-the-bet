# Supuestos del prototipo

Todo lo que aparece en pantalla con la etiqueta **SUPUESTO** está aquí. Nada de esto es hecho observado ni cierra una decisión de `decisions/`. Fecha: 25 sept 2026.

## Elecciones del equipo para el mockup (no cierran decisiones abiertas)

| Tema | Qué muestra el prototipo | Decisión que sigue abierta |
| --- | --- | --- |
| Qué paga el propietario | Nada en niveles 0 y 1. Solo paga comisión si activa Cobro Garantizado o Renta Adelantada | 004, 012 y 016 |
| Precio del seguro | 2% a 5% de la renta, pagado por el inquilino | 010, cerrada. El escalonamiento por banda es supuesto del prototipo; falta tarificar con Interseguro |
| Cobro Garantizado | Comisión mensual: 3% de la renta con score alto, 5% con medio. Interbank asume el impago. No disponible con score bajo. El propietario la "activa" | 012, cerrada. Cifras del equipo, sin sustento actuarial ni aprobación de Riesgos |
| Renta Adelantada | Desembolso único con la renta de 12 meses, menos 15% (score alto) o 25% (medio). No disponible con score bajo. Se asume que todo contrato es de 1 año | 016, tomada. Cifras del equipo, sin sustento actuarial. Préstamo de consumo a tasa cero: falta Legal (transparencia, topes de tasa) y SBS |
| Autorización del RentScore | El postulante la da al postular, desde el inicio. La propietaria no la solicita: ve el score de cada postulante | 015, tomada el 25 sept 2026 |
| Qué es el seguro | Seguro de hogar que contrata y paga el inquilino para proteger el inmueble de daños. No reemplaza la garantía y no cubre impago | 003, corregida el 25 sept 2026. Cobertura y monto asegurado por definir con Interseguro |
| Portal | Estética del portal Zona Hipotecaria de Interbank, marca LLAVE provisional, sin logotipo de Interbank | 013 |
| Marketplace | LLAVE tiene marketplace propio con flujo de inquilino y entra al piloto | 017, tomada el 29 sept 2026 |
| Registro del inquilino | Lead form: nombre, apellido, DNI, email, celular, más un código de verificación simulado. Sin contraseña. Esquema abierto para pedir más datos después | Elección del equipo para el prototipo |
| Inquilino no cliente | Puede postular. Su score sale de "centrales de riesgo" simuladas. Es un lead de bancarización | 017. Corrige la exclusión que el handoff ya había marcado como error |
| Deudor de niveles 2 y 3 | El inquilino es el deudor; el propietario, el beneficiario; el propietario absorbe la comisión | 018, tomada el 29 sept 2026. Falta Legal, Riesgos y SBS |

## Reglas inventadas para que la demo funcione

| Regla | Valor | Por qué es supuesto |
| --- | --- | --- |
| Prima por banda | Alto 2%, medio 3.5%, bajo 5% | Escalonar por score es lógico (decisión 002), pero los puntos los inventamos |
| Cuota segura (capacidad de pago) | 30% del ingreso mensual verificado, redondeado a S/50 | Regla de dedo, no definida con Riesgos |
| Bandas de score | 0-39 bajo, 40-69 medio, 70-100 alto | Provisionales según el design system |
| Pesos del score | Renta/ingreso 30, estabilidad 20, deuda 20, puntualidad 20, antigüedad 10 | Scorecard ilustrativo. Ver `src/rentscore.js` |
| Rango de mercado | S/1,650 a S/2,000 para 2 dorm. en Surquillo | Inventado. No hay fuente verificada de rentas por distrito en `context/03` |
| Inventario del marketplace | 8-10 propiedades ficticias en Lima Moderna, incluida la de Carmen | Inventado para la demo. No hay avisos reales |
| Score del inquilino no cliente | Se calcula con una "central de riesgo" simulada a partir de datos ficticios | No hay integración real con centrales. Ver `src/rentscore.js` |
| Cliente / no cliente de Interbank | Se deriva del DNI ficticio del inquilino | Regla inventada solo para la demo |
| % de postulantes nuevos para el banco | Métrica principal del flujo del inquilino, sobre datos ficticios | Elección del equipo. Sin línea base real |
| Depósito de Cobro Garantizado | Día 5 de cada mes | Inventado |
| Siniestro pagado en 15 días hábiles | Tal cual | Diseño del Big Idea, no validado con Interseguro |
| RentScore gratuito para el propietario | S/0 | "Gratuito" referencial del Big Idea |

## Personas y datos

Carmen (52, Surquillo, S/1,800) y los tres postulantes (Lucía, Jorge, Kevin) son ficticios. Sus datos están en `data/datos.js`. Ningún dato es real.

## Lo que el prototipo deja fuera a propósito

- Texto legal del consentimiento: pendiente con Legal.
- Plazo de cálculo del RentScore: el prototipo lo muestra al instante; el Big Idea decía hasta 48 horas.
- Cobertura y monto asegurado por daños, y si el 2-5% de la renta es sostenible para un seguro de hogar (decisión 010).

## Tensión que el jurado puede notar

Con renta de S/1,800, lo que paga el propietario al año frente a la referencia de corretaje de ~1 mes de renta (S/1,800; dato heredado sin verificar, `context/03`):

| Modalidad | Score alto | Score medio |
| --- | --- | --- |
| Cobro Garantizado | S/648 (0.36 meses) | S/1,080 (0.6 meses) |
| Renta Adelantada | S/3,240 (1.8 meses) | S/5,400 (3 meses) |

Cobro Garantizado ya no supera la referencia en monto; Renta Adelantada sí. Visto como préstamo, la TEA implícita de Renta Adelantada es 36-44% con score alto y 74-95% con medio (cálculo en `decisions/016`). El jurado puede preguntar por esa tasa y por su transparencia.
