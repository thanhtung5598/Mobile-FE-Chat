import React from 'react';
import { Image } from 'react-native';
import { Content, View, Text } from 'native-base';
import LeftChat from './LeftChat';
import RightChat from './RightChat';

const BodyChat = () => {
  return (
    <Content>
      <View
        style={{ alignSelf: 'center', alignItems: 'center', marginTop: 10 }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require('assets/defaultGid.gif')}
        />
        <Text style={{ color: '#00b0ff' }}>Hi!</Text>
      </View>
      <LeftChat message={['A tùng ơi! còn yêu e không']} />
      <RightChat message={['Hm... sao e lại hỏi thế']} />
      <LeftChat message={['E hỏi cho biết thôi!']} />
      <RightChat message={['A vẩn vậy', 'e có ghét a không']} />
      <LeftChat message={['Ghét a làm gì']} />
      <RightChat
        message={[
          'A chỉ cần biết bấy nhiêu thôi, e không cần phải trả lời đâu',
          'em không ghét a là được rồi'
        ]}
      />
    </Content>
  );
};

export default BodyChat;
