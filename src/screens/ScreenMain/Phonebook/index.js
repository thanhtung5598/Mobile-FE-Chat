import React, { useState, useRef, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, FlatList } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  View
} from 'native-base';
import PropTypes from 'prop-types';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCustom from 'components/common/ComponentsCommon/Modal';

// Component
import HeaderSearch from './../common/header';
import FriendRequest from './FriendRequest';
import SyncPhonebook from './SyncPhonebook';
import FindFriends from 'screens/ScreenMain/common/FindFriends';
import ModalInfoUser from 'components/common/ComponentsCommon/Modal/modalInfo';
import { ChatSingle } from 'screens/ScreenMain/common/ChatRoomCustom';

// Item Render
import { ItemFriends } from 'screens/ScreenMain/common/ItemRender';
import EmptyList from 'screens/ScreenMain/common/EmptyList';

// action
import {
  searchUserByPhoneEmailName,
  clearSearch,
  addFriend,
  deleteFriend,
  acceptFriend,
  declineFriend,
  fetchRequestFriends,
  fetchListFriends
} from 'actions/userActions';
import { updateCurrentGroup } from 'actions/groupActions';

const PhoneBook = props => {
  const { setFooter } = props;
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);
  const { isLoading, listFriends, listRequestFriends } = useSelector(
    state => state.friends
  );

  const [position, setPosition] = useState(null);
  const [positionInfo, setPositionInfo] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [showFriendsReq, setShowFriendsReq] = useState(false);
  const [phonebook, setPhonebook] = useState(false);
  const [find, setFind] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  const delayedQuery = useRef(
    _.debounce(q => dispatch(searchUserByPhoneEmailName(q)), 500)
  ).current;

  const handleToggleModal = _position => {
    setPosition(_position);
  };
  const handleToggleModalInfo = _position => {
    setPositionInfo(_position);
    setPosition(null);
  };

  useEffect(() => {
    dispatch(fetchRequestFriends());
    dispatch(fetchListFriends());
  }, [dispatch]);

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

  const handleDeletedFriend = id_fri_del => {
    const value = {
      user_id: `${dataUser.id}`,
      user_id_want_delete: `${id_fri_del}`
    };
    dispatch(deleteFriend(value)).then(() => {
      setPosition(null);
    });
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

  const handleToggleChatRoom = friend => {
    dispatch(updateCurrentGroup(friend));
    setChatOpen(true);
    setFooter(false);
    setFind(false);
    setShowFriendsReq(false);
    setPhonebook(false);
    setUserQuery('');
  };

  const handlePullToRefesh = () => {
    dispatch(fetchRequestFriends());
    dispatch(fetchListFriends());
  };

  const renderHeaderPhonebook = () => {
    return (
      <>
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
              {listRequestFriends?.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -10,
                    bottom: 0,
                    backgroundColor: 'red',
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 15, color: 'white' }}>
                    {listRequestFriends?.length}
                  </Text>
                </View>
              )}
            </Left>
            <Body style={{ borderBottomColor: 'white' }}>
              <Text>Friends Requested</Text>
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
              <FontAwesome name="address-book" size={24} color="white" />
            </Left>
            <Body style={{ borderBottomColor: 'white' }}>
              <Text>Sync Phonebook</Text>
            </Body>
          </ListItem>
        </TouchableOpacity>
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
      </>
    );
  };

  const renderComponentEmpty = () => <EmptyList message={'Empty friends'} />;

  const renderItemPhonebook = ({ item: friend, index }) => {
    return (
      <Fragment key={index}>
        <TouchableOpacity
          onPress={() => handleToggleChatRoom(friend)}
          onLongPress={() => handleToggleModal(index)}
        >
          <ItemFriends friend={friend} />
        </TouchableOpacity>
        {position === index && (
          <ModalCustom
            info={friend}
            visible={!!(position === index)}
            setVisible={setPosition}
            handleDeletedFriend={handleDeletedFriend}
            handleToggleModalInfo={handleToggleModalInfo}
            positionModal={index}
          />
        )}
        {positionInfo === index && (
          <ModalInfoUser
            info={friend}
            visible={!!(positionInfo === index)}
            setVisible={setPositionInfo}
            setVisibleModalAction={setPosition}
            positionModal={index}
          />
        )}
      </Fragment>
    );
  };

  return (
    <>
      <Container>
        {isChatOpen && (
          <ChatSingle setChatOpen={setChatOpen} setFooter={setFooter} />
        )}
        {find && (
          <>
            <HeaderSearch
              find={find}
              userQuery={userQuery}
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
              handleChangeValue={handleChangeValue}
            />
            <Content>
              <FindFriends
                handleToggleChatRoom={handleToggleChatRoom}
                handleAddFriend={handleAddFriend}
              />
            </Content>
          </>
        )}
        {showFriendsReq && (
          <FriendRequest
            handleToggleChatRoom={handleToggleChatRoom}
            setShowFriendsReq={setShowFriendsReq}
            handleAcceptFriend={handleAcceptFriend}
            handleDeclineFriend={handleDeclineFriend}
          />
        )}
        {phonebook && (
          <SyncPhonebook
            handleToggleChatRoom={handleToggleChatRoom}
            setPhonebook={setPhonebook}
            handleAddFriend={handleAddFriend}
          />
        )}
        {!find && !showFriendsReq && !phonebook && !isChatOpen && (
          <View style={{ height: '100%' }}>
            <HeaderSearch
              find={find}
              userQuery={userQuery}
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
              handleChangeValue={handleChangeValue}
            />
            <FlatList
              data={listFriends}
              ListHeaderComponent={renderHeaderPhonebook}
              ListEmptyComponent={renderComponentEmpty}
              renderItem={renderItemPhonebook}
              keyExtractor={item => `${item.id}`}
              refreshing={isLoading}
              onRefresh={handlePullToRefesh}
            />
          </View>
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
