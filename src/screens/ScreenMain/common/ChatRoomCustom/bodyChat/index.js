/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, View } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatGroupSocket from 'components/common/hook/useChatGroupSocket';
import { GiftedChat } from 'react-native-gifted-chat';
import { Video } from 'expo-av';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FooterChat from '../footerChat';

const BodyGroupChat = () => {
  const [textChat, setTextChat] = useState('');
  const [numMess, setNumMess] = useState(15);
  const [isEndReached, setEndReached] = useState(false);
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
    return newObjChat.reverse().slice(0, numMess);
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

  useEffect(() => {
    socket.on('send_and_recive', function (msg) {
      setMessages(preMess => [...preMess, msg]);
    });
  }, []);

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

  const onEndReached = () => {
    setEndReached(true);
    setTimeout(() => {
      setNumMess(numMess + 5);
      setEndReached(false);
    }, 2000);
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
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        onSend={messages => onHandleSendMess(messages)}
        renderMessageVideo={renderMessageVideo}
        user={{
          _id: dataUser.id
        }}
        listViewProps={{
          onEndReached: onEndReached,
          onEndReachedThreshold: 200
        }}
        infiniteScroll={true}
        loadEarlier={isEndReached}
        isLoadingEarlier={isEndReached}
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
