import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';

interface ICenterLayout {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  centerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

export const ScreenLayout: React.FC<ICenterLayout> = ({children}) => {
  return <View style={styles.centerLayout}>{children}</View>;
};

export const CustomNavigationBar = ({navigation, back}: NativeStackHeaderProps) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
};
