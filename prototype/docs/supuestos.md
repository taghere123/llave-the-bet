# Supuestos del prototipo

Todo lo que aparece en pantalla con la etiqueta **SUPUESTO** está aquí. Nada de esto es hecho observado ni cierra una decisión de `decisions/`. Fecha: 25 sept 2026.

## Elecciones del equipo para el mockup (no cierran decisiones abiertas)

| Tema | Qué muestra el prototipo | Decisión que sigue abierta |
| --- | --- | --- |
| Qué paga el propietario | Nada en niveles 0 y 1. Solo paga comisión si activa Cobro Garantizado | 004 y 012. Consecuencia: la hipótesis del MVP queda atada a Cobro Garantizado |
| Precio del seguro | Modelo B: 2% a 5% de la renta, pagado por el inquilino | 010 (modelo A, monto fijo S/15-100 con ahorro devuelto, sigue en la mesa) |
| Cobro Garantizado | Comisión de 15% de cada renta mensual; el propietario la "activa" | 012. El 15% no tiene fuente en el repo ni sustento actuarial |
| Portal | Estética del portal Zona Hipotecaria de Interbank, marca LLAVE provisional, sin logotipo de Interbank | 013 |

## Reglas inventadas para que la demo funcione

| Regla | Valor | Por qué es supuesto |
| --- | --- | --- |
| Prima por banda | Alto 2%, medio 3.5%, bajo 5% | Escalonar por score es lógico (decisión 002), pero los puntos los inventamos |
| Cuota segura (capacidad de pago) | 30% del ingreso mensual verificado, redondeado a S/50 | Regla de dedo, no definida con Riesgos |
| Bandas de score | 0-39 bajo, 40-69 medio, 70-100 alto | Provisionales según el design system |
| Pesos del score | Renta/ingreso 30, estabilidad 20, deuda 20, puntualidad 20, antigüedad 10 | Scorecard ilustrativo. Ver `src/rentscore.js` |
| Rango de mercado | S/1,650 a S/2,000 para 2 dorm. en Surquillo | Inventado. No hay fuente verificada de rentas por distrito en `context/03` |
| Depósito de Cobro Garantizado | Día 5 de cada mes | Inventado |
| Plazo del reporte | Hasta 48 horas | Viene del Big Idea, no probado |
| Siniestro pagado en 15 días hábiles | Tal cual | Diseño del Big Idea, no validado con Interseguro |
| RentScore gratuito para el propietario | S/0 | "Gratuito" referencial del Big Idea |

## Personas y datos

Carmen (52, Surquillo, S/1,800) y los tres postulantes (Lucía, Jorge, Kevin) son ficticios. Sus datos están en `data/datos.js`. Ningún dato es real.

## Lo que el prototipo deja fuera a propósito

- Postulantes sin cuenta en Interbank (Score Híbrido con REDJUM). El handoff corrigió que no se les excluya; el mockup no muestra ese caso.
- Monto y comisión de Renta Adelantada: solo pantalla informativa.
- Texto legal del consentimiento: pendiente con Legal.

## Tensión que el jurado puede notar

Con estas elecciones, el propietario paga S/270 al mes (S/3,240 al año, casi 1.8 meses de renta) por Cobro Garantizado, además de la prima de 2-5% que paga el inquilino. La referencia de lo que paga hoy un propietario por conseguir inquilino (corretaje de ~1 mes de renta) es un dato heredado sin verificar (`context/03`). La hipótesis "paga más que por publicar" se cumple en monto, pero falta evidencia de que alguien acepte ese precio.
