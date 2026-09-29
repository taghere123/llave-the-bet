// Formatos de presentación. Mismo resultado que las utilidades del prototipo legado.

export function soles(n: number): string {
  return 'S/' + Math.round(n).toLocaleString('en-US');
}

export function pct(t: number): string {
  return (t * 100).toLocaleString('es-PE', { maximumFractionDigits: 1 }) + '%';
}

/** Fecha corta dd/mm/aaaa a partir de un ISO. */
export function fechaCorta(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function primerNombre(nombre: string): string {
  return nombre.split(' ')[0] ?? nombre;
}

export function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .filter(Boolean)
    .map((x) => x[0])
    .join('');
}
