import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderChat from './headerChat';
import BodyChat from './bodyChat';
import FooterChat from './footerChat';

const ChatRoom = props => {
  const { setChatOpen, setFooter } = props;
  return (
    <Fragment>
      <HeaderChat setChatOpen={setChatOpen} setFooter={setFooter} />
      <BodyChat />
      <FooterChat />
    </Fragment>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatRoom.defaultProps = {
  setChatOpen: () => {},
  setFooter: () => {}
};
