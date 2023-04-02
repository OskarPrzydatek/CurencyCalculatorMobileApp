import {render} from '@testing-library/react-native';
import React from 'react';
import App from '../App';

describe('App', () => {
  test('snapshot', () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
