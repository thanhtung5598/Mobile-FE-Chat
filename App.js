import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { AuthenProvider } from './src/components/common/context/AuthenContext';
import App from './src/components/App';
import store from './src/store';
import 'react-native-gesture-handler';

export default function Main() {
  return (
    <AuthenProvider>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </AuthenProvider>
  );
}
