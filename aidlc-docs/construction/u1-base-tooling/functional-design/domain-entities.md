# U1 · Domain Entities (compartidas por U2..U4)

Todo dato es ficticio. Tipos en `prototype/app/src/domain/types.ts`.

| Entidad | Campos | Notas |
| --- | --- | --- |
| `Financiero` | ingresoMensual, mesesIngresoEstable, ratioDeuda, pagosPuntuales, aniosCliente | Contrato exacto del RentScore legado. Para no clientes, la central simulada informa en `aniosCliente` la antigüedad en el sistema financiero (SUPUESTO) |
| `Propiedad` | id, tipo, direccion, distrito, dormitorios, area, renta, descripcion | El inmueble de Carmen (`surquillo-01`) es editable desde "Publicar" |
| `PostulanteBase` | id, nombre, edad, ocupacion, dni, esClienteInterbank, declarado, financiero | Jorge y Kevin, en la bandeja de Carmen desde el inicio (HU-11) |
| `Inquilino` | nombre, apellido, dni, email, celular, esClienteInterbank, registradoEn, extra? | Esquema extensible (`extra`) para pedir más datos sin rehacer el flujo |
| `Evaluacion` | financiero, fuente (`interbank` \| `central`), fecha | Se consulta una vez, al dar el consentimiento general, y se reutiliza (HU-04) |
| `Postulacion` | id, propiedadId, dni, fecha, estado, scoreCompartido | Estados: enviada, vista, aceptada, no_seleccionada, retirada |
| `ScoreResult` | score, banda, cuotaSegura, factores[] | Salida del RentScore |
| `DemoState` | version=2, inmueble, publicado, aceptado, modalidad, registrado, inquilino, evaluacion, postulaciones[], postulacionPendiente | Se persiste en `localStorage` con la clave `llave-demo-v2` |

## Relaciones
- `Postulacion.propiedadId` → `Propiedad.id`. `Postulacion.dni` → `Inquilino.dni`.
- `DemoState.aceptado` → id de un postulante de la bandeja: un `PostulanteBase.id` o el `Postulacion.id` de un postulante del marketplace.
