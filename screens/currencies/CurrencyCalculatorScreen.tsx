import React from 'react';
import {ScreenLayout} from '../../layouts';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const CurrencyCalculatorScreen: React.FC = () => {
  const navigation = useNavigation<any>();

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
