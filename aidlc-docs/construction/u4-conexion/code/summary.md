# U4 · Resumen de código

## Creado
- `src/components/DemoPrecarga.tsx`: precarga idempotente de Lucía. Se bloquea si hay otro inquilino registrado.
- `src/components/Bancarizacion.tsx`: indicador con SUPUESTO que se actualiza en vivo.
- `src/screens/demo/PanelDemo.tsx`: ruta `#/demo`, enlazada desde el pie.
- `tests/connection.test.tsx`: integración entre journeys.
- `prototype/app/README.md`.

## Modificado
- `src/screens/registry.tsx`: ruta `demo`.
- `src/screens/owner/Postulantes.tsx`: caja de demo con la precarga en la bandeja.
- `prototype/docs/supuestos.md`: 9 propiedades, regla de cliente por DNI, perfil derivado del DNI, código de verificación, renta de referencia de Mi RentScore, consejos y definición del indicador.
- `prototype/README.md`: la app vigente es `app/`, el legado queda como referencia y se describe el deploy nuevo.

## Verificación al cierre de U4
- 64 pruebas en verde. `connection.test.tsx` cubre: Lucía postula, Carmen la ve (pasa a "vista"), la acepta con Cobro Garantizado (S/1,746) y Lucía ve el aviso de deudor. También cubre la aceptación de otro postulante (Lucía queda "No seleccionada"), el indicador de 0% a 33% con la precarga, la precarga desde la bandeja y el reinicio.
