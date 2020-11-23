import React, { useContext } from 'react';
import { ActionSheetIOS, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { Container } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatSocket from 'components/common/hook/useChatSocket';
import { GiftedChat } from 'react-native-gifted-chat';

const BodySingleChat = () => {
  const { socket } = useContext(SocketContext);
  const { currentGroup } = useSelector(state => state.groupSelected);
  const { dataUser } = useSelector(state => state.dataUser);
  const { messages, setMessages } = useChatSocket({
    dataUser
  });

  const refactorObjectChat = () => {
    const newObjChat = messages.map(mess => {
      return {
        ...mess,
        text: mess.content,
        user: {
          ...mess.user,
          _id: mess.user.id,
          avatar: currentGroup.avatar
        }
      };
    });
    return newObjChat;
  };

  const onHandleSendMess = textChat => {
    socket.emit('send_and_recive', {
      message: textChat[0].text,
      type: 'String' // type is String, or Image, Video
    });
    socket.on('send_and_recive', function (msg) {
      setMessages([...messages, msg]);
    });
  };

  const onHandleRemoveMess = idMess => {
    socket.emit('delete_message', idMess);
    const tempMess = [...messages];
    const filterMessRemove = tempMess.filter(mess => mess._id !== idMess);
    setMessages([...filterMessRemove]);
  };

  const handleLongPressMess = (context, message) => {
    ActionSheetIOS.showActionSheetWithOptions(
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

  return (
    <Container>
      <GiftedChat
        inverted={false}
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        onSend={messages => onHandleSendMess(messages)}
        user={{
          _id: dataUser.id
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </Container>
  );
};

export default BodySingleChat;
