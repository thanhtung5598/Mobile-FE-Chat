import { useState, useContext, useEffect } from 'react';
import { SocketContext } from 'components/common/context/SocketContext';
import { createSingleRoom } from 'actions/groupActions';

const useChatSocket = ({ singleGroups, currentSingleGroup, dataUser }) => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const host = [];
    const userChatSingle = [];
    const isGroupCreated = [];
    singleGroups.forEach(group =>
      group.users.forEach(user => {
        if (user.id === dataUser.id) {
          host.push(group);
        }
      })
    );
    singleGroups.forEach(group =>
      group.users.forEach(user => {
        if (user.id === currentSingleGroup.id) {
          userChatSingle.push(group);
        }
      })
    );
    host.forEach(groupSingleHost => {
      if (userChatSingle.length === 0) return;
      userChatSingle.forEach(userGroupSingle => {
        if (groupSingleHost._id === userGroupSingle._id) {
          isGroupCreated.push(groupSingleHost);
        }
      });
    });
    if (isGroupCreated.length > 0) {
      // setMessages([...isGroupCreated[0].messages]);
      const info = {
        list_user: [
          {
            id: dataUser.id,
            name: dataUser.name
          },
          {
            id: currentSingleGroup.id,
            name: currentSingleGroup.name
          }
        ],
        roomId: isGroupCreated[0]._id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
        positionUserCurrent: 0 // day la vi tri user dang login laf Truong
      };
      socket.emit('join', info);
      // const listMess = [];
      socket.on('load_message', function (msg) {
        setMessages(msg);
      });
    }
    if (isGroupCreated.length === 0) {
      createSingleRoom(currentSingleGroup.id, {
        name: 'C'
      }).then(res => {
        const { data, error } = res;
        if (!error) {
          const info = {
            list_user: [
              {
                id: dataUser.id,
                name: dataUser.name
              },
              {
                id: currentSingleGroup.id,
                name: currentSingleGroup.name
              }
            ],
            roomId: data._id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
            positionUserCurrent: 0 // day la vi tri user dang login laf Truong
          };
          socket.emit('join', info);
          const listMess = [];
          socket.on('load_message', function (msg) {
            listMess.push(msg);
            setMessages([...listMess]);
          });
        }
      });
    }
  }, [
    currentSingleGroup.id,
    currentSingleGroup.name,
    dataUser.id,
    dataUser.name,
    singleGroups,
    socket
  ]);

  return { messages, setMessages };
};
export default useChatSocket;
