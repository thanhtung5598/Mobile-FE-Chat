import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Messages from './Messages';
import GroupMessages from './GroupMessages';
import Phonebook from './Phonebook';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: () => (
            <AntDesign name="message1" size={24} color="white" />
          )
        }}
      />
      <Tab.Screen
        name="GroupMessages"
        component={GroupMessages}
        options={{
          tabBarLabel: 'Nhóm',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              size={25}
              color="white"
            />
          )
        }}
      />
      <Tab.Screen
        name="Phonebook"
        component={Phonebook}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: () => (
            <AntDesign name="contacts" size={24} color="white" />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: () => <AntDesign name="profile" size={24} color="white" />
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
