import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, View } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatSocket from 'components/common/hook/useChatSocket';
import { GiftedChat } from 'react-native-gifted-chat';
import { Video } from 'expo-av';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FooterChat from '../footerChat';

const BodySingleChat = () => {
  const [textChat, setTextChat] = useState('');
  const { socket } = useContext(SocketContext);
  const { showActionSheetWithOptions } = useActionSheet();
  const { currentGroup } = useSelector(state => state.groupSelected);
  const { dataUser } = useSelector(state => state.dataUser);
  const { messages, setMessages } = useChatSocket({
    dataUser
  });

  const refactorObjectChat = () => {
    const newObjChat = messages.map(mess => {
      const type = mess.type;
      const obj = {
        ...mess,
        text: type === 'Video' || type === 'Image' ? '' : mess.content,
        user: {
          ...mess.user,
          _id: mess.user.id
        },
        video: type === 'Video' && mess.content,
        image: type === 'Image' && mess.content
      };
      if (currentGroup.avatar) obj.user.avatar = currentGroup.avatar;
      return obj;
    });
    return newObjChat.reverse();
  };

  socket.on('send_and_recive', function (msg) {
    setMessages([...messages, msg]);
  });

  const onHandleSendMess = () => {
    if (textChat === '') return;
    socket.emit('send_and_recive', {
      message: textChat,
      type: 'String' // type is String, or Image, Video
    });
    setTextChat('');
  };

  const onHandleRemoveMess = idMess => {
    socket.emit('delete_message', idMess);
    const tempMess = [...messages];
    const filterMessRemove = tempMess.filter(mess => mess._id !== idMess);
    setMessages([...filterMessRemove]);
  };

  const handleLongPressMess = (context, message) => {
    Keyboard.dismiss();
    showActionSheetWithOptions(
      {
        options: ['Remove', 'Cancel'],
        cancelButtonIndex: 1,
        tintColor: '#f0ff'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onHandleRemoveMess(message._id);
        }
      }
    );
  };

  const renderInputToolbar = () => {
    return (
      <FooterChat
        textChat={textChat}
        setTextChat={setTextChat}
        onHandleSendMess={onHandleSendMess}
      />
    );
  };

  const renderMessageVideo = props => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 5 }}>
        <Video
          resizeMode="contain"
          useNativeControls
          shouldPlay={false}
          source={{ uri: currentMessage.video }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  };

  return (
    <Container>
      <GiftedChat
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        textInputProps={{}}
        renderMessageVideo={renderMessageVideo}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: dataUser.id
        }}
        keyboardShouldPersistTaps="never"
      />
      {Platform.OS === 'android' && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-150}
        />
      )}
    </Container>
  );
};

export default BodySingleChat;
