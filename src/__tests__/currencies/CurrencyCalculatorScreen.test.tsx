/**
 *
 * Testsheet for CurrencyCalculator screen.
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {CurrencyCalculatorScreen} from '../../screens';
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

describe('CurrencyCalculatorScreen', () => {
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

  test('renders currency list button', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByTestId} = render(<CurrencyCalculatorScreen />);
    expect(getByTestId('currency-list-button')).toBeDefined();
  });

  test('navigates to currency list screen when currency list button is pressed', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByTestId} = render(<CurrencyCalculatorScreen />);
    fireEvent.press(getByTestId('currency-list-button'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('CurrenciesList');
  });

  test('renders currency one button', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByTestId} = render(<CurrencyCalculatorScreen />);
    expect(getByTestId('currency-one-button')).toBeDefined();
  });

  test('renders currency two button', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByTestId} = render(<CurrencyCalculatorScreen />);
    expect(getByTestId('currency-two-button')).toBeDefined();
  });

  test('renders swap currencies button', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByText} = render(<CurrencyCalculatorScreen />);
    expect(getByText('Zamień waluty')).toBeDefined();
  });

  test('renders reset calculator button', () => {
    mockUseSWR.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    const {getByText} = render(<CurrencyCalculatorScreen />);
    expect(getByText('Reset')).toBeDefined();
  });
});
