// Piezas del RentScoreCard: gauge, factores y barra de mercado. Mismo dibujo que el prototipo legado.
import type { Factor } from '../domain/types';
import { soles } from '../domain/format';

export function Gauge({ score, color }: { score: number; color: string }) {
  const t = Math.max(0.001, score / 100);
  const a = Math.PI * (1 - t);
  const x = (110 + 100 * Math.cos(a)).toFixed(1);
  const y = (112 - 100 * Math.sin(a)).toFixed(1);
  return (
    <div className="g" role="img" aria-label={`RentScore ${score} de 100`}>
      <svg viewBox="0 0 220 122" aria-hidden="true">
        <path
          d="M10 112 A100 100 0 0 1 210 112"
          fill="none"
          style={{ stroke: 'var(--border)' }}
          strokeWidth="16"
        />
        <path
          d={`M10 112 A100 100 0 0 1 ${x} ${y}`}
          fill="none"
          style={{ stroke: color }}
          strokeWidth="16"
        />
      </svg>
      <div className="g-num" aria-hidden="true">
        {score}
        <span> / 100</span>
      </div>
    </div>
  );
}

function colorFactor(q: number): string {
  return q >= 0.7
    ? 'var(--status-success)'
    : q >= 0.4
      ? 'var(--status-warning)'
      : 'var(--status-danger)';
}

export function Factores({ factores }: { factores: Factor[] }) {
  return (
    <div className="fx">
      {factores.map((f) => {
        const q = f.puntos / f.max;
        return (
          <div className="fx-i" key={f.clave}>
            <span>{f.texto}</span>
            <span className="fx-b" aria-hidden="true">
              <i
                style={{
                  width: `${Math.max(4, Math.round(q * 100))}%`,
                  background: colorFactor(q),
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function BarraMercado({
  renta,
  min,
  max,
  dormitorios,
  distrito,
}: {
  renta: number;
  min: number;
  max: number;
  dormitorios: number;
  distrito: string;
}) {
  const lo = min - 400;
  const hi = max + 400;
  const pos = (valor: number) => Math.min(100, Math.max(0, ((valor - lo) / (hi - lo)) * 100));
  const dentro = renta >= min && renta <= max;
  return (
    <>
      <p className="body-sm">
        Tu renta está <b>{dentro ? 'dentro' : 'fuera'} del rango</b> para {dormitorios} dorm. en{' '}
        {distrito}.
      </p>
      <div
        className="mk"
        role="img"
        aria-label={`Tu renta de ${soles(renta)} frente al rango de ${soles(min)} a ${soles(max)}`}
      >
        <span className="mk-r" style={{ left: `${pos(min)}%`, width: `${pos(max) - pos(min)}%` }} />
        <span className="mk-p" style={{ left: `${pos(renta)}%` }} />
      </div>
      <div className="mk-l">
        <span>{soles(min)}</span>
        <span>Tú: {soles(renta)}</span>
        <span>{soles(max)}</span>
      </div>
    </>
  );
}
