import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { HeaderGroupChat } from './headerChat';
import GroupAddMember from './GroupAddMember';
import { Container } from 'native-base';
import { SocketContext } from 'components/common/context/SocketContext';

const ChatGroup = props => {
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter } = props;
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
        <HeaderGroupChat
          setChatOpen={setChatOpen}
          setFooter={setFooter}
          setAddMember={setAddMember}
        />
      )}
    </Container>
  );
};

export default ChatGroup;

ChatGroup.propTypes = {
  typeChat: PropTypes.string,
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatGroup.defaultProps = {
  typeChat: '',
  setChatOpen: () => {},
  setFooter: () => {}
};
