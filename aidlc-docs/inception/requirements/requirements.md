# Requirements — Ciclo AI-DLC LLAVE

## Intent Analysis (resumen)

- **User request**: Desarrollar la deuda técnica del prototipo LLAVE y, sobre esa base saneada, completar el producto (journey del inquilino) conectándolo con el del propietario. Los módulos que dependen de otras áreas (RentScore, Legal, Riesgos, integraciones) se mantienen **simulados** (decisión 019).
- **Request type**: Refactoring / Technical-debt paydown + New Feature (journey del inquilino) + Migration (stack con build).
- **Scope estimate**: Multiple Components (afecta estructura del proyecto, motor de reglas, vista/estado, datos, despliegue).
- **Complexity estimate**: Moderate-to-Complex.

## Alcance del ciclo (decidido con el usuario)

| Tema | Decisión | Origen |
| --- | --- | --- |
| Entregable de producto | Saneamiento técnico + journey del inquilino (HU-01..HU-12) + conexión de ambos journeys | Q1=C |
| Stack | Migrar a un stack con build (Vite o Next.js; framework a elegir en Workflow/Design) | Q2=A |
| Saneamiento técnico | Pruebas + build/linting + refactor de render + tipado + accesibilidad/responsive | Q3=A,B,C,D,E |
| Módulos simulados | Detrás de interfaz explícita e intercambiable (`scoreProvider`, `legalTextProvider`, `paymentProvider`, etc.) | Q4=A, decisión 019 |
| RentScore | No se reescribe su lógica; se cubre con pruebas de caracterización | Q5=A, decisión 019 |
| Despliegue | Sitio estático en Vercel **con** paso de build (export estático) | Q6=A + clarificación 1.1=A |
| Datos | Cero datos reales; todo ficticio y etiquetado SUPUESTO | Q7=A |
| Extensión PBT | Deshabilitada (pruebas por ejemplos, no property-based) | Q8=C |
| Extensión Seguridad | Deshabilitada este ciclo (prototipo estático); buenas prácticas de front se mantienen como requisitos normales | Q9=A → clarificación 2.1=C |
| Extensión Resiliencia | Deshabilitada este ciclo (estático en CDN); se retoma con MVP | Q10=A → clarificación 2.2=C |

## Requisitos Funcionales

### Journey del propietario (existente — debe preservarse)
- **RF-01**: El flujo actual del propietario (publicar → postulantes → detalle → RentScore → aceptar → póliza → cómo cobrar → confirmación) debe seguir funcionando con paridad de comportamiento tras la migración/refactor.
- **RF-02**: La pantalla de consentimiento de solo lectura del postulante se preserva.
- **RF-03**: "Reiniciar demo" restablece el estado inicial.

### Journey del inquilino (nuevo — HU-01..HU-12 de `historias-inquilino.md`)
- **RF-04 (HU-01)**: Navegar el marketplace sin registro; grilla de propiedades con filtro básico por distrito y rango de renta; inventario 8-10 propiedades en Lima Moderna incluida la de Carmen.
- **RF-05 (HU-02)**: Ficha de propiedad con datos, rango del seguro (2-5% de la renta, etiqueta SUPUESTO) y CTA "Postular".
- **RF-06 (HU-03)**: Registro (lead form) al primer "Postular": nombre, apellido, DNI (8 dígitos), email (formato), celular (9 dígitos) + código de verificación simulado. Sin contraseña. Persistencia en `localStorage` con esquema extensible.
- **RF-07 (HU-04)**: Reconocimiento en postulaciones posteriores; reutiliza el RentScore ya calculado.
- **RF-08 (HU-05)**: Consentimiento en dos capas: (a) general para calcular el score; (b) compartir con el propietario en cada postulación. Casilla no premarcada; texto legal placeholder (módulo simulado Legal).
- **RF-09 (HU-06)**: El inquilino ve su propio RentScore: score, banda, cuota segura y consejos. No se bloquea por banda baja (aviso, no bloqueo).
- **RF-10 (HU-07)**: Enviar postulación (estado `enviada`), con la segunda capa de consentimiento. Sin límite de postulaciones.
- **RF-11 (HU-08)**: Ver "Mis postulaciones" y su estado (`enviada`, `vista`, `aceptada`, `no seleccionada`); control de demo para simular avance de estado.
- **RF-12 (HU-09)**: Retirar postulación / revocar acceso al score; reversible al reiniciar la demo.
- **RF-13 (HU-10)**: Aviso, antes de cualquier firma, de que bajo pago garantizado el inquilino figura como deudor de un préstamo de consumo (decisión 018). Texto legal placeholder (módulo simulado Legal).

### Conexión de journeys (HU-11, HU-12)
- **RF-14 (HU-11)**: La postulación del inquilino (Lucía) aparece en la bandeja del propietario (Carmen) marcada "Nuevo"; botón de demo para precargarla.
- **RF-15 (HU-12)**: Indicador de bancarización (% de postulantes que no son clientes de Interbank), etiqueta SUPUESTO.

