import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'components/common/context/SocketContext';
// import useFetchAllGroups from 'components/common/hook/useFetchAllGroups';

const useChatSocket = ({ dataUser }) => {
  const { socket } = useContext(SocketContext);
  // const { listGroups } = useFetchAllGroups({ dataUser });
  const {
    currentGroup: { _id, users, messages: messGroup }
  } = useSelector(state => state.groupSelected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const filterUserGroup = users
      .filter(user => user.id !== dataUser.id)
      .map(userGroup => {
        return {
          id: userGroup.id,
          name: userGroup.name
        };
      });
    const info = {
      list_user: [
        {
          id: dataUser.id,
          name: dataUser.name
        },
        ...filterUserGroup
      ],
      roomId: _id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
      positionUserCurrent: 0 // day la vi tri user dang login laf Truong
    };
    socket.emit('join', info);
    setMessages(messGroup);
    // socket.on('load_message', function (msg) {
    //   setMessages(msg);
    // });
    return () => {
      setMessages([]);
    };
  }, [_id, dataUser.id, dataUser.name, messGroup, socket, users]);

  return { messages, setMessages };
};
export default useChatSocket;
