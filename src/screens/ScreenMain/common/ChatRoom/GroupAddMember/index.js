import React, { useState, Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
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
  Item,
  Input,
  List,
  Thumbnail,
  Body,
  Footer,
  Icon,
  Spinner
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const GroupAddMember = props => {
  const { setAddMember } = props;

  const [listChecked, setListChecked] = useState([]);
  const [searchText, setSearchText] = useState(null);
  // const dispatch = useDispatch();
  const { listFriends } = useSelector(state => state.friends);
  const { isLoadingCreate } = useSelector(state => state.groups);
  const {
    currentGroup: { users }
  } = useSelector(state => state.groups);

  const handleCheckedItem = item_id => {
    const tempList = [...listChecked];
    setSearchText(null);
    if (tempList.includes(item_id)) {
      const index = tempList.findIndex(item => item === item_id);
      tempList.splice(index, 1);
      setListChecked([...tempList]);
      return;
    }
    tempList.push(item_id);
    setListChecked(tempList);
  };

  const filterTextSearch = useCallback(() => {
    const tempList = JSON.parse(JSON.stringify(listFriends)); // deep clone
    for (let i = 0; i < tempList.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (tempList[i].id === users[j].id) {
          tempList[i].status = true;
        }
      }
    }
    if (searchText === null) return [...tempList];
    const filterName = tempList.filter(
      item => item.name.toUpperCase().search(searchText.toUpperCase()) !== -1
    );
    const filterPhone = tempList.filter(item => {
      if (!item.phone) return;
      else
        return (
          item.phone?.toUpperCase().search(searchText.toUpperCase()) !== -1
        );
    });

    const filterEmail = tempList.filter(item => {
      if (!item.email) return;
      else
        return (
          item.email?.toUpperCase().search(searchText.toUpperCase()) !== -1
        );
    });
    const newList = [...filterName, ...filterPhone, ...filterEmail];
    const filterDoubleItem = newList.filter((itemCheck, index) => {
      return newList.findIndex(item => item.id == itemCheck.id) === index;
    });

    return filterDoubleItem;
  }, [listFriends, searchText, users]);

  const handleAddMember = () => {};

  return (
    <Container>
      <View style={styles.rect}>
        <TouchableOpacity onPress={() => setAddMember(false)}>
          <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.login}>Add Member</Text>
      </View>
      <Item
        style={{
          marginTop: 15,
          marginBottom: 10,
          backgroundColor: '#f5f5f5',
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 10
        }}
      >
        <Icon
          name="ios-search"
          style={{ color: '#777', fontSize: 24, paddingLeft: 15 }}
        />
        <Input
          value={searchText}
          style={{
            height: 40
          }}
          onChangeText={text => setSearchText(text)}
          placeholder="Search by phone or name or email"
        />
      </Item>
      <Content>
        <List style={{ marginTop: 10 }}>
          {filterTextSearch()?.map((friend, index) => {
            return (
              <Fragment key={index}>
                <TouchableOpacity
                  disabled={friend.status}
                  onPress={() => handleCheckedItem(friend.id)}
                >
                  <ListItem
                    style={{
                      paddingTop: 3,
                      paddingBottom: 3
                    }}
                    thumbnail
                  >
                    <Left>
                      <Thumbnail
                        source={
                          friend.avatar
                            ? {
                                uri: `${imaPrefix}${friend.avatar}`
                              }
                            : require('assets/avatarDefault.png')
                        }
                      />
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text>{friend.name}</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: 0 }}>
                      {friend.status && (
                        <View>
                          <Text>Already joined</Text>
                        </View>
                      )}
                      {!friend.status &&
                        (listChecked.includes(friend.id) ? (
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
                        ))}
                    </Right>
                  </ListItem>
                </TouchableOpacity>
              </Fragment>
            );
          })}
          {filterTextSearch().length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#AAA', fontSize: 30 }}>Nothing found</Text>
            </View>
          )}
        </List>
      </Content>
      {listChecked.length >= 1 && (
        <Footer
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderTopWidth: 0
          }}
        >
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 28
            }}
            colors={['#2962ff', '#0cb3ff']}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 60
              }}
              onPress={handleAddMember}
            >
              {isLoadingCreate && <Spinner size="large" color="white" />}
              {!isLoadingCreate && (
                <View>
                  <Text>
                    <AntDesign name="arrowright" size={35} color="white" />
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </Footer>
      )}
    </Container>
  );
};

export default GroupAddMember;

GroupAddMember.propTypes = {
  currentGroup: PropTypes.objectOf(PropTypes.any),
  setAddMember: PropTypes.func,
  onHandleToggleCreate: PropTypes.func,
  handleToggleChatRoom: PropTypes.func
};
GroupAddMember.defaultProps = {
  currentGroup: {},
  setAddMember: () => {},
  onHandleToggleCreate: () => {},
  handleToggleChatRoom: () => {}
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
