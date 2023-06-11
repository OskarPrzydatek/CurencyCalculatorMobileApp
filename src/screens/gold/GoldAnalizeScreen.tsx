/**
 *
 * GoldAnalize screen to analize last price notes (60)
 * in range of 100 days, shows result in callednar graph
 * and show in what day price of gold per gram changes
 *
 * @author Jakub Świderski
 *
 */
import React from 'react';
import {Text, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';
import {ContributionGraph} from 'react-native-chart-kit';
import {Dimensions, StyleSheet, View} from 'react-native';
import {IGoldPriceNote, IGoldRates} from '../../models';

export const GoldAnalizeScreen: React.FC = () => {
  // Days range the analize of price will be fetched
  const priceAnalyseNotes = 60;
  // Days range
  const daysRange = 100;

  // Hook to fetch data from API
  const {data, error, isLoading} = useSWR(
    `/cenyzlota/last/${priceAnalyseNotes}/?format=json`,
    getDataFetcher,
  );

  // State of current picked day of gold price analize
  const [goldPriceNote, setGoldPriceNote] = React.useState<
    IGoldPriceNote | undefined
  >(undefined);

  // By using React Native Dimentsions API handle width of device
  // and multiply by 0.9 to get 90% of device width for chart
  const chartWidth = Dimensions.get('window').width * 0.9;
  // Variable to fix unneded props
  // https://github.com/indiespirit/react-native-chart-kit/issues/468#issuecomment-888573618
  const handleToolTip: any = {};

  /**
   *
   * Function to create mapped gold price data for chart.
   *
   * @returns mapped for chart array of data
   *
   */
  const handleChartData = () => {
    if (data) {
      return data.map(({cena, data}: IGoldRates) => ({
        date: data,
        count: cena,
      }));
    }
  };

  /**
   *
   * Function to handle the last gold price date change
   * if data was fetched correctly
   *
   * @returns date of lats gold price change
   *
   */
  const handleChartEndDate = () => {
    if (data) {
      return data[data.length - 1].data;
    }
  };

  return (
    <ScreenLayout isLoading={isLoading} error={error}>
      {/* Check data will fetched, If not return null for Virtual DOM */}
      {data ? (
        <>
          {/* Screen title */}
          <Text variant="headlineLarge">Analiza Cen Złota</Text>

          {/* Callendar chart section */}
          <View style={styles.callednarChartSection}>
            <Text variant="labelLarge">
              Ostatnie {priceAnalyseNotes} notowań ceny złota
            </Text>

            {/* Calendar as ContributionGraph  */}
            <ContributionGraph
              values={handleChartData()}
              endDate={handleChartEndDate()}
              numDays={daysRange}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundGradientFrom: DefaultTheme.colors.primary,
                backgroundGradientTo: DefaultTheme.colors.secondary,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              onDayPress={goldNote => setGoldPriceNote(goldNote)}
              tooltipDataAttrs={() => handleToolTip}
              style={styles.chart}
            />
          </View>

          {/* Picked price analize result from calendar */}
          <View style={styles.analizeResultWrapper}>
            {/* Picked day analize data */}
            {goldPriceNote ? (
              <>
                {/* If price changed result */}
                {goldPriceNote.count !== 0 ? (
                  <View style={styles.analizeResult}>
                    {/* Price change date */}
                    <Text variant="headlineMedium">
                      Data: {goldPriceNote.date}
                    </Text>

                    {/* Price change value */}
                    <Text variant="headlineMedium">
                      Cena: {goldPriceNote.count} PLN/g
                    </Text>
                  </View>
                ) : (
                  /* If price doesn't change this day message */
                  <Text style={styles.centerText} variant="headlineMedium">
                    Tego dnia cena się nie zmieniła. Kliknij w inny dzień!
                  </Text>
                )}
              </>
            ) : (
              /* Callendar usage info message */
              <Text style={styles.centerText} variant="headlineMedium">
                Kliknij na dzień, aby zobaczyć szczegóły
              </Text>
            )}
          </View>
        </>
      ) : null}
    </ScreenLayout>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all elements in gold analize layout
const styles = StyleSheet.create({
  callednarChartSection: {
    display: 'flex',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  analizeResultWrapper: {
    marginTop: '5%',
  },
  analizeResult: {
    display: 'flex',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
});
