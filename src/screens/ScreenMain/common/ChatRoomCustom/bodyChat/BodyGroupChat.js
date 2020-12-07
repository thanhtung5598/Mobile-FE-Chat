import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Container } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatGroupSocket from 'components/common/hook/useChatGroupSocket';
import { GiftedChat } from 'react-native-gifted-chat';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FooterChat from '../footerChat';

const BodyGroupChat = () => {
  const [textChat, setTextChat] = useState('');
  const { socket } = useContext(SocketContext);
  const { showActionSheetWithOptions } = useActionSheet();
  const { currentGroup } = useSelector(state => state.groupSelected);
  const { dataUser } = useSelector(state => state.dataUser);
  const { messages, setMessages } = useChatGroupSocket({
    dataUser
  });

  const refactorObjectChat = () => {
    const newObjChat = messages?.map(mess => {
      const type = mess.type;
      const filterAvatar = currentGroup?.users?.filter(
        user => user.id === mess.user.id
      )[0].avatar;

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
      if (filterAvatar) obj.user.avatar = filterAvatar;
      return obj;
    });
    return newObjChat.reverse();
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
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        onSend={messages => onHandleSendMess(messages)}
        user={{
          _id: dataUser.id
        }}
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

export default BodyGroupChat;
