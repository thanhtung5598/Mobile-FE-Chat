/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'components/common/context/SocketContext';

const useChatSocket = ({ dataUser }) => {
  const { socket } = useContext(SocketContext);
  const { currentGroup } = useSelector(state => state.groupSelected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { _id, users } = currentGroup;
    console.log(currentGroup);
    const filterUserGroup = users
      ? users.filter(user => user.id !== dataUser.id)
      : [currentGroup];

    const info = {
      list_user: [dataUser, ...filterUserGroup],
      roomId: _id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
      positionUserCurrent: 0 // day la vi tri user dang login laf Truong
    };

    socket.emit('join', info);
    socket.on('load_message', function (room) {
      const { messages, users } = room;
      const userLogin = users.find(user => user.id === dataUser.id);
      setMessages(
        messages.filter(
          _msg => new Date(_msg.createdAt) > new Date(userLogin.startDate)
        )
      );
    });
    return () => {};
  }, []);

  return { messages, setMessages };
};
export default useChatSocket;
