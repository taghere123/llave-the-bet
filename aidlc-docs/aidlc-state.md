# AI-DLC State Tracking

## Project Information
- **Project Name**: LLAVE - Hogares que abren oportunidades (The Bet, Equipo 22)
- **Project Type**: Brownfield
- **Start Date**: 2026-09-29T00:00:00Z
- **Current Stage**: CONSTRUCTION - Build and Test (completo). Siguiente: OPERATIONS (placeholder)

## Workspace State
- **Existing Code**: Yes
- **Programming Languages**: JavaScript (vanilla), HTML, CSS (legado); TypeScript + React (app migrada)
- **Build System**: Legado sin build. App migrada: npm + Vite (`prototype/app`), deploy en Vercel vía vercel.json
- **Project Structure**: Prototipo estático navegable (mobile-first, sin backend, datos en JS local, persistencia en localStorage)
- **Reverse Engineering Needed**: Yes (no existen artefactos previos)
- **Workspace Root**: /Users/diego/Documents/Interseguro/la_llave/llave-the-bet

## Code Location Rules
- **Application Code**: Workspace root (NUNCA en aidlc-docs/); el prototipo vive en prototype/
- **Documentation**: aidlc-docs/ solamente
- **Structure patterns**: Ver code-generation.md

## Extension Configuration
| Extension | Enabled | Decided At |
|---|---|---|
| Property-Based Testing | No | Requirements Analysis |
| Security Baseline | No | Requirements Analysis (clarificación 2.1=C: prototipo estático sin backend/datos reales; se retoma con MVP) |
| Resiliency Baseline | No | Requirements Analysis (clarificación 2.2=C: sitio estático en CDN Vercel; se retoma con MVP) |

Notas:
- PBT deshabilitado (Q8=C), pero SÍ habrá pruebas del motor RentScore por caracterización con ejemplos (Q5=A).
- Seguridad/Resiliencia desactivadas para este ciclo por ser prototipo estático. Se conservan buenas prácticas de front (anti-XSS, cabeceras vía Vercel) como requisitos normales, no como extensión bloqueante.

## Reverse Engineering Status
- [x] Reverse Engineering - Completed on 2026-09-29T00:05:00Z
- **Artifacts Location**: aidlc-docs/inception/reverse-engineering/

## Execution Plan Summary
- **Stages to Execute**: Application Design, Units Generation, Functional Design, NFR Requirements, Code Generation, Build and Test
- **Stages to Skip**: NFR Design (sin patrones NFR complejos), Infrastructure Design (sin infraestructura; deploy estático en Vercel)
- **Risk Level**: Medium

## Stage Progress
### 🔵 INCEPTION PHASE
- [x] Workspace Detection
- [x] Reverse Engineering (aprobado)
- [x] Requirements Analysis (aprobado)
- [x] User Stories (aprobado)
- [x] Workflow Planning (aprobado)
- [x] Application Design — EXECUTE (aprobado)
- [x] Units Generation — EXECUTE (aprobado)

### 🟢 CONSTRUCTION PHASE
Checkpoints por unidad auto-aprobados por delegación del usuario (audit 00:45).

| Unidad | Functional Design | NFR Requirements | Code Generation |
|---|---|---|---|
| U1 Base y tooling | [x] | [x] (define el stack) | [x] |
| U2 Propietaria | [x] | [x] (hereda + paridad) | [x] |
| U3 Inquilino | [x] | [x] (hereda + formularios) | [x] |
| U4 Conexión | [x] | [x] (hereda + demo) | [x] |

- [ ] NFR Design — SKIP
- [ ] Infrastructure Design — SKIP
- [x] Build and Test — 64/64 pruebas, build OK, npm audit 0 (2026-09-29)

## Current Status
- **Código**: `prototype/app/` (Vite + React + TypeScript). Legado intacto en `prototype/src` y `prototype/data`.
- **Walkthrough (decisión 020, 2026-09-29)**: `prototype/app/public/walkthrough/` con 24 capturas generadas por `npm run walkthrough:capturas`; `npm run check` incluye `walkthrough:verificar`. Desde el 2026-09-30 la guía es parte del artefacto de Vercel: `build` y `build:local` la validan antes y verifican la copia en la salida después (`--salida`); `vercel.json` redirige `/walkthrough`. Regla transversal: todo cambio de look and feel o navegación en cualquier unidad actualiza la guía (RNF-12, NFR-U1-11, reglas de Code Generation y Build and Test, steering `.kiro/steering/walkthrough.md`).
- **Pendientes humanos**: revisión manual de paridad visual; verificar cabeceras y el redirect `/walkthrough` tras el primer deploy; revisar los textos del walkthrough; commit/PR (no realizado por el agente).

### 🟡 OPERATIONS PHASE
- [ ] Operations — PLACEHOLDER
