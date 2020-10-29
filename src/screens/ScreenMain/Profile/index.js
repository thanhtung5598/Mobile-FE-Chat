import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ImageBackground, Platform } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Text,
  View,
  Thumbnail,
  List,
  ListItem
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImgSingle } from 'actions/uploadImageActions';
import { updateProfile } from 'actions/userActions';
import { getProfileUser } from 'actions/userActions';
import ModalUpdatedName from 'components/common/ComponentsCommon/Modal/modalUpdatedName';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle } from 'react-native-svg';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const Profile = ({ navigation }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { dataUser, isLoadingAvatar } = useSelector(state => state.dataUser);

  useEffect(() => {
    dispatch(getProfileUser());
  }, [dispatch]);

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
          formData.append('avatar', {
            uri: localUri,
            name: filename,
            type: 'image/png'
          });
          uploadImgSingle(formData).then(res => {
            const { data } = res;
            const dataUpdated = {
              name: dataUser.name,
              avatar: data
            };
            if (data) {
              dispatch(updateProfile(dataUpdated, 2));
            }
          });
        }
      }
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const onHandleSubmitAdd = value => {
    dispatch(updateProfile(value)).then(res => {
      const { error } = res;
      if (!error) {
        modalRef.current.toggleModal();
      }
    });
  };

  return (
    <Container>
      <Content>
        <ImageBackground
          style={styles.container}
          source={require('assets/lawn.jpg')}
        >
          <View style={styles.rect}>
            {isLoadingAvatar && (
              <SvgAnimatedLinearGradient height={80} width={80}>
                <Circle cx="40" cy="40" r="40" />
              </SvgAnimatedLinearGradient>
            )}
            {!isLoadingAvatar && (
              <TouchableOpacity onPress={handleUploadImage}>
                <Thumbnail
                  large
                  source={
                    dataUser?.avatar
                      ? {
                          uri:
                            dataUser?.avatar && `${imaPrefix}${dataUser.avatar}`
                        }
                      : require('assets/avatarDefault.png')
                  }
                />
              </TouchableOpacity>
            )}
            <Text style={styles.leThanhTung}>{dataUser?.name}</Text>
            <TouchableOpacity onPress={() => modalRef.current.toggleModal()}>
              <AntDesign
                style={{ marginLeft: 15 }}
                name="edit"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <ModalUpdatedName onSubmit={onHandleSubmitAdd} ref={modalRef} />
          </View>
          <View style={styles.SettingStyle}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <AntDesign name="setting" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <List style={styles.ContainList}>
          <ListItem>
            <Text style={styles.titleInfo}>Zola name</Text>
            <Text style={styles.valueInfo}>{dataUser?.name || '...'}</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Phone</Text>
            <Text style={styles.valueInfo}>{dataUser?.phone || '...'}</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Email</Text>
            <Text style={styles.valueInfo}>{dataUser?.email || '....'}</Text>
            {/* {<ModalAddInfoEmail visible={false} />}
            <TouchableOpacity
              style={styles.buttonAddInfo}
              onPress={handleClickedAddInfo}
            >
              <AntDesign name="pluscircle" size={30} color="#2962ff" />
            </TouchableOpacity> */}
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Create At</Text>
            <Text style={styles.valueInfo}>
              {moment(dataUser?.createAt).format('YYYY/MM/DD')}
            </Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Update At</Text>
            <Text style={styles.valueInfo}>
              {moment(dataUser?.updateAt).format('YYYY/MM/DD')}
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default Profile;

Profile.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Profile.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  SettingStyle: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  LinearGradientProfile: {
    width: '40%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  UpdateProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  UpdatedProfileText: {
    color: 'white'
  },
  rect: {
    position: 'relative',
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  leThanhTung: {
    color: '#FFF',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: '700'
  },
  titleInfo: {
    fontWeight: '500',
    fontSize: 15,
    width: 100
  },
  valueInfo: {
    color: '#AAA'
  },
  buttonAddInfo: { marginLeft: '70%' }
});