### Módulos simulados (frontera explícita — decisión 019, Q4=A)
- **RF-16**: `scoreProvider` envuelve al RentScore actual sin alterar sus reglas; intercambiable a futuro.
- **RF-17**: `legalTextProvider` entrega textos legales placeholder (consentimiento, préstamo) marcados SUPUESTO.
- **RF-18**: `paymentProvider` / integraciones (Interbank, Interseguro, centrales de riesgo, SBS) simuladas tras interfaz; sin llamadas reales.
- **RF-19**: Cliente/no-cliente de Interbank y "central de riesgo" del no-cliente se derivan de datos ficticios, tras la misma frontera simulada.

## Requisitos No Funcionales

- **RNF-01 (Migración de stack)**: Migrar a un stack con build (Vite o Next.js). Framework concreto se decide en Workflow Planning / Application Design.
- **RNF-02 (Despliegue)**: El artefacto final es un **sitio estático** desplegable en Vercel; se permite y se espera un **paso de build** previo (export estático). Mantener `noindex`.
- **RNF-03 (Pruebas)**: Cobertura automatizada; obligatoria para el motor RentScore mediante **pruebas de caracterización** (fijan el comportamiento actual). Framework de test acorde al stack elegido. PBT no aplica.
- **RNF-04 (Calidad de código)**: Linting y formateo configurados; organización modular clara.
- **RNF-05 (Mantenibilidad de la vista)**: Reemplazar el render por concatenación de strings por un enfoque de componentes/plantillas del framework elegido.
- **RNF-06 (Tipado)**: Introducir tipado (TypeScript) para las estructuras de datos y el contrato del `scoreProvider` y demás módulos.
- **RNF-07 (Accesibilidad)**: Preservar y cerrar brechas de lo existente (foco al H1, `aria-live`, contraste de tokens, navegación por teclado). Nota: la validación WCAG completa requiere pruebas manuales con tecnologías de asistencia y revisión experta; queda fuera del alcance automatizable.
- **RNF-08 (Responsive / mobile-first)**: Mantener mobile-first; 1 columna en móvil, 2-3 desde 720px, contenedor 896px; respetar los tokens del design system.
- **RNF-09 (Seguridad de front, no como extensión bloqueante)**: Conservar el escape anti-XSS al renderizar datos; configurar cabeceras de seguridad HTTP básicas vía Vercel cuando sea trivial; usar SRI para recursos de CDN externos cuando aplique.
- **RNF-10 (Datos ficticios)**: Cero datos reales; todo valor inventado etiquetado SUPUESTO y listado en `prototype/docs/supuestos.md`.
- **RNF-11 (Paridad funcional)**: La migración/refactor no debe cambiar el comportamiento observable del journey del propietario existente.
- **RNF-12 (Walkthrough al día, decisión 020)**: Existe una guía HTML con capturas de ambos journeys (`prototype/app/public/walkthrough/`) que explica qué pasa en cada pantalla y qué debe hacer el usuario, pensada para alguien ajeno al proyecto. Todo cambio de look and feel o de navegación la actualiza en el mismo entregable (`npm run walkthrough:capturas` + textos). `npm run check` falla si una ruta no está documentada o si faltan o sobran capturas. Agregado el 2026-09-29, después del cierre de Build and Test.

## Restricciones y supuestos

- No se conectan sistemas reales de Interbank/Interseguro/centrales/SBS (todo simulado).
- No se define texto legal real (pendiente con Legal; se usan placeholders).
- Las cifras del motor (pesos, cortes, primas, comisiones) se mantienen como están (SUPUESTO); no se recalibran con Riesgos en este ciclo.

## Success Criteria

1. El journey del inquilino (HU-01..HU-12) funciona de punta a punta con datos ficticios y se conecta con el del propietario.
2. El journey del propietario mantiene paridad funcional tras la migración/refactor.
3. El proyecto corre sobre un stack con build y se despliega estático en Vercel.
4. Existe suite de pruebas automatizadas; el motor RentScore está cubierto por pruebas de caracterización que pasan.
5. Linting/formateo/tipado configurados y sin errores; render basado en componentes/plantillas.
6. Los módulos simulados están detrás de interfaces explícitas e intercambiables.
7. Cero datos reales; supuestos etiquetados y documentados.
8. El walkthrough refleja la versión vigente de la app: cubre todas sus rutas y sus capturas se regeneraron con el último cambio visual (RNF-12).

## Resumen

Ciclo de saneamiento técnico + evolución de producto sobre el prototipo LLAVE: se migra a un stack con build, se refactoriza y tipa el código, se añaden pruebas (con caracterización obligatoria del RentScore), se implementa el journey completo del inquilino y su conexión con el del propietario, y se formalizan como módulos simulados intercambiables las piezas que dependen de otras áreas. Extensiones de Seguridad y Resiliencia quedan desactivadas por tratarse de un prototipo estático; se retomarán con el MVP.
