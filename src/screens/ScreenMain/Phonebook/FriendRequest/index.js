import React, { Fragment, useEffect } from 'react';
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
import { fetchRequestFriends } from 'actions/userActions';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';
const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const FriendRequest = props => {
  const dispatch = useDispatch();
  const { listRequestFriends, isLoading } = useSelector(state => state.friends);
  const { setShowFriendsReq, handleAcceptFriend, handleDeclineFriend } = props;

  useEffect(() => {
    dispatch(fetchRequestFriends());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Content>
          <View style={styles.rect}>
            <TouchableOpacity onPress={() => setShowFriendsReq(false)}>
              <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.login}>Friends request</Text>
          </View>
          {isLoading && <Spinner />}
          {!isLoading && !listRequestFriends && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#AAA', fontSize: 30 }}>
                No friends requested
              </Text>
            </View>
          )}
          <Content style={{ marginTop: 20 }}>
            {listRequestFriends?.map((friend, index) => {
              return (
                <Fragment key={index}>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail
                        rounded
                        source={{
                          uri:
                            (friend.avatar && `${imaPrefix}${friend.avatar}`) ||
                            avatarDefault
                        }}
                      />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>{friend.name}</Text>
                    </Body>
                    <Right
                      style={{ borderBottomWidth: 0, flexDirection: 'row' }}
                    >
                      <LinearGradient
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#e64a19', '#ff7043']}
                        style={styles.LinearGradientLeft}
                      >
                        <TouchableOpacity
                          style={styles.UpdateProfile}
                          onPress={() => handleDeclineFriend(friend.id)}
                        >
                          <Text style={styles.UpdatedProfileText}>Decline</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                      <LinearGradient
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#2962ff', '#0cb3ff']}
                        style={styles.LinearGradientRight}
                      >
                        <TouchableOpacity
                          style={styles.UpdateProfile}
                          onPress={() => handleAcceptFriend(friend.id)}
                        >
                          <Text style={styles.UpdatedProfileText}>Accept</Text>
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

export default FriendRequest;

FriendRequest.propTypes = {
  handleDeclineFriend: PropTypes.func,
  handleAcceptFriend: PropTypes.func,
  setShowFriendsReq: PropTypes.func
};
FriendRequest.defaultProps = {
  handleDeclineFriend: () => {},
  handleAcceptFriend: () => {},
  setShowFriendsReq: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  LinearGradientLeft: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5
  },
  LinearGradientRight: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10
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
    fontSize: 20,
    fontWeight: '500'
  }
});
