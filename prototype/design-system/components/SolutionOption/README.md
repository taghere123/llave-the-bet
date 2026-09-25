Tarjeta seleccionable (radio) para elegir la solución financiera después de ver el score. Borde de 2px en `border-strong`; seleccionada, el borde pasa a `action` y el fondo a `surface-raised`. Mantiene la forma firma.

**Contenido.** Nombre (`title`), una frase de beneficio en `body-sm` y el precio en `price`. Máximo una opción por nivel de la oferta. Renta Adelantada entra al MVP (decisión 016) y se muestra como tercera opción de cobro.

**Pendiente de negocio.** El modelo de precio del seguro (prima fija en soles o porcentaje de la renta) no está cerrado. Hasta que Interseguro lo defina, el preview dice "referencial" y no muestra monto. No inventar cifras en pantalla.

**Accesibilidad.** Implementar como `role="radiogroup"`; la selección no depende solo del color: el punto interior cambia. **El consumidor aporta** las opciones, el precio validado y el texto legal de cada una.