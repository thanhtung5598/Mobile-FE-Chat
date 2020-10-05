import React, { useContext } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { AuthenContext } from 'components/common/context/AuthenContext';
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

const source = {
  uri:
    'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/p480x480/104483297_1777530932386533_1453571394136712521_o.jpg?_nc_cat=108&_nc_sid=7206a8&_nc_ohc=tm0JgudmkPQAX9OQO6h&_nc_ht=scontent-sin6-2.xx&tp=6&oh=43e71af7e3ded3fd585438e4e946550c&oe=5F9D1CCA'
};

const Profile = () => {
  const { signOut } = useContext(AuthenContext);
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
            <Thumbnail large source={source} />
            <Text style={styles.leThanhTung}>Le Thanh Tung</Text>
          </View>
          <View style={styles.SettingStyle}>
            <AntDesign name="setting" size={30} color="white" />
          </View>
        </ImageBackground>
        <List style={styles.ContainList}>
          <ListItem>
            <Text style={styles.titleInfo}>Tên Zola</Text>
            <Text style={styles.valueInfo}>Lê Thanh Tùng</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Username</Text>
            <Text style={styles.valueInfo}>Tạo user name</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Giới tính</Text>
            <Text style={styles.valueInfo}>Nam</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Ngày sinh</Text>
            <Text style={styles.valueInfo}>05/05/1998</Text>
          </ListItem>
          <ListItem>
            <Text style={styles.titleInfo}>Điện thoại</Text>
            <Text style={styles.valueInfo}>+84336365110</Text>
          </ListItem>
        </List>
        <LinearGradient
          colors={['#2962ff', '#0cb3ff']}
          style={styles.LinearGradientProfile}
        >
          <TouchableOpacity
            style={styles.UpdateProfile}
            onPress={() => signOut()}
          >
            <Text style={styles.UpdatedProfileText}>Updated Profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Content>
    </Container>
  );
};

export default Profile;

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
