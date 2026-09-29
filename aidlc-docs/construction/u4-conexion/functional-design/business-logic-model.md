# U4 · Business Logic Model

- `components/DemoPrecarga.tsx`: arma la acción `precargarDemo` con `dataProvider.inquilinoDemo()`, `dataProvider.consultarFinanciero()` y una postulación nueva al `state.inmueble.id`. Calcula su estado (disponible, ya precargada, bloqueada por otro inquilino).
- `components/Bancarizacion.tsx`: muestra `selectors.bancarizacion(state, data)`.
- `screens/demo/PanelDemo.tsx`: ruta `#/demo`, sin paso. Reúne el indicador, la precarga, los accesos rápidos a ambos journeys y "Reiniciar demo".
- Entidades: no agrega nuevas. Usa `DemoState`, `Postulacion` y `MetricaBancarizacion`.
