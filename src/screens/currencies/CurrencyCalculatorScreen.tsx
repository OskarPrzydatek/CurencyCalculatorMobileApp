import React from 'react';
import {Button, Divider, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';
import {View} from 'react-native';

export const CurrencyCalculatorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  const onPressNavigateToCurrenciesList = () =>
    navigation.navigate('CurrenciesList');

  if (data) {
    console.log(data[0].rates);
  }

  return (
    <ScreenLayout isLoading={isLoading} error={error}>
      {/* Check data will fetched, If not return null for Virtual DOM */}
      {data ? (
        <>
          <Text variant="headlineLarge">Kalkulator Walut</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button mode="contained" onPress={() => {}}>
              Wybierz walutę nr. 1
            </Button>
            <Button mode="contained" onPress={() => {}}>
              Wybierz walutę nr. 2
            </Button>
          </View>
          <TextInput
            mode="outlined"
            label="Wartość waluty nr. 1"
            style={{width: '70%'}}
          />
          <TextInput
            mode="outlined"
            label="Wartość waluty nr. 2"
            style={{width: '70%'}}
          />
          <Divider style={{width: '90%'}} />
          <Text variant="headlineMedium">X Waluta 1 = Y Waluta 2</Text>
          <Button
            style={{marginTop: '35%'}}
            mode="contained"
            onPress={onPressNavigateToCurrenciesList}>
            Pokaż listę dostępnych walut
          </Button>
        </>
      ) : null}
    </ScreenLayout>
  );
};
