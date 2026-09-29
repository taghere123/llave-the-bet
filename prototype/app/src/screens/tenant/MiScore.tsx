import { Factores, Gauge } from '../../components/RentScoreCard';
import { BANDA, Badge, Nota, Sup } from '../../components/ui';
import { soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { propiedad } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import { consejos } from './consejos';

/** El inquilino ve su propio RentScore completo (HU-06). */
export function MiScore() {
  const { state } = useStore();
  const { data, score } = useProviders();
  const ev = state.evaluacion;
  if (!ev) return null;
  const pendiente = propiedad(state, data, state.pendiente ?? undefined);
  // La cuota segura no depende de la renta; con ella se fija la renta de referencia si no hay pendiente.
  const cuota = score.evaluar(ev.financiero, 1).cuotaSegura;
  const renta = pendiente?.renta ?? Math.max(1, cuota);
  const r = score.evaluar(ev.financiero, renta);
  const b = BANDA[r.banda];

  return (
    <>
      <div className="stack">
        <span className="eye">Mi RentScore</span>
        <h1 className="h1">
          Tu RentScore es <b>{r.score}</b>
        </h1>
        <p className="body-sm muted">
          {pendiente
            ? `Calculado para ${pendiente.direccion} (${soles(renta)} al mes).`
            : `Calculado para una renta igual a tu cuota segura (${soles(renta)} al mes).`}{' '}
          Tu score cambia según la renta de cada propiedad.
        </p>
      </div>
      <div className="g2">
        <section className="card">
          <Gauge score={r.score} color={b.color} />
          <Badge tono={b.tono} className="centro">
            {b.txt}
          </Badge>
          <div className="kv">
            <span>
              Tu cuota segura <Sup texto="30% del ingreso mensual verificado" />
            </span>
            <b>{soles(r.cuotaSegura)}</b>
          </div>
          <div className="kv">
            <span>
              Fuente <Sup texto="Consulta simulada; no hay integración real" />
            </span>
            <b>{ev.fuente === 'interbank' ? 'Datos de Interbank' : 'Centrales de riesgo'}</b>
          </div>
          <p className="caption">
            Calculado al instante <Sup texto="El Big Idea indica hasta 48 horas" /> · Bandas
            provisionales
          </p>
        </section>
        <div className="stack">
          {r.banda === 'bajo' && (
            <Nota tono="warn">
              Tu score es bajo para esta renta. Igual puedes postular; el propietario no podrá
              activar Cobro Garantizado ni Renta Adelantada contigo.
            </Nota>
          )}
          <section className="card flat">
            <span className="eye">Por qué este score</span>
            <Factores factores={r.factores} />
          </section>
          <section className="card flat">
            <span className="eye">Cómo mejorarlo</span>
            <ul className="consejos" data-testid="mi-score-consejos">
              {consejos(r.factores).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <p className="nota">
        Conocer tu RentScore es gratis y es tu primer paso hacia un crédito hipotecario{' '}
        <Sup texto="Propuesta de valor del Big Idea, referencial" />.
      </p>
      <div className="acciones fila">
        {pendiente ? (
          <a
            className="btn"
            href={href('postular', pendiente.id)}
            data-testid="mi-score-continuar-link"
          >
            Continuar con mi postulación
          </a>
        ) : (
          <a className="btn" href={href('marketplace')} data-testid="mi-score-continuar-link">
            Ver propiedades
          </a>
        )}
        <a className="btn sec" href={href('mis-postulaciones')}>
          Mis postulaciones
        </a>
      </div>
    </>
  );
}
