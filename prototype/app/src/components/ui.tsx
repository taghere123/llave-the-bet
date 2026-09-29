// Componentes pequeños del design system: Supuesto, StatusBadge, Avatar, Nota.
import type { ReactNode } from 'react';
import type { Banda } from '../domain/types';
import { iniciales } from '../domain/format';

/** Etiqueta SUPUESTO: todo número o texto inventado la lleva (detalle en docs/supuestos.md). */
export function Sup({ texto = 'Supuesto del prototipo, no validado' }: { texto?: string }) {
  return (
    <span className="sup" title={texto}>
      Supuesto
    </span>
  );
}

export type TonoBadge = 'ok' | 'warn' | 'danger' | 'info' | 'neutral';

export function Badge({
  tono,
  children,
  className,
}: {
  tono?: TonoBadge;
  children: ReactNode;
  className?: string;
}) {
  return <span className={['badge', tono, className].filter(Boolean).join(' ')}>{children}</span>;
}

export const BANDA: Record<Banda, { txt: string; tono: TonoBadge; color: string }> = {
  alto: { txt: 'Score alto', tono: 'ok', color: 'var(--status-success)' },
  medio: { txt: 'Score medio', tono: 'warn', color: 'var(--status-warning)' },
  bajo: { txt: 'Score bajo', tono: 'danger', color: 'var(--status-danger)' },
};

export function BadgeScore({ banda }: { banda: Banda }) {
  return <Badge tono={BANDA[banda].tono}>{BANDA[banda].txt}</Badge>;
}

/** Color de avatar por persona. Conserva los colores del legado: Lucía celeste, Jorge amarillo, Kevin verde. */
export function indiceAvatar(id: string): number {
  return id === 'jorge' ? 1 : id === 'kevin' ? 2 : 0;
}

export function Avatar({
  nombre,
  indice,
  grande = false,
  clase = 'av',
}: {
  nombre: string;
  indice: number;
  grande?: boolean;
  /** `hd-av` para la cabecera. */
  clase?: string;
}) {
  return (
    <span className={`${clase}${grande ? ' lg' : ''} av-${indice % 3}`} aria-hidden="true">
      {iniciales(nombre)}
    </span>
  );
}

export function Nota({ tono, children }: { tono?: 'warn' | 'danger'; children: ReactNode }) {
  return <p className={['nota', tono].filter(Boolean).join(' ')}>{children}</p>;
}
