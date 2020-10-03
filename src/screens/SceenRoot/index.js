import React from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Welcome from './Welcome';

import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();

const ScreenRoot = () => {
  return (
    <RootStack.Navigator initialRouteName="Welcome" headerMode="none">
      <RootStack.Screen name="Welcome" component={Welcome}></RootStack.Screen>
      <RootStack.Screen name="Login" component={Login}></RootStack.Screen>
      <RootStack.Screen name="Register" component={Register}></RootStack.Screen>
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default ScreenRoot;
