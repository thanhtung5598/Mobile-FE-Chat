import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderChat from './headerChat';
import GroupAddMember from './GroupAddMember';
import BodyChat from './bodyChat';

const ChatGroup = props => {
  console.log('Chat group');
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter } = props;

  return (
    <>
      {isAddMember && <GroupAddMember setAddMember={setAddMember} />}
      {!isAddMember && (
        <>
          <HeaderChat
            setChatOpen={setChatOpen}
            setFooter={setFooter}
            setAddMember={setAddMember}
          />
          <BodyChat />
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
