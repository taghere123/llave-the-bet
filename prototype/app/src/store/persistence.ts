// Única pieza que conoce localStorage. Valida la forma al cargar (BR-ST-02) y
// degrada a memoria si el storage no está disponible (BR-ST-03).
import { ESTADOS_POSTULACION, MODALIDADES } from '../domain/types';
import { CLAVE_STORAGE, VERSION_ESTADO, type DemoState } from './state';

type Registro = Record<string, unknown>;

const esObjeto = (x: unknown): x is Registro => typeof x === 'object' && x !== null;
const esTexto = (x: unknown): x is string => typeof x === 'string';
const esNumero = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x);
const textoONulo = (x: unknown) => x === null || esTexto(x);

function esPropiedad(x: unknown): boolean {
  return (
    esObjeto(x) &&
    esTexto(x.id) &&
    esTexto(x.tipo) &&
    esTexto(x.direccion) &&
    esTexto(x.distrito) &&
    esTexto(x.descripcion) &&
    esNumero(x.dormitorios) &&
    esNumero(x.area) &&
    esNumero(x.renta)
  );
}

function esInquilino(x: unknown): boolean {
  return (
    esObjeto(x) &&
    ['nombre', 'apellido', 'dni', 'email', 'celular', 'registradoEn'].every((k) => esTexto(x[k])) &&
    typeof x.esClienteInterbank === 'boolean'
  );
}

function esEvaluacion(x: unknown): boolean {
  if (!esObjeto(x) || !esObjeto(x.financiero) || !esTexto(x.fecha)) return false;
  const f = x.financiero;
  return (
    (x.fuente === 'interbank' || x.fuente === 'central') &&
    ['ingresoMensual', 'mesesIngresoEstable', 'ratioDeuda', 'pagosPuntuales', 'aniosCliente'].every(
      (k) => esNumero(f[k]),
    ) &&
    (f.ingresoMensual as number) > 0
  );
}

function esPostulacion(x: unknown): boolean {
  return (
    esObjeto(x) &&
    esTexto(x.id) &&
    esTexto(x.propiedadId) &&
    esTexto(x.dni) &&
    esTexto(x.fecha) &&
    typeof x.scoreCompartido === 'boolean' &&
    (ESTADOS_POSTULACION as readonly unknown[]).includes(x.estado) &&
    (x.modalidad === null || (MODALIDADES as readonly unknown[]).includes(x.modalidad))
  );
}

export function esEstadoValido(x: unknown): x is DemoState {
  return (
    esObjeto(x) &&
    x.version === VERSION_ESTADO &&
    esPropiedad(x.inmueble) &&
    typeof x.publicado === 'boolean' &&
    textoONulo(x.aceptado) &&
    (x.modalidad === null || (MODALIDADES as readonly unknown[]).includes(x.modalidad)) &&
    textoONulo(x.registrado) &&
    (x.inquilino === null || esInquilino(x.inquilino)) &&
    (x.evaluacion === null || esEvaluacion(x.evaluacion)) &&
    Array.isArray(x.postulaciones) &&
    x.postulaciones.every(esPostulacion) &&
    textoONulo(x.pendiente)
  );
}

function storage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

/** Carga el estado guardado. Si no existe, es de otra versión o está corrupto, usa el inicial. */
export function cargar(inicial: () => DemoState): DemoState {
  try {
    const crudo = storage()?.getItem(CLAVE_STORAGE);
    if (!crudo) return inicial();
    const parsed: unknown = JSON.parse(crudo);
    return esEstadoValido(parsed) ? parsed : inicial();
  } catch {
    return inicial();
  }
}

export function guardar(state: DemoState): void {
  try {
    storage()?.setItem(CLAVE_STORAGE, JSON.stringify(state));
  } catch {
    // Sin storage (modo privado o cuota llena): la demo sigue en memoria.
  }
}
