import { useState, type FormEvent, type ReactNode } from 'react';
import { Ico, type ColorIco, type NombreIcono } from '../../components/Icon';
import { IluListo } from '../../components/Illustrations';
import { BANDA, Badge, Sup } from '../../components/ui';
import { pct, primerNombre, soles } from '../../domain/format';
import type { Modalidad } from '../../domain/types';
import { useProviders } from '../../providers/ProvidersContext';
import { href, ir } from '../../router';
import { aplicanteAceptado } from '../../store/selectors';
import { useStore } from '../../store/StoreContext';

const ETIQUETA_BOTON: Record<Modalidad, string> = {
  cobro: 'Activar Cobro Garantizado',
  adelanto: 'Solicitar Renta Adelantada',
  estandar: 'Continuar con cobro estándar',
};

function Opcion({
  valor,
  elegida,
  onElegir,
  icono,
  color,
  titulo,
  texto,
  precio,
  detalle,
}: {
  valor: Modalidad;
  elegida: Modalidad | null;
  onElegir: (m: Modalidad) => void;
  icono: NombreIcono;
  color: ColorIco;
  titulo: string;
  texto: ReactNode;
  precio: string;
  detalle: ReactNode;
}) {
  return (
    <label className="so" data-testid={`cobro-opcion-${valor}`}>
      <input
        type="radio"
        name="m"
        value={valor}
        checked={elegida === valor}
        onChange={() => onElegir(valor)}
      />
      <span className="so-h">
        <Ico nombre={icono} color={color} />
        <i className="rd" />
      </span>
      <span className="title">{titulo}</span>
      <span className="body-sm">{texto}</span>
      <span className="so-p">
        <span className="price">{precio}</span>
        <span className="caption">{detalle}</span>
      </span>
    </label>
  );
}

function NoDisponible({
  icono,
  color,
  titulo,
}: {
  icono: NombreIcono;
  color: ColorIco;
  titulo: string;
}) {
  return (
    <div className="so off">
      <span className="so-h">
        <Ico nombre={icono} color={color} />
        <Badge tono="neutral">No disponible</Badge>
      </span>
      <span className="title">{titulo}</span>
      <span className="body-sm muted">Solo con score medio o alto.</span>
      <span className="so-p">
        <a className="lk" href={href('postulantes')}>
          Ver otros postulantes <span className="chev" />
        </a>
      </span>
    </div>
  );
}

export function Cobro() {
  const { state, dispatch } = useStore();
  const { data, score, payment } = useProviders();
  const a = aplicanteAceptado(state, data);
  const renta = state.inmueble.renta;
  const banda = score.evaluar(a.financiero, renta).banda;
  const cg = payment.cobroGarantizado(renta, banda);
  const ra = payment.rentaAdelantada(renta, banda);
  const nombre = primerNombre(a.nombre);
  // Sin preselección: elegir la opción de pago es lo que mide el piloto.
  const [elegida, setElegida] = useState<Modalidad | null>(
    state.modalidad !== 'estandar' && !cg.disponible ? null : state.modalidad,
  );

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!elegida) return;
    dispatch({ tipo: 'elegirModalidad', modalidad: elegida, fecha: new Date().toISOString() });
    ir('confirmacion');
  }

  return (
    <>
      <div className="stack">
        <span className="eye">Solución financiera</span>
        <h1 className="h1">¿Cómo quieres recibir tu renta?</h1>
        <p className="body-sm muted">
          Opciones para el {BANDA[banda].txt.toLowerCase()} de {nombre}.
        </p>
      </div>
      <form className="stack-lg" onSubmit={enviar}>
        <div className="g3" role="radiogroup" aria-label="Modalidad de cobro">
          <Opcion
            valor="estandar"
            elegida={elegida}
            onElegir={setElegida}
            icono="moneda"
            color="sky"
            titulo="Cobro estándar"
            texto={`${nombre} te paga cada mes. Si no paga, el riesgo es tuyo.`}
            precio="S/0"
            detalle="Sin comisión"
          />
          {cg.disponible ? (
            <Opcion
              valor="cobro"
              elegida={elegida}
              onElegir={setElegida}
              icono="calendario"
              color="grn"
              titulo="Cobro Garantizado"
              texto={
                <>
                  Recibes <b>{soles(cg.deposito)}</b> el día 5 de cada mes, pague o no.
                </>
              }
              precio={`${soles(cg.comision)} al mes`}
              detalle={
                <>
                  {pct(cg.tasa)} de la renta · {soles(cg.anual)} al año{' '}
                  <Sup texto="3% con score alto, 5% con medio. Cifras del equipo, sin sustento actuarial (decisión 012)" />
                </>
              }
            />
          ) : (
            <NoDisponible icono="calendario" color="grn" titulo="Cobro Garantizado" />
          )}
          {ra.disponible ? (
            <Opcion
              valor="adelanto"
              elegida={elegida}
              onElegir={setElegida}
              icono="rayo"
              color="yel"
              titulo="Renta Adelantada"
              texto={
                <>
                  Recibes hoy <b>{soles(ra.desembolso)}</b>: el año de contrato completo.
                </>
              }
              precio={`${soles(ra.comision)} una vez`}
              detalle={
                <>
                  {pct(ra.tasa)} de {soles(ra.total)}{' '}
                  <Sup texto="15% con score alto, 25% con medio. Solo contratos de 1 año. Cifras del equipo, sin sustento actuarial (decisión 016)" />
                </>
              }
            />
          ) : (
            <NoDisponible icono="rayo" color="yel" titulo="Renta Adelantada" />
          )}
        </div>
        <div className="acciones narrow">
          <button
            className="btn"
            type="submit"
            disabled={!elegida}
            data-testid="cobro-confirmar-button"
          >
            {elegida ? ETIQUETA_BOTON[elegida] : 'Elige una opción'}
          </button>
        </div>
      </form>
    </>
  );
}

