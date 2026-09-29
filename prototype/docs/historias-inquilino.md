# Historias de usuario: flujo del inquilino

Borrador para revisión, 29 sept 2026. Rama `flujo-inquilino-marketplace`. Base: decisiones 015, 017 y 018, y las respuestas del equipo al cuestionario. Todo dato es ficticio.

Estas historias guían el prototipo del taller, pero están escritas para el producto, no solo para el mock. Donde el prototipo simplifica, se dice.

## Marco: los tres dolores

LLAVE le resuelve al propietario tres dolores. El inquilino es quien habilita los tres.

1. Saber a quién le alquilo → **RentScore**.
2. Que me paguen puntual → **Cobro Garantizado / Renta Adelantada** (el equipo lo llama "factoring"; la estructura real es un préstamo de consumo a tasa cero, decisión 016).
3. Que no me destruyan la casa → **seguro de hogar** que paga el inquilino.

Objetivo de crecimiento del flujo del inquilino: cada inquilino que postula deja sus datos, y una parte no es cliente de Interbank. Métrica principal: **% de postulantes nuevos para el banco**.

## Persona

Lucía Paredes, 29, analista de operaciones en planilla. Busca un 2 dormitorios en Lima Moderna. **No es clienta de Interbank** (cambia respecto al prototipo anterior). Su score se calcula con centrales de riesgo simuladas. Es la protagonista del flujo del inquilino y, al postular al inmueble de Carmen, cierra el círculo con el flujo del propietario.

## Convenciones de negocio (resolución de ambigüedades)

| Tema | Convención | Origen |
| --- | --- | --- |
| Navegar sin registro | El inquilino ve el marketplace y las fichas sin dejar datos | Respuesta 5 |
| Cuándo se piden datos | En el primer "Postular" | Respuesta 5 |
| Datos mínimos | Nombre, apellido, DNI, email, celular + código simulado | Respuestas 4 y B |
| Datos adicionales | No al inicio; el modelo de datos queda abierto para pedir más | Respuesta 6 |
| No cliente de Interbank | Puede postular; score vía centrales de riesgo | Respuesta 7B |
| Consentimiento | General para calcular el score + "compartir con este propietario" en cada postulación | Respuesta 8C |
| El inquilino ve su score | Sí, completo: score, banda, cuota segura y cómo mejorarlo | Respuesta 9A |
| Momento del score | Instantáneo en el prototipo (el Big Idea dice hasta 48 h; queda como SUPUESTO) | Respuesta 10A |
| Retiro / revocación | El inquilino puede retirar una postulación y revocar el acceso a su score | Respuesta 11 |
| Inventario | 8-10 propiedades en Lima Moderna, incluida la de Carmen | Respuesta 12 |
| Filtro "dentro de tu cuota" | Fuera del prototipo (es más para el propietario) | Respuesta 13 |
| Renta > cuota segura | No se bloquea: puede postular igual (informalidad del mercado) | Respuesta 14 |
| Límite de postulaciones | Sin límite | Respuesta 15 |
| Seguro | Visible desde la ficha, calculado sobre la renta (2-5%) | Respuesta 16 |
| Deudor de niveles 2 y 3 | El inquilino es el deudor; el propietario, el beneficiario | Respuesta 17, decisión 018 |

## Estados de una postulación

`enviada` → `vista por el propietario` → `aceptada` | `no seleccionada`. Desde `enviada` y `vista`, el inquilino puede `retirar`. El prototipo puede simular el avance de estado con un control de demo.

---

## Épica 1: Descubrir propiedades

### HU-01 Navegar el marketplace sin registro
Como inquilino que busca dónde vivir, quiero ver propiedades en alquiler sin dejar mis datos, para explorar sin fricción.
- **Criterios**
  - Al entrar al marketplace veo una grilla de propiedades (tarjeta con foto/ilustración, distrito, dormitorios, área y renta).
  - No se me pide registro para navegar ni para abrir una ficha.
  - Puedo filtrar al menos por distrito y por rango de renta. *(En el prototipo, filtro básico; si el tiempo no alcanza, al menos el listado completo.)*
  - Todas las propiedades son de Lima Moderna e incluyen la de Carmen (Surquillo).

