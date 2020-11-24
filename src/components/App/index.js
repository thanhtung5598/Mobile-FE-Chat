import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Platform, Image, LogBox } from 'react-native';
import { Container } from 'native-base';
import SceenRoot from 'screens/SceenRoot';
import ScreenMain from 'screens/ScreenMain/Drawer';
import { isTokenExpired } from 'actions/authenActions';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

LogBox.ignoreAllLogs();

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authen);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('assets/a.png')}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Container
        style={
          Platform.OS === 'android'
            ? {
                paddingTop: 22,
                backgroundColor: '#F8F8F8'
              }
            : {}
        }
      >
        {isAuthenticated !== false ? <ScreenMain /> : <SceenRoot />}
      </Container>
    </NavigationContainer>
  );
};

export default App;
