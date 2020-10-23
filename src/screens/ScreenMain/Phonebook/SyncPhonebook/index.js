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

const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const SyncPhonebook = props => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);
  const { listPhonebookSync, isLoading } = useSelector(state => state.friends);
  const { setPhonebook } = props;

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
          const newData = data.map(item =>
            item.phoneNumbers.map(item => item.number)
          );
          const dataSync = {
            user_id: dataUser.id,
            listPhoneBook: newData.flat()
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
          {!isLoading && !listPhonebookSync && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#AAA', fontSize: 30 }}>
                No friends requested
              </Text>
            </View>
          )}
          <Content style={{ marginTop: 20 }}>
            {listPhonebookSync?.map((friend, index) => {
              return (
                <Fragment key={index}>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail
                        rounded
                        source={{ uri: friend.avatar || avatarDefault }}
                      />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>{friend.name}</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: 0 }}>
                      <LinearGradient
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#2962ff', '#0cb3ff']}
                        style={styles.LinearGradientProfile}
                      >
                        <TouchableOpacity style={styles.UpdateProfile}>
                          <Text style={styles.UpdatedProfileText}>
                            Accepted
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
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
  setPhonebook: PropTypes.func
};
SyncPhonebook.defaultProps = {
  setPhonebook: () => {}
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
