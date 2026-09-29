# U3 · NFR Requirements

Hereda NFR-U1-01..10 y el stack de U1. No agrega dependencias.

Requisitos propios:
- **NFR-U3-01 (accesibilidad de formularios)**: cada campo con `<label>`, `aria-invalid` y `aria-describedby` al fallar la validación; el foco va al primer error; los mensajes dicen cómo corregir.
- **NFR-U3-02 (minimización de datos)**: solo se piden los 5 campos del lead form. No se guarda el código de verificación. El DNI no se muestra a la propietaria.
- **NFR-U3-03 (entrada no confiable)**: todo texto del inquilino se renderiza con el escape de React (sin `dangerouslySetInnerHTML`), con longitud máxima en los inputs (`maxLength`) y en la validación.
