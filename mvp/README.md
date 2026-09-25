# MVP: piloto de 90 días

Esto es una especificación, no código. Se completa durante y después del taller.

## Hipótesis central

El propietario paga por la garantía de cobro (RentScore + Cobro Garantizado o Renta Adelantada) más de lo que paga hoy por publicar su inmueble. El seguro lo paga el inquilino y no cubre impago; lo que paga el propietario es la comisión de Cobro Garantizado o de Renta Adelantada.

## Hipótesis secundarias (no validadas)

- El inquilino acepta pagar una prima mensual (2-5% de la renta) por el seguro de hogar, además del depósito.
- El inquilino autoriza al postular que el propietario vea su RentScore (decisión 015).
- Un subconjunto de propietarios adopta Cobro Garantizado pagando comisión real: 3% de la renta con score alto, 5% con medio (decisión 012).
- Un subconjunto de propietarios adopta Renta Adelantada de un año: 15% con score alto, 25% con medio (decisión 016).
- El seguro se puede tarificar de forma sostenible con el score (decisión 010, falta Interseguro).

## Qué entra y qué no

| Entra | No entra |
| --- | --- |
| Nivel 0 RentScore (scorecard de reglas) | Marketplace propio |
| Nivel 1 RentScore Seguro | Contratos de más de 1 año en Renta Adelantada |
| Cuenta Arrendador existente, con etiqueta | Housing Graph |
| Integración liviana con un portal existente | Modelo de ML |
| Niveles 2 y 3, solo score medio o alto, como préstamo de consumo a tasa cero (012 y 016) | Expansión fuera de Lima |

## Por completar

- Segmento y tamaño del piloto: cuántos propietarios y cuántas pólizas.
- Métricas de éxito y umbrales: conversión a póliza, prima pagada, disposición a pagar, siniestralidad temprana, renovación.
- Cronograma día 0 a 90.
- Dependencias: Riesgos, Legal, Interseguro suscripción, Growth y Victoria, TI de Interbank.
- Presupuesto y equipo real. La cifra de US$400-500K viene de una herramienta de IA y no está verificada.

## Plan de validación con propietarios (pendiente)

Hoy no hay validación formal. Propuesta mínima antes de la final: entrevistas estructuradas con propietarios reales, con guion, número de entrevistados, fecha y hallazgos guardados en `mvp/validacion/`. Solo se presenta como "entrevistas" lo que realmente ocurrió y está documentado.
