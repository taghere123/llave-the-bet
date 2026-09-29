import { useEffect } from 'react';
import { DemoPrecarga } from '../../components/DemoPrecarga';
import { CheckItem } from '../../components/Icon';
import { IluCelular } from '../../components/Illustrations';
import { Avatar, Badge, BadgeScore, indiceAvatar, Sup } from '../../components/ui';
import { primerNombre, soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { aplicante, bandeja } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

export function ListaPostulantes() {
  const { state } = useStore();
  const { data, score } = useProviders();
  return (
    <>
      <div className="stack">
        <span className="eye">{state.inmueble.direccion}</span>
        <h1 className="h1">Postulantes</h1>
      </div>
      <div className="g3">
        {bandeja(state, data).map((a) => {
          const r = score.evaluar(a.financiero, state.inmueble.renta);
          return (
            <a
              className="card pl"
              href={href('postulante', a.id)}
              key={a.id}
              data-testid={`postulante-card-${a.origen === 'base' ? a.id : 'marketplace'}`}
            >
              <Avatar nombre={a.nombre} indice={indiceAvatar(a.id)} />
              <span className="pl-t">
                <span className="title">{primerNombre(a.nombre)}</span>
                <span className="caption">{a.ocupacion}</span>
                {a.scoreCompartido ? (
                  <BadgeScore banda={r.banda} />
                ) : (
                  <Badge tono="neutral">Score no compartido</Badge>
                )}
                {a.nuevo && <Badge tono="info">Nuevo</Badge>}
              </span>
              <span className="pl-n">
                {a.scoreCompartido ? r.score : '–'}
                <small>de 100</small>
              </span>
            </a>
          );
        })}
      </div>
      <DemoPrecarga />
    </>
  );
}

export function DetallePostulante({ id }: PropsPantalla) {
  const { state, dispatch } = useStore();
  const { data, score } = useProviders();
  const a = aplicante(state, data, id);
  const postulacionId = a?.postulacion?.id;
  const nueva = a?.postulacion?.estado === 'enviada';

  // Abrir el detalle marca la postulación del marketplace como vista (HU-08, BR-OW-08).
  useEffect(() => {
    if (postulacionId && nueva) {
      dispatch({ tipo: 'cambiarEstado', postulacionId, estado: 'vista' });
    }
  }, [postulacionId, nueva, dispatch]);

  if (!a) return null;
  const r = score.evaluar(a.financiero, state.inmueble.renta);
  return (
    <>
      <div className="row">
        <Avatar nombre={a.nombre} indice={indiceAvatar(a.id)} grande />
        <div className="stack" style={{ gap: 4 }}>
          <h1 className="h1">{a.nombre}</h1>
          <span className="body-sm muted">
            {a.edad !== null ? `${a.edad} años · ` : ''}
            {a.ocupacion}
          </span>
        </div>
      </div>
      <div className="g2">
        {a.declarado ? (
          <section className="card flat">
            <span className="eye" style={{ color: 'var(--text-muted)' }}>
              Lo que declara · sin verificar
            </span>
            <dl className="dl">
              <dt>Ingreso</dt>
              <dd>{soles(a.declarado.ingreso)}</dd>
              <dt>Garantía</dt>
              <dd>{a.declarado.garantia}</dd>
              <dt>Mascotas</dt>
              <dd>{a.declarado.mascotas}</dd>
            </dl>
          </section>
        ) : (
          <section className="card flat">
            <span className="eye" style={{ color: 'var(--text-muted)' }}>
              Postuló desde el marketplace de LLAVE
            </span>
            <dl className="dl">
              <dt>Identidad</dt>
              <dd>
                DNI y celular verificados{' '}
                <Sup texto="Verificación simulada con un código; no hay validación real de identidad" />
              </dd>
              <dt>Cliente Interbank</dt>
              <dd>{a.esClienteInterbank ? 'Sí' : 'No'}</dd>
              <dt>Postuló</dt>
              <dd>{a.fechaAutorizacion}</dd>
            </dl>
          </section>
        )}
        <section className="card">
          <span className="eye">RentScore · verificado</span>
          {a.scoreCompartido ? (
            <>
              <div className="row">
                <span className="score-n">{r.score}</span>
                <BadgeScore banda={r.banda} />
              </div>
              <p className="caption">
                {a.fuente === 'interbank' ? (
                  'Con datos de Interbank.'
                ) : (
                  <>
                    Con centrales de riesgo, porque no es cliente de Interbank{' '}
                    <Sup texto="Central de riesgo simulada; no hay integración real" />.
                  </>
                )}{' '}
                No verás sus movimientos ni saldos. Gratis para ti{' '}
                <Sup texto="Nivel 0 gratuito según el Big Idea (referencial)" />
              </p>
              <a
                className="btn"
                href={href('resultado', a.id)}
                data-testid="postulante-ver-score-link"
              >
                Ver RentScore
              </a>
              <a
                className="lk"
                href={href('consentimiento', a.id)}
                data-testid="postulante-ver-autorizacion-link"
              >
                Ver su autorización <span className="chev" />
              </a>
            </>
          ) : (
            <p className="body-sm" data-testid="postulante-score-revocado">
              {primerNombre(a.nombre)} dejó de compartir su RentScore contigo. Ya no puedes verlo.
            </p>
          )}
        </section>
      </div>
    </>
  );
}

/** Constancia de lo que el postulante autorizó al postular. Solo lectura. */
export function AutorizacionPostulante({ id }: PropsPantalla) {
  const { state } = useStore();
  const { data } = useProviders();
  const a = aplicante(state, data, id);
  if (!a) return null;
  const i = state.inmueble;
  const nombre = primerNombre(a.nombre);
  return (
    <div className="narrow stack-lg">
      <p className="nota">Así postuló {nombre} desde su celular.</p>
      <div className="row">
        <IluCelular />
        <div className="stack" style={{ gap: 6 }}>
          <span className="eye">Hola, {nombre}</span>
          <h1 className="title">Postula a este {i.tipo.toLowerCase()}</h1>
          <span className="caption">
            {i.distrito} · {soles(i.renta)} al mes
          </span>
        </div>
      </div>
      <section className="card flat">
        <span className="eye">Si te aceptan</span>
        <ul className="il">
          <CheckItem ok>
            Pagas un seguro de hogar de 2% a 5% de la renta{' '}
            <Sup texto="Decisión 010: 2-5%. Falta tarificar con Interseguro" />
          </CheckItem>
          <CheckItem ok>Tus pagos puntuales suman para un crédito hipotecario</CheckItem>
          <CheckItem ok>La garantía se mantiene como siempre</CheckItem>
        </ul>
      </section>
      <section className="cb">
        <h2 className="title">Autorizo que {data.propietaria().nombre} vea mi RentScore</h2>
        <p className="body-sm">
          Solo verá tu score y tu capacidad de pago.{' '}
          <b>No verá tus movimientos, saldos ni deudas.</b>
        </p>
        <label className="ck">
          <input type="checkbox" checked disabled readOnly />
          <span>Autorizo a Interbank a calcular mi RentScore y mostrárselo al propietario.</span>
        </label>
        <p className="caption">
          {a.scoreCompartido
            ? 'Sin autorización no se puede postular. Texto legal pendiente.'
            : `${nombre} revocó esta autorización después de postular.`}
        </p>
      </section>
      <div className="acciones">
        <a className="btn sec" href={href('postulante', a.id)}>
          Volver
        </a>
      </div>
    </div>
  );
}
