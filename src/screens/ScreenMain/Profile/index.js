import React, { useContext } from 'react';
import { AuthenContext } from '../../../components/common/context/AuthenContext';
import { Container, Content, Button, Text } from 'native-base';

const Profile = () => {
  const { signOut } = useContext(AuthenContext);
  return (
    <Container>
      <Content>
        <Button onPress={() => signOut()} block>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Profile;
