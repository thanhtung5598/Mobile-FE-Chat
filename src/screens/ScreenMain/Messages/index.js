import React, { useState, useContext } from 'react';
import { Container, Content } from 'native-base';
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
import { updateCurrentGroup } from 'actions/groupActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListMessage = props => {
  const { setFooter } = props;
  const dispatch = useDispatch();
  const { listMessRoom } = useContext(SocketContext);
  const { dataUser } = useSelector(state => state.dataUser);
  const [isChatGroup, setChatGroup] = useState(false);

  const renderComponentEmpty = () => <EmptyList message={'Empty groups'} />;

  const handleToggleChatGroup = group => {
    dispatch(updateCurrentGroup(group));
    setChatGroup(true);
    setFooter(false);
  };

  const renderItemGroup = ({ item: group }) => {
    const isGroup = group?.group;
    if (isGroup) {
      return (
        <TouchableOpacity onPress={() => handleToggleChatGroup(group)}>
          <ItemGroups group={group} />
        </TouchableOpacity>
      );
    }
    if (!isGroup) {
      const userFil = group.users.filter(user => user.id !== dataUser?.id)[0];
      return (
        <TouchableOpacity onPress={() => handleToggleChatGroup(group)}>
          <ItemFriends friend={userFil} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <Container>
      {isChatGroup && (
        <ChatGroup
          setChatOpen={setChatGroup}
          setFooter={setFooter}
          isSingle={true}
        />
      )}
      {!isChatGroup && (
        <>
          <HeaderSearch />
          <Content>
            <FlatList
              data={listMessRoom}
              ListEmptyComponent={renderComponentEmpty}
              renderItem={renderItemGroup}
              keyExtractor={item => `${item._id}`}
            />
          </Content>
        </>
      )}
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
