import type { ReactNode } from 'react';
import { Sup } from '../../components/ui';
import { soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { href } from '../../router';
import { postulacionesDelInquilino, propiedad } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

function Fila({ etiqueta, valor }: { etiqueta: ReactNode; valor: string }) {
  return (
    <div className="kv">
      <span>{etiqueta}</span>
      <b>{valor}</b>
    </div>
  );
}

/** Qué significa ser aceptado bajo pago garantizado: el inquilino es el deudor (HU-10, decisión 018). */
export function Deudor({ id }: PropsPantalla) {
  const { state } = useStore();
  const { data, score, payment, legal } = useProviders();
  const p = postulacionesDelInquilino(state).find((x) => x.id === id);
  const prop = p && propiedad(state, data, p.propiedadId);
  if (!p || !prop || !state.evaluacion) return null;

  const renta = prop.renta;
  const banda = score.evaluar(state.evaluacion.financiero, renta).banda;
  const prima = payment.prima(renta, banda);
  const cg = payment.cobroGarantizado(renta, banda);
  const ra = payment.rentaAdelantada(renta, banda);
  const quien = prop.id === state.inmueble.id ? data.propietaria().nombre : 'el propietario';
  const aviso = legal.avisoDeudor();
  const seguro = (
    <Fila
      etiqueta={
        <>
          Seguro de hogar (lo pagas tú){' '}
          <Sup texto="Decisión 010: 2-5% de la renta, escalonado por banda" />
        </>
      }
      valor={`${soles(prima.monto)} al mes`}
    />
  );

  let titulo: string;
  let detalle: ReactNode;
  let esDeudor = true;
  if (p.modalidad === 'cobro' && cg.disponible) {
    titulo = 'Figurarás como deudor de un préstamo de consumo';
    detalle = (
      <>
        <Fila etiqueta={`Interbank le paga a ${quien}`} valor={`${soles(cg.deposito)} cada mes`} />
        <Fila etiqueta="Tú devuelves, sin intereses" valor={`${soles(renta)} al mes`} />
        <Fila etiqueta={`Comisión (la paga ${quien})`} valor={`${soles(cg.comision)} al mes`} />
        {seguro}
      </>
    );
  } else if (p.modalidad === 'adelanto' && ra.disponible) {
    titulo = 'Figurarás como deudor de un préstamo de consumo';
    detalle = (
      <>
        <Fila etiqueta={`Interbank le adelanta a ${quien}`} valor={`${soles(ra.desembolso)} hoy`} />
        <Fila
          etiqueta="Tú devuelves, sin intereses"
          valor={`${soles(renta)} al mes por ${ra.meses} meses`}
        />
        <Fila etiqueta={`Comisión (la paga ${quien})`} valor={`${soles(ra.comision)} una vez`} />
        {seguro}
      </>
    );
  } else if (p.modalidad === null) {
    titulo = `${quien === 'el propietario' ? 'El propietario' : quien} aún elige cómo cobrar`;
    detalle = (
      <p className="body-sm">
        Si elige Cobro Garantizado o Renta Adelantada, figurarás como deudor. Si elige cobro
        estándar, le pagas directo y no hay préstamo a tu nombre.
      </p>
    );
  } else {
    esDeudor = false;
    titulo = 'Pagas la renta directo al propietario';
    detalle = (
      <>
        <p className="body-sm">Con cobro estándar no hay ningún préstamo a tu nombre.</p>
        {seguro}
      </>
    );
  }

  return (
    <div className="narrow stack-lg">
      <div className="stack">
        <span className="eye">Te aceptaron · {prop.direccion}</span>
        <h1 className="h1">{titulo}</h1>
      </div>
      <section className="card" data-testid="deudor-detalle">
        {detalle}
      </section>
      {esDeudor && (
        <section className="cb">
          <h2 className="title">
            {aviso.titulo} <Sup texto="Texto legal pendiente con Legal y Riesgos (decisión 018)" />
          </h2>
          <p className="body-sm">{aviso.cuerpo}</p>
        </section>
      )}
      <p className="caption">
        Esto se explica antes de cualquier firma. Un asesor de Interbank te contactará. Simulado.
      </p>
      <a className="btn sec" href={href('mis-postulaciones')} data-testid="deudor-volver-link">
        Volver a mis postulaciones
      </a>
    </div>
  );
}
