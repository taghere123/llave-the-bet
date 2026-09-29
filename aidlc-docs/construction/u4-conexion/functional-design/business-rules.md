# U4 · Business Rules (conexión y bancarización)

| ID | Historia | Regla |
| --- | --- | --- |
| BR-CX-01 | HU-11 | La bandeja de Carmen arranca con Jorge y Kevin. Una postulación del marketplace a su inmueble aparece como tercer postulante con "Nuevo" (implementado en U1/U2 con `selectors.bandeja`) |
| BR-CX-02 | HU-11 | "Precargar postulación de Lucía" registra a Lucía (no clienta), le da el consentimiento general con la central simulada y crea su postulación `enviada` al inmueble de Carmen. Es idempotente |
| BR-CX-03 | HU-11 | Si ya hay otro inquilino registrado, la precarga se deshabilita y pide reiniciar la demo. Si Lucía ya postuló, se informa que ya está en la bandeja |
| BR-CX-04 | HU-12 | Bancarización = personas únicas por DNI (postulantes base + inquilino registrado) que no son clientes de Interbank ÷ total. Se redondea al entero. Etiqueta SUPUESTO; sin línea base |
| BR-CX-05 | HU-12 | El indicador vive en el Panel de demo (`#/demo`), no en las pantallas del inquilino |
| BR-CX-06 | — | El botón de precarga también está en la bandeja de Carmen, dentro de una caja de demo, para que el journey de la propietaria funcione solo |