### HU-02 Ver la ficha de una propiedad
Como inquilino, quiero abrir el detalle de una propiedad para decidir si me interesa.
- **Criterios**
  - La ficha muestra distrito, dirección aproximada, dormitorios, área, renta y una descripción corta.
  - Muestra el **rango del seguro de hogar** que pagaría el inquilino: 2-5% de la renta, con etiqueta SUPUESTO. Ej.: renta S/1,800 → seguro estimado S/36-90 al mes.
  - Explica en una línea el diferenciador de LLAVE: "Postula con tu RentScore. El propietario ve que eres confiable."
  - Botón "Postular".

---

## Épica 2: Identificarse (lead form)

### HU-03 Registrarme al postular por primera vez
Como inquilino que quiere postular, quiero identificarme rápido, para no abandonar el proceso.
- **Criterios**
  - El registro se dispara al tocar "Postular" por primera vez; antes no.
  - Campos: nombre, apellido, DNI, email, celular. Todos obligatorios.
  - Validación mínima: DNI de 8 dígitos, email con formato, celular de 9 dígitos. Mensajes de error claros.
  - Tras enviar, pido un **código de verificación** (simulado; cualquier código de 6 dígitos o uno fijo mostrado en pantalla como SUPUESTO).
  - Los datos se guardan en `localStorage` en un objeto `inquilino` con esquema **extensible** (para poder sumar ingreso, situación laboral, etc. sin rehacer el flujo).
  - No hay contraseña.

### HU-04 Que me reconozcan en siguientes postulaciones
Como inquilino ya registrado, quiero postular a otras propiedades sin volver a dejar mis datos.
- **Criterios**
  - Si ya existe `inquilino` en `localStorage`, "Postular" no vuelve a pedir el lead form.
  - Mi RentScore ya calculado se reutiliza en cada nueva postulación (no se recalcula desde cero).

---

## Épica 3: Consentimiento y RentScore

### HU-05 Consentir el cálculo de mi RentScore
Como inquilino, quiero entender y autorizar que se calcule mi score, para postular con transparencia.
- **Criterios**
  - Tras el registro, veo un panel de consentimiento (reutiliza el componente ConsentBlock del design system).
  - Dice en una frase qué se evalúa y qué **no** ve el propietario (ve score y capacidad de pago; no ve movimientos, saldos ni deudas — decisión 015).
  - Casilla no premarcada; el botón primario queda deshabilitado hasta marcarla.
  - Enlace visible a la política de tratamiento de datos (placeholder; texto legal pendiente con Legal).
  - Distingue las dos capas (respuesta 8C): (a) consentimiento **general** para calcular el score; (b) al postular, **compartir con este propietario**.
  - Si soy no cliente de Interbank, el texto indica que el score se calcula con centrales de riesgo.

### HU-06 Ver mi propio RentScore
Como inquilino, quiero ver mi score y qué significa, para saber cómo me presento y cómo mejorar.
- **Criterios**
  - Veo score (0-100), banda (alto/medio/bajo), mi **cuota segura** recomendada y 2-3 consejos para mejorar.
  - El score se muestra al instante (SUPUESTO; el Big Idea dice hasta 48 h).
  - Aunque mi banda sea baja, no se me impide postular (respuesta 14). Se muestra un aviso, no un bloqueo.
  - Mensaje de valor: "Conoce tu RentScore gratis" como gancho de adquisición y primer paso hacia un crédito hipotecario futuro.

---

## Épica 4: Postular

### HU-07 Enviar una postulación
Como inquilino con score, quiero postular a una propiedad, para que el propietario me evalúe.
- **Criterios**
  - Al confirmar, marco "compartir mi RentScore con este propietario" (segunda capa del consentimiento).
  - La postulación queda en estado `enviada` y se guarda en `localStorage`.
  - Si postulo al inmueble de Carmen, aparezco en su bandeja de postulantes marcada como **"Nuevo"** (ver HU-11).
  - Puedo postular a la misma o a otras propiedades sin límite (respuesta 15).
  - Si la renta supera mi cuota segura, veo una advertencia pero puedo continuar.

