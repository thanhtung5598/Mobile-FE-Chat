import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderGroupChat, HeaderSingleChat } from './headerChat';
import GroupAddMember from './GroupAddMember';
import { BodyGroupChat } from './bodyChat';

const ChatGroup = props => {
  console.log('Chat group');
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter, isSingle } = props;

  return (
    <>
      {isAddMember && <GroupAddMember setAddMember={setAddMember} />}
      {!isAddMember && (
        <>
          {isSingle && (
            <HeaderSingleChat setChatOpen={setChatOpen} setFooter={setFooter} />
          )}
          {!isSingle && (
            <HeaderGroupChat
              setChatOpen={setChatOpen}
              setFooter={setFooter}
              setAddMember={setAddMember}
            />
          )}

          <BodyGroupChat />
        </>
      )}
    </>
  );
};

export default ChatGroup;

ChatGroup.propTypes = {
  typeChat: PropTypes.string,
  isSingle: PropTypes.bool,
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func,
  setListGroups: PropTypes.func,
  listGroups: PropTypes.array
};
ChatGroup.defaultProps = {
  typeChat: '',
  isSingle: false,
  setChatOpen: () => {},
  setFooter: () => {},
  setListGroups: () => {},
  listGroups: []
};
