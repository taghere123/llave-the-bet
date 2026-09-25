Resultado de la evaluación de un postulante: gauge semicircular de 0 a 100, banda de score con texto, capacidad de pago recomendada frente a la renta y la constancia de autorización de datos. Es el componente central del MVP (paso "visualiza score").

**Bandas.** Alto (70 a 100) = `status-success`; medio (40 a 69) = `status-warning` con texto ink; bajo (0 a 39) = `status-danger`. Los cortes son provisionales hasta que Riesgos defina el modelo. La banda siempre se dice con palabras además del color; los tres tonos difieren en luminosidad, no solo en matiz.

**Reglas.** Nunca mostrar datos bancarios crudos del postulante, solo el score y la capacidad de pago. Mostrar siempre la fecha de autorización. La forma firma se mantiene.

**El consumidor aporta** score, banda, capacidad de pago, renta y fecha de autorización. Los valores del preview son ficticios.