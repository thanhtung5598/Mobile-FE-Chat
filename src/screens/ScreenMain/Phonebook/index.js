import React, { useMemo, useCallback, useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, FlatList, StyleSheet } from 'react-native';
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
import { ChatGroup } from 'screens/ScreenMain/common/ChatRoomCustom';

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
  console.log('phonebook run');
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

  const handleOpenFriendReq = () => {
    setShowFriendsReq(true);
  };

  const handleOpenFriendPhonebook = () => {
    setPhonebook(true);
  };

  const handleTurnBack = useCallback(() => {
    setUserQuery('');
    setFind(false);
    dispatch(clearSearch());
    Keyboard.dismiss();
  }, [dispatch]);

  const handleFind = () => {
    setFind(true);
  };
  const handleChangeValue = useCallback(
    value => {
      setUserQuery(value);
      delayedQuery(value);
    },
    [delayedQuery]
  );

  const handleAddFriend = useCallback(
    id_friend_req => {
      const value = {
        user_id: dataUser.id,
        user_request_id: id_friend_req
      };
      dispatch(addFriend(value));
    },
    [dataUser.id, dispatch]
  );

  const handleDeletedFriend = useCallback(
    id_fri_del => {
      dispatch(deleteFriend(id_fri_del)).then(() => {
        setPosition(null);
      });
    },
    [dispatch]
  );

  const handleAcceptFriend = useCallback(
    id_friend_accept => {
      const value = {
        user_id: dataUser.id,
        user_id_want_accept: id_friend_accept
      };
      dispatch(acceptFriend(value));
    },
    [dataUser.id, dispatch]
  );

  const handleDeclineFriend = useCallback(
    id_friend_decline => {
      const value = {
        user_id: dataUser.id,
        user_id_want_decline: id_friend_decline
      };
      dispatch(declineFriend(value));
    },
    [dataUser.id, dispatch]
  );

  const handleToggleChatRoom = useCallback(
    friend => {
      dispatch(updateCurrentGroup(friend));
      setChatOpen(true);
      setFooter(false);
      setFind(false);
      setShowFriendsReq(false);
      setPhonebook(false);
      setUserQuery('');
    },
    [dispatch, setFooter]
  );

  const handlePullToRefesh = useCallback(() => {
    dispatch(fetchRequestFriends());
    dispatch(fetchListFriends());
  }, [dispatch]);

  const renderHeaderReq = useMemo(() => {
    return (
      <ListItem thumbnail onPress={handleOpenFriendReq}>
        <Left style={styles.friendReq}>
          <Fontisto name="heart" size={24} color="white" />
          {listRequestFriends?.length > 0 && (
            <View style={styles.badged}>
              <Text style={{ fontSize: 15, color: 'white' }}>
                {listRequestFriends?.length}
              </Text>
            </View>
          )}
        </Left>
        <Body style={styles.borderHide}>
          <Text>Friends Requested</Text>
        </Body>
      </ListItem>
    );
  }, [listRequestFriends?.length]);

  const renderHeaderSync = useMemo(() => {
    return (
      <TouchableOpacity onPress={handleOpenFriendPhonebook}>
        <ListItem thumbnail>
          <Left style={styles.iconStyle}>
            <FontAwesome name="address-book" size={24} color="white" />
          </Left>
          <Body style={styles.borderHide}>
            <Text>Sync Phonebook</Text>
          </Body>
        </ListItem>
      </TouchableOpacity>
    );
  }, []);

  const renderDivide = useMemo(() => {
    return (
      <>
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
  }, []);

  const renderHeaderPhonebook = useCallback(() => {
    return (
      <>
        {renderHeaderReq}
        {renderHeaderSync}
        {renderDivide}
      </>
    );
  }, [renderDivide, renderHeaderReq, renderHeaderSync]);

  const renderComponentEmpty = () => <EmptyList message={'Empty friends'} />;

  const renderItemPhonebook = useCallback(
    ({ item: friend, index }) => {
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
    },
    [handleDeletedFriend, handleToggleChatRoom, position, positionInfo]
  );

  const renderChat = useMemo(() => {
    return <ChatGroup setChatOpen={setChatOpen} setFooter={setFooter} />;
  }, [setFooter]);

  const renderFindFriend = useMemo(() => {
    return (
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
    );
  }, [
    find,
    handleAddFriend,
    handleChangeValue,
    handleToggleChatRoom,
    handleTurnBack,
    userQuery
  ]);

  const renderFriendReq = useMemo(() => {
    return (
      <FriendRequest
        handleToggleChatRoom={handleToggleChatRoom}
        setShowFriendsReq={setShowFriendsReq}
        handleAcceptFriend={handleAcceptFriend}
        handleDeclineFriend={handleDeclineFriend}
      />
    );
  }, [handleAcceptFriend, handleDeclineFriend, handleToggleChatRoom]);

  const renderPhoneSync = useMemo(() => {
    return (
      <SyncPhonebook
        handleToggleChatRoom={handleToggleChatRoom}
        setPhonebook={setPhonebook}
        handleAddFriend={handleAddFriend}
      />
    );
  }, [handleAddFriend, handleToggleChatRoom]);

  const renderAllPhonebook = useMemo(() => {
    return (
      <View style={{ height: '100%' }}>
        <HeaderSearch
          find={find}
          handleFind={handleFind}
          handleTurnBack={handleTurnBack}
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
    );
  }, [
    find,
    handlePullToRefesh,
    handleTurnBack,
    isLoading,
    listFriends,
    renderHeaderPhonebook,
    renderItemPhonebook
  ]);

  return (
    <>
      <Container>
        {isChatOpen && renderChat}
        {find && renderFindFriend}
        {showFriendsReq && renderFriendReq}
        {phonebook && renderPhoneSync}
        {!find &&
          !showFriendsReq &&
          !phonebook &&
          !isChatOpen &&
          renderAllPhonebook}
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
const styles = StyleSheet.create({
  friendReq: {
    backgroundColor: '#ffa726',
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badged: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center'
  },
  iconStyle: {
    backgroundColor: '#42a5f5',
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderHide: { borderBottomColor: 'white' }
});
