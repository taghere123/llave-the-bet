# User Stories

Formalización del borrador `prototype/docs/historias-inquilino.md` (HU-01..HU-12) más el journey del propietario existente. Historias INVEST con criterios de aceptación. IDs trazables a requisitos (RF-xx) y a las HU originales.

Convención de estados de postulación: `enviada` → `vista por el propietario` → `aceptada` | `no seleccionada`; desde `enviada`/`vista` se puede `retirar`.

---

## Épica A — Journey del propietario (existente, preservar)

### US-P01 — Publicar inmueble y ver postulantes
**RF-01 · HU base: journey propietario**
Como propietaria (Carmen), quiero publicar mi inmueble y ver a los postulantes con su RentScore, para decidir a quién alquilar.
- **Criterios**:
  - Publico tipo, dirección, distrito, dormitorios, área y renta; el inmueble queda publicado.
  - Veo la lista de postulantes con su banda (alto/medio/bajo) y su score.
  - Abro el detalle: veo lo declarado (sin verificar) vs. el RentScore verificado, sin ver movimientos/saldos.
  - **Paridad**: este comportamiento se preserva tras la migración/refactor.

### US-P02 — Aceptar y proteger con seguro
**RF-01, RF-16, RF-17**
Como propietaria, quiero aceptar a un postulante y ver la póliza de seguro de hogar, para proteger el inmueble.
- **Criterios**:
  - Puedo aceptar; con banda baja se me advierte pero puedo aceptar igual.
  - Veo la póliza: prima por banda (2-5%, SUPUESTO), la paga el inquilino, costo S/0 para mí.
  - El seguro no cubre impago ni reemplaza la garantía.

### US-P03 — Elegir cómo cobrar
**RF-01, RF-18**
Como propietaria, quiero elegir la modalidad de cobro, para recibir mi renta con seguridad.
- **Criterios**:
  - Opciones: estándar / Cobro Garantizado / Renta Adelantada, según banda (no disponibles con banda baja).
  - Veo comisiones y montos (SUPUESTO) y confirmo; veo un resumen final.

---

## Épica B — Journey del inquilino (nuevo)

### US-I01 — Navegar el marketplace sin registro
**RF-04 · HU-01**
Como inquilino, quiero ver propiedades sin dejar mis datos, para explorar sin fricción.
- **Criterios**: grilla de propiedades; sin registro para navegar/abrir ficha; filtro básico por distrito y rango de renta; 8-10 propiedades en Lima Moderna incluida la de Carmen.

### US-I02 — Ver la ficha de una propiedad
**RF-05 · HU-02**
Como inquilino, quiero ver el detalle de una propiedad, para decidir si me interesa.
- **Criterios**: muestra datos y rango del seguro (2-5%, SUPUESTO); mensaje diferenciador de LLAVE; botón "Postular".

### US-I03 — Registrarme al postular por primera vez
**RF-06 · HU-03**
Como inquilino, quiero identificarme rápido al postular, para no abandonar.
- **Criterios**: el lead form se dispara en el primer "Postular"; campos nombre, apellido, DNI (8), email (formato), celular (9), obligatorios; código de verificación simulado; sin contraseña; guardo en `localStorage` con esquema extensible; mensajes de error claros.

### US-I04 — Reconocimiento en postulaciones posteriores
**RF-07 · HU-04**
Como inquilino ya registrado, quiero postular sin volver a dejar datos.
- **Criterios**: si existe `inquilino` en storage, no se repite el lead form; el RentScore se reutiliza.

### US-I05 — Consentir el cálculo de mi RentScore (dos capas)
**RF-08, RF-17 · HU-05**
Como inquilino, quiero autorizar el cálculo de mi score con transparencia.
- **Criterios**: panel de consentimiento (componente ConsentBlock); explica qué ve y qué no ve el propietario; casilla no premarcada, botón deshabilitado hasta marcar; enlace a política (placeholder legal simulado); dos capas: (a) general para calcular, (b) compartir con este propietario al postular; texto para no-cliente (centrales de riesgo).

### US-I06 — Ver mi propio RentScore
**RF-09, RF-16 · HU-06**
Como inquilino, quiero ver mi score y cómo mejorarlo.
- **Criterios**: score 0-100, banda, cuota segura y 2-3 consejos; instantáneo (SUPUESTO); banda baja no bloquea (aviso, no bloqueo); mensaje gancho "Conoce tu RentScore gratis".

### US-I07 — Enviar una postulación
**RF-10 · HU-07**
Como inquilino con score, quiero postular a una propiedad.
- **Criterios**: al confirmar marco "compartir con este propietario"; queda `enviada` y se guarda; sin límite de postulaciones; si la renta supera la cuota segura, advertencia pero puedo continuar; si postulo al inmueble de Carmen, aparezco en su bandeja como "Nuevo".

### US-I08 — Ver mis postulaciones y su estado
**RF-11 · HU-08**
Como inquilino, quiero ver a qué postulé y en qué va.
- **Criterios**: lista con propiedad, fecha y estado; control de demo para simular avance de estado.

### US-I09 — Retirar postulación / revocar acceso
**RF-12 · HU-09**
Como inquilino, quiero retirar una postulación o dejar de compartir mi score.
- **Criterios**: desde `enviada`/`vista` puedo retirar (desaparece de la bandeja del propietario); puedo revocar el acceso al score; reversible al reiniciar la demo.

### US-I10 — Enterarme de que soy deudor bajo pago garantizado
**RF-13, RF-17, RF-18 · HU-10**
Como inquilino aceptado, quiero saber a qué me compromete el pago garantizado.
- **Criterios**: antes de cualquier firma, se explica que figuraré como deudor de un préstamo de consumo con Interbank; Interbank paga al propietario, yo devuelvo mes a mes, la comisión la asume el propietario; aviso de posible reporte en centrales; texto legal placeholder (simulado).

---

## Épica C — Conexión de journeys y crecimiento

### US-C01 — Cerrar el círculo con el propietario
**RF-14 · HU-11**
Como equipo en la demo, quiero que la postulación de Lucía aparezca en la bandeja de Carmen.
- **Criterios**: la bandeja arranca con Jorge y Kevin; cuando Lucía postula, se agrega como tercer postulante "Nuevo"; botón de demo para precargar su postulación sin recorrer todo el flujo.

### US-C02 — Indicador de bancarización
**RF-15, RF-19 · HU-12**
Como equipo en la demo, quiero mostrar el % de postulantes nuevos para el banco.
- **Criterios**: indicador de cuántos leads no son clientes de Interbank y su %; se mueve en vivo con Lucía (no clienta); etiqueta SUPUESTO.

---

## Trazabilidad (resumen)

| Historia | HU original | Requisitos |
| --- | --- | --- |
| US-P01..US-P03 | journey propietario | RF-01, RF-02, RF-16, RF-17, RF-18 |
| US-I01..US-I10 | HU-01..HU-10 | RF-04..RF-13, RF-16, RF-17 |
| US-C01, US-C02 | HU-11, HU-12 | RF-14, RF-15, RF-19 |

## Fuera de alcance (del borrador original)
Contraseñas/recuperación de cuenta, verificación real de identidad/código, integración real con centrales o Interbank, filtro "dentro de tu cuota", loops de invitación, texto legal real.
