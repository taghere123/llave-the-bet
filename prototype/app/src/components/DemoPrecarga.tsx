import { useProviders } from '../providers/ProvidersContext';
import { estaActiva } from '../store/reducer';
import { nuevoId, useStore } from '../store/StoreContext';

/** Control de demo (HU-11): precarga la postulación de Lucía al inmueble de Carmen sin recorrer el flujo. */
export function DemoPrecarga() {
  const { state, dispatch } = useStore();
  const { data } = useProviders();
  const lucia = data.inquilinoDemo();
  const otroInquilino = state.inquilino !== null && state.inquilino.dni !== lucia.dni;
  const yaPostulo = state.postulaciones.some(
    (p) =>
      p.dni === lucia.dni &&
      p.propiedadId === state.inmueble.id &&
      (estaActiva(p) || p.estado === 'aceptada'),
  );

  function precargar() {
    const fecha = new Date().toISOString();
    dispatch({
      tipo: 'precargarDemo',
      inquilino: {
        ...lucia,
        esClienteInterbank: data.esClienteInterbank(lucia.dni),
        registradoEn: fecha,
      },
      evaluacion: data.consultarFinanciero(lucia.dni, fecha),
      postulacion: {
        id: nuevoId('p'),
        propiedadId: state.inmueble.id,
        dni: lucia.dni,
        fecha,
        estado: 'enviada',
        scoreCompartido: true,
        modalidad: null,
      },
    });
  }

  let estado: string | null = null;
  if (otroInquilino)
    estado = 'Ya hay otro inquilino registrado. Reinicia la demo para precargar a Lucía.';
  else if (yaPostulo) estado = 'Lucía ya está en la bandeja de Carmen.';

  return (
    <div className="demo">
      <span className="eye">Control de demo</span>
      <p className="body-sm">
        Agrega la postulación de {lucia.nombre} {lucia.apellido} (no es clienta de Interbank) como
        si hubiera postulado desde el marketplace.
      </p>
      <div className="demo-acc">
        <button
          className="btn sec"
          type="button"
          onClick={precargar}
          disabled={otroInquilino || yaPostulo}
          data-testid="demo-precargar-lucia-button"
        >
          Precargar postulación de {lucia.nombre}
        </button>
      </div>
      {estado && (
        <p className="caption" data-testid="demo-precarga-estado">
          {estado}
        </p>
      )}
    </div>
  );
}
