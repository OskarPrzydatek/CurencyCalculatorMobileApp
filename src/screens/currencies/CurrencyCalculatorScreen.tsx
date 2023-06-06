import React from 'react';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';

export const CurrencyCalculatorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  const onPressNavigateToCurrenciesList = () =>
    navigation.navigate('CurrenciesList');

  return (
    <ScreenLayout>
      <Text variant="headlineLarge">Currency Calculator Screen</Text>
      <Button mode="contained" onPress={onPressNavigateToCurrenciesList}>
        Currencies List
      </Button>
    </ScreenLayout>
  );
};
