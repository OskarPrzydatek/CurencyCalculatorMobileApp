/**
 *
 * CurrenciesList screen to show all possible currencies
 * fetched from API with initial value of currency in PLN
 *
 * @author Oskar Przydatek
 *
 */
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import {getDataFetcher} from '../../api';
import useSWR from 'swr';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {ICurrency} from '../../models';

export const CurrenciesListScreen: React.FC = () => {
  // Hook to use navigation functions
  const navigation = useNavigation<any>();
  // Hook to fetch data from API
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  // Function for navigate to SingleCurrency screen
  const onPressNavigateToSingleCurrency = () =>
    navigation.navigate('SingleCurrency');

  // Render item from data as button for
  // navigate to SingleCurrency screen
  const renderItem: ListRenderItem<ICurrency> = ({item}) => (
    <Button
      style={styles.currencyItem}
      onPress={onPressNavigateToSingleCurrency}>
      {item.currency.toUpperCase()} - {item.mid} PLN
    </Button>
  );

  return (
    <ScreenLayout isLoading={isLoading} error={error}>
      {data ? (
        <>
          <Text variant="headlineLarge">Lista Walut</Text>

          {/* List of currencies in app */}
          <FlatList
            style={styles.currenciesList}
            data={data[0].rates}
            renderItem={renderItem}
            keyExtractor={item => item.code}
          />
        </>
      ) : null}
    </ScreenLayout>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all elements in currencies list layout
const styles = StyleSheet.create({
  currenciesList: {
    width: '100%',
    marginBottom: '10%',
  },
  currencyItem: {
    width: '100%',
  },
});
