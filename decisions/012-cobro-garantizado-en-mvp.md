# 012. Cobro Garantizado dentro del MVP (piloto de 30 días, decisión 026)

**Estado:** CERRADA el 25 sept 2026. Precios actualizados el 25 sept 2026. Responsable: equipo. Pendiente: aprobación de Riesgos y revisión de Legal (ver abajo).

## Opciones que se evaluaron
1. Solo formulario de interés. Es lo que traía el infográfico original. No prueba que alguien pague, solo que hace clic.
2. Prueba con comisión real y un subconjunto de propietarios. Da la señal de Box 3, pero exige que Interbank asuma riesgo de timing y morosidad desde el piloto.

## Decisión
Opción 2: comisión real dentro del MVP.

- Interbank deposita la renta al propietario cada mes, haya pagado o no el inquilino, descontando una comisión.
- La comisión cubre el posible impago de todos los inquilinos del programa. Ese riesgo lo asume Interbank. El seguro no cubre impago (003).
- Interbank evalúa al inquilino y le asigna el score de riesgo. Solo se ofrece con score medio o alto.

| Score del inquilino | Comisión sobre cada renta mensual | Con renta de S/1,800 |
| --- | --- | --- |
| Alto | 3% | S/54 al mes (S/648 al año) |
| Medio | 5% | S/90 al mes (S/1,080 al año) |
| Bajo | No elegible | |

Historial: la primera versión de esta decisión fijaba 15% (alto) y 20% (medio). Se bajó a 3% y 5% el mismo día.

## Modelo financiero
Ver 016: Cobro Garantizado y Renta Adelantada son un préstamo de consumo de Interbank a tasa cero, y la comisión es la tasa de interés implícita.

Las cifras son del equipo, sin sustento actuarial ni aprobación de Riesgos. Son proyección, no observado.

## Tensiones
- El Big Idea recomendaba activar el nivel 2 solo cuando el score tuviera historial suficiente para descartar selección adversa. El equipo lo adelanta al piloto, limitado a score medio y alto.
- Con 3% la comisión anual (S/648 con renta de S/1,800) es menor que la referencia de corretaje de ~1 mes de renta (`context/03`, dato sin verificar). Por monto, Cobro Garantizado solo ya no demuestra la hipótesis de 004 ("paga más que por publicar"). Renta Adelantada sí la supera (016).
- Riesgos debe confirmar que 3-5% de la renta cubre el impago esperado de inquilinos de score medio y alto.

## Pendiente
- Aprobación de Riesgos.
- Legal y SBS: tratamiento como crédito de consumo (provisiones, capital, transparencia). Ver 016.
- Recuperación al inquilino que no paga.

## Impacto
Junto con Renta Adelantada, es lo que se demuestra ante el jurado como hipótesis del MVP (004).
