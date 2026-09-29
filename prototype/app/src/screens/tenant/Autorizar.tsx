import { useState } from 'react';
import { ConsentBlock } from '../../components/ConsentBlock';
import { CheckItem } from '../../components/Icon';
import { Sup } from '../../components/ui';
import { useProviders } from '../../providers/ProvidersContext';
import { href, ir } from '../../router';
import { useStore } from '../../store/StoreContext';

/** Primera capa del consentimiento: autorizar el cálculo del RentScore (HU-05). */
export function Autorizar() {
  const { state, dispatch } = useStore();
  const { data, legal } = useProviders();
  const [marcado, setMarcado] = useState(false);
  const inquilino = state.inquilino;
  if (!inquilino) return null;

  if (state.evaluacion) {
    return (
      <div className="narrow stack-lg">
        <h1 className="h1">Ya autorizaste tu RentScore</h1>
        <p className="body-sm">En cada postulación eliges si lo compartes con ese propietario.</p>
        <a className="btn" href={href('mi-score')}>
          Ver mi RentScore
        </a>
      </div>
    );
  }

  const texto = legal.consentimientoScore(inquilino.esClienteInterbank);
  const politica = legal.politicaDatos();

  function autorizar() {
    if (!marcado || !inquilino) return;
    dispatch({
      tipo: 'darConsentimiento',
      evaluacion: data.consultarFinanciero(inquilino.dni, new Date().toISOString()),
    });
    ir('mi-score');
  }

  return (
    <div className="narrow stack-lg">
      <div className="stack">
        <span className="eye">Autorización · paso 1 de 2</span>
        <h1 className="h1">
          Conoce tu <b>RentScore</b> gratis
        </h1>
        <p className="body-sm muted">
          Con tu autorización calculamos tu score. Después, en cada postulación, decides si lo
          compartes con ese propietario.
        </p>
      </div>
      <section className="card flat">
        <span className="eye">Qué ve el propietario</span>
        <ul className="il">
          <CheckItem ok>Tu score y tu capacidad de pago</CheckItem>
          <CheckItem ok={false}>Tus movimientos, saldos ni deudas</CheckItem>
        </ul>
      </section>
      <ConsentBlock
        texto={texto}
        etiqueta="Autorizo a Interbank a calcular mi RentScore."
        marcado={marcado}
        onCambio={setMarcado}
        testId="autorizar-checkbox"
      >
        {!inquilino.esClienteInterbank && (
          <p className="caption">
            Como no eres cliente de Interbank, tu score se calcula con centrales de riesgo{' '}
            <Sup texto="Central de riesgo simulada; no hay integración real" />.
          </p>
        )}
        <details className="body-sm">
          <summary className="lk">{politica.titulo}</summary>
          <p className="caption">
            {politica.cuerpo} <Sup texto="Texto legal pendiente con Legal" />
          </p>
        </details>
      </ConsentBlock>
      <button
        className="btn"
        type="button"
        disabled={!marcado}
        onClick={autorizar}
        data-testid="autorizar-submit-button"
      >
        Calcular mi RentScore
      </button>
    </div>
  );
}
