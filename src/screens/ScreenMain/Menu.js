import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Content, Button, Text, Footer } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import { accountLogout } from 'actions/authenActions';
import { SocketContext } from 'components/common/context/SocketContext';

const Menu = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(accountLogout());
    socket.on('is-disconnect', userId => {
      console.log(userId);
    });
  };

  return (
    <Container>
      <Header />
      <Content></Content>
      <Footer>
        <Button
          primary
          style={{ width: '80%', justifyContent: 'center' }}
          onPress={handleLogout}
        >
          <SimpleLineIcons name="logout" size={24} color="white" />
          <Text> Logout </Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default Menu;
