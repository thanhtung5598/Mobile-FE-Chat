import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  ListItem,
  Text,
  Right,
  Left,
  View,
  Container,
  Content,
  Form,
  Item,
  Input,
  List,
  Thumbnail,
  Body,
  Footer
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CreateGroup = props => {
  const { onHandleToggleCreate } = props;
  const [listChecked, setListChecked] = useState([]);

  const handleCheckedItem = item_index => {
    const tempList = [...listChecked];
    if (tempList.includes(item_index)) {
      const index = tempList.findIndex(item => item === item_index);
      tempList.splice(index, 1);
      setListChecked([...tempList]);
      return;
    }
    tempList.push(item_index);
    setListChecked(tempList);
  };

  return (
    <Container>
      <View style={styles.rect}>
        <TouchableOpacity onPress={onHandleToggleCreate}>
          <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.login}>Group new</Text>
      </View>
      <Content>
        <Form>
          <Item>
            <Input
              style={{ textAlign: 'center' }}
              placeholder="Name the new group"
            />
          </Item>
        </Form>
        <List style={{ marginTop: 10 }}>
          {['Hoang', 'Tam', 'trinh', 'Ngoc'].map((item, index) => {
            return (
              <Fragment key={item}>
                <TouchableOpacity onPress={() => handleCheckedItem(index)}>
                  <ListItem
                    style={{ paddingTop: 3, paddingBottom: 3 }}
                    thumbnail
                  >
                    <Left>
                      <Thumbnail source={require('assets/avatarDefault.png')} />
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text>{item}</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: 0 }}>
                      {listChecked.includes(index) ? (
                        <AntDesign
                          name="checkcircle"
                          size={24}
                          color="#2196f3"
                        />
                      ) : (
                        <MaterialIcons
                          name="radio-button-unchecked"
                          size={24}
                          color="black"
                        />
                      )}
                    </Right>
                  </ListItem>
                </TouchableOpacity>
              </Fragment>
            );
          })}
        </List>
      </Content>
      {listChecked.length > 0 && (
        <Footer
          style={{ backgroundColor: 'white', width: '100%', borderTopWidth: 0 }}
        >
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 30 }}
            colors={['#2962ff', '#0cb3ff']}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 60
              }}
            >
              <View>
                <Text>
                  <AntDesign name="arrowright" size={35} color="white" />
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </Footer>
      )}
    </Container>
  );
};

export default CreateGroup;

CreateGroup.propTypes = {
  onHandleToggleCreate: PropTypes.func
};
CreateGroup.defaultProps = {
  onHandleToggleCreate: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    paddingLeft: 20,
    paddingTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 30,
    marginRight: 20
  },
  login: {
    fontSize: 20,
    fontWeight: '500'
  }
});
