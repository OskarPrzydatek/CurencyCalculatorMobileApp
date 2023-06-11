/**
 *
 * Icons phasade which exports all icons
 * used in app
 *
 * @author Jakub Świderski
 *
 */
import {Image, StyleSheet} from 'react-native';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

export const DolarIcon = () => (
  <Image source={require('../pictures/dolar.png')} style={styles.icon} />
);

export const GoldBarIcon = () => (
  <Image source={require('../pictures/gold.png')} style={styles.icon} />
);

export const BackArrowIcon = () => (
  <Image
    source={require('../pictures/back-arrow.png')}
    style={styles.backArrowIcon}
  />
);

// CSS-in-JS styles object created by using ReactNative API
// to style all icons
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  backArrowIcon: {
    width: 40,
    height: 40,
    tintColor: DefaultTheme.colors.primary,
  },
});
