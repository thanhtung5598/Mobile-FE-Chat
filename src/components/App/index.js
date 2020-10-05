import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import SceenRoot from 'screens/SceenRoot';
import ScreenMain from 'screens/ScreenMain/Drawer';
import { isTokenExpired } from 'actions/authenActions';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authen);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated !== false ? <ScreenMain /> : <SceenRoot />}
    </NavigationContainer>
  );
};

export default App;
