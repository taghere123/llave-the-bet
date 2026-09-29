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
- El inquilino deja sus datos en un lead form para postular, y una parte de esos inquilinos no es cliente de Interbank (leads de bancarización). El % de postulantes nuevos para el banco es la métrica principal del flujo del inquilino (decisión 017).
- El inquilino acepta figurar como deudor de un préstamo de consumo cuando el propietario elige una modalidad de pago garantizado (decisión 018).

## Qué entra y qué no

| Entra | No entra |
| --- | --- |
| Nivel 0 RentScore (scorecard de reglas) | Housing Graph |
| Nivel 1 RentScore Seguro | Contratos de más de 1 año en Renta Adelantada |
| Cuenta Arrendador existente, con etiqueta | Modelo de ML |
| Marketplace propio con flujo de inquilino (decisión 017) | Expansión fuera de Lima |
| Niveles 2 y 3, solo score medio o alto, como préstamo de consumo a tasa cero (012 y 016) | |
| Inquilinos sin cuenta Interbank: postulan y su score sale de centrales de riesgo (leads de bancarización) | |

**Cambio de alcance (29 sept 2026, decisión 017):** el marketplace propio pasó de "No entra" a "Entra". Esto añade riesgo de factibilidad en 90 días, el mismo que la 001 quería evitar. El equipo lo asume para controlar la adquisición del inquilino y el dato. Falta dimensionar inventario inicial, carga de avisos, tráfico y su costo; ver "Por completar".

## Por completar

- Marketplace (decisión 017): inventario inicial, cómo se cargan los avisos, de dónde sale el tráfico de inquilinos y su costo de adquisición. Es el riesgo de factibilidad nuevo del piloto.
- Segmento y tamaño del piloto: cuántos propietarios y cuántas pólizas.
- Métricas de éxito y umbrales: conversión a póliza, prima pagada, disposición a pagar, siniestralidad temprana, renovación.
- Cronograma día 0 a 90.
- Dependencias: Riesgos, Legal, Interseguro suscripción, Growth y Victoria, TI de Interbank.
- Presupuesto y equipo real. La cifra de US$400-500K viene de una herramienta de IA y no está verificada.

## Plan de validación con propietarios (pendiente)

Hoy no hay validación formal. Propuesta mínima antes de la final: entrevistas estructuradas con propietarios reales, con guion, número de entrevistados, fecha y hallazgos guardados en `mvp/validacion/`. Solo se presenta como "entrevistas" lo que realmente ocurrió y está documentado.
