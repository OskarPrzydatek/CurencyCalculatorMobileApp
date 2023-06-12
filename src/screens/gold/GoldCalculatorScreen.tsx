/**
 *
 * GoldCalculator screen to calculate value
 * of gold per gram in PLN (polish zloty value) and show
 * changes of gold price per gram in time using chart
 *
 * @author Jakub Świderski
 *
 */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  Text,
  TextInput,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';
import {Dimensions, StyleSheet, View} from 'react-native';
import {IGoldRates} from '../../models';
import {LineChart} from 'react-native-chart-kit';

export const GoldCalculatorScreen: React.FC = () => {
  // State hooks to handle dates to get gold prices in time.
  // Dates are binded in endpoint to get price range.
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  // Currency one controlled input value
  const [goldValue, setGoldValue] = React.useState<string>('1');

  // Hook to use navigation functions
  const navigation = useNavigation<any>();
  // Hook to fetch data from API
  const {data, error, isLoading} = useSWR(
    `/cenyzlota/${startDate}/${endDate}`,
    getDataFetcher,
  );

  // By using React Native Dimentsions API handle width of device
  // and multiply by 0.9 to get 90% of device width for chart
  const chartWidth = Dimensions.get('window').width * 0.9;

  /**
   *
   * Function to create dates array mapped form yyyy-mm-dd
   * format to dd.mm when data are fethed
   *
   * @returns array of mapped date labels
   *
   */
  const handleChartLabels = () => {
    if (data) {
      return data.map(
        (goldRates: IGoldRates) =>
          // Get day from date
          `${goldRates.data.split('-')[2]}.${
            // Get month form date
            goldRates.data.split('-')[1]
          }`,
      );
    }
  };

  /**
   *
   * Function to create array of currency values
   * in PLN when data are fethed
   *
   * @returns array of gold prices in PLN
   *
   */
  const handleChartData = () => {
    if (data) return data.map((goldRates: IGoldRates) => goldRates.cena);
  };

  /**
   *
   * Function to calculate gold per gram price in PLN using
   * latest gold value and multiply by gold num input value
   *
   * @returns calculated currency value in polish zloty
   *
   */
  const handleGoldCalculation = () => {
    // index of last array element
    const newestCurrencyIndex = data.length - 1;
    return Number(goldValue) * data[newestCurrencyIndex].cena;
  };

  // Function to navigate to GoldAnalizeScreen
  const onPressNavigateToGoldAnalize = () =>
    navigation.navigate('GoldAnalizeScreen');

  // Set dates for endpoint in 7 days range
  React.useEffect(() => {
    // Get todays date
    const today = new Date();
    // Set todays date as endDate in yyyy-mm-dd format
    setEndDate(today.toISOString().split('T')[0]);

    // Get previous date (for this moment is still todays date)
    const prevDate = new Date(today);
    // Override previous date as date 7 days ago
    prevDate.setDate(today.getDate() - 7);
    // Set previous date as startDate in yyyy-mm-dd format
    setStartDate(prevDate.toISOString().split('T')[0]);
  }, []);

  return (
    <ScreenLayout isLoading={isLoading} error={error}>
      {/* Check data will fetched, If not return null for Virtual DOM */}
      {data ? (
        <>
          {/* Screen title */}
          <Text variant="headlineLarge">Kalkulator Ceny Złota</Text>

          {/* Button to navigate to gold price analize screen */}
          <Button
            style={styles.goldAnalizeButton}
            mode="contained"
            onPress={onPressNavigateToGoldAnalize}>
            Analiza Cen
          </Button>

          {/* Gold input value wrapper */}
          <View style={styles.calculationResult}>
            {/* Gold input */}
            <TextInput
              mode="outlined"
              style={styles.goldInput}
              keyboardType="numeric"
              value={goldValue}
              onChangeText={text => setGoldValue(text)}
              testID="gold-value-input"
            />

            {/* Gold grams label */}
            <Text variant="headlineSmall">g</Text>
          </View>

          {/* Equals */}
          <Text variant="headlineSmall">=</Text>

          {/* Calculated gold value in PLN */}
          <Text variant="headlineSmall">{handleGoldCalculation()} PLN</Text>

          {/* Chart section */}
          <View style={styles.chartSection}>
            {/* Chart section label */}
            <Text variant="labelLarge">Wykres zmian ceny w czasie</Text>

            {/* Chart */}
            <LineChart
              data={{
                labels: handleChartLabels(),
                datasets: [{data: handleChartData()}],
              }}
              width={chartWidth}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundGradientFrom: DefaultTheme.colors.primary,
                backgroundGradientTo: DefaultTheme.colors.secondary,
                decimalPlaces: 3,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: styles.chart,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </>
      ) : null}
    </ScreenLayout>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all elements in gold calculator layout
const styles = StyleSheet.create({
  goldAnalizeButton: {
    alignSelf: 'flex-start',
  },
  calculationResult: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goldInput: {
    width: '70%',
  },
  chartSection: {
    display: 'flex',
    marginTop: '5%',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});
