import React, { useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right
} from 'native-base';
import PropTypes from 'prop-types';
import {
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome
} from '@expo/vector-icons';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCustom from 'components/common/ComponentsCommon/Modal';

// Component
import HeaderSearch from './../common/header';
import FriendRequest from './FriendRequest';
import SyncPhonebook from './SyncPhonebook';
import FindFriends from './FindFriends';

// action
import {
  searchUserByPhoneEmailName,
  clearSearch,
  addFriend,
  acceptFriend,
  declineFriend
} from 'actions/userActions';

const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const PhoneBook = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);
  const { listFriends } = useSelector(state => state.friends);
  const [userQuery, setUserQuery] = useState('');
  const [showFriendsReq, setShowFriendsReq] = useState(false);
  const [phonebook, setPhonebook] = useState(false);
  const [visible, setVisible] = useState(false);
  const [find, setFind] = useState(false);

  const delayedQuery = useRef(
    _.debounce(q => dispatch(searchUserByPhoneEmailName(q)), 500)
  ).current;

  const handleToggleModal = () => {
    setVisible(true);
  };

  const handleOpenFriendReq = () => {
    setShowFriendsReq(true);
  };

  const handleOpenFriendPhonebook = () => {
    setPhonebook(true);
  };

  const handleTurnBack = () => {
    setUserQuery('');
    setFind(false);
    dispatch(clearSearch());
    Keyboard.dismiss();
  };

  const handleFind = () => {
    setFind(true);
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
  const handleAcceptFriend = id_friend_accept => {
    const value = {
      user_id: dataUser.id,
      user_id_want_accept: id_friend_accept
    };
    dispatch(acceptFriend(value));
  };

  const handleDeclineFriend = id_friend_decline => {
    const value = {
      user_id: dataUser.id,
      user_id_want_decline: id_friend_decline
    };
    dispatch(declineFriend(value));
  };

  return (
    <>
      <Container>
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
        {!find && showFriendsReq && !phonebook && (
          <FriendRequest
            setShowFriendsReq={setShowFriendsReq}
            handleAcceptFriend={handleAcceptFriend}
            handleDeclineFriend={handleDeclineFriend}
          />
        )}
        {!find && phonebook && !showFriendsReq && (
          <SyncPhonebook setPhonebook={setPhonebook} />
        )}
        {!find && !showFriendsReq && !phonebook && (
          <>
            <HeaderSearch
              find={find}
              userQuery={userQuery}
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
              handleChangeValue={handleChangeValue}
            />
            <Content>
              <List>
                <TouchableOpacity onPress={handleOpenFriendReq}>
                  <ListItem thumbnail>
                    <Left
                      style={{
                        backgroundColor: '#ffa726',
                        width: 45,
                        height: 45,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Fontisto name="heart" size={24} color="white" />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Lời mời kết bạn</Text>
                    </Body>
                  </ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenFriendPhonebook}>
                  <ListItem thumbnail>
                    <Left
                      style={{
                        backgroundColor: '#42a5f5',
                        width: 45,
                        height: 45,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FontAwesome
                        name="address-book"
                        size={24}
                        color="white"
                      />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Danh bạ từ máy</Text>
                    </Body>
                  </ListItem>
                </TouchableOpacity>
              </List>
              <List>
                <ListItem
                  itemDivider
                  style={{ backgroundColor: 'white', paddingBottom: 0 }}
                >
                  <Left>
                    <Text style={{ fontSize: 14, fontWeight: '600' }}>
                      All phonebook
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
                        Friends
                      </Text>
                    </Right>
                  </Left>
                </ListItem>
                <ListItem itemDivider style={{ backgroundColor: 'white' }}>
                  <Text style={{ color: '#AAA' }}></Text>
                </ListItem>
                {listFriends?.map((friend, index) => {
                  return (
                    <Fragment key={index}>
                      <TouchableOpacity onLongPress={handleToggleModal}>
                        <ListItem thumbnail style={{ paddingBottom: 12 }}>
                          <Left>
                            <Thumbnail
                              rounded
                              source={{
                                uri: friend.avatar || avatarDefault
                              }}
                            />
                          </Left>
                          <Body style={{ borderBottomColor: 'white' }}>
                            <Text>{friend.name}</Text>
                          </Body>
                          <Right style={{ borderBottomWidth: 0 }}>
                            <MaterialCommunityIcons
                              name="chat"
                              size={24}
                              color="#CCC"
                            />
                          </Right>
                        </ListItem>
                      </TouchableOpacity>
                      <ModalCustom
                        info={friend}
                        visible={visible}
                        setIsShow={setVisible}
                      />
                    </Fragment>
                  );
                })}

                <Text
                  style={{
                    width: '90%',
                    backgroundColor: '#CCC',
                    height: 0.5,
                    alignSelf: 'center'
                  }}
                ></Text>
              </List>
            </Content>
          </>
        )}
      </Container>
    </>
  );
};
export default PhoneBook;

PhoneBook.propTypes = {
  setFooter: PropTypes.func
};
PhoneBook.defaultProps = {
  setFooter: () => {}
};
