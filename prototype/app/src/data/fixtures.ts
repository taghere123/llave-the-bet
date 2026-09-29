// Datos ficticios del prototipo. Ninguna persona, inmueble, DNI ni cifra es real.
// Solo los providers simulados pueden importar este módulo (frontera de la decisión 019).
import type { Financiero, PostulanteBase, Propiedad, Propietaria } from '../domain/types';

/** Fecha en que los postulantes base autorizaron su RentScore (igual que el prototipo legado). */
export const FECHA_AUTORIZACION_BASE = '25/09/2026';

export const PROPIETARIA: Propietaria = {
  nombre: 'Carmen',
  edad: 52,
  escena:
    'Tiene un departamento en Surquillo que alquila hace años. Cobra por transferencia a otro banco y pide dos meses de garantía. Su último inquilino le dejó de pagar cuatro meses.',
};

export const ID_INMUEBLE_CARMEN = 'surquillo-01';

export const INMUEBLE_CARMEN: Propiedad = {
  id: ID_INMUEBLE_CARMEN,
  tipo: 'Departamento',
  direccion: 'Jr. Dante 540, dpto. 302',
  distrito: 'Surquillo',
  dormitorios: 2,
  area: 70,
  renta: 1800,
  descripcion: 'Departamento iluminado en tercer piso, cerca de Av. Angamos. Cocina abierta.',
};

// Inventario del marketplace: 9 propiedades en Lima Moderna, incluida la de Carmen (HU-01).
export const PROPIEDADES: Propiedad[] = [
  INMUEBLE_CARMEN,
  {
    id: 'miraflores-01',
    tipo: 'Departamento',
    direccion: 'Calle Los Pinos, cuadra 3',
    distrito: 'Miraflores',
    dormitorios: 2,
    area: 78,
    renta: 2400,
    descripcion: 'A dos cuadras del malecón. Edificio con ascensor y portería.',
  },
  {
    id: 'lince-01',
    tipo: 'Departamento',
    direccion: 'Av. Arequipa, cuadra 22',
    distrito: 'Lince',
    dormitorios: 2,
    area: 62,
    renta: 1500,
    descripcion: 'Cerca del corredor de buses. Ideal para quien trabaja en el centro financiero.',
  },
  {
    id: 'jesus-maria-01',
    tipo: 'Departamento',
    direccion: 'Jr. Huiracocha, cuadra 12',
    distrito: 'Jesús María',
    dormitorios: 3,
    area: 90,
    renta: 1900,
    descripcion: 'Frente a un parque. Tres dormitorios y un baño completo.',
  },
  {
    id: 'san-borja-01',
    tipo: 'Departamento',
    direccion: 'Av. San Luis, cuadra 25',
    distrito: 'San Borja',
    dormitorios: 2,
    area: 75,
    renta: 2100,
    descripcion: 'Zona tranquila, cerca de la ciclovía. Incluye un estacionamiento.',
  },
  {
    id: 'barranco-01',
    tipo: 'Habitación',
    direccion: 'Jr. Unión, cuadra 2',
    distrito: 'Barranco',
    dormitorios: 1,
    area: 24,
    renta: 1100,
    descripcion: 'Habitación amoblada en casona compartida. Servicios incluidos.',
  },
  {
    id: 'pueblo-libre-01',
    tipo: 'Casa',
    direccion: 'Calle Los Frutales, cuadra 1',
    distrito: 'Pueblo Libre',
    dormitorios: 3,
    area: 120,
    renta: 2600,
    descripcion: 'Casa de dos pisos con patio. Acepta mascotas pequeñas.',
  },
  {
    id: 'magdalena-01',
    tipo: 'Departamento',
    direccion: 'Jr. Castilla, cuadra 8',
    distrito: 'Magdalena del Mar',
    dormitorios: 1,
    area: 45,
    renta: 1300,
    descripcion: 'Un dormitorio con vista al mar desde la sala. Edificio nuevo.',
  },
  {
    id: 'san-miguel-01',
    tipo: 'Departamento',
    direccion: 'Av. La Marina, cuadra 20',
    distrito: 'San Miguel',
    dormitorios: 2,
    area: 68,
    renta: 1600,
    descripcion: 'Cerca de centros comerciales y universidades. Segundo piso.',
  },
];

// Rango ficticio: no hay fuente verificada de rentas por distrito en context/03.
export const REFERENCIA_MERCADO = { min: 1650, max: 2000 };

// Bandeja inicial de Carmen: Jorge y Kevin (HU-11). Ambos son clientes de Interbank.
// "declarado" es lo que el propietario ve hoy (papeles falseables).
// "financiero" es lo que RentScore usa con autorización; el propietario nunca lo ve crudo.
export const POSTULANTES_BASE: PostulanteBase[] = [
  {
    id: 'jorge',
    nombre: 'Jorge Salazar',
    edad: 35,
    ocupacion: 'Diseñador independiente',
    dni: '41236598',
    esClienteInterbank: true,
    declarado: { ingreso: 7000, garantia: 'Prefiere no dejar garantía', mascotas: 'Un gato' },
    financiero: {
      ingresoMensual: 5400,
      mesesIngresoEstable: 10,
      ratioDeuda: 0.3,
      pagosPuntuales: 0.88,
      aniosCliente: 2,
    },
  },
  {
    id: 'kevin',
    nombre: 'Kevin Rojas',
    edad: 26,
    ocupacion: 'Vendedor, comisiones',
    dni: '72014536',
    esClienteInterbank: true,
    declarado: { ingreso: 5500, garantia: 'Puede dejar 1 mes', mascotas: 'No' },
    financiero: {
      ingresoMensual: 4200,
      mesesIngresoEstable: 8,
      ratioDeuda: 0.35,
      pagosPuntuales: 0.8,
      aniosCliente: 1.5,
    },
  },
];

// Lucía Paredes: protagonista del flujo del inquilino. No es clienta de Interbank.
export const LUCIA = {
  nombre: 'Lucía',
  apellido: 'Paredes',
  dni: '45872913',
  email: 'lucia.paredes@example.com',
  celular: '987654321',
  extra: { edad: 29, ocupacion: 'Analista de operaciones, planilla' },
};

// Respuesta de la "central de riesgo" simulada para Lucía (mismos valores que el prototipo legado).
export const FINANCIERO_LUCIA: Financiero = {
  ingresoMensual: 6200,
  mesesIngresoEstable: 30,
  ratioDeuda: 0.22,
  pagosPuntuales: 0.98,
  aniosCliente: 5,
};

/** Código de verificación que la pantalla muestra como SUPUESTO. Se acepta cualquier código de 6 dígitos. */
export const CODIGO_DEMO = '123456';
