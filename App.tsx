import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CurrencyRoot, GoldRoot} from './src/roots';
import {DolarIcon, GoldBarIcon} from './src/assets/icons';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
          }}>
          <Tab.Screen
            name="CurrencyRoot"
            component={CurrencyRoot}
            options={{
              title: 'Waluty',
              headerShown: false,
              tabBarIcon: DolarIcon,
              tabBarActiveTintColor: DefaultTheme.colors.secondary,
              tabBarInactiveTintColor: DefaultTheme.colors.scrim,
            }}
          />
          <Tab.Screen
            name="GoldRoot"
            component={GoldRoot}
            options={{
              title: 'Złoto',
              headerShown: false,
              tabBarIcon: GoldBarIcon,
              tabBarActiveTintColor: DefaultTheme.colors.secondary,
              tabBarInactiveTintColor: DefaultTheme.colors.scrim,
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