### HU-08 Ver mis postulaciones y su estado
Como inquilino, quiero ver a qué postulé y en qué va cada una.
- **Criterios**
  - Pantalla "Mis postulaciones" con lista: propiedad, fecha y estado (`enviada`, `vista`, `aceptada`, `no seleccionada`).
  - El prototipo puede simular el cambio de estado (control de demo).

### HU-09 Retirar una postulación / revocar acceso
Como inquilino, quiero retirar una postulación o dejar de compartir mi score, para mantener control de mis datos.
- **Criterios**
  - Desde `enviada` o `vista` puedo **retirar**; la postulación pasa a `retirada` y desaparece de la bandeja del propietario.
  - Puedo **revocar el acceso** a mi RentScore para una postulación; el propietario deja de verlo.
  - Acción reversible en el prototipo (reiniciar demo).

---

## Épica 5: Resultado y transparencia del crédito

### HU-10 Enterarme de que fui aceptado bajo pago garantizado (deudor)
Como inquilino aceptado, quiero saber en qué me compromete que el propietario elija Cobro Garantizado o Renta Adelantada.
- **Criterios**
  - Si el propietario me acepta bajo una modalidad de pago garantizado, veo una pantalla que explica, **antes de cualquier firma**, que figuraré como **deudor de un préstamo de consumo con Interbank** (decisión 018).
  - Se dice con claridad: Interbank le paga al propietario; yo devuelvo mes a mes; la comisión la asume el propietario.
  - Se advierte que el crédito puede reportarse en centrales de riesgo a mi nombre.
  - Texto legal pendiente con Legal (SUPUESTO en pantalla).
  - *Nota de negocio:* aquí el inquilino asume una obligación crediticia cuyo costo paga un tercero. Es el punto más sensible del modelo y va a Legal y Riesgos con las decisiones 016 y 018.

---

## Épica 6: Conexión de flujos y crecimiento (demo)

### HU-11 Cerrar el círculo con el propietario
Como equipo en la demo, quiero que la postulación de Lucía aparezca en la bandeja de Carmen, para mostrar el producto de punta a punta.
- **Criterios**
  - La bandeja de Carmen arranca con Jorge y Kevin.
  - Cuando Lucía postula desde el marketplace, se agrega como tercer postulante marcada "Nuevo".
  - Un botón de demo permite precargar la postulación de Lucía sin recorrer todo el flujo (para que el journey del propietario funcione solo).

### HU-12 Indicador de bancarización
Como equipo en la demo, quiero mostrar el % de postulantes nuevos para el banco, para evidenciar el motor de crecimiento.
- **Criterios**
  - Un indicador muestra cuántos de los postulantes/leads no son clientes de Interbank y el % que representan.
  - Con Lucía (no clienta) postulando, el indicador se mueve en vivo.
  - Etiqueta SUPUESTO; sin línea base real.

---

## Fuera de alcance del prototipo

- Contraseñas, recuperación de cuenta, verificación real de identidad o de código.
- Integración real con centrales de riesgo o con datos de Interbank.
- Filtro "dentro de tu cuota segura" (respuesta 13).
- "Invita a tu propietario" y otros loops no priorizados.
- Texto legal real del consentimiento y del préstamo.

## Preguntas abiertas para ti

1. En HU-02, ¿mostramos el rango del seguro (2-5%) o un solo número estimado (p. ej. el punto medio) para que la ficha se lea más simple?
2. En HU-06, si el score es bajo, ¿mostramos igual las modalidades de pago garantizado como "no disponibles para ti" o no las mencionamos en el lado del inquilino?
3. ¿Cuántas propiedades quieres en el marketplace: 8 alcanza para que se vea poblado, o prefieres 10-12?
4. ¿El indicador de bancarización (HU-12) va visible en la pantalla del inquilino, o solo en una vista de demo para el jurado?
