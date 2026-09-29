import type { ReactNode } from 'react';
import type { Propiedad } from '../domain/types';
import { soles } from '../domain/format';
import { IluEdificio } from './Illustrations';

/** PropertyCard del design system. `badge` va sobre la imagen; `href` la vuelve enlace. */
export function PropertyCard({
  propiedad,
  variante = 0,
  badge,
  href,
  testId,
}: {
  propiedad: Propiedad;
  variante?: number;
  badge?: ReactNode;
  href?: string;
  testId?: string;
}) {
  const cuerpo = (
    <>
      <div className="pc-img">
        <IluEdificio variante={variante} />
        {badge}
      </div>
      <div className="pc-bd">
        <span className="pc-cat">{propiedad.tipo} en alquiler</span>
        <h2 className="title">{propiedad.direccion}</h2>
        <span className="caption">{propiedad.distrito}, Lima</span>
        <div className="chips">
          <span className="chip">{propiedad.dormitorios} dorm.</span>
          <span className="chip">{propiedad.area} m²</span>
        </div>
        <span className="eye" style={{ marginTop: 16 }}>
          Renta mensual
        </span>
        <span className="price">{soles(propiedad.renta)}</span>
      </div>
    </>
  );
  return href ? (
    <a className="card pc pc-link" href={href} data-testid={testId}>
      {cuerpo}
    </a>
  ) : (
    <article className="card pc" data-testid={testId}>
      {cuerpo}
    </article>
  );
}
