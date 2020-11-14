import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderGroupChat, HeaderSingleChat } from './headerChat';
import BodySingleChat from './bodyChat';
import GroupAddMember from './GroupAddMember';
import { fetchAllGroup } from 'actions/groupActions';
import { Container } from 'native-base';

const ChatRoom = props => {
  const dispatch = useDispatch();
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter, typeChat } = props;

  useEffect(() => {
    return () => {
      dispatch(fetchAllGroup());
    };
  }, [dispatch]);

  return (
    <Container>
      {isAddMember && <GroupAddMember setAddMember={setAddMember} />}
      {!isAddMember && (
        <>
          {typeChat === 'group' && (
            <HeaderGroupChat
              setChatOpen={setChatOpen}
              setFooter={setFooter}
              setAddMember={setAddMember}
            />
          )}
          {typeChat === 'single' && (
            <>
              <HeaderSingleChat
                setChatOpen={setChatOpen}
                setFooter={setFooter}
              />
              <BodySingleChat />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  typeChat: PropTypes.string,
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatRoom.defaultProps = {
  typeChat: '',
  setChatOpen: () => {},
  setFooter: () => {}
};
