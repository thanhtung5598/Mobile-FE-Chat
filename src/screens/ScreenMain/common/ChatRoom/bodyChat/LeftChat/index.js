import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Thumbnail, View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LeftChat = props => {
  const { currentGroup } = useSelector(state => state.groupSelected);
  const { message, user, indexToggle, handleToggleModalRemove } = props;

  const filterAvatar = _currentGroup => {
    if (!_currentGroup?.length) {
      return _currentGroup.avatar;
    }
  };

  const avatarUser = filterAvatar(currentGroup);

  return (
    <View style={{ flexDirection: 'row', paddingTop: '5%', paddingLeft: 5 }}>
      <View style={{ alignSelf: 'flex-end', marginRight: 5 }}>
        <Thumbnail
          style={{ width: 50, height: 50 }}
          rounded
          source={
            avatarUser
              ? {
                  uri: avatarUser
                }
              : require('assets/avatarDefault.png')
          }
        />
      </View>
      <View>
        <View
          style={{
            width: 200,
            paddingLeft: 15,
            borderRadius: 18,
            marginBottom: 3
          }}
        >
          <Text style={{ fontSize: 13, color: 'rgb(138, 141, 145)' }}>
            {user.name}
          </Text>
        </View>
        <TouchableOpacity
          onLongPress={() => handleToggleModalRemove(indexToggle)}
        >
          {message.map((text, index) => (
            <View
              key={index}
              style={{
                width: 200,
                minHeight: 30,
                paddingLeft: 15,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#e4e6eb',
                borderRadius: 18,
                marginBottom: 3
              }}
            >
              <Text>{text}</Text>
            </View>
          ))}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeftChat;

LeftChat.propTypes = {
  message: PropTypes.array,
  handleToggleModalRemove: PropTypes.func,
  indexToggle: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.any)
};
LeftChat.defaultProps = {
  message: [],
  handleToggleModalRemove: () => {},
  indexToggle: () => {},
  user: {}
};
