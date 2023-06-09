/**
 *
 * CurrencySelect screen to take fetched currencies
 * from API and select currency for calculator.
 * Screen use two navigation params
 *
 * @param {any} data - took data to create list for select
 * @param {(item: ICurrency) => void} setCurrency - setter for
 * select currency from list
 *
 * After selecting the currency from list we'll back to
 * CalculatorScreen
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {ICurrency} from '../../models';

export const CurrencySelectScreen: React.FC = () => {
  // Hook to use navigation functions
  const navigation = useNavigation<any>();
  // Hook to use route params in navigation functions
  const route = useRoute<
    RouteProp<{
      data: any;
      setCurrency: (item: ICurrency) => void;
    }>
  >();

  // Functon to select currency from list
  const onPressSelectCurrency = (item: ICurrency) => {
    // Using setter from routing params to set selected currency
    route.params?.setCurrency(item);
    // Back to calculator after setting currency
    navigation.goBack();
  };

  // Render item from data as button for
  // select currency for calculator
  const renderItem: ListRenderItem<ICurrency> = ({item}) => (
    <Button onPress={() => onPressSelectCurrency(item)}>
      {item.currency.toUpperCase()} - {item.code}
    </Button>
  );

  return (
    <ScreenLayout>
      <Text variant="titleLarge">Wybierz walutę z listy</Text>

      {/* List of currencies to select */}
      <FlatList
        style={styles.currenciesList}
        data={route.params?.data}
        renderItem={renderItem}
        keyExtractor={item => item.code}
      />
    </ScreenLayout>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all elements in select currency layout
const styles = StyleSheet.create({
  currenciesList: {
    width: '90%',
    marginBottom: '10%',
  },
});
