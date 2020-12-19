import React, { useContext, Fragment } from 'react';
import {
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
import { SocketContext } from 'components/common/context/SocketContext';

const ItemGroups = ({ group }) => {
  const { isOnlineGroup } = useContext(SocketContext);

  return (
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
                            uri: `${user.avatar}`
                          }
                        : require('assets/avatarDefault.png')
                    }
                  />
                </Fragment>
              );
            })}
            {group?.users.length >= 4 && (
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
            )}
          </View>
        </View>
      </Left>
      <Body style={{ borderBottomWidth: 0 }}>
        <Text>{group.name}</Text>
        <Text note numberOfLines={1}>
          Take your time to start . .
        </Text>
      </Body>
      <Right style={{ borderBottomWidth: 0, marginRight: 10 }}>
        <MaterialCommunityIcons
          name="qqchat"
          size={30}
          color={isOnlineGroup(group.users) ? '#31A252' : '#CCC'}
        />
      </Right>
    </ListItem>
  );
};

export default ItemGroups;
ItemGroups.propTypes = {
  group: PropTypes.objectOf(PropTypes.any)
};
ItemGroups.defaultProps = {
  group: {}
};
