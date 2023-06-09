/**
 *
 * Layouts phasade used to manage all layouts in app development
 *
 * @author Oskar Przydatek
 * @author Jakub Świderski
 *
 */
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Appbar, Text} from 'react-native-paper';
import {IScreenLayout} from '../models';

/**
 *
 * Layout used in all screens in app.
 *
 * @param {boolean?} isLoading - render loading layout when app fetch data
 * from API
 *
 * @param {boolean?} error - render error layout if something went wrong
 * with API data fetch
 *
 * @param {React.ReactNode} children - props to render screen layout when
 * all data will be fetched correctly by wrapping custom screen layout.
 *
 * @returns - React function component
 *
 */
export const ScreenLayout: React.FC<IScreenLayout> = ({
  isLoading,
  error,
  children,
}: IScreenLayout) => {
  // Loading layout
  if (isLoading)
    return (
      <View style={styles.loadingLayout}>
        <Text>Loading Currencies</Text>
        <ActivityIndicator />
      </View>
    );

  // Fetched data error layout
  if (error)
    return (
      <View style={styles.errorLayout}>
        <Text>Something went wrong. Check internet connection</Text>
      </View>
    );

  // Fetched data correctly layout
  return <View style={styles.screenLayout}>{children}</View>;
};

export const CustomNavigationBar: React.FC<NativeStackHeaderProps> = ({
  navigation,
  back,
}: NativeStackHeaderProps) => {
  return (
    <Appbar.Header style={styles.navigationBar}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all layouts
const styles = StyleSheet.create({
  loadingLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: '5%',
  },
  navigationBar: {
    backgroundColor: 'transparent',
  },
});
