import type { ReactNode } from 'react';
import type { TextoLegal } from '../providers/types';
import { Sup } from './ui';

/** ConsentBlock del design system: casilla sin marcar por defecto y texto legal del legalTextProvider. */
export function ConsentBlock({
  texto,
  etiqueta,
  marcado,
  onCambio,
  testId,
  children,
}: {
  texto: TextoLegal;
  etiqueta: string;
  marcado: boolean;
  onCambio: (marcado: boolean) => void;
  testId: string;
  children?: ReactNode;
}) {
  return (
    <section className="cb">
      <h2 className="title">
        {texto.titulo} <Sup texto="Texto legal pendiente con Legal" />
      </h2>
      <p className="body-sm">{texto.cuerpo}</p>
      <label className="ck">
        <input
          type="checkbox"
          checked={marcado}
          onChange={(e) => onCambio(e.target.checked)}
          data-testid={testId}
        />
        <span>{etiqueta}</span>
      </label>
      {children}
    </section>
  );
}
