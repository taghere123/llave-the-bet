import { useState } from 'react';
import { ConsentBlock } from '../../components/ConsentBlock';
import { BadgeScore, Nota } from '../../components/ui';
import { soles } from '../../domain/format';
import { useProviders } from '../../providers/ProvidersContext';
import { ir } from '../../router';
import { propiedad } from '../../store/selectors';
import { nuevoId, useStore } from '../../store/StoreContext';
import type { PropsPantalla } from '../types';

/** Enviar la postulación con la segunda capa del consentimiento (HU-07). */
export function Postular({ id }: PropsPantalla) {
  const { state, dispatch } = useStore();
  const { data, score, legal } = useProviders();
  const [marcado, setMarcado] = useState(false);
  const p = propiedad(state, data, id);
  const { inquilino, evaluacion } = state;
  if (!p || !inquilino || !evaluacion) return null;

  const r = score.evaluar(evaluacion.financiero, p.renta);
  const nombrePropietario =
    p.id === state.inmueble.id ? data.propietaria().nombre : 'el propietario';
  const texto = legal.compartirConPropietario(nombrePropietario);

  function enviar() {
    if (!marcado || !p || !inquilino) return;
    dispatch({
      tipo: 'enviarPostulacion',
      postulacion: {
        id: nuevoId('p'),
        propiedadId: p.id,
        dni: inquilino.dni,
        fecha: new Date().toISOString(),
        estado: 'enviada',
        scoreCompartido: true,
        modalidad: null,
      },
    });
    ir('mis-postulaciones');
  }

  return (
    <div className="narrow stack-lg">
      <div className="stack">
        <span className="eye">Postular</span>
        <h1 className="h1">Postula a {p.direccion}</h1>
        <span className="caption">
          {p.distrito} · {soles(p.renta)} al mes
        </span>
      </div>
      <section className="card">
        <span className="eye">Tu RentScore para esta propiedad</span>
        <div className="row">
          <span className="score-n">{r.score}</span>
          <BadgeScore banda={r.banda} />
        </div>
        <div className="kv">
          <span>Tu cuota segura</span>
          <b>{soles(r.cuotaSegura)}</b>
        </div>
        <div className="kv">
          <span>Renta</span>
          <b>{soles(p.renta)}</b>
        </div>
      </section>
      {p.renta > r.cuotaSegura && (
        <Nota tono="warn">
          La renta supera tu cuota segura en {soles(p.renta - r.cuotaSegura)} al mes. Puedes
          postular igual.
        </Nota>
      )}
      {r.banda === 'bajo' && (
        <Nota tono="warn">Tu score es bajo para esta renta. Puedes postular igual.</Nota>
      )}
      <ConsentBlock
        texto={texto}
        etiqueta={`Autorizo compartir mi RentScore con ${nombrePropietario}.`}
        marcado={marcado}
        onCambio={setMarcado}
        testId="postular-compartir-checkbox"
      >
        <p className="caption">
          Autorización · paso 2 de 2. Sin esta autorización no se puede postular.
        </p>
      </ConsentBlock>
      <button
        className="btn"
        type="button"
        disabled={!marcado}
        onClick={enviar}
        data-testid="postular-submit-button"
      >
        Enviar postulación
      </button>
    </div>
  );
}
