# LLAVE - Hogares que abren oportunidades

Iniciativa del Equipo 22 para The Bet (Interbank, IFS, Interseguro, con Amazon/AWS).

RentScore evalúa al inquilino con datos bancarios reales. Un seguro de hogar pagado por el inquilino protege el inmueble de daños. Opcionalmente, Interbank garantiza la renta (cubre el impago) o la adelanta al propietario.

**Repo privado. No subir datos reales de clientes, credenciales ni documentos internos confidenciales. Todo dato en `/prototype` es inventado.**

## Estado (29 sept 2026)

Hay propuesta y un prototipo navegable con datos ficticios y dos journeys conectados (`prototype/app`), pero no hay producto ni validación con usuarios. Las recomendaciones para la final están en `context/06-recomendaciones-final.md`, con cinco decisiones abiertas (021 a 025). Próximo hito: **cierre del taller AI-DLC (30 sept) y selección de finalistas (sin fecha).**

## Cómo navegar

| Carpeta | Qué hay |
| --- | --- |
| `context/` | Todo el contexto en markdown: propuesta, handoff, mercado, programa, glosario |
| `context/originals/` | Archivos originales (docx, PDF, imágenes) |
| `decisions/` | Decisiones tomadas y decisiones abiertas, una por archivo |
| `prototype/` | Prototipo navegable con datos falsos (taller AI-DLC) |
| `mvp/` | Especificación del piloto de 90 días |
| `scripts/` | Utilidades, incluido el script para crear los issues iniciales |
| `CLAUDE.md` | Contexto para herramientas de IA. Se lee automáticamente |
| `CONTRATOS.md` | Qué garantiza cada carpeta y documento, y cómo se cambia |

## Lectura para quien se incorpora (30 min)

1. Este README.
2. `context/02-handoff.md`.
3. `decisions/` completo, empezando por las abiertas (011, 013, 014 y 021 a 025).
4. `context/01-propuesta-big-idea.md`.
5. `context/04-programa-y-calendario.md`.
6. `context/06-recomendaciones-final.md`: recomendaciones de UI/UX y negocio para la final, con las preguntas del jurado.

## Equipo

William Salinas (negocio y narrativa), Carlos Segura (producto digital e IA), Diego Moscoso (prototipado con IA), Diego Herrera (viabilidad bancaria y financiera).

## Reglas de trabajo

- Toda decisión nueva va en `decisions/` con estado, responsable y fecha.
- Toda cifra lleva su fuente y su tipo: observada, estimada o proyectada.
- Si un documento contradice a otro, no se elige uno en silencio: se abre o actualiza una decisión.
- Cambios por rama y pull request, aunque sean cuatro personas. Deja traza de quién decidió qué.
- No confiar en cifras o competidores que salgan de una herramienta de IA sin verificar la fuente. Hubo alucinaciones en este proyecto.
