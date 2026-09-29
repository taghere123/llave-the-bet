import type { LegalTextProvider } from '../types';

// Placeholders. El texto legal real está pendiente con Legal (decisiones 015 y 018).
export const legalTextProviderSimulado: LegalTextProvider = {
  consentimientoScore: (esCliente) => ({
    titulo: 'Autorizo el cálculo de mi RentScore',
    cuerpo: esCliente
      ? 'Autorizo a Interbank a calcular mi RentScore con mis datos como cliente. Los propietarios solo verán mi score y mi capacidad de pago, nunca mis movimientos, saldos ni deudas.'
      : 'Autorizo a Interbank a calcular mi RentScore consultando centrales de riesgo, porque no soy cliente del banco. Los propietarios solo verán mi score y mi capacidad de pago, nunca el detalle de mis deudas.',
    supuesto: true,
  }),
  compartirConPropietario: (nombre) => ({
    titulo: `Compartir mi RentScore con ${nombre}`,
    cuerpo: `Autorizo que ${nombre} vea mi RentScore y mi capacidad de pago para esta postulación. Puedo revocarlo cuando quiera desde "Mis postulaciones".`,
    supuesto: true,
  }),
  avisoDeudor: () => ({
    titulo: 'Antes de firmar: figurarás como deudor',
    cuerpo:
      'Con Cobro Garantizado o Renta Adelantada, Interbank le paga la renta al propietario y tú quedas como deudor de un préstamo de consumo a tasa cero con Interbank. Devuelves la renta mes a mes, como siempre. La comisión la paga el propietario. Si no pagas, el crédito puede reportarse en centrales de riesgo a tu nombre.',
    supuesto: true,
  }),
  politicaDatos: () => ({
    titulo: 'Política de tratamiento de datos',
    cuerpo: 'Texto pendiente con Legal.',
    supuesto: true,
  }),
};
