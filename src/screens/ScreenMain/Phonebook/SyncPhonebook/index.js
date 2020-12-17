import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { syncDataPhonebook } from 'actions/userActions';
import useCheckFriend from 'components/common/hook/useCheckFriend';
import EmptyList from 'screens/ScreenMain/common/EmptyList';
// Item Render
import { ItemFriends } from 'screens/ScreenMain/common/ItemRender';
// action
import {
  fetchRequestFriends,
  fetchListFriends,
  fetchFriendsWait
} from 'actions/userActions';

const SyncPhonebook = props => {
  const dispatch = useDispatch();
  const { handleAddFriend } = props;
  const { dataUser } = useSelector(state => state.dataUser);
  const { listPhonebookSync, isLoading } = useSelector(state => state.friends);
  const { setPhonebook, handleToggleChatRoom } = props;
  const { listFriends, listFriendsWait, listRequestFriends } = useSelector(
    state => state.friends
  );
  const { listFindFill } = useCheckFriend({
    listUsers: listPhonebookSync,
    listFriends,
    listFriendsWait,
    listRequestFriends
  });

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length >= 0) {
          const newData = data.map(item =>
            item.phoneNumbers.map(item => item.number)
          );
          const dataSync = {
            user_id: dataUser.id,
            listPhoneBook: newData.flat().map(item => item.split(' ').join(''))
          };
          dispatch(syncDataPhonebook(dataSync));
        }
      }
      if (status === 'denied') {
        //doing somthing
      }
    })();
  }, [dataUser, dispatch]);

  const renderItemSyncPhone = useCallback(
    ({ item: friend }) => {
      return (
        <TouchableOpacity onPress={() => handleToggleChatRoom(friend)}>
          <ItemFriends
            friend={friend}
            handleAddFriend={handleAddFriend}
            status={true}
          />
        </TouchableOpacity>
      );
    },
    [handleAddFriend, handleToggleChatRoom]
  );

  const renderEmptyComponent = () => <EmptyList message={'No friends sync'} />;

  const handlePullToRefesh = useCallback(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length >= 0) {
          const newData = data.map(item =>
            item.phoneNumbers.map(item => item.number)
          );
          const dataSync = {
            user_id: dataUser.id,
            listPhoneBook: newData.flat().map(item => item.split(' ').join(''))
          };
          dispatch(syncDataPhonebook(dataSync));
          dispatch(fetchRequestFriends());
          dispatch(fetchListFriends());
          dispatch(fetchFriendsWait());
        }
      }
      if (status === 'denied') {
        //doing somthing
      }
    })();
  }, [dataUser.id, dispatch]);

  return (
    <>
      <Container>
        <View
          style={
            Platform.OS === 'android'
              ? { ...styles.rect }
              : { ...styles.rect, paddingTop: '15%' }
          }
        >
          <TouchableOpacity onPress={() => setPhonebook(false)}>
            <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.login}>Friends from phonebook device</Text>
        </View>
        <View style={{ marginTop: 10, height: '100%' }}>
          <FlatList
            data={listFindFill?.filter(item => item.id !== dataUser.id)}
            renderItem={renderItemSyncPhone}
            keyExtractor={item => `${item.id}`}
            refreshing={isLoading}
            ListEmptyComponent={renderEmptyComponent}
            onRefresh={handlePullToRefesh}
          />
        </View>
      </Container>
    </>
  );
};

export default SyncPhonebook;

SyncPhonebook.propTypes = {
  setPhonebook: PropTypes.func,
  handleAddFriend: PropTypes.func,
  handleToggleChatRoom: PropTypes.func
};
SyncPhonebook.defaultProps = {
  setPhonebook: () => {},
  handleAddFriend: () => {},
  handleToggleChatRoom: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  LinearGradientProfile: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 15,
    paddingLeft: 15
  },
  UpdatedProfileText: {
    color: 'white'
  },
  UpdateProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  rect: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 30,
    marginRight: 20
  },
  login: {
    fontSize: 18,
    fontWeight: '500'
  }
});
