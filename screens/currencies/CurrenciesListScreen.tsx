import {useNavigation} from '@react-navigation/native';
import {ScreenLayout} from '../../layouts';
import {Button, Text} from 'react-native-paper';

export const CurrenciesListScreen: React.FC = () => {
  const navigation = useNavigation<any>();

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
