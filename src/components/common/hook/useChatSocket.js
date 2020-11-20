import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'components/common/context/SocketContext';
import { createSingleRoom } from 'actions/groupActions';
import useFetchAllGroups from 'components/common/hook/useFetchAllGroups';

const useChatSocket = ({ dataUser }) => {
  const { socket } = useContext(SocketContext);
  const { singleGroups } = useFetchAllGroups({ dataUser });
  const { currentGroup } = useSelector(state => state.groupSelected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (singleGroups.length > 0) {
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
          if (user.id === currentGroup.id) {
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
        console.log('old');
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
          roomId: isGroupCreated[0]._id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
          positionUserCurrent: 0 // day la vi tri user dang login laf Truong
        };
        socket.emit('join', info);
        setMessages(isGroupCreated[0].messages);
        // socket.on('load_message', function (msg) {
        //   setMessages(msg);
        // });
      }
      if (isGroupCreated.length === 0) {
        console.log('new');
        createSingleRoom(currentGroup.id, {
          name: 'C'
        })
          .then(res => {
            const { error } = res;
            if (!error) {
              socket.emit('rooms_request', currentGroup.id);
              const listMess = [];
              setMessages([...listMess]);
            }
          })
          .catch(err => {
            const { data } = err.response?.data;
            console.log(data);
          });
      }
    }
    return () => {
      setMessages([]);
    };
  }, [
    currentGroup.id,
    currentGroup.name,
    dataUser.id,
    dataUser.name,
    singleGroups,
    socket
  ]);

  return { messages, setMessages };
};
export default useChatSocket;
