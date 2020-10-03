import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { AuthenProvider } from './src/components/common/context/AuthenContext';
import GlobalProvider from './src/components/common/context/GlobalContext';
import App from './src/components/App';
import store from './src/store';
import 'react-native-gesture-handler';

export default function Main() {
  return (
    <AuthenProvider>
      <GlobalProvider>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </GlobalProvider>
    </AuthenProvider>
  );
}
