import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail, View, Text } from 'native-base';

const defaultTung =
  'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/p480x480/104483297_1777530932386533_1453571394136712521_o.jpg?_nc_cat=108&ccb=2&_nc_sid=7206a8&_nc_ohc=FSu8nvfDN9kAX8_HvuJ&_nc_ht=scontent.fvca1-1.fna&tp=6&oh=66e12bcbe04cbfda87c361d29d819f41&oe=5FC0B54A';

const RightChat = props => {
  const { message } = props;
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
            Tùng
          </Text>
        </View>
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
      </View>
      <View style={{ alignSelf: 'flex-end', marginLeft: 5 }}>
        <Thumbnail rounded source={{ uri: defaultTung }} />
      </View>
    </View>
  );
};

export default RightChat;

RightChat.propTypes = {
  message: PropTypes.array
};
RightChat.defaultProps = {
  message: []
};
