import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';

export const GoldCalculatorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {data, error, isLoading} = useSWR('/cenyzlota', getDataFetcher);

  const onPressNavigateToCurrenciesList = () =>
    navigation.navigate('GoldAnalizeScreen');

  return (
    <ScreenLayout>
      <Text variant="headlineLarge">Gold Calculator Screen</Text>
      <Button mode="contained" onPress={onPressNavigateToCurrenciesList}>
        Gold Price Analize In Time
      </Button>
    </ScreenLayout>
  );
};
