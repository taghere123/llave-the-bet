# Services — Application Design

Capa de orquestación entre la UI y los providers simulados. En un front sin backend, los "servicios" son módulos del cliente.

## demoStore (servicio central de estado)
- **Responsabilidad**: mantener el estado de la demo y coordinar las acciones de ambos roles.
- **Orquestación**:
  - Al **publicar** (US-P01): valida y persiste el inmueble; marca `publicado`.
  - Al **evaluar/aceptar** (US-P02): pide score a `scoreProvider`, prima a `scoreProvider.prima`; fija aceptado.
  - Al **elegir cobro** (US-P03): consulta `paymentProvider`; persiste modalidad.
  - Al **registrar inquilino** (US-I03): valida lead form; persiste `inquilino` extensible.
  - Al **consentir** (US-I05): registra las dos capas; usa `legalTextProvider` para textos.
  - Al **postular** (US-I07): crea `Postulacion` `enviada`; si es la propiedad de Carmen, la agrega a su bandeja como "Nuevo" (US-C01).
  - **Mis postulaciones / estados** (US-I08): lee/actualiza estados (con control de demo).
  - **Retiro/revocación** (US-I09): cambia estado a `retirada` / baja `scoreCompartido`.
  - **Bancarización** (US-C02): calcula métrica desde las postulaciones/leads.
- **Depende de**: `persistence`, `scoreProvider`, `paymentProvider`, `legalTextProvider`, `dataProvider`.

## persistence (servicio)
- **Responsabilidad**: aislar `localStorage`; cargar/guardar/reiniciar con esquema versionado (`llave-demo-vN`) y degradación elegante si falla el storage.

## router (servicio)
- **Responsabilidad**: mapear rutas a pantallas por rol; redirigir rutas inválidas al inicio del rol correspondiente; fijar título y foco (accesibilidad).

## Providers simulados (servicios de frontera — decisión 019)
- **scoreProvider**: única puerta hacia el motor RentScore actual; permite reemplazo futuro por servicio real sin tocar la UI.
- **paymentProvider**: simula póliza y modalidades; futura integración Interbank/Interseguro.
- **legalTextProvider**: textos placeholder; futura integración con contenidos de Legal.
- **dataProvider**: propiedades/inquilinos/postulantes ficticios; futura integración con marketplace/centrales reales.

## Patrón de composición
- Providers expuestos por **React Context**; los componentes consumen el store y los providers vía hooks.
- Todas las llamadas a lógica sensible pasan por un provider (no se importa `RentScore` directo en la UI). Esto materializa la frontera de simulación.