export function Confirmacion() {
  const { state } = useStore();
  const { data, score, payment } = useProviders();
  const a = aplicanteAceptado(state, data);
  const renta = state.inmueble.renta;
  const banda = score.evaluar(a.financiero, renta).banda;
  const pr = payment.prima(renta, banda);
  const cg = payment.cobroGarantizado(renta, banda);
  const ra = payment.rentaAdelantada(renta, banda);
  const nombre = primerNombre(a.nombre);

  let titulo: ReactNode;
  let nombreMod: string;
  let pagas: string;
  if (state.modalidad === 'cobro' && cg.disponible) {
    titulo = (
      <>
        Recibirás <b>{soles(cg.deposito)}</b> cada mes, pase lo que pase
      </>
    );
    nombreMod = 'Cobro Garantizado';
    pagas = `${soles(cg.comision)} al mes`;
  } else if (state.modalidad === 'adelanto' && ra.disponible) {
    titulo = (
      <>
        Recibirás <b>{soles(ra.desembolso)}</b> por todo el año
      </>
    );
    nombreMod = 'Renta Adelantada';
    pagas = `${soles(ra.comision)} una vez`;
  } else {
    titulo = (
      <>
        Tu inmueble está protegido contra <b>daños</b>
      </>
    );
    nombreMod = 'Cobro estándar';
    pagas = 'S/0';
  }

  return (
    <div className="narrow stack-lg center">
      <IluListo />
      <div className="stack">
        <span className="eye">Solicitud registrada · simulada</span>
        <h1 className="h1">{titulo}</h1>
        <p className="body-sm muted">Un asesor de Interbank te contactará para firmar.</p>
      </div>
      <section className="card resumen">
        <div className="kv">
          <span>Inquilino</span>
          <b>{a.nombre}</b>
        </div>
        <div className="kv">
          <span>Seguro (paga {nombre})</span>
          <b>{soles(pr.monto)} al mes</b>
        </div>
        <div className="kv">
          <span>Cobro</span>
          <b>{nombreMod}</b>
        </div>
        <div className="kv">
          <span>Pagas tú</span>
          <b>{pagas}</b>
        </div>
      </section>
      <p className="caption">
        El piloto mide cuántos propietarios activan Cobro Garantizado o Renta Adelantada con
        comisión real (decisiones 004, 012 y 016).
      </p>
      <div className="acciones">
        <a className="btn sec" href={href('inicio')} data-testid="confirmacion-inicio-link">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
