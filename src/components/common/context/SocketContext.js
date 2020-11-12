import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSocket from 'use-socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = React.createContext();
const SocketConsumer = SocketContext.Consumer;

const SocketProvider = props => {
  // const [room, setRoom] = useState(null);
  const { auth_token } = useSelector(state => state.authen);
  const ENDPOINT = `https://api-chat.ga?token=${auth_token}`;
  const [socket] = useSocket(ENDPOINT, {
    serveClient: false,
    // below are engine.IO options
    origins: '*:*',
    transports: ['polling'],
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  useEffect(() => {
    const info = {
      // them list_user > 2 se tao gr
      list_user: [
        {
          name: 'Đoan Trang',
          id: 11
        },
        {
          name: 'Minh Thư',
          id: 12
        }
      ],
      // vi group la phai tao truoc nen da co name, nen trong day ko bo name room neu tao moi
      // chi can doi roomId la se co message khong can doi list_user neu khong phai tao moi
      roomId: '5fabeb92529224006d6b1db4', // if roomId khong ton tai se tu tao 1 room moi, if 2 user da co room single thi se tu dong tao group co 2 ng
      // con voi group bat buoc phai co id truoc
      // roomId rong hoac khong dung dinh dang se ko hien thi
      positionUserCurrent: 1 // day la vi tri user dang login laf Truong
    };
    //Khi người dùng click vào 1 cuộc trò chuyện nào đó thì gọi cái này và truyền dữ liệu vào (truyen user va user tro chuyen cùng)
    socket.emit('join', info);
    socket.on('load_message', function (user_id, msg) {
      if (user_id === info.list_user[info.positionUserCurrent].id) {
        console.log(msg);
      }
    });
  }, [socket]);
  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};

export default SocketProvider;

export { SocketContext, SocketProvider, SocketConsumer };

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
SocketProvider.defaultProps = {
  children: {}
};
