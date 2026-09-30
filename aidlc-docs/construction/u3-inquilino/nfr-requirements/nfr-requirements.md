# U3 · NFR Requirements

Hereda NFR-U1-01..11 y el stack de U1. No agrega dependencias.

- **NFR-U1-11 aplicado a U3**: todo cambio visual o de navegación del journey del inquilino actualiza las partes 2 y 4 del walkthrough (pasos 4-11 y 19-20).

Requisitos propios:
- **NFR-U3-01 (accesibilidad de formularios)**: cada campo con `<label>`, `aria-invalid` y `aria-describedby` al fallar la validación; el foco va al primer error; los mensajes dicen cómo corregir.
- **NFR-U3-02 (minimización de datos)**: solo se piden los 5 campos del lead form. No se guarda el código de verificación. El DNI no se muestra a la propietaria.
- **NFR-U3-03 (entrada no confiable)**: todo texto del inquilino se renderiza con el escape de React (sin `dangerouslySetInnerHTML`), con longitud máxima en los inputs (`maxLength`) y en la validación.
