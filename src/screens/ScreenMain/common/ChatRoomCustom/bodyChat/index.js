/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, View, Text } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';
import useChatGroupSocket from 'components/common/hook/useChatGroupSocket';
import { GiftedChat, MessageText, Bubble } from 'react-native-gifted-chat';
import { Video } from 'expo-av';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FooterChat from '../footerChat';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const { users } = currentGroup;
    const newObjChat = messages?.map(mess => {
      const type = mess.type;
      const ortherUser = users
        ? users.filter(user => user.id === mess.user.id)
        : [currentGroup];

      const userFix = ortherUser.map(user => {
        return { id: user.id, name: user.name };
      })[0];

      const obj = {
        ...mess,
        text: type === 'Video' || type === 'Image' ? '' : mess.content,
        user: {
          ...userFix,
          _id: mess.user.id
        },
        video: type === 'Video' && mess.content,
        image: type === 'Image' && mess.content
      };
      if (ortherUser[0].avatar) obj.user.avatar = ortherUser[0].avatar;
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

  const _handleOpenWithLinking = _url => {
    Linking.openURL(_url);
  };

  const CustomMessageText = props => {
    const { currentMessage } = props;
    const { text: currText } = currentMessage;

    return (
      <TouchableOpacity
        style={styles.containerFile}
        onPress={() => _handleOpenWithLinking(currText)}
      >
        <AntDesign name="file1" size={30} color="#f57f17" />
        <View style={styles.infoFile}>
          <Text style={styles.fileName}>FileName</Text>
          <View style={styles.fileSize}>
            <FontAwesome
              style={{ marginRight: 5 }}
              name="snowflake-o"
              size={18}
              color="#ffb74d"
            />
            <Text style={styles.fileIconSize}>0.5 MB</Text>
          </View>
        </View>
        <MaterialIcons
          style={styles.fileIconDown}
          name="file-download"
          size={30}
          color="#f57f17"
        />
      </TouchableOpacity>
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

  const renderBubble = props => {
    const {
      currentMessage: { text: currText }
    } = props;
    if (currText.indexOf('https:') === -1) {
      return <Bubble {...props} />;
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f57f17'
          },
          right: {
            backgroundColor: '#f57f17'
          }
        }}
        timeTextStyle={{
          left: {
            color: '#000'
          },
          right: {
            color: '#000'
          }
        }}
      />
    );
  };

  const renderMessageText = props => {
    const { currentMessage } = props;
    const { text: currText } = currentMessage;
    if (currText.indexOf('https') === -1) {
      return <MessageText {...props} />;
    }
    return <CustomMessageText {...props} />;
  };

  return (
    <Container>
      <GiftedChat
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderMessageVideo={renderMessageVideo}
        messages={refactorObjectChat()}
        onLongPress={handleLongPressMess}
        onSend={messages => onHandleSendMess(messages)}
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

BodyGroupChat.propTypes = {
  currentMessage: PropTypes.objectOf(PropTypes.any)
};
BodyGroupChat.defaultProps = {
  currentMessage: {}
};

const styles = StyleSheet.create({
  containerFile: {
    backgroundColor: '#ecf0f1',
    height: 60,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  infoFile: { paddingLeft: 10, paddingRight: 10 },
  fileName: { fontWeight: 'bold', color: '#e65100' },
  fileSize: { flexDirection: 'row' },
  fileIconSize: { fontWeight: '700', color: '#9e9e9e' },
  fileIconDown: {
    position: 'absolute',
    right: 10,
    borderWidth: 1,
    borderRadius: 17,
    padding: 1,
    borderColor: '#f57f17'
  }
});
