import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScreenLayout} from '../../layouts';
import {Button, Text} from 'react-native-paper';

export const GoldCalculatorScreen: React.FC = () => {
  const navigation = useNavigation<any>();

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
