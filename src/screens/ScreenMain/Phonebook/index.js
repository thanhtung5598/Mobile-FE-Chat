import React, { useState } from 'react';
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

import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCustom from 'components/common/ComponentsCommon/Modal';

// Component
import HeaderSearch from './../common/header';
import FriendRequest from './FriendRequest';
import SyncPhonebook from './SyncPhonebook';

const source = {
  uri:
    'https://image-us.eva.vn/upload/2-2019/images/2019-06-25/loat-hot-girl-xinh-dep-nuc-tieng-du-thi-thpt-quoc-gia-nam-2019-2-1561430194-418-width660height825.jpg'
};

const PhoneBook = () => {
  const [showFriendsReq, setShowFriendsReq] = useState(false);
  const [phonebook, setPhonebook] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleToggleModal = () => {
    setVisible(true);
  };

  const handleOpenFriendReq = () => {
    setShowFriendsReq(true);
  };

  const handleOpenFriendPhonebook = () => {
    setPhonebook(true);
  };

  return (
    <>
      <Container>
        {showFriendsReq && !phonebook && (
          <FriendRequest setShowFriendsReq={setShowFriendsReq} />
        )}
        {phonebook && !showFriendsReq && (
          <SyncPhonebook setPhonebook={setPhonebook} />
        )}
        {!showFriendsReq && !phonebook && (
          <>
            <ModalCustom visible={visible} setIsShow={setVisible} />
            <HeaderSearch />
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
                  <Text style={{ color: '#AAA' }}>A</Text>
                </ListItem>
                <TouchableOpacity onLongPress={handleToggleModal}>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <Text
                  style={{
                    width: '90%',
                    backgroundColor: '#CCC',
                    height: 0.5,
                    alignSelf: 'center'
                  }}
                ></Text>
                <ListItem itemDivider style={{ backgroundColor: 'white' }}>
                  <Text style={{ color: '#AAA' }}>B</Text>
                </ListItem>
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <Text
                  style={{
                    width: '90%',
                    backgroundColor: '#CCC',
                    height: 0.5,
                    alignSelf: 'center'
                  }}
                ></Text>
                <ListItem itemDivider style={{ backgroundColor: 'white' }}>
                  <Text style={{ color: '#AAA' }}>C</Text>
                </ListItem>
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
                <TouchableOpacity>
                  <ListItem thumbnail style={{ paddingBottom: 12 }}>
                    <Left>
                      <Thumbnail rounded source={{ uri: source.uri }} />
                    </Left>
                    <Body style={{ borderBottomColor: 'white' }}>
                      <Text>Ánh sao</Text>
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
