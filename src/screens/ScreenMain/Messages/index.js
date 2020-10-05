import React from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Item,
  Input,
  Icon
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const source = {
  uri:
    'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/p480x480/104483297_1777530932386533_1453571394136712521_o.jpg?_nc_cat=108&_nc_sid=7206a8&_nc_ohc=tm0JgudmkPQAX9OQO6h&_nc_ht=scontent-sin6-2.xx&tp=6&oh=43e71af7e3ded3fd585438e4e946550c&oe=5F9D1CCA'
};

const ListMessage = () => {
  return (
    <Container>
      <Header searchBar rounded>
        <Item style={{ backgroundColor: '#FFF' }}>
          <Icon name="ios-search" />
          <Input placeholder="Search your friends" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <AntDesign name="pluscircle" size={24} color="black" />
        </Button>
      </Header>
      <Content>
        <List scrollEnabled>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail rounded source={{ uri: source.uri }} />
            </Left>
            <Body>
              <Text>Sankhadeep</Text>
              <Text note numberOfLines={1}>
                Its time to build a difference . .
              </Text>
            </Body>
            <Right>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};
export default ListMessage;
