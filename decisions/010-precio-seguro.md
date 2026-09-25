# 010. Precio del seguro: monto fijo vs. % de la renta

**Estado:** CERRADA el 25 sept 2026. Responsable: equipo. Pendiente con Interseguro (suscripción y actuarial): tarificar y validar el porcentaje.

## Contexto
Dos versiones convivían en los documentos del equipo.

| | A. Monto fijo con ahorro | B. Porcentaje de la renta |
| --- | --- | --- |
| Prima | S/15-100 al mes según tipo de propiedad | 2-5% de la renta |
| Paga | Inquilino | Inquilino |
| Ahorro devuelto | Sí: la mitad al llegar a S/2,000, S/4,000 y S/10,000 acumulados | No |
| Dónde aparecía | Sesión de Working Backwards, propuesta del equipo | Big Idea oficial y texto de la herramienta de Amazon |

## Decisión
Modelo B. La prima es del 2 al 5% de la renta, como precio de un seguro de hogar que paga el inquilino y protege al propietario de daños al inmueble (003). El modelo A queda descartado, incluida la devolución de ahorro.

## Consecuencias
- El rango 2-5% es una cifra del equipo, sin sustento actuarial. Interseguro debe confirmar que es sostenible para un seguro de hogar.
- El prototipo escalona el porcentaje por banda de score (alto 2%, medio 3.5%, bajo 5%). Ese escalonamiento es un supuesto, no parte de la decisión.
- Actualizar el deck y el infográfico, que están fuera del repo. `context/01` y `context/02` ya quedaron alineados.
