# U2 · Domain Entities

Reutiliza las entidades de U1. Agrega una proyección de presentación:

| Entidad | Campos | Origen |
| --- | --- | --- |
| `Aplicante` | id, nombre, edad, ocupacion, declarado \| null, financiero, esClienteInterbank, fuente, origen (`base` \| `marketplace`), nuevo, scoreCompartido, fechaAutorizacion, postulacion \| null | `store/selectors.ts` |
