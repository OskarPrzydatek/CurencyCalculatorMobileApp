/**
 *
 * CurrencyCalculator screen to calculate value
 * of currency no. one to currency no. two using both
 * currencies mid value (polish zloty value)
 *
 * @author Oskar Przydatek
 *
 */
import React from 'react';
import {Button, Divider, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';
import {StyleSheet, View} from 'react-native';
import {ICurrency} from '../../models';

export const CurrencyCalculatorScreen: React.FC = () => {
  // Hook to use navigation functions
  const navigation = useNavigation<any>();
  // Hook to fetch data from API
  const {data, error, isLoading} = useSWR(
    '/exchangerates/tables/A',
    getDataFetcher,
  );

  // Selected currencies state - uselected equals undefined
  const [currencyOne, setCurrencyOne] = React.useState<ICurrency | undefined>(
    undefined,
  );
  const [currencyTwo, setCurrencyTwo] = React.useState<ICurrency | undefined>(
    undefined,
  );

  // Currency one controlled input value
  // Default value starts from value 1
  const [currencyOneValue, setCurrencyOneValue] = React.useState<string>('1');

  // Labels for currencies buttons and inputs
  const currencyOneButtonLabel = currencyOne
    ? `Z ${currencyOne.code}`
    : 'Z waluty';
  const currencyTwoButtonLabel = currencyTwo
    ? `Na ${currencyTwo.code}`
    : 'Na walutę';

  // Check are both currencies selected
  const areAllCurrenciesSelected = currencyOne && currencyTwo;

  /**
   *
   * Funtion which calculate currencies values using formula:
   *
   * currencyOne = (currencyOnePLN / currencyTwoPLN) * currencyOneInputValue
   *
   * Confirmation of formula:
   *  currencyOneInputValue = 1 in default
   *  currencyOne = object (not valued in calculations)
   *  currencyTwo = object (not valued in calculations)
   *
   *  currencyOneInputValue * currencyOne = currencyOnePLN
   *  currencyTwo = currencyTwoPLN
   *
   *  currencyOneInputValue * currencyTwoPLN * currencyOne = currencyTwo * currencyOnePLN
   *  currencyOneInputValue * currencyOne = currencyTwo * (currencyOnePLN / currencyTwoPLN)
   *  currencyOne = currencyTwo * (currencyOnePLN / currencyTwoPLN) * currencyOneInputValue
   *
   * @returns calculated result of currencies comparison
   *
   */
  const handleCurrenciesCalculation = () => {
    if (areAllCurrenciesSelected)
      return (currencyOne?.mid / currencyTwo?.mid) * Number(currencyOneValue);
  };

  // Functions to handle currencies set
  const handleSetCurrencyOne = (item: ICurrency) => setCurrencyOne(item);
  const handleSetCurrencyTwo = (item: ICurrency) => setCurrencyTwo(item);

  // Function to navigate to list of all currencies
  const onPressNavigateToCurrenciesList = () =>
    navigation.navigate('CurrenciesList');

  // Function to navigate to select currency one
  const onPressNavigateToSelectCyrrencyOne = () =>
    navigation.navigate('CurrencySelect', {
      // Pass to select screen fetched data
      data: data[0].rates,
      // Pass to select screen function to select currency no. one
      setCurrency: handleSetCurrencyOne,
    });

  // Function to navigate to select currency two
  const onPressNavigateToSelectCyrrencyTwo = () =>
    navigation.navigate('CurrencySelect', {
      // Pass to select screen fetched data
      data: data[0].rates,
      // Pass to select screen function to select currency no. two
      setCurrency: handleSetCurrencyTwo,
    });

  // Function to swap currencies with bubble sort usage
  const onPressSwapCurrencies = () => {
    // Effect is wanted only if we have setted both currencies
    if (currencyOne && currencyTwo) {
      const currencyOneBubble = currencyOne;
      setCurrencyOne(currencyTwo);
      setCurrencyTwo(currencyOneBubble);
    }
  };

  // Function to set calculator state to default state
  const onPressResetCalculator = () => {
    setCurrencyOneValue('1');
    setCurrencyOne(undefined);
    setCurrencyTwo(undefined);
  };

  return (
    <ScreenLayout isLoading={isLoading} error={error}>
      {/* Check data will fetched, If not return null for Virtual DOM */}
      {data ? (
        <>
          {/* Screen title */}
          <Text variant="headlineLarge">Kalkulator Walut</Text>

          {/* Buttont to navigate to explore all currencies in app */}
          <Button
            style={styles.currencyListButton}
            mode="contained"
            onPress={onPressNavigateToCurrenciesList}>
            Waluty
          </Button>

          {/* Calculator result section */}
          <View style={styles.calculationResultSection}>
            {/* We  can only see calculation result if we select both currencies */}
            {areAllCurrenciesSelected ? (
              <View style={styles.calculationResultWrapper}>
                {/* Currency no. one */}
                <View style={styles.calculationResultCurrencyOne}>
                  {/* Currency no. one value input */}
                  <TextInput
                    mode="outlined"
                    style={styles.currencyOneInput}
                    keyboardType="numeric"
                    value={currencyOneValue}
                    onChangeText={text => setCurrencyOneValue(text)}
                  />

                  {/* Currency no. one code label */}
                  <Text variant="headlineSmall">{currencyOne?.code}</Text>
                </View>

                {/* Equals */}
                <Text variant="headlineSmall">=</Text>

                {/* Currency no. two */}
                <Text variant="headlineSmall">
                  {handleCurrenciesCalculation()} {currencyTwo?.code}
                </Text>
              </View>
            ) : (
              /* No selected currencies message */
              <Text
                variant="headlineSmall"
                style={styles.noCurrenciesSelectedMessage}>
                Wybierz waluty aby zobaczyć kalkulację
              </Text>
            )}
          </View>

          {/* Calculator functionalities section */}
          <View>
            {/* Calculator functionalities section UI separator */}
            <Divider style={styles.functionalitesSectionSeparator} />

            {/* Calculator functionalities section */}
            <View style={styles.functionalitiesSectionWrapper}>
              {/* Choosing currencies section */}
              <View style={styles.functionalitiesSection}>
                {/* Cyrrency no. one select button */}
                <Button
                  mode="outlined"
                  onPress={onPressNavigateToSelectCyrrencyOne}>
                  {currencyOneButtonLabel}
                </Button>

                {/* Cyrrency no. two select button */}
                <Button
                  mode="outlined"
                  onPress={onPressNavigateToSelectCyrrencyTwo}>
                  {currencyTwoButtonLabel}
                </Button>
              </View>

              {/* Calculator options section */}
              <View style={styles.functionalitiesSection}>
                {/* Swap currencies button */}
                <Button mode="contained-tonal" onPress={onPressSwapCurrencies}>
                  Zamień waluty
                </Button>

                {/* Reset currencies button */}
                <Button mode="contained" onPress={onPressResetCalculator}>
                  Reset
                </Button>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </ScreenLayout>
  );
};

// CSS-in-JS styles object created by using ReactNative API
// to style all elements in calculator layout
const styles = StyleSheet.create({
  currencyListButton: {
    width: '25%',
    alignSelf: 'flex-start',
  },
  calculationResultSection: {
    width: '100%',
    height: '55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculationResultWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  calculationResultCurrencyOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currencyOneInput: {
    width: '70%',
  },
  noCurrenciesSelectedMessage: {
    textAlign: 'center',
  },
  functionalitesSectionSeparator: {
    height: 1,
    marginBottom: '5%',
  },
  functionalitiesSectionWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  functionalitiesSection: {
    display: 'flex',
    width: '50%',
    paddingHorizontal: '2.5%',
    gap: 10,
  },
});
