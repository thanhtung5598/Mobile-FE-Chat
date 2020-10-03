import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import SceenRoot from '../../screens/SceenRoot';
import ScreenMain from '../../screens/ScreenMain/MainTab';

import { AuthenContext } from '../common/context/AuthenContext';

import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const { userToken } = useContext(AuthenContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <ScreenMain /> : <SceenRoot />}
    </NavigationContainer>
  );
};

export default App;
