import { createContext, useContext, type ReactNode } from 'react';
import { dataProviderSimulado } from './simulated/dataProvider';
import { legalTextProviderSimulado } from './simulated/legalTextProvider';
import { paymentProviderSimulado } from './simulated/paymentProvider';
import { scoreProviderSimulado } from './simulated/scoreProvider';
import type { Providers } from './types';

export const providersSimulados: Providers = {
  score: scoreProviderSimulado,
  payment: paymentProviderSimulado,
  legal: legalTextProviderSimulado,
  data: dataProviderSimulado,
};

const ProvidersContext = createContext<Providers>(providersSimulados);

export function ProvidersProvider({
  value = providersSimulados,
  children,
}: {
  value?: Providers;
  children: ReactNode;
}) {
  return <ProvidersContext.Provider value={value}>{children}</ProvidersContext.Provider>;
}

export function useProviders(): Providers {
  return useContext(ProvidersContext);
}
