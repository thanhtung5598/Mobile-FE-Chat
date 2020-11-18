import React from 'react';
import PropTypes from 'prop-types';
import { HeaderSingleChat } from './headerChat';
import BodySingleChat from './bodyChat';
import { Container } from 'native-base';

const ChatSingle = props => {
  const { setChatOpen, setFooter } = props;

  return (
    <Container>
      <HeaderSingleChat setChatOpen={setChatOpen} setFooter={setFooter} />
      <BodySingleChat />
    </Container>
  );
};

export default ChatSingle;

ChatSingle.propTypes = {
  typeChat: PropTypes.string,
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatSingle.defaultProps = {
  typeChat: '',
  setChatOpen: () => {},
  setFooter: () => {}
};
