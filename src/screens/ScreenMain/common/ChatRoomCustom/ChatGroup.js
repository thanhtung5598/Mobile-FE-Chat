import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderGroupChat } from './headerChat';
import GroupAddMember from './GroupAddMember';
import { BodyGroupChat } from './bodyChat';

const ChatGroup = props => {
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter } = props;

  return (
    <>
      {isAddMember && <GroupAddMember setAddMember={setAddMember} />}
      {!isAddMember && (
        <>
          <HeaderGroupChat
            setChatOpen={setChatOpen}
            setFooter={setFooter}
            setAddMember={setAddMember}
          />
          <BodyGroupChat />
        </>
      )}
    </>
  );
};

export default ChatGroup;

ChatGroup.propTypes = {
  typeChat: PropTypes.string,
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func,
  setListGroups: PropTypes.func,
  listGroups: PropTypes.array
};
ChatGroup.defaultProps = {
  typeChat: '',
  setChatOpen: () => {},
  setFooter: () => {},
  setListGroups: () => {},
  listGroups: []
};
