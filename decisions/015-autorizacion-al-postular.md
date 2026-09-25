# 015. El inquilino autoriza ver su RentScore al postular

**Estado:** Tomada el 25 sept 2026. Responsable: equipo.

## Contexto
El journey original decía que el propietario "solicita el RentScore" y el postulante autoriza después. Eso pone un paso de espera entre el postulante y el propietario, y da lugar al caso de un postulante que rechaza.

## Decisión
La autorización se da desde el momento cero: para postular, el inquilino autoriza que el propietario vea su RentScore (score y capacidad de pago, no movimientos, saldos ni deudas). El propietario no solicita nada: ve el score de cada postulante.

## Consecuencias
- Sin autorización no se puede postular. Ya no existe el estado "no autorizó" en el lado del propietario.
- El riesgo pasa a la postulación: un inquilino que no quiera compartir sus datos no postula. Sigue siendo hipótesis secundaria del MVP (`mvp/README.md`).
- El hito del taller cambia: "publica inmueble, recibe postulante, ve el score, explora solución financiera o deja interés".
- Texto legal de la autorización: pendiente con Legal.
