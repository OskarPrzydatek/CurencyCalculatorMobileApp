/**
 * 
 * Icons phasade which exports all icons 
 * used in app
 * 
 * @author Jakub Świderski
 * 
 */
import {Image, StyleSheet} from 'react-native';

export const DolarIcon = () => (
  <Image source={require('../pictures/dolar.png')} style={styles.icon} />
);

export const GoldBarIcon = () => (
  <Image source={require('../pictures/gold.png')} style={styles.icon} />
);

// CSS-in-JS styles object created by using ReactNative API
// to style all icons
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
