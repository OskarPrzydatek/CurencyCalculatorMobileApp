import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ICenterLayout {
  children: React.ReactNode;
}

export const CenterLayout: React.FC<ICenterLayout> = ({children}) => {
  return <View style={styles.centerLayout}>{children}</View>;
};

const styles = StyleSheet.create({
  centerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});
