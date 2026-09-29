# API Documentation — LLAVE Prototipo

No hay APIs de red (REST/GraphQL). "API" aquí se refiere a las interfaces internas de JavaScript: el módulo `RentScore` y las rutas del router por hash.

## Internal API: `window.RentScore` (`prototype/src/rentscore.js`)

### `calcular(f, renta)`
- **Parámetros**:
  - `f`: objeto financiero del postulante — `{ ingresoMensual, mesesIngresoEstable, ratioDeuda, pagosPuntuales, aniosCliente }`.
  - `renta`: número, renta mensual del inmueble.
- **Retorna**: `{ score, banda, cuotaSegura, factores[] }`
  - `score`: entero 0-100 (suma de los 5 factores).
  - `banda`: `"alto"` (>=70), `"medio"` (>=40), `"bajo"` (<40).
  - `cuotaSegura`: `floor(ingresoMensual * 0.30 / 50) * 50`.
  - `factores[]`: cada uno `{ clave, max, puntos, texto }`.
- **Reglas** (todas SUPUESTO): ratio renta/ingreso (max 30), estabilidad en meses (max 20), ratio de deuda (max 20), puntualidad (max 20), antigüedad como cliente (max 10).

### `prima(renta, banda)`
- **Retorna**: `{ tasa, monto }`. Tasa por banda: alto 2%, medio 3.5%, bajo 5%. `monto = round(renta * tasa)`.

### `cobroGarantizado(renta, banda)`
- **Retorna**: si banda alto/medio `{ disponible:true, tasa, comision, deposito, anual }`; si banda bajo `{ disponible:false }`.
- Tasa: alto 3%, medio 5%. `comision = round(renta*tasa)`, `deposito = renta - comision`, `anual = comision*12`.

### `rentaAdelantada(renta, banda)`
- **Retorna**: si banda alto/medio `{ disponible:true, tasa, meses:12, total, comision, desembolso }`; si banda bajo `{ disponible:false }`.
- Tasa: alto 15%, medio 25%. `total = renta*12`, `comision = round(total*tasa)`, `desembolso = total - comision`.

## Internal API: Rutas del router (hash) — `prototype/src/app.js`

| Ruta | Pantalla | Paso | Parámetro | Notas |
| --- | --- | --- | --- | --- |
| `#/inicio` | Inicio (hero, cómo funciona) | 1 | — | Default y fallback de rutas inválidas |
| `#/publicar` | Publicar inmueble (form) | 2 | — | `montar` maneja submit |
| `#/inmueble` | Mi inmueble | 3 | — | Requiere publicado |
| `#/postulantes` | Lista de postulantes | 4 | — | 3 postulantes ficticios |
| `#/postulante/:id` | Detalle del postulante | 5 | id | Declarado vs. RentScore |
| `#/consentimiento/:id` | Autorización (solo lectura) | — | id | `rol: postulante` (cambia header) |
| `#/resultado/:id` | RentScore detallado | 6 | id | Gauge, factores, mercado, aceptar |
| `#/poliza/:id` | Póliza de seguro | 7 | id | Prima por banda |
| `#/cobro` | Elegir modalidad de cobro | 8 | — | Usa postulante aceptado |
| `#/confirmacion` | Confirmación final | 9 | — | Resumen |

Reglas del router: `render()` parsea `location.hash`; si la pantalla no existe o requiere un `id` de postulante inexistente, redirige a `#/inicio`.

## Data Models

### Postulante (`datos.js`)
- **Fields**: `id`, `nombre`, `edad`, `ocupacion`, `declarado { ingreso, garantia, mascotas }`, `financiero { ingresoMensual, mesesIngresoEstable, ratioDeuda, pagosPuntuales, aniosCliente }`.
- **Relationships**: Evaluado por `RentScore.calcular` contra `inmueble.renta`.
- **Validation**: Ninguna (datos fijos ficticios).

### Inmueble (`datos.js`)
- **Fields**: `id`, `tipo`, `direccion`, `distrito`, `dormitorios`, `area`, `renta`.
- **Validation**: En el formulario de publicar: `renta >= 300`, campos de texto con fallback a valores por defecto.

### Estado de la demo (`app.js`, en `localStorage` bajo `llave-demo-v1`)
- **Fields**: `inmueble`, `publicado` (bool), `aceptado` (id | null), `modalidad` (`estandar`|`cobro`|`adelanto`|null), `registrado` (ISO date | null).

### Referencia de mercado (`datos.js`)
- **Fields**: `{ min, max }` — rango de renta ficticio para la barra comparativa.
