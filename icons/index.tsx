import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {width: 30, height: 30},
});

export const DolarIcon = () => (
  <Image source={require('../assets/dolar.png')} style={styles.icon} />
);

export const GoldBarIcon = () => (
  <Image source={require('../assets/gold.png')} style={styles.icon} />
);
