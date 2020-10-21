import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
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
  View
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const source = {
  uri:
    'https://image-us.eva.vn/upload/2-2019/images/2019-06-25/loat-hot-girl-xinh-dep-nuc-tieng-du-thi-thpt-quoc-gia-nam-2019-2-1561430194-418-width660height825.jpg'
};

const FriendRequest = props => {
  const { listRequestFriends } = useSelector(state => state.friends);
  const { setShowFriendsReq, handleAcceptFriend, handleDeclineFriend } = props;
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
          <Content style={{ marginTop: 20 }}>
            {listRequestFriends?.map((friend, index) => {
              console.log(friend);
              return (
                <Fragment key={index}>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
