import { BarraMercado, Factores, Gauge } from '../../components/RentScoreCard';
import { Avatar, BANDA, Badge, indiceAvatar, Nota, Sup } from '../../components/ui';
import { primerNombre, soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { href, ir } from '../../router';
import { aplicante } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

export function Resultado({ id }: PropsPantalla) {
  const { state, dispatch } = useStore();
  const { data, score } = useProviders();
  const a = aplicante(state, data, id);
  if (!a) return null;
  const r = score.evaluar(a.financiero, state.inmueble.renta);
  const b = BANDA[r.banda];
  const renta = state.inmueble.renta;
  const ref = data.referenciaMercado();

  function aceptar() {
    if (!a) return;
    dispatch({ tipo: 'aceptar', aplicanteId: a.id });
    ir('poliza', a.id);
  }

  let aviso = null;
  if (r.banda === 'bajo')
    aviso = (
      <Nota tono="danger">
        Riesgo alto de impago. Cobro Garantizado y Renta Adelantada no están disponibles.
      </Nota>
    );
  else if (r.cuotaSegura < renta)
    aviso = (
      <Nota tono="warn">
        La renta supera su capacidad de pago en {soles(renta - r.cuotaSegura)} al mes.
      </Nota>
    );

  return (
    <>
      <div className="row">
        <Avatar nombre={a.nombre} indice={indiceAvatar(a.id)} grande />
        <div className="stack" style={{ gap: 4 }}>
          <span className="eye">RentScore</span>
          <h1 className="h1">{a.nombre}</h1>
        </div>
      </div>
      <div className="g2">
        <section className="card">
          <Gauge score={r.score} color={b.color} />
          <Badge tono={b.tono} className="centro">
            {b.txt}
          </Badge>
          <div className="kv">
            <span>
              Capacidad de pago <Sup texto="30% del ingreso mensual verificado" />
            </span>
            <b>{soles(r.cuotaSegura)}</b>
          </div>
          <div className="kv">
            <span>Renta del inmueble</span>
            <b>{soles(renta)}</b>
          </div>
          <p className="caption">
            Autorizó al postular · {a.fechaAutorizacion} · Bandas provisionales
          </p>
        </section>
        <div className="stack">
          {aviso}
          <section className="card flat">
            <span className="eye">Por qué este score</span>
            <Factores factores={r.factores} />
          </section>
          <section className="card flat">
            <span className="eye">
              Mercado{' '}
              <Sup texto="Rango inventado: no hay fuente verificada de rentas por distrito" />
            </span>
            <BarraMercado
              renta={renta}
              min={ref.min}
              max={ref.max}
              dormitorios={state.inmueble.dormitorios}
              distrito={state.inmueble.distrito}
            />
          </section>
        </div>
      </div>
      <div className="acciones fila">
        {r.banda === 'bajo' ? (
          <>
            <a className="btn" href={href('postulantes')}>
              Ver otros postulantes
            </a>
            <button
              className="btn sec"
              type="button"
              onClick={aceptar}
              data-testid="resultado-aceptar-button"
            >
              Aceptar de todos modos
            </button>
          </>
        ) : (
          <>
            <button
              className="btn"
              type="button"
              onClick={aceptar}
              data-testid="resultado-aceptar-button"
            >
              Aceptar a {primerNombre(a.nombre)}
            </button>
            <a className="btn sec" href={href('postulantes')}>
              Ver otros postulantes
            </a>
          </>
        )}
      </div>
    </>
  );
}
