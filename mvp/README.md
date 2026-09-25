# MVP: piloto de 90 días

Esto es una especificación, no código. Se completa durante y después del taller.

## Hipótesis central

El propietario paga por la garantía de cobro (RentScore + Seguro) más de lo que paga hoy por publicar su inmueble.

## Hipótesis secundarias (no validadas)

- El inquilino acepta pagar una prima mensual en vez de un depósito.
- El inquilino autoriza el acceso a sus datos bancarios.
- Un subconjunto de propietarios adopta Cobro Garantizado pagando comisión real (ver decisión 012).
- El seguro se puede tarificar de forma sostenible con el score (ver decisión 010).

## Qué entra y qué no

| Entra | No entra |
| --- | --- |
| Nivel 0 RentScore (scorecard de reglas) | Marketplace propio |
| Nivel 1 RentScore Seguro | Renta Adelantada (nivel 3) |
| Cuenta Arrendador existente, con etiqueta | Housing Graph |
| Integración liviana con un portal existente | Modelo de ML |
| Nivel 2 según decisión 012 | Expansión fuera de Lima |

## Por completar

- Segmento y tamaño del piloto: cuántos propietarios y cuántas pólizas.
- Métricas de éxito y umbrales: conversión a póliza, prima pagada, disposición a pagar, siniestralidad temprana, renovación.
- Cronograma día 0 a 90.
- Dependencias: Riesgos, Legal, Interseguro suscripción, Growth y Victoria, TI de Interbank.
- Presupuesto y equipo real. La cifra de US$400-500K viene de una herramienta de IA y no está verificada.

## Plan de validación con propietarios (pendiente)

Hoy no hay validación formal. Propuesta mínima antes de la final: entrevistas estructuradas con propietarios reales, con guion, número de entrevistados, fecha y hallazgos guardados en `mvp/validacion/`. Solo se presenta como "entrevistas" lo que realmente ocurrió y está documentado.
