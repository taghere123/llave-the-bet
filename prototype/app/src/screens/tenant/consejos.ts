import type { Factor } from '../../domain/types';

// Consejos por factor del RentScore (HU-06). Textos del prototipo, sin validar con Riesgos.
const CONSEJOS: Record<string, string> = {
  renta: 'Busca una renta de hasta el 30% de tus ingresos: ese factor pesa 30 de los 100 puntos.',
  estabilidad: 'Mantener ingresos regulares por más de 2 años suma hasta 20 puntos.',
  deuda: 'Bajar tus deudas a menos del 15% de tus ingresos suma hasta 20 puntos.',
  puntualidad: 'Pagar todas tus cuotas a tiempo durante el año suma hasta 20 puntos.',
  antiguedad: 'Una relación financiera de 3 años o más suma hasta 10 puntos.',
};

/** Los 2 factores más débiles (3 si hay empate en el segundo lugar), del más débil al más fuerte. */
export function consejos(factores: Factor[]): string[] {
  const orden = [...factores].sort((a, b) => a.puntos / a.max - b.puntos / b.max);
  const segundo = orden[1];
  const elegidos = orden.filter(
    (f, i) =>
      i < 2 ||
      (i === 2 && segundo !== undefined && f.puntos / f.max === segundo.puntos / segundo.max),
  );
  return elegidos.map((f) => CONSEJOS[f.clave]).filter((t): t is string => Boolean(t));
}
