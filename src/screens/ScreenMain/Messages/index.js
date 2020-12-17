import React, { useCallback, useMemo, useState, useContext } from 'react';
import { Container, View } from 'native-base';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Component
import PropTypes from 'prop-types';
import HeaderSearch from './../common/header';
import { SocketContext } from 'components/common/context/SocketContext';
import EmptyList from 'screens/ScreenMain/common/EmptyList';
import ItemGroups from 'screens/ScreenMain/common/ItemRender/ItemGroups';
import { ItemFriends } from 'screens/ScreenMain/common/ItemRender';
import { ChatGroup } from 'screens/ScreenMain/common/ChatRoomCustom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useActionSheet } from '@expo/react-native-action-sheet';

// Action
import { updateCurrentGroup, deleteRoom } from 'actions/groupActions';

const ListMessage = props => {
  const { setFooter } = props;
  const dispatch = useDispatch();
  const { listMessRoom } = useContext(SocketContext);
  const { dataUser } = useSelector(state => state.dataUser);
  const [isChatGroup, setChatGroup] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const renderComponentEmpty = () => <EmptyList message={'Empty groups'} />;

  const handleToggleChatGroup = useCallback(
    group => {
      dispatch(updateCurrentGroup(group));
      setChatGroup(true);
      setFooter(false);
    },
    [dispatch, setFooter]
  );

  const handleLongPressGroup = useCallback(
    idGroup => {
      showActionSheetWithOptions(
        {
          options: ['Remove', 'Cancel'],
          cancelButtonIndex: 1,
          tintColor: '#f0ff'
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            dispatch(deleteRoom(idGroup));
          }
        }
      );
    },
    [dispatch, showActionSheetWithOptions]
  );

  const renderItemGroup = useCallback(
    ({ item: group }) => {
      const isGroup = group?.group;
      if (isGroup) {
        return (
          <TouchableOpacity
            onLongPress={() => handleLongPressGroup(group._id)}
            onPress={() => handleToggleChatGroup(group)}
          >
            <ItemGroups group={group} />
          </TouchableOpacity>
        );
      }
      if (!isGroup) {
        const userFil = group.users.filter(user => user.id !== dataUser?.id)[0];
        return (
          <TouchableOpacity
            onLongPress={() => handleLongPressGroup(group._id)}
            onPress={() => handleToggleChatGroup(group)}
          >
            <ItemFriends friend={userFil} />
          </TouchableOpacity>
        );
      }
    },
    [dataUser?.id, handleLongPressGroup, handleToggleChatGroup]
  );

  const renderAllGroup = useMemo(() => {
    return (
      <>
        <View style={{ height: '100%' }}>
          <HeaderSearch />
          <FlatList
            data={listMessRoom}
            ListEmptyComponent={renderComponentEmpty}
            renderItem={renderItemGroup}
            keyExtractor={item => `${item._id}`}
          />
        </View>
      </>
    );
  }, [listMessRoom, renderItemGroup]);

  const renderChat = useMemo(() => {
    return <ChatGroup setChatOpen={setChatGroup} setFooter={setFooter} />;
  }, [setFooter]);

  return (
    <Container>
      {isChatGroup && renderChat}
      {!isChatGroup && renderAllGroup}
    </Container>
  );
};
export default ListMessage;

ListMessage.propTypes = {
  setFooter: PropTypes.func
};
ListMessage.defaultProps = {
  setFooter: () => {}
};
