import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Content,
  View,
  Spinner
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { fetchPhonebookSync, syncDataPhonebook } from 'actions/userActions';
import useCheckFriend from 'components/common/hook/useCheckFriend';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const SyncPhonebook = props => {
  const dispatch = useDispatch();
  const { handleAddFriend } = props;
  const { dataUser } = useSelector(state => state.dataUser);
  const { listPhonebookSync, isLoading } = useSelector(state => state.friends);
  const { setPhonebook } = props;
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
      console.log(status);
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

  useEffect(() => {
    dispatch(fetchPhonebookSync());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Content>
          <View style={styles.rect}>
            <TouchableOpacity onPress={() => setPhonebook(false)}>
              <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.login}>Friends from phonebook device</Text>
          </View>
          {isLoading && <Spinner />}
          {!isLoading && !listFindFill && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#AAA', fontSize: 30 }}>
                No friends sync
              </Text>
            </View>
          )}
          <Content style={{ marginTop: 20 }}>
            {listFindFill
              ?.filter(item => item.id !== dataUser.id)
              .map((friend, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem thumbnail style={{ paddingBottom: 12 }}>
                      <Left>
                        <Thumbnail
                          rounded
                          source={
                            friend.avatar
                              ? {
                                  uri: `${imaPrefix}${friend.avatar}`
                                }
                              : require('assets/avatarDefault.png')
                          }
                        />
                      </Left>
                      <Body style={{ borderBottomColor: 'white' }}>
                        <Text>{friend.name}</Text>
                      </Body>
                      <Right style={{ borderBottomWidth: 0 }}>
                        {friend.status === undefined && (
                          <LinearGradient
                            start={{ x: -1, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#2962ff', '#0cb3ff']}
                            style={styles.LinearGradientProfile}
                          >
                            <TouchableOpacity
                              style={styles.UpdateProfile}
                              onPress={() => handleAddFriend(friend.id)}
                            >
                              <Text style={styles.UpdatedProfileText}>
                                Add friend
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        )}
                        {friend.status === true && (
                          <LinearGradient
                            start={{ x: -1, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#2962ff', '#0cb3ff']}
                            style={styles.LinearGradientProfile}
                          ></LinearGradient>
                        )}
                        {friend.status === false && (
                          <LinearGradient
                            start={{ x: -1, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#a5d6a7', '#4caf50']}
                            style={styles.LinearGradientProfile}
                          >
                            <TouchableOpacity
                              style={styles.UpdateProfile}
                              disabled
                            >
                              <Text style={styles.UpdatedProfileText}>
                                Waiting...
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        )}
                      </Right>
                    </ListItem>
                  </Fragment>
                );
              })}
          </Content>
        </Content>
      </Container>
    </>
  );
};

export default SyncPhonebook;

SyncPhonebook.propTypes = {
  setPhonebook: PropTypes.func,
  handleAddFriend: PropTypes.func
};
SyncPhonebook.defaultProps = {
  setPhonebook: () => {},
  handleAddFriend: () => {}
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
