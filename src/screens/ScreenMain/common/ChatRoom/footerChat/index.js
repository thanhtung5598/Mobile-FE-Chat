import React from 'react';
import { Image } from 'react-native';
import { Input, Item, Footer, Content } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

const FooterChat = () => {
  return (
    <Footer style={{ backgroundColor: '#FFF' }}>
      <Content>
        <Item>
          <Image
            style={{ width: 38, height: 38 }}
            source={require('assets/a.png')}
          />
          <Input placeholder="Typing..." />
          <TouchableOpacity>
            <Entypo
              name="emoji-happy"
              size={24}
              color="#AAA"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              style={{ marginRight: 15 }}
              name="send"
              size={30}
              color="#2196f3"
            />
          </TouchableOpacity>
        </Item>
      </Content>
    </Footer>
  );
};

export default FooterChat;
