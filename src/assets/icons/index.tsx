import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {width: 30, height: 30},
});

export const DolarIcon = () => (
  <Image source={require('../pictures/dolar.png')} style={styles.icon} />
);

export const GoldBarIcon = () => (
  <Image source={require('../pictures/gold.png')} style={styles.icon} />
);
