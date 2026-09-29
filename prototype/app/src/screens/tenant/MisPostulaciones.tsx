import { Badge, type TonoBadge } from '../../components/ui';
import { fechaCorta } from '../../domain/format';
import type { EstadoPostulacion, Postulacion } from '../../domain/types';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { estaActiva } from '../../store/reducer';
import { postulacionesDelInquilino, propiedad } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';

export const ESTADO: Record<EstadoPostulacion, { txt: string; tono: TonoBadge }> = {
  enviada: { txt: 'Enviada', tono: 'info' },
  vista: { txt: 'Vista por el propietario', tono: 'warn' },
  aceptada: { txt: 'Aceptada', tono: 'ok' },
  no_seleccionada: { txt: 'No seleccionada', tono: 'neutral' },
  retirada: { txt: 'Retirada', tono: 'neutral' },
};

function Tarjeta({ p }: { p: Postulacion }) {
  const { state, dispatch } = useStore();
  const { data, score, payment } = useProviders();
  const prop = propiedad(state, data, p.propiedadId);
  if (!prop || !state.evaluacion) return null;
  const activa = estaActiva(p);
  const banda = score.evaluar(state.evaluacion.financiero, prop.renta).banda;

  const renta = prop.renta;

  function simularAceptacion() {
    // Con la banda permitida, el propietario "elige" Cobro Garantizado; si no, cobro estándar.
    const modalidad = payment.cobroGarantizado(renta, banda).disponible ? 'cobro' : 'estandar';
    dispatch({
      tipo: 'simularAceptacion',
      postulacionId: p.id,
      modalidad,
      fecha: new Date().toISOString(),
    });
  }

  const cambiar = (estado: EstadoPostulacion) =>
    dispatch({ tipo: 'cambiarEstado', postulacionId: p.id, estado });

  return (
    <article className="card po" data-testid={`postulacion-${p.propiedadId}`}>
      <div className="po-t">
        <span className="title">{prop.direccion}</span>
        <span className="caption">
          {prop.distrito} · Postulaste el {fechaCorta(p.fecha)}
        </span>
        <div className="row">
          <Badge tono={ESTADO[p.estado].tono}>{ESTADO[p.estado].txt}</Badge>
          {!p.scoreCompartido && p.estado !== 'retirada' && (
            <Badge tono="neutral">Score no compartido</Badge>
          )}
        </div>
      </div>
      <div className="po-acc">
        {activa && (
          <button
            className="lk"
            type="button"
            onClick={() => cambiar('retirada')}
            data-testid="postulacion-retirar-button"
          >
            Retirar postulación
          </button>
        )}
        {activa && p.scoreCompartido && (
          <button
            className="lk"
            type="button"
            onClick={() => dispatch({ tipo: 'revocarAcceso', postulacionId: p.id })}
            data-testid="postulacion-revocar-button"
          >
            Dejar de compartir mi RentScore
          </button>
        )}
        {p.estado === 'aceptada' && (
          <a className="lk" href={href('deudor', p.id)} data-testid="postulacion-deudor-link">
            Qué significa para ti <span className="chev" />
          </a>
        )}
      </div>
      {activa && (
        <div className="demo" style={{ width: '100%' }}>
          <span className="eye">Control de demo</span>
          <div className="demo-acc">
            {p.estado === 'enviada' && (
              <button
                className="btn sec"
                type="button"
                onClick={() => cambiar('vista')}
                data-testid="demo-simular-vista-button"
              >
                Simular: la vio
              </button>
            )}
            <button
              className="btn sec"
              type="button"
              onClick={simularAceptacion}
              data-testid="demo-simular-aceptada-button"
            >
              Simular: aceptada
            </button>
            <button
              className="btn sec"
              type="button"
              onClick={() => cambiar('no_seleccionada')}
              data-testid="demo-simular-no_seleccionada-button"
            >
              Simular: no seleccionada
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export function MisPostulaciones() {
  const { state } = useStore();
  const lista = [...postulacionesDelInquilino(state)].sort((a, b) =>
    b.fecha.localeCompare(a.fecha),
  );
  return (
    <>
      <div className="stack">
        <span className="eye">Postulaciones</span>
        <h1 className="h1">Mis postulaciones</h1>
        <p className="body-sm muted">
          Puedes retirar una postulación o dejar de compartir tu RentScore cuando quieras.
        </p>
      </div>
      {lista.length === 0 ? (
        <div className="card flat vacio stack">
          <p className="body-sm">Aún no postulas a ninguna propiedad.</p>
          <a className="btn" href={href('marketplace')}>
            Ver propiedades
          </a>
        </div>
      ) : (
        <div className="stack">
          {lista.map((p) => (
            <Tarjeta key={p.id} p={p} />
          ))}
        </div>
      )}
      <a className="lk" href={href('marketplace')}>
        Seguir viendo propiedades <span className="chev" />
      </a>
    </>
  );
}
