import * as React from 'react';
import { name as appName } from './app.json';

import { AppRegistry } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import store from './src/redux/store';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
