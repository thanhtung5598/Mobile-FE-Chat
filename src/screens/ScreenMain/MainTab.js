import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Footer, FooterTab, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import Messages from './Messages';
import Phonebook from './Phonebook';
import Profile from './Profile';

const MainTab = props => {
  const [content, setContent] = useState(<Phonebook />);
  const [isActive, setActive] = useState('');
  const [footer, setFooter] = useState(true);

  const handleChangeTab = target => {
    setActive(target);
    target === 'message' && setContent(<Messages setFooter={setFooter} />);
    target === 'phonebook' && setContent(<Phonebook setFooter={setFooter} />);
    target === 'profile' &&
      setContent(<Profile setFooter={setFooter} {...props} />);
  };

  return (
    <Container>
      {content}
      {footer && (
        <Footer>
          <FooterTab>
            <Button transparent onPress={() => handleChangeTab('message')}>
              <AntDesign name="message1" size={24} color="black" />
              <Text
                style={
                  isActive === 'message' ? styles.textActive : styles.textColor
                }
              >
                Message
              </Text>
            </Button>
            <Button transparent onPress={() => handleChangeTab('phonebook')}>
              <AntDesign name="contacts" size={24} color="black" />
              <Text
                style={
                  isActive === 'phonebook'
                    ? styles.textActive
                    : styles.textColor
                }
              >
                Phonebook
              </Text>
            </Button>
            <Button transparent onPress={() => handleChangeTab('profile')}>
              <AntDesign name="profile" size={24} color="black" />
              <Text
                style={
                  isActive === 'profile' ? styles.textActive : styles.textColor
                }
              >
                Profile
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      )}
    </Container>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  textColor: {
    color: '#555'
  },
  textActive: {
    color: 'black'
  }
});
