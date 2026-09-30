#!/bin/bash
# Sirve el prototipo LLAVE en http://localhost:8080 (solo accesible desde esta computadora).
cd "$(dirname "$0")/app" || exit 1

if ! command -v python3 >/dev/null 2>&1; then
  echo "No se encontró python3. Abre app/index.html con doble clic en su lugar."
  read -r -p "Presiona Enter para cerrar."
  exit 1
fi

PUERTO=8080
echo "LLAVE · prototipo en http://localhost:$PUERTO"
echo "Para detenerlo: Ctrl+C o cierra esta ventana."
(sleep 1 && open "http://localhost:$PUERTO/#/inicio") &
python3 -m http.server "$PUERTO" --bind 127.0.0.1
