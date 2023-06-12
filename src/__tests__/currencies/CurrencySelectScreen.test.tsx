/**
 *
 * Testsheet for CurrencySelect screen.
 * 
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CurrencySelectScreen} from '../../screens';

// Mocked navigation functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('CurrencySelectScreen', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseRoute = useRoute as jest.Mock;

  beforeEach(() => {
    mockUseNavigation.mockReturnValue({
      goBack: jest.fn(),
    });

    mockUseRoute.mockReturnValue({
      params: {
        data: [
          {code: 'USD', currency: 'US Dollar'},
          {code: 'EUR', currency: 'Euro'},
          {code: 'GBP', currency: 'British Pound'},
        ],
        setCurrency: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders currency list correctly', () => {
    const {getByText} = render(<CurrencySelectScreen />);
    expect(getByText('US DOLLAR - USD')).toBeDefined();
    expect(getByText('EURO - EUR')).toBeDefined();
    expect(getByText('BRITISH POUND - GBP')).toBeDefined();
  });

  test('calls setCurrency and navigates back when a currency button is pressed', () => {
    const setCurrency = jest.fn();
    mockUseRoute.mockReturnValueOnce({
      params: {
        data: [{code: 'USD', currency: 'US Dollar'}],
        setCurrency,
      },
    });
    const {getByText} = render(<CurrencySelectScreen />);
    fireEvent.press(getByText('US DOLLAR - USD'));
    expect(setCurrency).toHaveBeenCalledWith({
      code: 'USD',
      currency: 'US Dollar',
    });
    expect(useNavigation().goBack).toHaveBeenCalled();
  });
});
