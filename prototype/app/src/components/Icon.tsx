// Iconos de trazo 2px en currentColor, según el design system. Mismos trazos que el prototipo legado.
import type { ReactNode } from 'react';

export type NombreIcono =
  | 'casa'
  | 'llave'
  | 'score'
  | 'escudo'
  | 'moneda'
  | 'calendario'
  | 'rayo'
  | 'check'
  | 'x'
  | 'lupa'
  | 'persona';

export const TRAZOS: Record<NombreIcono, ReactNode> = {
  casa: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  llave: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M21 12v2" />
    </>
  ),
  score: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  moneda: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  rayo: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  check: <path d="m5 12 5 5 9-10" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  lupa: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  persona: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
};

export function Icon({ nombre }: { nombre: NombreIcono }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}

export type ColorIco = 'sky' | 'yel' | 'grn' | 'mag' | 'azl';

export function Ico({ nombre, color }: { nombre: NombreIcono; color: ColorIco }) {
  return (
    <span className={`ico ${color}`}>
      <Icon nombre={nombre} />
    </span>
  );
}

/** Elemento de lista con check o cruz. */
export function CheckItem({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li>
      <span className={ok ? 'ok' : 'no'}>
        <Icon nombre={ok ? 'check' : 'x'} />
      </span>
      <span className={ok ? undefined : 'muted'}>{children}</span>
    </li>
  );
}
