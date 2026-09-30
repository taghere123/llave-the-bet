# Contratos del repositorio

Qué garantiza cada carpeta y documento, y cómo se cambia. Complementa las reglas del `README.md`; si algo de aquí contradice una decisión de `decisions/`, manda la decisión. Última actualización: 29 sept 2026.

| Artefacto | Qué contiene | Qué garantiza | Cómo se cambia |
| --- | --- | --- | --- |
| `context/01` a `05` | Propuesta, handoff, mercado, programa y glosario en markdown | Toda cifra lleva fuente y tipo: observada, estimada o proyectada. Los originales de `context/originals/` no se editan; las correcciones se anotan con fecha | PR con la fuente de la corrección |
| `context/03-mercado-y-fuentes.md` | Hechos de mercado y regulación | Es la referencia para cifras y competidores. Solo entra lo verificado en una página abierta, con enlace y fecha | PR; si contradice otro documento, ese documento se corrige con nota fechada |
| `context/06-recomendaciones-final.md` | Recomendaciones de UI/UX y negocio para la final | Es una propuesta y no cierra decisiones: todo cambio a una decisión vigente está abierto en `decisions/021` a `025`. Es la copia versionada del doc vivo en Claude Docs y manda sobre él | PR que actualice el texto y sus diagramas en `context/originals/06-recomendaciones-*.png` |
| `decisions/` | Una decisión por archivo, con índice en su `README.md` | Es la única fuente de lo decidido. Cada archivo tiene estado, responsable y fecha. Nada se revierte en silencio: se abre o actualiza una decisión | Archivo nuevo o actualización fechada, más su fila en el índice |
| `prototype/` | Prototipo navegable (`app/`) y legado (`src/`, `data/`) | Solo datos ficticios. Todo valor inventado lleva la etiqueta SUPUESTO y está en `prototype/docs/supuestos.md`. Las integraciones van detrás de providers simulados (decisión 019) y el RentScore no cambia sin Riesgos | PR con `npm run check` en verde |
| `mvp/` | Especificación del piloto de 90 días | Solo se llama «entrevista» a lo documentado en `mvp/validacion/` | PR |
| `aidlc-docs/` | Documentación del ciclo AI-DLC | `audit.md` registra con fecha cada interacción del ciclo | Lo actualiza el flujo AI-DLC |

## Reglas transversales

- Nada real en el repo: ni datos de clientes, ni credenciales, ni documentos internos confidenciales.
- Cambios por rama y pull request, con traza de quién decidió qué.
- Una afirmación de mercado sin una fuente abierta no entra, aunque venga de una herramienta de IA.
