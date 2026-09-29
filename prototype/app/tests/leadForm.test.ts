import { describe, expect, it } from 'vitest';
import { codigoValido, limpiarLead, validarLead, type LeadForm } from '../src/validation/leadForm';

const valido: LeadForm = {
  nombre: 'Lucía',
  apellido: 'Paredes-Ríos',
  dni: '45872913',
  email: 'lucia@example.com',
  celular: '987654321',
};

describe('validarLead', () => {
  it('acepta un formulario válido con tildes y guion', () => {
    expect(validarLead(valido)).toEqual({});
  });

  it('exige todos los campos', () => {
    const e = validarLead({ nombre: '', apellido: ' ', dni: '', email: '', celular: '' });
    expect(Object.keys(e).sort()).toEqual(['apellido', 'celular', 'dni', 'email', 'nombre']);
  });

  it.each([
    ['dni', '1234567'],
    ['dni', '1234567a'],
    ['dni', '123456789'],
    ['celular', '87654321'],
    ['celular', '887654321'],
    ['email', 'lucia@'],
    ['email', 'lucia example.com'],
    ['nombre', '<script>'],
    ['nombre', 'L'.repeat(61)],
  ] as const)('rechaza %s = %s', (campo, valor) => {
    expect(validarLead({ ...valido, [campo]: valor })[campo]).toBeTruthy();
  });

  it('normaliza espacios y el email', () => {
    expect(
      limpiarLead({ ...valido, nombre: '  Ana   María ', email: ' A@Example.COM ' }),
    ).toMatchObject({
      nombre: 'Ana María',
      email: 'a@example.com',
    });
  });
});

describe('codigoValido', () => {
  it('acepta cualquier código de 6 dígitos', () => {
    expect(codigoValido('123456')).toBe(true);
    expect(codigoValido('000001')).toBe(true);
    expect(codigoValido('12345')).toBe(false);
    expect(codigoValido('12a456')).toBe(false);
  });
});
