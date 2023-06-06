import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenLayout} from '../../layouts';
import useSWR from 'swr';
import {getDataFetcher} from '../../api';

export const GoldAnalizeScreen: React.FC = () => {
  // TODO: add /${startDate}/${endDate} 
  const {data, error, isLoading} = useSWR('/cenyzlota', getDataFetcher);

  return (
    <ScreenLayout>
      <Text variant="headlineLarge">Gold Analize in Time Screen</Text>
    </ScreenLayout>
  );
};
