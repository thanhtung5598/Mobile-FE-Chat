import React, {
  useMemo,
  useCallback,
  useState,
  useContext,
  useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, Image, FlatList, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button
} from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

// Component
import HeaderSearch from './../common/header';
import FindFriends from 'screens/ScreenMain/common/FindFriends';
import GroupCreate from 'screens/ScreenMain/common/ChatRoomCustom/GroupCreate';
import { ChatGroup } from 'screens/ScreenMain/common/ChatRoomCustom';
import ItemGroups from 'screens/ScreenMain/common/ItemRender/ItemGroups';
import EmptyList from 'screens/ScreenMain/common/EmptyList';

// action
import {
  searchUserByPhoneEmailName,
  clearSearch,
  addFriend
} from 'actions/userActions';
import { updateCurrentGroup } from 'actions/groupActions';
import { SocketContext } from 'components/common/context/SocketContext';

const GroupChat = props => {
  const { footer, setFooter } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [numInit, setNumInit] = useState(8);
  const { dataUser } = useSelector(state => state.dataUser);
  const { listGroups } = useContext(SocketContext);

  const [userQuery, setUserQuery] = useState('');
  const [find, setFind] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  const delayedQuery = useRef(
    _.debounce(q => dispatch(searchUserByPhoneEmailName(q)), 500)
  ).current;

  const handleTurnBack = useCallback(() => {
    setUserQuery('');
    setFind(false);
    dispatch(clearSearch());
    Keyboard.dismiss();
  }, [dispatch]);

  const handleFind = () => {
    setFind(true);
  };

  const onHandleToggleCreate = useCallback(() => {
    setCreate(!isCreate);
    setFooter(!footer);
  }, [footer, isCreate, setFooter]);

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

  const handleToggleChatRoom = useCallback(
    group => {
      dispatch(updateCurrentGroup(group));
      setChatOpen(true);
      setCreate(false);
      setFooter(false);
    },
    [dispatch, setFooter]
  );

  const handleToggleChatSingle = useCallback(
    friend => {
      dispatch(updateCurrentGroup(friend));
      setFooter(false);
      setFind(false);
      setUserQuery('');
    },
    [dispatch, setFooter]
  );

  const renderListHeaderGroup = useCallback(() => {
    return (
      <List style={{ marginTop: 5, marginBottom: 5 }}>
        <TouchableOpacity onPress={onHandleToggleCreate}>
          <ListItem thumbnail>
            <Left style={styles.head}>
              <Image
                source={require('assets/iconGroup.jpg')}
                style={styles.iconHeader}
              />
            </Left>
            <Body style={{ borderBottomColor: 'white' }}>
              <Text style={{ fontSize: 16 }}>Create new Group</Text>
            </Body>
          </ListItem>
        </TouchableOpacity>
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
      </List>
    );
  }, [onHandleToggleCreate]);

  const handlePullToRefesh = () => {
    setLoading(true);
    setTimeout(() => {
      setNumInit(8);
      setLoading(false);
    }, 100);
  };

  const handleLoadingMore = useCallback(() => {
    if (listGroups.length > 8 && numInit < listGroups.length) {
      return (
        <TouchableOpacity onPress={() => setNumInit(numInit + 8)}>
          <Button full transparent light>
            <Text
              style={{
                color: '#2196f3'
              }}
            >
              More
            </Text>
            <MaterialIcons name="expand-more" size={24} color="#2196f3" />
          </Button>
        </TouchableOpacity>
      );
    } else {
      return (
        <Button full transparent light>
          <Text></Text>
        </Button>
      );
    }
  }, [listGroups.length, numInit]);

  const renderItemGroup = useCallback(
    ({ item: group }) => {
      return (
        <TouchableOpacity onPress={() => handleToggleChatRoom(group)}>
          <ItemGroups group={group} />
        </TouchableOpacity>
      );
    },
    [handleToggleChatRoom]
  );

  const renderComponentEmpty = () => <EmptyList message={'Empty groups'} />;

  const renderAllGroup = useMemo(() => {
    return (
      <>
        <HeaderSearch handleFind={handleFind} handleTurnBack={handleTurnBack} />
        <FlatList
          data={listGroups.slice(0, numInit)}
          ListHeaderComponent={renderListHeaderGroup}
          ListEmptyComponent={renderComponentEmpty}
          ListFooterComponent={handleLoadingMore}
          renderItem={renderItemGroup}
          keyExtractor={item => `${item._id}`}
          refreshing={isLoading}
          onRefresh={handlePullToRefesh}
        />
      </>
    );
  }, [
    handleLoadingMore,
    handleTurnBack,
    isLoading,
    listGroups,
    numInit,
    renderItemGroup,
    renderListHeaderGroup
  ]);

  const renderChatGroup = useMemo(() => {
    return <ChatGroup setChatOpen={setChatOpen} setFooter={setFooter} />;
  }, [setFooter]);

  const renderContentSearch = useMemo(() => {
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
            handleAddFriend={handleAddFriend}
            handleToggleChatRoom={handleToggleChatSingle}
          />
        </Content>
      </>
    );
  }, [
    find,
    handleAddFriend,
    handleChangeValue,
    handleToggleChatSingle,
    handleTurnBack,
    userQuery
  ]);

  const renderGroupCreate = useMemo(() => {
    return (
      <GroupCreate
        onHandleToggleCreate={onHandleToggleCreate}
        handleToggleChatRoom={handleToggleChatRoom}
      />
    );
  }, [handleToggleChatRoom, onHandleToggleCreate]);

  return (
    <>
      <Container>
        {isChatOpen && renderChatGroup}
        {find && renderContentSearch}
        {isCreate && renderGroupCreate}
        {!find && !isCreate && !isChatOpen && renderAllGroup}
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

const styles = StyleSheet.create({
  iconHeader: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 45
  },
  head: {
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
});
