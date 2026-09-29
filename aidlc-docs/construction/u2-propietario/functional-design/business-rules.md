# U2 · Business Rules (journey de la propietaria)

Paridad con `prototype/src/app.js` salvo los cambios marcados **[cambio]**, que vienen de las historias de U3/U4.

| ID | Regla |
| --- | --- |
| BR-OW-01 | Rutas y pasos iguales al legado: inicio(1), publicar(2), inmueble(3), postulantes(4), postulante/:id(5), resultado/:id(6), poliza/:id(7), cobro(8), confirmacion(9). consentimiento/:id sin paso, con cabecera de postulante |
| BR-OW-02 | Una ruta inexistente, o una ruta con id de postulante inexistente, lleva a inicio |
| BR-OW-03 | Publicar: los campos de texto vacíos usan el valor anterior y la renta mínima es S/300 |
| BR-OW-04 | Con banda baja: aviso de riesgo alto, CTA principal "Ver otros postulantes" y "Aceptar de todos modos" como secundario. Con cuota segura menor a la renta: aviso con la diferencia |
| BR-OW-05 | Cobro: sin preselección. Una modalidad no disponible se muestra deshabilitada y el botón indica la acción elegida |
| BR-OW-06 | Confirmación: si la modalidad guardada ya no está disponible para la banda, se muestra cobro estándar |
| BR-OW-07 **[cambio]** | La bandeja es dinámica: Jorge y Kevin, más las postulaciones del marketplace a su inmueble. "Ya tienes N postulantes" muestra la cantidad real (el legado decía 3 fijo) |
| BR-OW-08 **[cambio]** | Una postulación del marketplace sin abrir se marca "Nuevo". Al abrir su detalle pasa a `vista` (HU-08) |
| BR-OW-09 **[cambio]** | Si el inquilino revocó el acceso, la propietaria no ve su score: el badge dice "Score no compartido" y la ruta resultado/:id redirige al detalle |
| BR-OW-10 **[cambio]** | Aceptar a un postulante deja las demás postulaciones abiertas en `no_seleccionada` |
