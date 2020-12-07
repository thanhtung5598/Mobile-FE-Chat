import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Item } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocketContext } from 'components/common/context/SocketContext';
import { Entypo } from '@expo/vector-icons';
import { uploadImgSingle } from 'actions/uploadImageActions';

const FooterChat = props => {
  const { textChat, setTextChat, onHandleSendMess } = props;
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleUploadImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
        if (!result.cancelled) {
          let localUri = result.uri;
          let filename = localUri.split('/').pop();

          const formData = new FormData();
          formData.append('files', {
            uri: localUri,
            name: filename,
            type: 'image/png'
          });
          const type = filename.split('.')[1];

          dispatch(uploadImgSingle(formData)).then(res => {
            const { data } = res;
            if (data) {
              if (type === 'mov' || type === 'mp4') {
                console.log('video');
                socket.emit('send_and_recive', {
                  message: data[0],
                  type: 'Video' // type is String, or Image, Video
                });
                return;
              }
              if (type === 'jpg' || type === 'png') {
                console.log('img');
                socket.emit('send_and_recive', {
                  message: data[0],
                  type: 'Image' // type is String, or Image, Video
                });
                return;
              }
              console.log('text');
              socket.emit('send_and_recive', {
                message: data[0],
                type: 'String' // type is String, or Image, Video
              });
            }
          });
        }
      }
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
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
        <TouchableOpacity onPress={handleUploadImage}>
          <Entypo
            name="camera"
            size={24}
            color="#888"
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
