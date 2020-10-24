import React from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImgSingle } from 'actions/uploadImageActions';
import { uploadAvatarAction } from 'actions/userActions';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';
const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);

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
              dispatch(uploadAvatarAction(dataUpdated));
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
    <Container>
      <Content>
        <ImageBackground
          style={styles.container}
          source={{
            uri:
              'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/120288473_2784359818474049_4543157042302715570_o.jpg?_nc_cat=104&_nc_sid=8bfeb9&_nc_ohc=x2FTyNa_5QAAX--KVhN&_nc_ht=scontent-sin6-1.xx&oh=0f507c759551320339ed64e555383040&oe=5F9EEB9B'
          }}
        >
          <View style={styles.rect}>
            <TouchableOpacity onPress={handleUploadImage}>
              <Thumbnail
                large
                source={{
                  uri:
                    (dataUser.avatar && `${imaPrefix}${dataUser.avatar}`) ||
                    avatarDefault
                }}
              />
            </TouchableOpacity>
            <Text style={styles.leThanhTung}>{dataUser?.name}</Text>
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
            <Text style={styles.titleInfo}>Username</Text>
            <Text style={styles.valueInfo}>
              {dataUser.phone || dataUser.email || 'Tạo user name'}
            </Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Create At</Text>
            <Text style={styles.valueInfo}>
              {moment(dataUser.createAt).format('YYYY/MM/DD')}
            </Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Update At</Text>
            <Text style={styles.valueInfo}>
              {moment(dataUser.updateAt).format('YYYY/MM/DD')}
            </Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Phone</Text>
            <Text style={styles.valueInfo}>{dataUser.phone}</Text>
          </ListItem>
        </List>
        <LinearGradient
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#2962ff', '#0cb3ff']}
          style={styles.LinearGradientProfile}
        >
          <TouchableOpacity style={styles.UpdateProfile}>
            <Text style={styles.UpdatedProfileText}>Updated Profile</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    marginBottom: 10
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
  }
});
