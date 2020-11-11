import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail, View, Text } from 'native-base';

const defaultPhuong =
  'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/s480x480/118351950_2412857935681133_2125958657127976181_o.jpg?_nc_cat=102&ccb=2&_nc_sid=7206a8&_nc_ohc=A1gLoiF4FKEAX-pCFqk&_nc_ht=scontent.fvca1-1.fna&tp=7&oh=8f8979fa11caf9a3ac5227344c6181f8&oe=5FC2439E';

const LeftChat = props => {
  const { message } = props;
  return (
    <View style={{ flexDirection: 'row', paddingTop: '5%', paddingLeft: 5 }}>
      <View style={{ alignSelf: 'flex-end', marginRight: 5 }}>
        <Thumbnail rounded source={{ uri: defaultPhuong }} />
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
            Phượng
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
    </View>
  );
};

export default LeftChat;

LeftChat.propTypes = {
  message: PropTypes.array
};
LeftChat.defaultProps = {
  message: []
};