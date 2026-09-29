# U3 · Business Logic Model

## Flujo y guardias

| Ruta | Paso (de 7) | Guardia (si no se cumple, redirige a) |
| --- | --- | --- |
| `#/marketplace` | 1 | — |
| `#/propiedad/:id` | 2 | la propiedad existe → marketplace |
| `#/registro` | 3 | — (si ya está registrado, ofrece continuar) |
| `#/autorizar` | 4 | hay inquilino → registro |
| `#/mi-score` | 5 | hay evaluación → autorizar |
| `#/postular/:id` | 6 | la propiedad existe → marketplace; hay inquilino → registro; hay evaluación → autorizar |
| `#/mis-postulaciones` | 7 | hay inquilino → registro |
| `#/deudor/:id` | — | la postulación es del inquilino y está aceptada → mis-postulaciones |

## Transición "Postular" (ficha)
```
si no hay inquilino  → fijarPendiente(id) → registro
si no hay evaluación → fijarPendiente(id) → autorizar
si no                → postular/:id
```
Tras registrarse → autorizar. Tras autorizar → mi-score. Desde mi-score: con pendiente → postular/:pendiente; sin pendiente → marketplace.

## Acciones del store
`registrarInquilino`, `fijarPendiente`, `darConsentimiento`, `enviarPostulacion`, `cambiarEstado`, `revocarAcceso`, `simularAceptacion`.
