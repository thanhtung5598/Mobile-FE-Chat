import React, { useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, Image } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  View,
  Badge
} from 'native-base';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';

// Component
import HeaderSearch from './../common/header';
import FindFriends from './FindFriends';
import GroupCreate from './GroupCreate';
import ChatRoom from 'screens/ScreenMain/common/ChatRoom';

// action
import {
  searchUserByPhoneEmailName,
  clearSearch,
  addFriend
} from 'actions/userActions';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const GroupChat = props => {
  const { footer, setFooter } = props;
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);
  const { listGroups } = useSelector(state => state.groups);

  const [userQuery, setUserQuery] = useState('');
  const [find, setFind] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  const delayedQuery = useRef(
    _.debounce(q => dispatch(searchUserByPhoneEmailName(q)), 500)
  ).current;

  const handleTurnBack = () => {
    setUserQuery('');
    setFind(false);
    dispatch(clearSearch());
    Keyboard.dismiss();
  };

  const handleFind = () => {
    setFind(true);
  };
  const onHandleToggleCreate = () => {
    setCreate(!isCreate);
    setFooter(!footer);
  };

  const handleChangeValue = value => {
    setUserQuery(value);
    delayedQuery(value);
  };

  const handleAddFriend = id_friend_req => {
    const value = {
      user_id: dataUser.id,
      user_request_id: id_friend_req
    };
    dispatch(addFriend(value));
  };

  const handleToggleChatRoom = () => {
    setChatOpen(true);
    setCreate(false);
  };

  return (
    <>
      <Container>
        {isChatOpen && (
          <ChatRoom setChatOpen={setChatOpen} setFooter={setFooter} />
        )}
        {find && (
          <Content>
            <HeaderSearch
              find={find}
              userQuery={userQuery}
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
              handleChangeValue={handleChangeValue}
            />
            <FindFriends handleAddFriend={handleAddFriend} />
          </Content>
        )}
        {isCreate && (
          <GroupCreate
            onHandleToggleCreate={onHandleToggleCreate}
            handleToggleChatRoom={handleToggleChatRoom}
          />
        )}
        {!find && !isCreate && !isChatOpen && (
          <>
            <HeaderSearch
              find={find}
              userQuery={userQuery}
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
              handleChangeValue={handleChangeValue}
            />
            <Content>
              <List style={{ marginBottom: 5, marginTop: 5 }}>
                <TouchableOpacity onPress={onHandleToggleCreate}>
                  <ListItem thumbnail>
                    <Left
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'black'
                      }}
                    >
                      <Image
                        source={require('assets/iconGroup.jpg')}
                        style={{
                          width: 55,
                          height: 55,
                          borderWidth: 1,
                          borderColor: 'green',
                          borderRadius: 45
                        }}
                      />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text style={{ fontSize: 16 }}>Create new Group</Text>
                    </Body>
                  </ListItem>
                </TouchableOpacity>
              </List>
              <List>
                <ListItem
                  itemDivider
                  style={{ backgroundColor: 'white', paddingBottom: 10 }}
                >
                  <Left>
                    <Text style={{ fontSize: 14, fontWeight: '600' }}>
                      Group Joined
                    </Text>
                    <Body></Body>
                    <Right>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#42a5f5'
                        }}
                      >
                        All Group
                      </Text>
                    </Right>
                  </Left>
                </ListItem>
                {listGroups?.map((group, index) => {
                  return (
                    <Fragment key={index}>
                      <TouchableOpacity>
                        <ListItem thumbnail>
                          <Left>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: 50,
                                  flexWrap: 'wrap'
                                }}
                              >
                                {group?.users.map((user, index) => {
                                  if (index > 2) return; // 0 1 2
                                  return (
                                    <Fragment key={index}>
                                      <Thumbnail
                                        rounded
                                        style={{
                                          width: 25,
                                          height: 25
                                        }}
                                        source={
                                          user?.avatar
                                            ? {
                                                uri: `${imaPrefix}${user.avatar}`
                                              }
                                            : require('assets/avatarDefault.png')
                                        }
                                      />
                                    </Fragment>
                                  );
                                })}
                                {group?.users.length >= 4 && (
                                  <Fragment key={index}>
                                    <Badge
                                      style={{
                                        width: 25,
                                        height: 25,
                                        backgroundColor: '#AAA',
                                        marginTop: 1
                                      }}
                                    >
                                      <Text>{group?.users.length - 3}</Text>
                                    </Badge>
                                  </Fragment>
                                )}
                              </View>
                            </View>
                          </Left>
                          <Body>
                            <Text>{group.name}</Text>
                            <Text note numberOfLines={1}>
                              Take your time to start . .
                            </Text>
                          </Body>
                          <Right style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons
                              name="qqchat"
                              size={30}
                              color="#CCC"
                            />
                          </Right>
                        </ListItem>
                      </TouchableOpacity>
                    </Fragment>
                  );
                })}
              </List>
            </Content>
          </>
        )}
      </Container>
    </>
  );
};
export default GroupChat;

GroupChat.propTypes = {
  setFooter: PropTypes.func,
  footer: PropTypes.bool
};
GroupChat.defaultProps = {
  setFooter: () => {},
  footer: false
};
