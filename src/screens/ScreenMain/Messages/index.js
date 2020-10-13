import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  View,
  Badge
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

// Component
import HeaderSearch from './../common/header';

const source = {
  uri:
    'https://image-us.eva.vn/upload/2-2019/images/2019-06-25/loat-hot-girl-xinh-dep-nuc-tieng-du-thi-thpt-quoc-gia-nam-2019-2-1561430194-418-width660height825.jpg'
};

const ListMessage = () => {
  return (
    <Container>
      <HeaderSearch />
      <Content>
        <ScrollView
          horizontal={true}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 10
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail style={{ backgroundColor: '#DDD' }} />
              <AntDesign
                style={{ position: 'absolute', right: 0, bottom: 0 }}
                name="pluscircle"
                size={18}
                color="#2962ff"
              />
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Create Group
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <View>
              <Thumbnail rounded source={{ uri: source.uri }} />
              <Badge
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: '#31A252',
                  position: 'absolute',
                  right: 3,
                  bottom: 0
                }}
              ></Badge>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: '#222' }}>
              Ngọc Nga
            </Text>
          </View>
        </ScrollView>
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
