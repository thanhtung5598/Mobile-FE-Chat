/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'components/common/context/SocketContext';

const useChatSocket = ({ dataUser }) => {
  const { socket } = useContext(SocketContext);
  const { currentGroup } = useSelector(state => state.groupSelected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const info = {
      list_user: [
        {
          id: dataUser.id,
          name: dataUser.name
        },
        {
          id: currentGroup.id,
          name: currentGroup.name
        }
      ],
      positionUserCurrent: 0 // day la vi tri user dang login laf Truong
    };
    socket.emit('join', info);
    socket.on('load_message', function (msg) {
      setMessages(msg);
    });
  }, []);

  return { messages, setMessages };
};
export default useChatSocket;
