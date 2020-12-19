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
import { SocketContext } from 'components/common/context/SocketContext';

const ItemFriendRequired = ({
  friend,
  handleDeclineFriend,
  handleAcceptFriend
}) => {
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
      <Body style={{ borderBottomColor: 'white' }}>
        <Text>{friend.name}</Text>
      </Body>
      <Right style={{ borderBottomWidth: 0, flexDirection: 'row' }}>
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
  );
};

export default ItemFriendRequired;

ItemFriendRequired.propTypes = {
  handleAcceptFriend: PropTypes.func,
  handleDeclineFriend: PropTypes.func,
  friend: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any)
};

ItemFriendRequired.defaultProps = {
  handleAcceptFriend: () => {},
  handleDeclineFriend: () => {},
  friend: {},
  styles: {}
};
const styles = StyleSheet.create({
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
  badgeIsOnline: {
    width: 13,
    height: 13,
    backgroundColor: '#31A252',
    position: 'absolute',
    right: 3,
    bottom: 0
  }
});
