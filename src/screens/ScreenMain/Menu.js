import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Content, Button, Text, Footer } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import { accountLogout } from 'actions/authenActions';

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Header />
      <Content></Content>
      <Footer>
        <Button
          primary
          style={{ width: '80%', justifyContent: 'center' }}
          onPress={() => dispatch(accountLogout())}
        >
          <SimpleLineIcons name="logout" size={24} color="white" />
          <Text> Logout </Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default Menu;
