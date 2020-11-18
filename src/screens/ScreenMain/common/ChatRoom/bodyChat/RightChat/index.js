import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Thumbnail, View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RightChat = props => {
  const { message, user, indexToggle, handleToggleModalRemove } = props;
  const { dataUser } = useSelector(state => state.dataUser);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5%',
        paddingLeft: 5
      }}
    >
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
      <View style={{ alignSelf: 'flex-end', marginLeft: 5 }}>
        <Thumbnail
          style={{ width: 50, height: 50 }}
          rounded
          source={
            dataUser?.avatar
              ? {
                  uri: `${dataUser.avatar}`
                }
              : require('assets/avatarDefault.png')
          }
        />
      </View>
    </View>
  );
};

export default RightChat;

RightChat.propTypes = {
  message: PropTypes.array,
  handleToggleModalRemove: PropTypes.func,
  indexToggle: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.any)
};
RightChat.defaultProps = {
  message: [],
  handleToggleModalRemove: () => {},
  indexToggle: () => {},
  user: {}
};
