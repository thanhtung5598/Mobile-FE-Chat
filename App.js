import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import App from './src/screens';
import store from './src/redux/store';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}
