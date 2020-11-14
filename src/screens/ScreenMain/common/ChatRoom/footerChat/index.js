import React from 'react';
import PropTypes from 'prop-types';
import { Image, KeyboardAvoidingView } from 'react-native';
import { Input, Item } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

const FooterChat = props => {
  const { textChat, setTextChat, onHandleSendMess } = props;

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: '#FFF'
      }}
    >
      <Item>
        <Image
          style={{ width: 40, height: 50, marginLeft: 15 }}
          source={require('assets/a.png')}
        />
        <Input
          placeholder="Typing..."
          value={textChat}
          onChangeText={text => setTextChat(text)}
        />
        <TouchableOpacity>
          <Entypo
            name="emoji-happy"
            size={24}
            color="#AAA"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHandleSendMess}>
          <MaterialIcons
            style={{ marginRight: 15 }}
            name="send"
            size={30}
            color="#2196f3"
          />
        </TouchableOpacity>
      </Item>
    </KeyboardAvoidingView>
  );
};

export default FooterChat;

FooterChat.propTypes = {
  setTextChat: PropTypes.func,
  textChat: PropTypes.string,
  onHandleSendMess: PropTypes.func
};
FooterChat.defaultProps = {
  setTextChat: () => {},
  textChat: '',
  onHandleSendMess: () => {}
};
