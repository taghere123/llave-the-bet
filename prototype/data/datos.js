// Datos ficticios del prototipo. Ninguna persona, inmueble ni cifra es real.
// Se cargan como script (no JSON) para que index.html funcione con doble clic, sin servidor.
window.LLAVE_DATA = {
  hoy: "25/09/2026",

  propietaria: {
    nombre: "Carmen",
    edad: 52,
    escena: "Tiene un departamento en Surquillo que alquila hace años. Cobra por transferencia a otro banco y pide dos meses de garantía. Su último inquilino le dejó de pagar cuatro meses."
  },

  inmueble: {
    id: "surquillo-01",
    tipo: "Departamento",
    direccion: "Jr. Dante 540, dpto. 302",
    distrito: "Surquillo",
    dormitorios: 2,
    area: 70,
    renta: 1800
  },

  // Rango ficticio: no hay fuente verificada de rentas por distrito en context/03.
  referenciaMercado: { min: 1650, max: 2000 },

  // "declarado" es lo que el propietario ve hoy (papeles falseables).
  // "financiero" es lo que RentScore usaría con autorización; el propietario nunca lo ve crudo.
  postulantes: [
    {
      id: "lucia",
      nombre: "Lucía Paredes",
      edad: 29,
      ocupacion: "Analista de operaciones, planilla",
      declarado: { ingreso: 6000, garantia: "Puede dejar 2 meses si se lo piden", mascotas: "No" },
      financiero: { ingresoMensual: 6200, mesesIngresoEstable: 30, ratioDeuda: 0.22, pagosPuntuales: 0.98, aniosCliente: 5 }
    },
    {
      id: "jorge",
      nombre: "Jorge Salazar",
      edad: 35,
      ocupacion: "Diseñador independiente",
      declarado: { ingreso: 7000, garantia: "Prefiere no dejar garantía", mascotas: "Un gato" },
      financiero: { ingresoMensual: 5400, mesesIngresoEstable: 10, ratioDeuda: 0.30, pagosPuntuales: 0.88, aniosCliente: 2 }
    },
    {
      id: "kevin",
      nombre: "Kevin Rojas",
      edad: 26,
      ocupacion: "Vendedor, comisiones",
      declarado: { ingreso: 5500, garantia: "Puede dejar 1 mes", mascotas: "No" },
      financiero: { ingresoMensual: 4200, mesesIngresoEstable: 8, ratioDeuda: 0.35, pagosPuntuales: 0.80, aniosCliente: 1.5 }
    }
  ]
};
