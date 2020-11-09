import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { HeaderGroupChat, HeaderSingleChat } from './headerChat';
import BodyChat from './bodyChat';
import FooterChat from './footerChat';
import AddMember from './AddMember';

const ChatRoom = props => {
  const [isAddMember, SetAddMember] = useState(false);
  const { setChatOpen, setFooter, typeChat, currentGroup } = props;
  return (
    <Fragment>
      {isAddMember && (
        <AddMember SetAddMember={SetAddMember} currentGroup={currentGroup} />
      )}
      {!isAddMember && (
        <>
          {typeChat === 'group' && (
            <HeaderGroupChat
              setChatOpen={setChatOpen}
              setFooter={setFooter}
              currentGroup={currentGroup}
              SetAddMember={SetAddMember}
            />
          )}
          {typeChat === 'single' && (
            <HeaderSingleChat setChatOpen={setChatOpen} setFooter={setFooter} />
          )}
          <BodyChat />
          <FooterChat />
        </>
      )}
    </Fragment>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  typeChat: PropTypes.string,
  currentGroup: PropTypes.objectOf(PropTypes.any),
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatRoom.defaultProps = {
  typeChat: '',
  currentGroup: {},
  setChatOpen: () => {},
  setFooter: () => {}
};
