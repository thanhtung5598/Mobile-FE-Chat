import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Content,
  Icon,
  Button
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const source = {
  uri:
    'https://image-us.eva.vn/upload/2-2019/images/2019-06-25/loat-hot-girl-xinh-dep-nuc-tieng-du-thi-thpt-quoc-gia-nam-2019-2-1561430194-418-width660height825.jpg'
};

const SyncPhonebook = props => {
  const { setPhonebook } = props;
  return (
    <>
      <Container>
        <Content>
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#2962ff', '#0cb3ff']}
          >
            <TouchableOpacity
              style={styles.rect}
              onPress={() => setPhonebook(false)}
            >
              <Icon name="arrow-back" style={styles.icon}></Icon>
              <Text style={styles.login}>Friends from phonebook device</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Content style={{ marginTop: 20 }}>
            <ListItem thumbnail style={{ paddingBottom: 12 }}>
              <Left>
                <Thumbnail rounded source={{ uri: source.uri }} />
              </Left>
              <Body style={{ borderBottomColor: 'white' }}>
                <Text>Ánh sao</Text>
              </Body>
              <Right style={{ borderBottomWidth: 0 }}>
                <TouchableOpacity>
                  <Button success>
                    <Text> Accepted </Text>
                  </Button>
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem thumbnail style={{ paddingBottom: 12 }}>
              <Left>
                <Thumbnail rounded source={{ uri: source.uri }} />
              </Left>
              <Body style={{ borderBottomColor: 'white' }}>
                <Text>Ánh sao</Text>
              </Body>
              <Right style={{ borderBottomWidth: 0 }}>
                <TouchableOpacity>
                  <Button success>
                    <Text> Accepted </Text>
                  </Button>
                </TouchableOpacity>
              </Right>
            </ListItem>
          </Content>
        </Content>
      </Container>
    </>
  );
};

export default SyncPhonebook;

SyncPhonebook.propTypes = {
  setPhonebook: PropTypes.func
};
SyncPhonebook.defaultProps = {
  setPhonebook: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    width: 34,
    height: 37,
    marginTop: 13,
    marginLeft: 10
  },
  login: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    fontWeight: '700'
  }
});
