/**
 *
 * Testsheet for GoldAnalize screen.
 * 
 * @author Jakub Świderski
 *
 */
import React from 'react';
import {render} from '@testing-library/react-native';
import useSWR from 'swr';
import {GoldAnalizeScreen} from '../../screens';

jest.mock('swr', () => jest.fn());

describe('GoldAnalizeScreen', () => {
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
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

  test('displays correct screen title', () => {
    const {getByText} = render(<GoldAnalizeScreen />);
    const titleText = getByText('Analiza Cen Złota');
    expect(titleText).toBeTruthy();
  });

  test('displays the correct number of price notes', () => {
    const {getByText} = render(<GoldAnalizeScreen />);
    const notesText = getByText('Ostatnie 60 notowań ceny złota');
    expect(notesText).toBeTruthy();
  });

  test('displays message for picking a day on the chart', () => {
    const {getByText} = render(<GoldAnalizeScreen />);
    const infoText = getByText('Kliknij na dzień, aby zobaczyć szczegóły');
    expect(infoText).toBeTruthy();
  });
});
