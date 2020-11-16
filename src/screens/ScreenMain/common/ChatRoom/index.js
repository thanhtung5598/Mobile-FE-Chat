import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { HeaderGroupChat, HeaderSingleChat } from './headerChat';
import BodySingleChat from './bodyChat';
import GroupAddMember from './GroupAddMember';
import { Container } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';

const ChatRoom = props => {
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter, typeChat } = props;
  const { socket } = useContext(SocketContext);
  const { dataUser } = useSelector(state => state.dataUser);

  useEffect(() => {
    return () => {
      socket.emit('rooms_request', dataUser.id);
    };
  }, [dataUser.id, socket]);

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
