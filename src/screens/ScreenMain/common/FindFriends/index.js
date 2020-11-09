import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Content, Tabs, Tab, Spinner } from 'native-base';
import useCheckFriend from 'components/common/hook/useCheckFriend';

// Item Render
import EmptyList from 'screens/ScreenMain/common/EmptyList';
import { ItemFriends } from 'screens/ScreenMain/common/ItemRender';

const FindFriends = props => {
  const { handleAddFriend } = props;
  const { dataUser } = useSelector(state => state.dataUser);
  const { isLoading, listUsers } = useSelector(state => state.listUsers);
  const { listFriends, listFriendsWait, listRequestFriends } = useSelector(
    state => state.friends
  );
  const { listFindFill } = useCheckFriend({
    listUsers,
    listFriends,
    listFriendsWait,
    listRequestFriends
  });
  const renderItemSyncPhone = ({ item: friend }) => (
    <ItemFriends
      friend={friend}
      handleAddFriend={handleAddFriend}
      status={true}
    />
  );

  const renderEmptyComponent = () => <EmptyList message={'Nothing found'} />;

  return (
    <Content>
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: 'white',
          height: 0
        }}
      >
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
          heading="All Result"
        >
          {isLoading && <Spinner />}
          <FlatList
            data={listFindFill?.filter(item => item.id !== dataUser.id)}
            renderItem={renderItemSyncPhone}
            keyExtractor={item => `${item.id}`}
            refreshing={isLoading}
            ListEmptyComponent={renderEmptyComponent}
          />
        </Tab>
      </Tabs>
    </Content>
  );
};

export default FindFriends;

FindFriends.propTypes = {
  handleAddFriend: PropTypes.func
};
FindFriends.defaultProps = {
  handleAddFriend: () => {}
};
