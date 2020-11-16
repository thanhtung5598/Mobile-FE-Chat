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
      const singleGroupsFill = singleGroups.filter(
        group => group.group === false
      );
      const host = [];
      const userChatSingle = [];
      const isGroupCreated = [];
      singleGroupsFill.forEach(group =>
        group.users.forEach(user => {
          if (user.id === dataUser.id) {
            host.push(group);
          }
        })
      );
      singleGroupsFill.forEach(group =>
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
        // const listMess = [];
        socket.on('load_message', function (msg) {
          setMessages(msg);
        });
      }
      if (isGroupCreated.length === 0) {
        console.log('new');
        createSingleRoom(currentGroup.id, {
          name: 'C'
        })
          .then(res => {
            const { data, error } = res;
            if (!error) {
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
                roomId: data._id, // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
                positionUserCurrent: 0 // day la vi tri user dang login laf Truong
              };
              socket.emit('join', info);
              socket.emit('rooms_request', currentGroup.id);
              const listMess = [];
              socket.on('load_message', function (msg) {
                listMess.push(msg);
                setMessages([...listMess]);
              });
            }
          })
          .catch(err => {
            const { data } = err.response?.data;
            console.log(data);
          });
      }
    }
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
