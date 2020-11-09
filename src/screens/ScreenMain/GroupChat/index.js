import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, Image, FlatList } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Spinner
} from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchAllGroup } from 'actions/groupActions';

// Component
import HeaderSearch from './../common/header';
import FindFriends from 'screens/ScreenMain/common/FindFriends';
import GroupCreate from './GroupCreate';
import ChatRoom from 'screens/ScreenMain/common/ChatRoom';
import ItemGroups from 'screens/ScreenMain/common/ItemRender/ItemGroups';

// action
import {
  searchUserByPhoneEmailName,
  clearSearch,
  addFriend
} from 'actions/userActions';

const GroupChat = props => {
  const { footer, setFooter } = props;
  const dispatch = useDispatch();
  const { dataUser } = useSelector(state => state.dataUser);
  const { listGroups, paginator, isLoading } = useSelector(
    state => state.groups
  );

  const [userQuery, setUserQuery] = useState('');
  const [find, setFind] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

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

  const handleToggleChatRoom = group => {
    setCurrentGroup(group);
    setChatOpen(true);
    setCreate(false);
    setFooter(false);
  };

  const renderListHeaderGroup = () => {
    return (
      <List style={{ marginTop: 5, marginBottom: 5 }}>
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
  };

  const handlePullToRefesh = () => {
    dispatch(fetchAllGroup());
  };

  const handleLoadingMore = (paginator, listGroups) => {
    const { next } = paginator;
    if (next) {
      dispatch(fetchAllGroup(next, listGroups));
    }
  };

  const renderItemPhonebook = ({ item: group }) => {
    return (
      <TouchableOpacity onPress={() => handleToggleChatRoom(group)}>
        <ItemGroups group={group} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Container>
        {isChatOpen && (
          <ChatRoom
            setChatOpen={setChatOpen}
            setFooter={setFooter}
            currentGroup={currentGroup}
            typeChat="group"
          />
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
              <FindFriends handleAddFriend={handleAddFriend} />
            </Content>
          </>
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
              handleFind={handleFind}
              handleTurnBack={handleTurnBack}
            />
            <FlatList
              data={listGroups}
              ListHeaderComponent={renderListHeaderGroup}
              ListFooterComponent={() => isLoading && <Spinner />}
              renderItem={renderItemPhonebook}
              keyExtractor={item => `${item._id}`}
              refreshing={isLoading}
              onRefresh={handlePullToRefesh}
              onEndReached={() => handleLoadingMore(paginator, listGroups)}
              onEndReachedThreshold={0}
            />
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
