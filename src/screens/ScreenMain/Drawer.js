import React from 'react';

import MainTab from './MainTab';
import Menu from './Menu';
import { SocketProvider } from 'components/common/context/SocketContext';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Main = props => {
  return (
    <SocketProvider>
      <Drawer.Navigator
        drawerStyle={{ width: 200 }}
        drawerPosition="left"
        drawerContent={() => <Menu {...props} />}
        initialRouteName="Messages"
      >
        <Drawer.Screen name="Messages" component={MainTab} />
      </Drawer.Navigator>
    </SocketProvider>
  );
};

export default Main;
