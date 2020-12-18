import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Badge
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SocketContext } from 'components/common/context/SocketContext';

const ItemFriends = ({ friend, status = null, handleAddFriend }) => {
  const { isOnline } = useContext(SocketContext);

  return (
    <ListItem thumbnail style={{ paddingBottom: 12 }}>
      <Left>
        <Thumbnail
          rounded
          source={
            friend.avatar
              ? {
                  uri: `${friend.avatar}`
                }
              : require('assets/avatarDefault.png')
          }
        />
        {isOnline(friend.id) && <Badge style={styles.badgeIsOnline}></Badge>}
      </Left>
      <Body style={{ borderBottomWidth: 0 }}>
        <Text>{friend.name}</Text>
      </Body>
      <Right style={{ borderBottomWidth: 0 }}>
        {!status && (
          <MaterialCommunityIcons name="chat" size={24} color="#CCC" />
        )}
        {status && friend.status === undefined && (
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
              <Text style={styles.UpdatedProfileText}>Add friend</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
        {status && friend.status === true && (
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#FFF', '#FFF']}
            style={styles.LinearGradientProfile}
          >
            <Text>--Friend--</Text>
          </LinearGradient>
        )}
        {status && friend.status === false && (
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#a5d6a7', '#4caf50']}
            style={styles.LinearGradientProfile}
          >
            <TouchableOpacity style={styles.UpdateProfile} disabled>
              <Text style={styles.UpdatedProfileText}>Waiting...</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </Right>
    </ListItem>
  );
};

export default ItemFriends;

ItemFriends.propTypes = {
  handleAddFriend: PropTypes.func,
  friend: PropTypes.objectOf(PropTypes.any),
  status: PropTypes.bool
};
ItemFriends.defaultProps = {
  handleAddFriend: () => {},
  friend: {},
  status: null
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
    paddingTop: '15%',
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
  },
  badgeIsOnline: {
    width: 13,
    height: 13,
    backgroundColor: '#31A252',
    position: 'absolute',
    right: 3,
    bottom: 0
  }
});
