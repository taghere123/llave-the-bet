# U2 · Frontend Components

| Pantalla | Archivo | Datos | Interacción / data-testid |
| --- | --- | --- | --- |
| OwnerHome | `screens/owner/Inicio.tsx` | propietaria, publicado | `inicio-publicar-link` / `inicio-ver-inmueble-link` |
| PublishProperty | `screens/owner/Publicar.tsx` | inmueble | formulario `publicar-form`, `publicar-submit-button` |
| MyProperty | `screens/owner/Inmueble.tsx` | inmueble, cantidad en la bandeja | `inmueble-ver-postulantes-link` |
| ApplicantList | `screens/owner/Postulantes.tsx` | bandeja | `postulante-card-{id}`, caja de demo `demo-precargar-lucia-button` (U4) |
| ApplicantDetail | `screens/owner/Postulantes.tsx` | aplicante | `postulante-ver-score-link`, `postulante-ver-autorizacion-link` |
| ConsentView | `screens/owner/Postulantes.tsx` | aplicante, inmueble | solo lectura |
| RentScoreResult | `screens/owner/Resultado.tsx` | score, mercado | `resultado-aceptar-button` |
| PolicyScreen | `screens/owner/Poliza.tsx` | prima | `poliza-elegir-cobro-link` |
| CollectionChoice | `screens/owner/Cobro.tsx` | modalidades | radios `cobro-opcion-{m}`, `cobro-confirmar-button` |
| Confirmation | `screens/owner/Cobro.tsx` | resumen | `confirmacion-inicio-link` |

La cabecera (`Header`) cambia a modo postulante en ConsentView, igual que el legado.
