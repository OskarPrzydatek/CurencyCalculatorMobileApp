import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import {getDataFetcher} from '../../api';
import useSWR from 'swr';

export const CurrenciesListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  const onPressNavigateToSingleCurrency = () =>
    navigation.navigate('SingleCurrency');

  return (
    <ScreenLayout>
      <Text variant="headlineLarge">Currencies List Screen</Text>
      <Button onPress={onPressNavigateToSingleCurrency}>
        Example Currency
      </Button>
    </ScreenLayout>
  );
};
