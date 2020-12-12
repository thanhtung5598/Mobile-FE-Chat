/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar, Platform } from 'react-native';
import { Container, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SocketProvider } from 'components/common/context/SocketContext';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Messages from './Messages';
import GroupChat from './GroupChat';
import Phonebook from './Phonebook';
import Profile from './Profile';

import {
  getProfileUser,
  fetchPhonebookSync,
  fetchRequestFriends,
  fetchListFriends,
  fetchFriendsWait
} from 'actions/userActions';
import { fetchAllGroupsForChecked } from 'actions/groupActions';

Platform.OS === 'android' && StatusBar.setHidden(true);
const Tab = createBottomTabNavigator();

const MainTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [footer, setFooter] = useState(true);

  useEffect(() => {
    dispatch(getProfileUser());
    dispatch(fetchRequestFriends());
    dispatch(fetchFriendsWait());
    dispatch(fetchListFriends());
    dispatch(fetchPhonebookSync());
    dispatch(fetchAllGroupsForChecked());
  }, [dispatch]);

  return (
    <Container>
      <SocketProvider>
        <ActionSheetProvider>
          <Tab.Navigator
            tabBarPosition="bottom"
            tabBarOptions={{
              activeTintColor: '#2196f3'
            }}
          >
            <Tab.Screen
              name="Messages"
              options={{
                tabBarLabel: ({ focused, color }) =>
                  focused && (
                    <Text style={{ color, fontSize: 12 }}>Messages</Text>
                  ),
                tabBarVisible: footer,
                tabBarIcon: ({ color }) => (
                  <AntDesign name="message1" size={24} color={color} />
                )
              }}
            >
              {() => <Messages setFooter={setFooter} />}
            </Tab.Screen>
            <Tab.Screen
              name="GroupChat"
              options={{
                tabBarLabel: ({ focused, color }) =>
                  focused && <Text style={{ color, fontSize: 12 }}>Group</Text>,
                tabBarVisible: footer,
                tabBarIcon: ({ color }) => (
                  <AntDesign name="appstore-o" size={24} color={color} />
                )
              }}
            >
              {() => <GroupChat setFooter={setFooter} footer={footer} />}
            </Tab.Screen>
            <Tab.Screen
              name="Phonebook"
              options={{
                tabBarLabel: ({ focused, color }) =>
                  focused && (
                    <Text style={{ color, fontSize: 12 }}>Phonebook</Text>
                  ),
                tabBarVisible: footer,
                tabBarIcon: ({ color }) => (
                  <AntDesign name="contacts" size={24} color={color} />
                )
              }}
            >
              {() => <Phonebook setFooter={setFooter} />}
            </Tab.Screen>
            <Tab.Screen
              name="Profile"
              options={{
                tabBarLabel: ({ focused, color }) =>
                  focused && (
                    <Text style={{ color, fontSize: 12 }}>Profile</Text>
                  ),
                tabBarIcon: ({ color }) => (
                  <AntDesign name="profile" size={24} color={color} />
                )
              }}
            >
              {() => <Profile setFooter={setFooter} navigation={navigation} />}
            </Tab.Screen>
          </Tab.Navigator>
        </ActionSheetProvider>
      </SocketProvider>
    </Container>
  );
};

export default MainTab;
