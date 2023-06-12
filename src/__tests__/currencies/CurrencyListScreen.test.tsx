/**
 *
 * Testsheet for CurrencyList screen.
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {CurrenciesListScreen} from '../../screens';
import useSWR from 'swr';

// Mocked navigation functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mocked API functions
jest.mock('swr', () => jest.fn());
jest.mock('../../api', () => ({
  getDataFetcher: jest.fn(),
}));

describe('CurrenciesListScreen', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
    mockUseNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders currency list correctly when data is available', () => {
    mockUseSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: null,
      isLoading: false,
    });
    const {getByText} = render(<CurrenciesListScreen />);
    expect(getByText('US DOLLAR - 3.75 PLN')).toBeDefined();
  });

  test('navigates to SingleCurrency screen when a currency button is pressed', () => {
    mockUseSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: null,
      isLoading: false,
    });
    const {getByText} = render(<CurrenciesListScreen />);
    fireEvent.press(getByText('US DOLLAR - 3.75 PLN'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('SingleCurrency', {
      code: 'USD',
    });
  });

  test('does not render currency list when data is null', () => {
    mockUseSWR.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });

  test('does not render currency list when loading', () => {
    mockUseSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: null,
      isLoading: true,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });

  test('does not render currency list when there is an error', () => {
    mockUseSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: 'API error',
      isLoading: false,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });
});
