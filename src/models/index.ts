/**
 *
 * Phasade which exports all models used in app
 *
 * @author Oskar Przydatek
 * @author Jakub Świderski
 *
 */
export interface ICurrency {
  code: string;
  currency: string;
  // PLN value
  mid: number;
}

export interface ICurrencyRates {
  effectiveDate: string;
  mid: number;
}

export interface IGoldRates {
  cena: string;
  data: string;
}

export interface IScreenLayout {
  isLoading?: boolean;
  error?: boolean;
  children: React.ReactNode;
}
