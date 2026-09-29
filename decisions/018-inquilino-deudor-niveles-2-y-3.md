# 018. En Cobro Garantizado y Renta Adelantada, el deudor es el inquilino y el beneficiario es el propietario

**Estado:** Tomada el 29 sept 2026. Responsable: equipo. Aclara la decisión 016. Pendiente: Legal, Riesgos y SBS.

## Contexto
La decisión 016 dejó los niveles 2 (Cobro Garantizado) y 3 (Renta Adelantada) como préstamo de consumo de Interbank a tasa cero, con la comisión como interés implícito, y dejó explícitamente abierto "quién es el deudor". El flujo del inquilino obliga a cerrarlo: si el inquilino es deudor de un préstamo, tiene que saberlo y firmarlo, y eso cambia su journey.

## Decisión
- El **deudor** del préstamo de consumo es el **inquilino**.
- El **beneficiario** del desembolso o del depósito mensual es el **propietario**.
- La **comisión** (3% / 5% en Cobro Garantizado; 15% / 25% en Renta Adelantada) la absorbe el **propietario**, como descuento sobre lo que recibe. Es la hipótesis central del MVP: el propietario paga por la garantía de cobro.

En una frase: Interbank presta al inquilino, le paga al propietario, y el inquilino le devuelve a Interbank mes a mes. La comisión que sale del bolsillo del propietario es el interés implícito de ese préstamo.

## Consecuencias
- El flujo del inquilino incluye una pantalla donde se le informa, **antes de firmar**, que su postulación fue aceptada bajo una modalidad de pago garantizado en la que él figura como deudor de un préstamo de consumo con Interbank.
- El reporte a centrales de riesgo por ese crédito recae en el inquilino. Debe declararse con transparencia. Esto es material y va a Legal junto con la 016.
- Tensión de negocio a resolver con Legal y Riesgos: el costo lo paga el propietario pero la obligación y el riesgo crediticio son del inquilino. Hay que confirmar que la estructura es válida y transparente (TCEA, topes de tasa).
- El prototipo refleja esta estructura en la pantalla de aceptación del inquilino, con la etiqueta SUPUESTO y sin texto legal (pendiente con Legal).
- No cambia el pricing de 012 ni 016; solo fija los roles.
