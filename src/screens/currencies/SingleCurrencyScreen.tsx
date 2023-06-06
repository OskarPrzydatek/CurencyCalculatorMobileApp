import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';

export const SingleCurrencyScreen: React.FC = () => {
  // TODO: Add /${code}/${startDate}/${endDate}/
  // For endpoint
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  return (
    <ScreenLayout>
      <Text>Single Currency</Text>
    </ScreenLayout>
  );
};
