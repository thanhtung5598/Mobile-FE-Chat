import React from 'react';
import { useSelector } from 'react-redux';
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
import Axios from 'axios';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';
const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const Profile = ({ navigation }) => {
  const { dataUser } = useSelector(state => state.dataUser);

  const handleUploadImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [4, 3],
        //   quality: 1
        // });
        // console.log(result.uri.split("/").pop());
        
        // const formData = new FormData();

        // // const file = new File({
        // //   uri: Platform.OS=='ios'?result.uri.replace("file://", "/private"):result.uri,
        // //   type: result.type,
        // //   name: result.uri.split("/").pop()
        // // });
        // formData.append('avatar', file);
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
      
        if (result.cancelled) {
          return;
        }
      
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
      
        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('avatar', { uri: localUri, name: filename, type });
        // uploadImgSingle(formData);
        Axios({
          method: 'POST',
          url: 'https://api-ret.ml/api/v0/images/upload-avatar',
          data: formData,
          headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiQWRtaW4iLCJwaG9uZSI6IjAzMjM0NTY3ODkiLCJlbWFpbCI6ImRsbXRydW9uZzE2MDlAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIn0sImlhdCI6MTYwMzU0NDg3MSwiZXhwIjoxNjAzNjMxMjcxfQ.w4YC0HH_Z9HY1xaWWnnqXiCRB6fkij_zlE6yrMvojB4',
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data;'    
          }}) .then(function (response) { console.log('res'+ JSON.stringify(response))})
          .catch(function (error) { console.log('err' + error)
      });
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
