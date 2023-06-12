/**
 *
 * Testsheet for GoldCalculator screen.
 * 
 * @author Jakub Świderski
 *
 */
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import useSWR from 'swr';
import {GoldCalculatorScreen} from '../../screens';
import {act} from 'react-test-renderer';

// Mocked navigation functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mocked API functions
jest.mock('swr', () => jest.fn());
jest.mock('../../api', () => ({
  getDataFetcher: jest.fn(),
}));

describe('GoldCalculatorScreen', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers()
    mockUseSWR.mockReturnValue({
      data: [
        {data: '2023-06-01', cena: 100},
        {data: '2023-06-02', cena: 105},
        {data: '2023-06-03', cena: 110},
      ],
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calculates gold per gram price correctly', () => {
    mockUseNavigation.mockReturnValue({navigate: jest.fn()});
    const {getByTestId, getByText} = render(<GoldCalculatorScreen />);
    const goldValueInput = getByTestId('gold-value-input');
    act(() => {
      fireEvent.changeText(goldValueInput, '2')
    });
    const calculatedPrice = getByText('220 PLN');
    expect(calculatedPrice).toBeTruthy();
  });

  test('navigates to GoldAnalizeScreen correctly', () => {
    const mockNavigate = jest.fn();
    mockUseNavigation.mockReturnValue({navigate: mockNavigate});
    const {getByText} = render(<GoldCalculatorScreen />);
    const analizeButton = getByText('Analiza Cen');
    act(() => {
      fireEvent.press(analizeButton)
    });
    expect(mockNavigate).toHaveBeenCalledWith('GoldAnalizeScreen');
  });
});
