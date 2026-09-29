import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Sup } from '../../components/ui';
import { useProviders } from '../../providers/ProvidersContext';
import { href, ir } from '../../router';
import { useStore } from '../../store/StoreContext';
import {
  codigoValido,
  limpiarLead,
  validarLead,
  type ErroresLead,
  type LeadForm,
} from '../../validation/leadForm';

const VACIO: LeadForm = { nombre: '', apellido: '', dni: '', email: '', celular: '' };

const CAMPOS: {
  campo: keyof LeadForm;
  etiqueta: string;
  tipo: string;
  autoComplete: string;
  inputMode?: 'numeric' | 'email' | 'tel';
  maxLength: number;
  full?: boolean;
}[] = [
  { campo: 'nombre', etiqueta: 'Nombre', tipo: 'text', autoComplete: 'given-name', maxLength: 60 },
  {
    campo: 'apellido',
    etiqueta: 'Apellido',
    tipo: 'text',
    autoComplete: 'family-name',
    maxLength: 60,
  },
  {
    campo: 'dni',
    etiqueta: 'DNI',
    tipo: 'text',
    autoComplete: 'off',
    inputMode: 'numeric',
    maxLength: 8,
  },
  {
    campo: 'celular',
    etiqueta: 'Celular',
    tipo: 'tel',
    autoComplete: 'tel-national',
    inputMode: 'tel',
    maxLength: 9,
  },
  {
    campo: 'email',
    etiqueta: 'Email',
    tipo: 'email',
    autoComplete: 'email',
    inputMode: 'email',
    maxLength: 120,
    full: true,
  },
];

export function Registro() {
  const { state, dispatch } = useStore();
  const { data } = useProviders();
  const [fase, setFase] = useState<'datos' | 'codigo'>('datos');
  const [form, setForm] = useState<LeadForm>(VACIO);
  const [errores, setErrores] = useState<ErroresLead>({});
  const [codigo, setCodigo] = useState('');
  const [errorCodigo, setErrorCodigo] = useState<string | null>(null);
  const codigoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fase === 'codigo') codigoRef.current?.focus();
  }, [fase]);

  if (state.inquilino) {
    return (
      <div className="narrow stack-lg">
        <h1 className="h1">Ya estás registrado</h1>
        <p className="body-sm">
          Postulas como {state.inquilino.nombre} {state.inquilino.apellido}. No necesitas volver a
          dejar tus datos.
        </p>
        <a className="btn" href={href(state.evaluacion ? 'marketplace' : 'autorizar')}>
          Continuar
        </a>
      </div>
    );
  }

  function enviarDatos(e: FormEvent) {
    e.preventDefault();
    const encontrados = validarLead(form);
    setErrores(encontrados);
    const primero = CAMPOS.find((c) => encontrados[c.campo]);
    if (primero) {
      document.getElementById(`r-${primero.campo}`)?.focus();
      return;
    }
    setFase('codigo');
  }

  function verificar(e: FormEvent) {
    e.preventDefault();
    if (!codigoValido(codigo)) {
      setErrorCodigo('El código tiene 6 dígitos.');
      codigoRef.current?.focus();
      return;
    }
    const limpio = limpiarLead(form);
    dispatch({
      tipo: 'registrarInquilino',
      inquilino: {
        ...limpio,
        esClienteInterbank: data.esClienteInterbank(limpio.dni),
        registradoEn: new Date().toISOString(),
      },
    });
    ir('autorizar');
  }

  if (fase === 'codigo') {
    return (
      <div className="narrow stack-lg">
        <div className="stack">
          <span className="eye">Verifica tu celular</span>
          <h1 className="h1">Ingresa el código</h1>
          <p className="body-sm muted">
            Te enviamos un código de 6 dígitos al celular terminado en {form.celular.slice(-3)}.
          </p>
        </div>
        <form
          className="card stack"
          onSubmit={verificar}
          noValidate
          data-testid="registro-codigo-form"
        >
          <div className="field">
            <label htmlFor="r-codigo">Código de verificación</label>
            <input
              id="r-codigo"
              ref={codigoRef}
              className="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              aria-invalid={errorCodigo ? true : undefined}
              aria-describedby={errorCodigo ? 'r-codigo-err' : 'r-codigo-ayuda'}
              data-testid="registro-codigo-input"
            />
            {errorCodigo ? (
              <span className="err" id="r-codigo-err">
                {errorCodigo}
              </span>
            ) : (
              <span className="ayuda" id="r-codigo-ayuda">
                Para la demo usa {data.codigoVerificacionDemo()}{' '}
                <Sup texto="Verificación simulada: se acepta cualquier código de 6 dígitos" />
              </span>
            )}
          </div>
          <button className="btn" type="submit" data-testid="registro-verificar-button">
            Verificar
          </button>
          <button className="lk" type="button" onClick={() => setFase('datos')}>
            Corregir mis datos
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="narrow stack-lg">
      <div className="stack">
        <span className="eye">Postular</span>
        <h1 className="h1">Identifícate para postular</h1>
        <p className="body-sm muted">
          Solo te pedimos estos datos una vez. No necesitas contraseña.
        </p>
      </div>
      <form className="card form-g" onSubmit={enviarDatos} noValidate data-testid="registro-form">
        {CAMPOS.map((c) => {
          const error = errores[c.campo];
          return (
            <div className={`field${c.full ? ' full' : ''}`} key={c.campo}>
              <label htmlFor={`r-${c.campo}`}>{c.etiqueta}</label>
              <input
                id={`r-${c.campo}`}
                name={c.campo}
                type={c.tipo}
                value={form[c.campo]}
                onChange={(e) => setForm({ ...form, [c.campo]: e.target.value })}
                autoComplete={c.autoComplete}
                inputMode={c.inputMode}
                maxLength={c.maxLength}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `r-${c.campo}-err` : undefined}
                data-testid={`registro-${c.campo}-input`}
              />
              {error && (
                <span className="err" id={`r-${c.campo}-err`}>
                  {error}
                </span>
              )}
            </div>
          );
        })}
        <button className="btn full" type="submit" data-testid="registro-submit-button">
          Enviar código
        </button>
      </form>
    </div>
  );
}
