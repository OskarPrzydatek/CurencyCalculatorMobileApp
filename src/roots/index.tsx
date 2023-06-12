/**
 *
 * Routing roots phasade which exports all navigation
 * roots needed in app.
 *
 * @author Jakub Świderski
 *
 */
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

// Stacks objects to create navigation roots
const CurrencyStack = createNativeStackNavigator();
const GoldStack = createNativeStackNavigator();

// Currencies screens routing root
export const CurrencyRoot: React.FC = () => {
  return (
    <CurrencyStack.Navigator
      screenOptions={{
        // Use custom header component
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

// Gold screens routing root
export const GoldRoot: React.FC = () => {
  return (
    <GoldStack.Navigator
      screenOptions={{
        // Use custom header component
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
