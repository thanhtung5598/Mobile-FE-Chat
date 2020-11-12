import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSocket from 'use-socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = React.createContext();
const SocketConsumer = SocketContext.Consumer;

const SocketProvider = props => {
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
    socket.on('connect', () => {
      console.log(socket.connected);
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
