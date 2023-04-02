import React from 'react';
import {Button, Text} from 'react-native-paper';
import {CenterLayout} from '../views';
import {version} from '../package.json';

export const HomeScreen: React.FC = () => {
  const [showMessage, setShowMessage] = React.useState<boolean>(false);

  const buttonLabel = showMessage ? 'Hide Message' : 'Show Message';

  const _onPress = () => setShowMessage(prev => !prev);

  return (
    <CenterLayout>
      <Text variant="headlineLarge">Currency Calculator</Text>
      {showMessage ? <Text>Hidden Message</Text> : null}
      <Button mode="contained" onPress={_onPress}>
        {buttonLabel}
      </Button>
      <Text variant="titleMedium">version {version}</Text>
    </CenterLayout>
  );
};
