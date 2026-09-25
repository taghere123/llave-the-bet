# 016. Renta Adelantada entra al MVP, como préstamo de consumo a tasa cero

**Estado:** Tomada el 25 sept 2026. Responsable: equipo. Revierte la consecuencia de 004 que dejaba Renta Adelantada fuera del MVP. Pendiente: Riesgos, Legal y SBS.

## Contexto
El nivel 3 estaba fuera del MVP porque faltaba definir si se estructuraba como cesión de cobro (factoring) o como crédito, y su pricing.

## Decisión

### Producto
- El propietario recibe por adelantado la renta de todo el contrato, en un solo desembolso.
- Solo contratos de 1 año (12 meses).
- Interbank cobra la renta al inquilino mes a mes y asume el impago.
- Solo con inquilinos de score medio o alto.

| Score del inquilino | Comisión sobre la renta del año | Con renta de S/1,800 (S/21,600 al año) |
| --- | --- | --- |
| Alto | 15% | Comisión S/3,240, desembolso S/18,360 |
| Medio | 25% | Comisión S/5,400, desembolso S/16,200 |
| Bajo | No elegible | |

### Modelo financiero (aplica también a Cobro Garantizado, 012)
- Interbank evalúa al inquilino y le asigna el score de riesgo. El producto financiero y el modelo de riesgo son de Interbank.
- Es un préstamo de consumo de Interbank a tasa cero. La comisión es una tasa de interés implícita, cobrada como descuento sobre la renta que recibe el propietario.
- Ya no se estructura como cesión de cobro (factoring). Eso reemplaza lo que decían el Big Idea y el glosario.

### Por qué entra al MVP
Si se monta sobre el producto de préstamo de consumo que Interbank ya tiene, reutiliza infraestructura existente como pide 004. Es además la opción que supera en monto la referencia de corretaje (~1 mes de renta), algo que Cobro Garantizado con 3-5% ya no hace (012).

## Tasa implícita (cálculo, no cifra aprobada)
Si el propietario recibe hoy el desembolso y el inquilino paga 12 cuotas mensuales iguales a la renta:

| Score | Comisión | TEM implícita | TEA implícita |
| --- | --- | --- | --- |
| Alto | 15% | 2.6% a 3.1% | 36% a 44% |
| Medio | 25% | 4.7% a 5.7% | 74% a 95% |

El rango va de cuotas a fin de mes (valor menor) a cuotas a inicio de mes (valor mayor). Supuestos del cálculo: sin otros costos, sin impago, renta constante.

## Riesgos y pendientes
- **Transparencia.** Una tasa "escondida" en un descuento puede chocar con las normas de transparencia de la SBS para créditos de consumo, que exigen informar el costo efectivo (TCEA). Legal debe revisar si se puede presentar como comisión.
- **Tasas máximas.** Verificar con Legal si hay topes de tasa para crédito de consumo que alcancen a la TEA implícita, sobre todo con score medio.
- **Quién es el deudor.** Si el préstamo es al inquilino, la obligación de pago y el reporte a centrales de riesgo son suyos, pero el costo lo absorbe el propietario. Hay que confirmarlo con Legal y Riesgos.
- Capital y provisiones como crédito de consumo.
- Qué pasa si el contrato termina antes de los 12 meses.
- Concentración: se adelanta un año completo con un score sin historial.

## Consecuencias
- 004: Renta Adelantada entra al MVP. La hipótesis se mide con Cobro Garantizado y Renta Adelantada.
- El prototipo permite elegir Renta Adelantada con score medio o alto.
