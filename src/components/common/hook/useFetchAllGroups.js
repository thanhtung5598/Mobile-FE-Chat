import { useState, useContext, useEffect } from 'react';
import { SocketContext } from 'components/common/context/SocketContext';

const useFetchAllGroups = ({ dataUser }) => {
  const { socket } = useContext(SocketContext);
  const [listGroups, setListGroups] = useState([]);
  const [singleGroups, setSingleGroups] = useState([]);

  useEffect(() => {
    socket.emit('rooms_request', dataUser.id);
    socket.on('load_rooms', function (rooms) {
      setListGroups(rooms.reverse().filter(group => group.group !== false));
      setSingleGroups(rooms.reverse().filter(group => group.group === false));
    });
  }, [dataUser.id, socket]);

  return { listGroups, setListGroups, singleGroups, setSingleGroups };
};
export default useFetchAllGroups;
