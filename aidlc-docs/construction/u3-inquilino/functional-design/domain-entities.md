# U3 · Domain Entities

Usa `Inquilino`, `Evaluacion` y `Postulacion` definidas en U1 (`domain/types.ts`). Agrega:

| Concepto | Detalle |
| --- | --- |
| `LeadForm` | nombre, apellido, dni, email, celular (`validation/leadForm.ts`) |
| `FiltroMarketplace` | distrito (`''` = todos), rango (`todas` \| `hasta1500` \| `1500a2000` \| `mas2000`) |
| Consejo | texto de mejora por clave de factor (renta, estabilidad, deuda, puntualidad, antiguedad) |
