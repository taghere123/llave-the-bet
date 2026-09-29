// Validación del lead form (HU-03). Mensajes en lenguaje claro, uno por campo.

export interface LeadForm {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  celular: string;
}

export type ErroresLead = Partial<Record<keyof LeadForm, string>>;

const MAX_NOMBRE = 60;
const MAX_EMAIL = 120;
// Letras (incluye tildes y ñ), espacios, apóstrofo y guion.
const RE_NOMBRE = /^[\p{L}][\p{L}\s'-]*$/u;
const RE_DNI = /^\d{8}$/;
const RE_CELULAR = /^9\d{8}$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_CODIGO = /^\d{6}$/;

function validarNombre(valor: string, campo: string): string | undefined {
  const v = valor.trim();
  if (!v) return `Escribe tu ${campo}.`;
  if (v.length > MAX_NOMBRE) return `Usa como máximo ${MAX_NOMBRE} caracteres.`;
  if (!RE_NOMBRE.test(v))
    return `Tu ${campo} solo puede tener letras, espacios, apóstrofo o guion.`;
  return undefined;
}

export function validarLead(form: LeadForm): ErroresLead {
  const errores: ErroresLead = {};
  const nombre = validarNombre(form.nombre, 'nombre');
  if (nombre) errores.nombre = nombre;
  const apellido = validarNombre(form.apellido, 'apellido');
  if (apellido) errores.apellido = apellido;

  if (!RE_DNI.test(form.dni.trim()))
    errores.dni = 'El DNI tiene 8 dígitos, sin letras ni espacios.';

  const email = form.email.trim();
  if (!email) errores.email = 'Escribe tu email.';
  else if (email.length > MAX_EMAIL || !RE_EMAIL.test(email))
    errores.email = 'Revisa el formato del email, por ejemplo nombre@correo.com.';

  if (!RE_CELULAR.test(form.celular.trim()))
    errores.celular = 'El celular tiene 9 dígitos y empieza con 9.';

  return errores;
}

export function limpiarLead(form: LeadForm): LeadForm {
  return {
    nombre: form.nombre.trim().replace(/\s+/g, ' '),
    apellido: form.apellido.trim().replace(/\s+/g, ' '),
    dni: form.dni.trim(),
    email: form.email.trim().toLowerCase(),
    celular: form.celular.trim(),
  };
}

export function codigoValido(codigo: string): boolean {
  return RE_CODIGO.test(codigo.trim());
}
