import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Container } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatSocket from 'components/common/hook/useChatSocket';
import { GiftedChat } from 'react-native-gifted-chat';
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
      const obj = {
        ...mess,
        text: mess.content,
        user: {
          ...mess.user,
          _id: mess.user.id
        }
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

  return (
    <Container>
      <GiftedChat
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        textInputProps={{}}
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
