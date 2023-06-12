/**
 *
 * Testsheet for SingleCurrency screen.
 *
 * @ts-ignore adnotation was used because typescript has
 * problem to implement mock functions for hooks
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {SingleCurrencyScreen} from '../../screens';
import {useRoute} from '@react-navigation/native';
import useSWR from 'swr';

// Mocked navigation functions
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

// Mocked API functions
jest.mock('swr', () => jest.fn());
jest.mock('../../api', () => ({
  getDataFetcher: jest.fn(),
}));

describe('SingleCurrencyScreen', () => {
  beforeEach(() => {
    // @ts-ignore
    useRoute.mockReturnValue({
      params: {
        code: 'USD',
      },
    });

    // @ts-ignore
    useSWR.mockReturnValue({
      data: {
        currency: 'US Dollar',
        code: 'USD',
        rates: [
          {effectiveDate: '2023-06-10', mid: 3.75},
          {effectiveDate: '2023-06-11', mid: 3.8},
          {effectiveDate: '2023-06-12', mid: 3.78},
        ],
      },
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders currency details correctly', async () => {
    const {getByText} = render(<SingleCurrencyScreen />);
    await waitFor(() => {
      expect(getByText('US Dollar')).toBeDefined();
      expect(getByText('USD')).toBeDefined();
      expect(getByText('3.78 PLN')).toBeDefined();
    });
  });

  test('calculates currency value correctly based on input', async () => {
    const {getByText, getByTestId} = render(<SingleCurrencyScreen />);
    await waitFor(() => {
      const currencyInput = getByTestId('currency-input');
      currencyInput.props.onChangeText('2');
      expect(getByText('7.56 PLN')).toBeDefined();
    });
  });
});
