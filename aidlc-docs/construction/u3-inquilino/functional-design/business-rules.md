# U3 · Business Rules (journey del inquilino)

| ID | Historia | Regla |
| --- | --- | --- |
| BR-TN-01 | HU-01 | El marketplace y las fichas se ven sin registro. Filtros: distrito (todos o uno) y rango de renta (todas, hasta S/1,500, S/1,500-2,000, más de S/2,000). Sin resultados: mensaje y botón para limpiar filtros |
| BR-TN-02 | HU-02 | La ficha muestra el rango del seguro: round(renta × 2%) a round(renta × 5%) al mes, con SUPUESTO |
| BR-TN-03 | HU-03 | "Postular" sin registro guarda la propiedad como pendiente y abre el lead form. Pedir datos antes de ese momento está prohibido |
| BR-TN-04 | HU-03 | Campos obligatorios: nombre y apellido (letras, máx. 60), DNI de 8 dígitos, email con formato (máx. 120), celular de 9 dígitos que empieza con 9. Error por campo con `aria-describedby`; el foco va al primer campo con error |
| BR-TN-05 | HU-03 | Código de verificación simulado: se acepta cualquier código de 6 dígitos; la pantalla muestra 123456 como SUPUESTO. Sin contraseña |
| BR-TN-06 | HU-03 | Al verificar se crea `Inquilino` con `esClienteInterbank` según `dataProvider` (SUPUESTO: DNI terminado en par = cliente; Lucía no es clienta) |
| BR-TN-07 | HU-04 | Con inquilino registrado, "Postular" no vuelve a pedir datos. Con evaluación existente, no vuelve a pedir el consentimiento general |
| BR-TN-08 | HU-05 | Consentimiento general: casilla sin marcar y botón deshabilitado hasta marcarla. El texto cambia para no clientes (centrales de riesgo). Incluye la política de datos (placeholder) y explica las dos capas |
| BR-TN-09 | HU-05 | Al consentir, `dataProvider.consultarFinanciero` devuelve la evaluación (fuente interbank o central), que se guarda una vez y se reutiliza |
| BR-TN-10 | HU-06 | Mi RentScore se calcula para la renta de la propiedad pendiente o, si no hay, para una renta igual a la cuota segura. Muestra score, banda, cuota segura, factores y 2-3 consejos |
| BR-TN-11 | HU-06 | Consejos: los 2 factores con menor proporción puntos/max (3 si hay empate en el tercero), con un texto por factor |
| BR-TN-12 | HU-06/07 | La banda baja y una renta mayor a la cuota segura avisan pero no bloquean |
| BR-TN-13 | HU-07 | La segunda capa ("compartir con este propietario") es obligatoria para enviar. La postulación nace `enviada` y `scoreCompartido=true`. Se puede postular sin límite |
| BR-TN-14 | HU-08 | Estados y etiquetas: enviada "Enviada", vista "Vista por el propietario", aceptada "Aceptada", no_seleccionada "No seleccionada", retirada "Retirada" |
| BR-TN-15 | HU-08 | Control de demo por postulación activa: simular vista, aceptación (Cobro Garantizado si la banda lo permite; si no, cobro estándar) o no selección |
| BR-TN-16 | HU-09 | Desde enviada o vista: "Retirar" (pasa a retirada y desaparece de la bandeja) y "Dejar de compartir mi RentScore" (la propietaria deja de verlo). Se revierte con "Reiniciar demo" |
| BR-TN-17 | HU-10 | Pantalla del deudor para postulaciones aceptadas. Con cobro o adelanto: aviso de deudor con montos (Interbank paga al propietario, el inquilino devuelve la renta mes a mes, la comisión la paga el propietario, puede reportarse en centrales). Con estándar: no hay préstamo. Sin modalidad: explica qué pasaría. Texto legal SUPUESTO |
