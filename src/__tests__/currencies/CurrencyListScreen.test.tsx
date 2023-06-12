/**
 *
 * Testsheet for CurrencyList screen.
 *
 * @ts-ignore adnotation was used because typescript has
 * problem to implement mock functions for hooks
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
  beforeEach(() => {
    // @ts-ignore
    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders currency list correctly when data is available', () => {
    // @ts-ignore
    useSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: null,
      isLoading: false,
    });
    const {getByText} = render(<CurrenciesListScreen />);
    expect(getByText('US DOLLAR - 3.75 PLN')).toBeDefined();
  });

  test('navigates to SingleCurrency screen when a currency button is pressed', () => {
    // @ts-ignore
    useSWR.mockReturnValue({
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
    // @ts-ignore
    useSWR.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });

  test('does not render currency list when loading', () => {
    // @ts-ignore
    useSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: null,
      isLoading: true,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });

  test('does not render currency list when there is an error', () => {
    // @ts-ignore
    useSWR.mockReturnValue({
      data: [{rates: [{code: 'USD', currency: 'US Dollar', mid: 3.75}]}],
      error: 'API error',
      isLoading: false,
    });
    const {queryByTestId} = render(<CurrenciesListScreen />);
    expect(queryByTestId('currency-list')).toBeNull();
  });
});
