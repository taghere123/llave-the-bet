# U1 · Business Rules

## Motor RentScore (sin cambios, decisión 019)
| ID | Regla | Valor (SUPUESTO) |
| --- | --- | --- |
| BR-RS-01 | Factores y pesos | renta/ingreso 30, estabilidad 20, deuda 20, puntualidad 20, antigüedad 10 |
| BR-RS-02 | Bandas | alto >= 70, medio >= 40, bajo < 40 |
| BR-RS-03 | Cuota segura | floor(ingreso × 0.30 / 50) × 50 |
| BR-RS-04 | Tramos por factor | Idénticos a `prototype/src/rentscore.js` |

## Condiciones comerciales (`paymentProvider`, delegan en el motor)
| ID | Regla | Valor (SUPUESTO) |
| --- | --- | --- |
| BR-PAY-01 | Prima por banda | alto 2%, medio 3.5%, bajo 5% de la renta, redondeada |
| BR-PAY-02 | Rango del seguro en la ficha | min = round(renta × 2%), max = round(renta × 5%) (decisión 010) |
| BR-PAY-03 | Cobro Garantizado | alto 3%, medio 5% mensual; no disponible con banda baja |
| BR-PAY-04 | Renta Adelantada | 12 meses; alto 15%, medio 25%; no disponible con banda baja |

## Estado y persistencia
| ID | Regla |
| --- | --- |
| BR-ST-01 | El estado se guarda en `localStorage` con la clave `llave-demo-v2` en cada cambio |
| BR-ST-02 | Al cargar se valida la forma (versión, tipos, estados permitidos). Un estado inválido o de otra versión se descarta y se arranca del estado inicial |
| BR-ST-03 | Si `localStorage` no está disponible, la demo funciona en memoria sin error |
| BR-ST-04 | El reducer es puro: ids y fechas llegan en el payload de la acción |

## Frontera de simulación
| ID | Regla |
| --- | --- |
| BR-SIM-01 | La UI no importa el motor, los datos ficticios ni los textos legales: los consume a través de los providers |
| BR-SIM-02 | Todo texto legal es placeholder y se marca SUPUESTO |
