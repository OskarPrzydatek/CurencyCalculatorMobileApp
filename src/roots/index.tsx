import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CurrencyCalculatorScreen} from '../screens/currencies/CurrencyCalculatorScreen';
import {CurrenciesListScreen} from '../screens/currencies/CurrenciesListScreen';
import {SingleCurrencyScreen} from '../screens/currencies/SingleCurrencyScreen';
import {
  CurrencySelectScreen,
  GoldAnalizeScreen,
  GoldCalculatorScreen,
} from '../screens';
import {CustomNavigationBar} from '../layouts';

const CurrencyStack = createNativeStackNavigator();
const GoldStack = createNativeStackNavigator();

export const CurrencyRoot: React.FC = () => {
  return (
    <CurrencyStack.Navigator
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}>
      <CurrencyStack.Screen
        name="CurrencyCalculator"
        component={CurrencyCalculatorScreen}
      />
      <CurrencyStack.Screen
        name="CurrencySelect"
        component={CurrencySelectScreen}
      />
      <CurrencyStack.Screen
        name="CurrenciesList"
        component={CurrenciesListScreen}
      />
      <CurrencyStack.Screen
        name="SingleCurrency"
        component={SingleCurrencyScreen}
      />
    </CurrencyStack.Navigator>
  );
};

export const GoldRoot: React.FC = () => {
  return (
    <GoldStack.Navigator
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}>
      <GoldStack.Screen
        name="GoldCalculator"
        component={GoldCalculatorScreen}
      />
      <GoldStack.Screen
        name="GoldAnalizeScreen"
        component={GoldAnalizeScreen}
      />
    </GoldStack.Navigator>
  );
};
