/**
 *
 * SingleCurrency screen to calculate value
 * of currency in PLN (polish zloty value) and show
 * changes of currency price in time using chart
 *
 * Screen use one navigation param:
 *
 * @param code - currency code needed to make
 * API request for single currency data
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {
  Text,
  TextInput,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ICurrencyRates} from '../../models';

export const SingleCurrencyScreen: React.FC = () => {
  // State hooks to handle dates to get currency prices in time.
  // Dates are binded in endpoint to get price range.
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  // Currency one controlled input value
  const [currencyValue, setCurrencyValue] = React.useState<string>('1');

  // Hook to get route params
  const route = useRoute<RouteProp<{code: any}>>();
  // Hook to fetch data about currency by code and dates range
  const {data, error, isLoading} = useSWR(
    `/exchangerates/rates/A/${route.params?.code}/${startDate}/${endDate}`,
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
      return data.rates.map(
        (currencyRates: ICurrencyRates) =>
          // Get day from date
          `${currencyRates.effectiveDate.split('-')[2]}.${
            // Get month form date
            currencyRates.effectiveDate.split('-')[1]
          }`,
      );
    }
  };

  /**
   *
   * Function to create array of currency values
   * in PLN when data are fethed
   *
   * @returns array of currency values in PLN
   *
   */
  const handleChartData = () => {
    if (data)
      return data.rates.map(
        (currencyRates: ICurrencyRates) => currencyRates.mid,
      );
  };

  /**
   *
   * Function to calculate currency value in PLN using
   * latest currency value and multiply by curreny num input value
   *
   * @returns calculated currency value in polish zloty
   *
   */
  const handleCurrencyCalculation = () => {
    // index of last array element
    const newestCurrencyIndex = data.rates.length - 1;
    return Number(currencyValue) * data.rates[newestCurrencyIndex].mid;
  };

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
    <ScreenLayout error={error} isLoading={isLoading}>
      {/* Check data will fetched, If not return null for Virtual DOM */}
      {data ? (
        <>
          {/* Screen title with currency name */}
          <Text style={{textTransform: 'capitalize'}} variant="headlineLarge">
            {data.currency}
          </Text>

          {/* Currency input value wrapper */}
          <View style={styles.calculationResult}>
            {/* Currency input */}
            <TextInput
              mode="outlined"
              style={styles.currencyInput}
              keyboardType="numeric"
              value={currencyValue}
              onChangeText={text => setCurrencyValue(text)}
            />

            {/* Currency code label */}
            <Text variant="headlineSmall">{data.code}</Text>
          </View>

          {/* Equals */}
          <Text variant="headlineSmall">=</Text>

          {/* Calculated value in PLN */}
          <Text variant="headlineSmall">{handleCurrencyCalculation()} PLN</Text>

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
                decimalPlaces: 4,
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
// to style all elements in single currency layout
const styles = StyleSheet.create({
  calculationResult: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currencyInput: {
    width: '70%',
  },
  chartSection: {
    display: 'flex',
    marginTop: '10%',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});
