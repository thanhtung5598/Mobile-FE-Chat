import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const ItemFriendRequired = ({
  styles,
  friend,
  handleDeclineFriend,
  handleAcceptFriend
}) => {
  return (
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
