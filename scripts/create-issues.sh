#!/usr/bin/env bash
# Crea los issues iniciales del repo con la CLI de GitHub.
# Requisitos: gh instalado y autenticado (gh auth login), y ejecutar dentro del repo.
# Uso: bash scripts/create-issues.sh
set -euo pipefail

create() {
  gh issue create --title "$1" --body "$2" --label "$3" || true
}

for l in "taller" "decision" "validacion" "riesgo"; do
  gh label create "$l" 2>/dev/null || true
done

create "Definir usuario principal y su escena" \
  "Antes del taller AI-DLC (29-30 sept). Un usuario, una escena concreta. Base para el journey." "taller"
create "Definir journey mínimo del propietario" \
  "Ver prototype/README.md. Publica, recibe postulante, RentScore, score, póliza, interés en Cobro Garantizado." "taller"
create "Listar funcionalidades críticas y supuestos a validar" \
  "Lo mínimo para una demo creíble de 3 minutos. Cada supuesto con su forma de validarlo." "taller"
create "Escribir guion de la demo" \
  "Narrativa de 3 minutos. Qué debe creer el jurado al final." "taller"
create "Cerrar decisión 010: precio del seguro" \
  "Ver decisions/010-precio-seguro.md. Bloquea narrativa y proyecciones." "decision"
create "Cerrar decisión 011: moneda y cifras" \
  "Ver decisions/011-moneda-y-cifras.md. Unificar todo a soles y fijar un caso base." "decision"
create "Cerrar decisión 012: Cobro Garantizado en el MVP" \
  "Ver decisions/012-cobro-garantizado-en-mvp.md." "decision"
create "Confirmar número de equipo y jurado con el programa" \
  "Ver decisions/014-equipo-y-jurado.md. Contacto: Luis Carlos Jiménez Lara." "decision"
create "Diseñar validación estructurada con propietarios" \
  "Guion, muestra, fecha y registro en mvp/validacion/. Sin esto no hay evidencia para el jurado." "validacion"
create "Consultar a Legal la estructura de Renta Adelantada" \
  "Cesión de cobro vs. operación crediticia (SBS). Responsable sugerido: Diego Herrera." "riesgo"
create "Averiguar si hay scoring bancario reutilizable en Interbank" \
  "Determina si el prototipo simula o conecta con datos reales. Responsable sugerido: Diego Herrera." "riesgo"
create "Reunión con Growth y Victoria sobre el portal" \
  "Ver decisions/013-portal.md." "decision"
