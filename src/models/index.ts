/**
 *
 * Phasade which exports all models used in app
 *
 * @author Oskar Przydatek
 *
 */
export interface ICurrency {
  code: string;
  currency: string;
  // PLN value
  mid: number;
}

export interface IScreenLayout {
  isLoading?: boolean;
  error?: boolean;
  children: React.ReactNode;
}
