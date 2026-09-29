import type { FormEvent } from 'react';
import { useProviders } from '../../providers/ProvidersContext';
import { ir } from '../../router';
import { RENTA_MINIMA } from '../../store/reducer';
import { useStore } from '../../store/StoreContext';

const TIPOS = ['Departamento', 'Casa', 'Habitación'];

export function Publicar() {
  const { state, dispatch } = useStore();
  const { data } = useProviders();
  const i = state.inmueble;

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const texto = (k: string) => String(f.get(k) ?? '').trim();
    const numero = (k: string) => Number(f.get(k)) || 0;
    const base = data.inmuebleInicial();
    // Mismos valores de respaldo que el prototipo legado.
    dispatch({
      tipo: 'publicar',
      datos: {
        tipo: TIPOS.includes(texto('tipo')) ? texto('tipo') : base.tipo,
        direccion: texto('direccion') || base.direccion,
        distrito: texto('distrito') || base.distrito,
        dormitorios: numero('dormitorios'),
        area: numero('area') || base.area,
        renta: numero('renta') || base.renta,
      },
    });
    ir('inmueble');
  }

  return (
    <div className="narrow stack-lg">
      <div className="stack">
        <span className="eye">Tu inmueble</span>
        <h1 className="h1">Publica tu inmueble</h1>
        <p className="body-sm muted">Se publica en el portal que ya usas.</p>
      </div>
      <form className="card form-g" onSubmit={enviar} data-testid="publicar-form">
        <div className="field full">
          <label htmlFor="f-tipo">Tipo</label>
          <select id="f-tipo" name="tipo" defaultValue={i.tipo}>
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="f-dir">Dirección</label>
          <input id="f-dir" name="direccion" defaultValue={i.direccion} maxLength={120} required />
        </div>
        <div className="field">
          <label htmlFor="f-dist">Distrito</label>
          <input id="f-dist" name="distrito" defaultValue={i.distrito} maxLength={60} required />
        </div>
        <div className="field">
          <label htmlFor="f-renta">Renta (S/)</label>
          <input
            id="f-renta"
            name="renta"
            type="number"
            inputMode="numeric"
            min={RENTA_MINIMA}
            max={50000}
            step={50}
            defaultValue={i.renta}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="f-dorm">Dormitorios</label>
          <input
            id="f-dorm"
            name="dormitorios"
            type="number"
            inputMode="numeric"
            min={0}
            max={20}
            defaultValue={i.dormitorios}
          />
        </div>
        <div className="field">
          <label htmlFor="f-area">Área (m²)</label>
          <input
            id="f-area"
            name="area"
            type="number"
            inputMode="numeric"
            min={1}
            max={10000}
            defaultValue={i.area}
          />
        </div>
        <button className="btn full" type="submit" data-testid="publicar-submit-button">
          Publicar inmueble
        </button>
      </form>
    </div>
  );
}
