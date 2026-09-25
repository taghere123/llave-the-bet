// RentScore del prototipo: función pura de reglas sobre datos ficticios. Sin ML, sin APIs.
// Todos los puntos, cortes y porcentajes son SUPUESTOS del prototipo (ver prototype/docs/supuestos.md).
(function (root) {
  function tramo(valor, cortes) {
    for (var i = 0; i < cortes.length; i++) {
      if (cortes[i][0](valor)) return cortes[i][1];
    }
    return 0;
  }

  // f: datos financieros del postulante; renta: renta mensual del inmueble.
  function calcular(f, renta) {
    var ratioRenta = renta / f.ingresoMensual;
    var factores = [
      {
        clave: "renta",
        max: 30,
        puntos: tramo(ratioRenta, [
          [function (r) { return r <= 0.25; }, 30],
          [function (r) { return r <= 0.30; }, 24],
          [function (r) { return r <= 0.35; }, 16],
          [function (r) { return r <= 0.40; }, 8]
        ]),
        texto: ratioRenta <= 0.30 ? "La renta es una parte manejable de sus ingresos"
          : ratioRenta <= 0.40 ? "La renta pesa bastante en sus ingresos"
          : "La renta supera lo recomendable para sus ingresos"
      },
      {
        clave: "estabilidad",
        max: 20,
        puntos: tramo(f.mesesIngresoEstable, [
          [function (m) { return m >= 24; }, 20],
          [function (m) { return m >= 12; }, 14],
          [function (m) { return m >= 6; }, 8],
          [function () { return true; }, 3]
        ]),
        texto: f.mesesIngresoEstable >= 24 ? "Ingresos regulares por más de 2 años"
          : f.mesesIngresoEstable >= 12 ? "Ingresos regulares por más de 1 año"
          : "Ingresos regulares por menos de 1 año"
      },
      {
        clave: "deuda",
        max: 20,
        puntos: tramo(f.ratioDeuda, [
          [function (d) { return d <= 0.15; }, 20],
          [function (d) { return d <= 0.30; }, 13],
          [function (d) { return d <= 0.40; }, 6]
        ]),
        texto: f.ratioDeuda <= 0.30 ? "Nivel de deuda moderado" : "Nivel de deuda alto frente a sus ingresos"
      },
      {
        clave: "puntualidad",
        max: 20,
        puntos: tramo(f.pagosPuntuales, [
          [function (p) { return p >= 0.95; }, 20],
          [function (p) { return p >= 0.85; }, 13],
          [function (p) { return p >= 0.75; }, 6]
        ]),
        texto: f.pagosPuntuales >= 0.95 ? "Paga sus obligaciones a tiempo"
          : f.pagosPuntuales >= 0.85 ? "Algunos pagos con retraso en el último año"
          : "Retrasos frecuentes en el último año"
      },
      {
        clave: "antiguedad",
        max: 10,
        puntos: tramo(f.aniosCliente, [
          [function (a) { return a >= 3; }, 10],
          [function (a) { return a >= 1; }, 6],
          [function () { return true; }, 2]
        ]),
        texto: f.aniosCliente >= 3 ? "Relación bancaria de varios años" : "Relación bancaria reciente"
      }
    ];

    var score = factores.reduce(function (s, x) { return s + x.puntos; }, 0);
    // Bandas provisionales del design system: 0-39, 40-69, 70-100.
    var banda = score >= 70 ? "alto" : score >= 40 ? "medio" : "bajo";
    // Cuota segura: 30% del ingreso mensual, redondeado hacia abajo a S/50. Supuesto.
    var cuotaSegura = Math.floor((f.ingresoMensual * 0.30) / 50) * 50;

    return { score: score, banda: banda, cuotaSegura: cuotaSegura, factores: factores };
  }

  // Prima del seguro, modelo B de la decisión 010 (2-5% de la renta), escalonada por banda. Supuesto.
  var TASA_PRIMA = { alto: 0.02, medio: 0.035, bajo: 0.05 };
  // Comisión de Cobro Garantizado: 15% de cada renta mensual. Supuesto del equipo, sin sustento actuarial.
  var COMISION_COBRO = 0.15;

  function prima(renta, banda) {
    return { tasa: TASA_PRIMA[banda], monto: Math.round(renta * TASA_PRIMA[banda]) };
  }

  function cobroGarantizado(renta) {
    var comision = Math.round(renta * COMISION_COBRO);
    return { tasa: COMISION_COBRO, comision: comision, deposito: renta - comision, anual: comision * 12 };
  }

  var api = { calcular: calcular, prima: prima, cobroGarantizado: cobroGarantizado };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.RentScore = api;
})(this);
