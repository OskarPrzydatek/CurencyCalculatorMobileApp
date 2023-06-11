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
  cena: number;
  data: string;
}

export interface IGoldPriceNote {
  date: string;
  count: number;
}

export interface IScreenLayout {
  isLoading?: boolean;
  error?: boolean;
  children: React.ReactNode;
}
