# LLAVE - Hogares que abren oportunidades

Iniciativa del Equipo 22 para The Bet (Interbank, IFS, Interseguro, con Amazon/AWS).

RentScore evalúa al inquilino con datos bancarios reales. Un seguro de impago pagado por el inquilino reemplaza el depósito. Opcionalmente, Interbank garantiza o adelanta la renta al propietario.

**Repo privado. No subir datos reales de clientes, credenciales ni documentos internos confidenciales. Todo dato en `/prototype` es inventado.**

## Estado (25 sept 2026)

Hay propuesta, pero no hay producto. Sin código, sin prototipo, sin validación con usuarios. Próximo hito: **taller AI-DLC, 29-30 sept, Torre Interbank, asistencia obligatoria.**

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

## Lectura para quien se incorpora (30 min)

1. Este README.
2. `context/02-handoff.md`.
3. `decisions/` completo, empezando por las abiertas (010, 011, 012).
4. `context/01-propuesta-big-idea.md`.
5. `context/04-programa-y-calendario.md`.

## Equipo

William Salinas (negocio y narrativa), Carlos Segura (producto digital e IA), Diego Moscoso (prototipado con IA), Diego Herrera (viabilidad bancaria y financiera).

## Reglas de trabajo

- Toda decisión nueva va en `decisions/` con estado, responsable y fecha.
- Toda cifra lleva su fuente y su tipo: observada, estimada o proyectada.
- Si un documento contradice a otro, no se elige uno en silencio: se abre o actualiza una decisión.
- Cambios por rama y pull request, aunque sean cuatro personas. Deja traza de quién decidió qué.
- No confiar en cifras o competidores que salgan de una herramienta de IA sin verificar la fuente. Hubo alucinaciones en este proyecto.
